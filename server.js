import fetch from "node-fetch";
import Parser from "rss-parser";
import crypto from "crypto";
import fs from "fs";
import express from "express";
import { KEYWORDS } from "./keywords.js";

/* ================== CONFIG ================== */
const BOT_TOKEN = "7884775926:AAF9x36fBXeuB2iCUn0AHqoBUZuPXGO61C0";
const CHAT_ID  = "6837315281";
const INTERVAL = 5 * 60 * 1000; // 5 دقائق
const PORT = process.env.PORT || 3000;

/* ================== TARGET AREA ================== */
// الدريهمي + القرى والعزل (قابل للتوسعة)
const LOCATIONS = [
  "الدريهمي",
  "الجحبا",
  "الجحبا العليا",
  "الجحبا السفلى",
  "المنصورية",
  "الحديدة"
];

/* ================== STORAGE ================== */
const sentFile  = "./sent.json";
const dailyFile = "./daily.json";
const weeklyFile = "./weekly.json";

const sent  = new Set(fs.existsSync(sentFile) ? JSON.parse(fs.readFileSync(sentFile)) : []);
let daily   = fs.existsSync(dailyFile) ? JSON.parse(fs.readFileSync(dailyFile)) : [];
let weekly  = fs.existsSync(weeklyFile) ? JSON.parse(fs.readFileSync(weeklyFile)) : [];

/* ================== PARSER ================== */
const parser = new Parser({ timeout: 15000 });

/* ================== TELEGRAM ================== */
async function tg(method, data) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}
const sendMsg   = t => tg("sendMessage", { chat_id: CHAT_ID, text: t });
const sendPhoto = (u,c="") => tg("sendPhoto",{ chat_id: CHAT_ID, photo:u, caption:c.slice(0,1000) });
const sendDoc   = (u,c="") => tg("sendDocument",{ chat_id: CHAT_ID, document:u, caption:c.slice(0,1000) });

/* ================== UTILS ================== */
const norm = s => (s||"").toLowerCase();
const hash = s => crypto.createHash("sha1").update(s).digest("hex");

const matchKeywords = t =>
  KEYWORDS.some(k => norm(t).includes(norm(k))) &&
  LOCATIONS.some(l => norm(t).includes(norm(l)));

const isRecent = date => {
  if (!date) return true;
  const diff = Date.now() - new Date(date).getTime();
  return diff <= INTERVAL;
};

/* ====== 1) تصنيف التهديد ====== */
function threatLevel(text){
  const t = norm(text);
  if (/(قصف|استهداف|ضربة|هجوم|اغتيال|تحذير|عدوان)/.test(t)) return "🔥 مرتفع";
  if (/(تحرك|مناورة|تصريح|بيان)/.test(t)) return "⚠️ متوسط";
  return "ℹ️ منخفض";
}

/* ====== 2) نوع المحتوى ====== */
function contentType(text){
  const t = norm(text);
  if (/(عاجل|تحذير)/.test(t)) return "🚨 تحذير";
  if (/(مسير|وقفة|تعبئة)/.test(t)) return "🧭 نشاط شعبي";
  return "📰 خبر";
}

/* ================== SOURCES ================== */
const SOURCES = [
  { name:"Google News AR", url:"https://news.google.com/rss/search?q=الدريهمي&hl=ar&gl=YE&ceid=YE:ar"},
  { name:"Google News EN", url:"https://news.google.com/rss/search?q=Durayhimi"},
  { name:"GDELT", url:"https://api.gdeltproject.org/api/v2/doc/doc?query=الدريهمي&mode=artlist&format=rss"},
  { name:"Reddit", url:"https://www.reddit.com/search.rss?q=Durayhimi"},
  { name:"Social Mirror", url:"https://news.google.com/rss/search?q=الدريهمي+site:facebook.com+OR+site:x.com"}
];

/* ================== MEDIA ================== */
function extractMedia(item){
  const out=[];
  if(item.enclosure?.url) out.push(item.enclosure.url);
  if(item["media:content"]){
    const m=item["media:content"];
    if(Array.isArray(m)) m.forEach(x=>x.url&&out.push(x.url));
    else if(m.url) out.push(m.url);
  }
  return out;
}

/* ================== MAIN SCAN ================== */
async function scan(){
  for(const src of SOURCES){
    try{
      const feed = await parser.parseURL(src.url);
      for(const item of feed.items||[]){
        if(!isRecent(item.pubDate)) continue;

        const text = `${item.title} ${item.contentSnippet||""}`;
        if(!matchKeywords(text)) continue;

        const id = hash(item.link + (item.pubDate||""));
        if(sent.has(id)) continue;

        sent.add(id);
        fs.writeFileSync(sentFile, JSON.stringify([...sent]));

        const threat = threatLevel(text);
        const type   = contentType(text);

        const record = {
          time: new Date().toISOString(),
          src: src.name,
          title: item.title,
          link: item.link,
          threat,
          type
        };

        daily.push(record);
        weekly.push(record);

        fs.writeFileSync(dailyFile, JSON.stringify(daily,null,2));
        fs.writeFileSync(weeklyFile, JSON.stringify(weekly,null,2));

        // 🔥 تنبيه فوري فقط للتهديد المرتفع
        if (threat.includes("مرتفع")) {
          await sendMsg(`🚨 تنبيه أمني عاجل\n\n${item.title}\n${item.link}`);
        }

        await sendMsg(`🛰️ ${src.name}\n${type} | ${threat}\n\n${item.title}\n${item.link}`);

        for(const m of extractMedia(item)){
          if(m.match(/\.(jpg|png|jpeg)$/i)) await sendPhoto(m,item.title);
          else if(m.match(/\.(pdf|doc|docx)$/i)) await sendDoc(m,item.title);
        }
      }
    }catch(e){
      console.error("Source error:",src.name,e.message);
    }
  }
}

/* ================== DAILY REPORT (12 ليلاً) ================== */
async function dailyReport(){
  if(!daily.length) return;

  let report = `تقرير يومي استخباراتي\n\n`;
  report += `الصفة: متابعة ميدانية\n`;
  report += `التاريخ: ${new Date().toLocaleDateString("ar-YE")}\n`;
  report += `المكان: مديرية الدريهمي – محافظة الحديدة\n`;
  report += `الجهة المعدّة: استخبارات (المربع الجنوبي)\n`;
  report += `درجة السرية: عادي\n\n`;
  report += `الملخص التنفيذي:\n`;

  daily.forEach((d,i)=>{
    report += `${i+1}. ${d.title}\n`;
  });

  await sendMsg(report.slice(0,4000));
  daily=[];
  fs.writeFileSync(dailyFile,"[]");
}

setInterval(dailyReport, 24*60*60*1000);

/* ================== WEEKLY STATS ================== */
setInterval(async ()=>{
  const stats = weekly.reduce((a,b)=>{
    a[b.threat]=(a[b.threat]||0)+1;
    return a;
  },{});
  await sendMsg(`📈 إحصائيات أسبوعية\n${JSON.stringify(stats,null,2)}`);
  weekly=[];
  fs.writeFileSync(weeklyFile,"[]");
}, 7*24*60*60*1000);

/* ================== DASHBOARD ================== */
const app = express();
app.get("/",(_,res)=>{
  res.send(`<h2>OSINT Monitor – الدريهمي</h2><pre>${JSON.stringify(daily,null,2)}</pre>`);
});
app.listen(PORT,()=>console.log("Dashboard on",PORT));

/* ================== START ================== */
sendMsg("✅ OSINT Monitor Started – الدريهمي");
scan();
setInterval(scan, INTERVAL);
