import fetch from "node-fetch";
import Parser from "rss-parser";
import crypto from "crypto";
import fs from "fs";
import express from "express";
import { KEYWORDS } from "./keywords.js";

/* ================== CONFIG ================== */
const BOT_TOKEN = "7884775926:AAF9x36fBXeuB2iCUn0AHqoBUZuPXGO61C0";
const CHAT_ID  = "6837315281";
const INTERVAL = 5 * 60 * 1000;
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

/* ================== UTILS ================== */
const norm = s => (s||"").toLowerCase();
const hash = s => crypto.createHash("sha1").update(s).digest("hex");

/* ================== SMART MATCH ================== */
function smartMatch(text){
  const t = norm(text);

  for (const k of KEYWORDS.locations)
    if (t.includes(norm(k))) return { type:"📍 قرية/عزلة", value:k };

  for (const k of KEYWORDS.influencers)
    if (t.includes(norm(k))) return { type:"👤 مؤثر/صفحة", value:k };

  for (const k of KEYWORDS.officials)
    if (t.includes(norm(k))) return { type:"🏛️ جهة رسمية", value:k };

  for (const k of KEYWORDS.events)
    if (t.includes(norm(k))) return { type:"⚠️ حدث", value:k };

  return null;
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
const sendMsg = t => tg("sendMessage", { chat_id: CHAT_ID, text: t });

/* ================== THREAT ANALYSIS ================== */
function threatLevel(text){
  const t = norm(text);
  if (/(قصف|استهداف|هجوم|انفجار|اغتيال)/.test(t)) return "🔥 مرتفع";
  if (/(اشتباكات|تحرك|تصريح)/.test(t)) return "⚠️ متوسط";
  return "ℹ️ منخفض";
}

/* ================== SOURCES ================== */
const SOURCES = [
  { name:"Google News AR", url:"https://news.google.com/rss/search?q=الدريهمي&hl=ar&gl=YE&ceid=YE:ar" },
  { name:"Google News EN", url:"https://news.google.com/rss/search?q=Durayhimi" },
  { name:"GDELT", url:"https://api.gdeltproject.org/api/v2/doc/doc?query=الدريهمي&mode=artlist&format=rss" },
  { name:"Reddit", url:"https://www.reddit.com/search.rss?q=Durayhimi" }
];

/* ================== MAIN SCAN ================== */
async function scan(){
  for(const src of SOURCES){
    try{
      const feed = await parser.parseURL(src.url);

      for(const item of feed.items || []){
        const text = `${item.title} ${item.contentSnippet || ""}`;
        const found = smartMatch(text);
        if(!found) continue;

        const id = hash(item.link + (item.pubDate || ""));
        if(sent.has(id)) continue;

        sent.add(id);
        fs.writeFileSync(sentFile, JSON.stringify([...sent]));

        const threat = threatLevel(text);

        daily.push({
          time: new Date().toISOString(),
          source: src.name,
          title: item.title,
          link: item.link,
          threat,
          type: found.type,
          keyword: found.value
        });

        if(threat === "🔥 مرتفع"){
          await sendMsg(
            `🚨 تنبيه عاجل\n\n` +
            `السبب: ${found.type} (${found.value})\n` +
            `المصدر: ${src.name}\n` +
            `${item.title}\n` +
            `${item.link}`
          );
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
    report += `${i+1}. ${d.type} | ${d.threat}\n${d.title}\n${d.link}\n\n`;
  });

  await sendMsg(report.slice(0,4000));
  daily=[];
  fs.writeFileSync(dailyFile,"[]");
}, 24*60*60*1000);

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
