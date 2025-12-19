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
const PORT = process.env.PORT || 10000;

/* ================== STORAGE ================== */
const sentFile  = "./sent.json";
const dailyFile = "./daily.json";

if (!fs.existsSync(sentFile)) fs.writeFileSync(sentFile, "[]");
if (!fs.existsSync(dailyFile)) fs.writeFileSync(dailyFile, "[]");

const sent  = new Set(JSON.parse(fs.readFileSync(sentFile)));
let daily   = JSON.parse(fs.readFileSync(dailyFile));

/* ================== PARSER ================== */
const parser = new Parser({ timeout: 20000 });

/* ================== URL SAFE ================== */
function safeURL(url){
  try{
    const u = new URL(url);
    u.search = encodeURI(u.search);
    return u.toString();
  }catch{
    return encodeURI(url);
  }
}

/* ================== TELEGRAM ================== */
async function tg(method, data) {
  try{
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }catch(e){
    console.error("Telegram error:", e.message);
  }
}

const sendMsg   = t => tg("sendMessage", { chat_id: CHAT_ID, text: t });
const sendPhoto = (u,c="") => tg("sendPhoto",{ chat_id: CHAT_ID, photo:u, caption:c.slice(0,1000) });
const sendDoc   = (u,c="") => tg("sendDocument",{ chat_id: CHAT_ID, document:u, caption:c.slice(0,1000) });

/* ================== UTILS ================== */
const norm = s => (s||"").toLowerCase();
const match = t => KEYWORDS.some(k => norm(t).includes(norm(k)));
const hash = s => crypto.createHash("sha1").update(s).digest("hex");

/* ================== THREAT ANALYSIS ================== */
function threatLevel(text){
  const t = norm(text);
  if (/(قصف|استهداف|ضربة|هجوم|عملية|اغتيال|تحذير|تهديد)/.test(t)) return "🔥 مرتفع";
  if (/(تحرك|بيان|تصريح|مناورة)/.test(t)) return "⚠️ متوسط";
  return "ℹ️ منخفض";
}

function contentType(text){
  const t = norm(text);
  if (/(عاجل|تحذير|تهديد)/.test(t)) return "🚨 تحذير";
  if (/(قال|صرح|أعلن)/.test(t)) return "📰 خبر";
  return "🗨️ ذكر عام";
}

/* ================== SOURCES ================== */
const SOURCES = [
  { name:"Google News AR", url:"https://news.google.com/rss/search?q=الدريهمي&hl=ar&gl=YE&ceid=YE:ar" },
  { name:"Google News EN", url:"https://news.google.com/rss/search?q=Durayhimi" },
  { name:"GDELT", url:"https://api.gdeltproject.org/api/v2/doc/doc?query=الدريهمي&mode=artlist&format=rss" },
  { name:"Reddit", url:"https://www.reddit.com/search.rss?q=Durayhimi" }
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
      const feed = await parser.parseURL(safeURL(src.url));

      for(const item of feed.items || []){
        const text = `${item.title} ${item.contentSnippet || ""}`;
        if(!match(text)) continue;

        const id = hash(item.link + (item.pubDate || ""));
        if(sent.has(id)) continue;

        sent.add(id);
        fs.writeFileSync(sentFile, JSON.stringify([...sent]));

        const threat = threatLevel(text);
        if(threat === "🔥 مرتفع"){
          await sendMsg(
            `🚨 تنبيه فوري عالي الخطورة\n\nالمصدر: ${src.name}\n${item.title}\n${item.link}`
          );
        }

        for(const m of extractMedia(item)){
          if(m.match(/\.(jpg|png|jpeg)$/i)) await sendPhoto(m,item.title);
          else if(m.match(/\.(pdf|doc|docx)$/i)) await sendDoc(m,item.title);
        }
      }
    }catch(e){
      console.error("Source error:", src.name, e.message);
    }
  }
}

/* ================== DAILY REPORT ================== */
setInterval(async ()=>{
  if(!daily.length) return;

  let report = `📄 تقرير يومي استخباراتي\n\n`;
  daily.forEach((d,i)=>{
    report += `${i+1}. ${d.title}\n${d.link}\n\n`;
  });

  await sendMsg(report.slice(0,4000));
  daily=[];
  fs.writeFileSync(dailyFile,"[]");
}, 24*60*60*1000);

/* ================== DASHBOARD ================== */
const app = express();
app.get("/",(_,res)=>{
  res.send(`<h2>OSINT Monitor</h2><p>Status: Running</p>`);
});
app.listen(PORT,()=>console.log("Dashboard on",PORT));

/* ================== SELF PING (الحل) ================== */
setInterval(async () => {
  try {
    await fetch(`http://localhost:${PORT}`);
    console.log("Self ping OK");
  } catch (e) {
    console.log("Ping failed");
  }
}, 60 * 1000);

/* ================== START ================== */
sendMsg("✅ OSINT Monitor Started");
scan();
setInterval(scan, INTERVAL);
