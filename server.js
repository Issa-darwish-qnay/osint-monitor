import fetch from "node-fetch";
import Parser from "rss-parser";
import { KEYWORDS } from "./keywords.js";


const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const INTERVAL_MS = 5 * 60 * 1000; // 5 دقائق


const parser = new Parser({ timeout: 15000 });
const sent = new Set();


// -------- Telegram helpers --------
async function sendTelegram(text) {
await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ chat_id: CHAT_ID, text })
});
}


async function sendPhoto(url, caption = "") {
try {
await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ chat_id: CHAT_ID, photo: url, caption: caption.slice(0, 1000) })
});
} catch {
await sendTelegram(`🖼 صورة (تعذر الإرسال): ${url}`);
}
}


async function sendDocument(url, caption = "") {
try {
await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ chat_id: CHAT_ID, document: url, caption: caption.slice(0, 1000) })
});
} catch {
await sendTelegram(`📎 ملف (تعذر الإرسال): ${url}`);
}
}


// -------- Utils --------
function normalize(s = "") { return s.toLowerCase(); }


function matchKeyword(text = "") {
const t = normalize(text);
return KEYWORDS.some(k => t.includes(normalize(k)));
}


function extractMedia(item) {
const media = [];
if (item.enclosure?.url) media.push(item.enclosure.url);


const mc = item["media:content"];
if (mc) {
})();
