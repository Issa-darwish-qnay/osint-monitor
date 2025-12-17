import fetch from "node-fetch";
import Parser from "rss-parser";
import { KEYWORDS } from "./keywords.js";

const BOT_TOKEN = "7884775926:AAF9x36fBXeuB2iCUn0AHqoBUZuPXGO61C0";
const CHAT_ID = "6837315281";
const INTERVAL_MS = 5 * 60 * 1000; // 5 دقائق

const parser = new Parser({ timeout: 15000 });
const sent = new Set();

// -------- Telegram helpers --------
async function sendTelegram(text) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text.slice(0, 4000)
    })
  });
}

async function sendPhoto(url, caption = "") {
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        photo: url,
        caption: caption.slice(0, 1000)
      })
    });
  } catch {
    await sendTelegram(`🖼 صورة (تعذر الإرسال)\n${url}`);
  }
}

async function sendDocument(url, caption = "") {
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        document: url,
        caption: caption.slice(0, 1000)
      })
    });
  } catch {
    await sendTelegram(`📎 ملف (تعذر الإرسال)\n${url}`);
  }
}

// -------- Utils --------
function normalize(s = "") {
  return s.toLowerCase();
}

function matchKeyword(text = "") {
  const t = normalize(text);
  return KEYWORDS.some(k => t.includes(normalize(k)));
}

function extractMedia(item) {
  const media = [];

  if (item.enclosure?.url) media.push(item.enclosure.url);

  const mc = item["media:content"];
  if (mc) {
    if (Array.isArray(mc)) {
      mc.forEach(x => x.url && media.push(x.url));
    } else if (mc.url) {
      media.push(mc.url);
    }
  }

  const html = item.content || item["content:encoded"] || "";
  const imgs = [...html.matchAll(/<img[^>]+src="([^">]+)"/g)];
  imgs.forEach(m => media.push(m[1]));

  return [...new Set(media)];
}

// -------- Sources --------
function buildSources() {
  const list = [];
  for (const k of KEYWORDS) {
    const q = encodeURIComponent(k);
    list.push(
      { name: "GDELT", url: `https://api.gdeltproject.org/api/v2/doc/doc?query=${q}&mode=artlist&format=rss` },
      { name: "Google News", url: `https://news.google.com/rss/search?q=${q}` },
      { name: "Reddit", url: `https://www.reddit.com/search.rss?q=${q}&sort=new` },
      { name: "X Search", url: `https://nitter.net/search/rss?f=tweets&q=${q}` },
      { name: "Telegram Public", url: `https://tgstat.com/rss/search?query=${q}` }
    );
  }
  return list;
}

const SOURCES = buildSources();

// -------- Scanner --------
async function scan() {
  for (const src of SOURCES) {
    try {
      const feed = await parser.parseURL(src.url);
      for (const item of feed.items || []) {
        const text = `${item.title || ""} ${item.contentSnippet || ""} ${item.content || ""}`;
        if (!matchKeyword(text)) continue;

        const id = item.guid || item.link || item.title;
        if (!id || sent.has(id)) continue;
        sent.add(id);

        await sendTelegram(
          `📡 رصد OSINT – الدريهمي\n` +
          `المصدر: ${src.name}\n` +
          `العنوان: ${item.title || ""}\n` +
          `${item.link || ""}`
        );

        const media = extractMedia(item).slice(0, 5);
        for (const m of media) {
          if (m.match(/\.(jpg|jpeg|png|webp)$/i)) {
            await sendPhoto(m, item.title || "");
          } else if (m.match(/\.(pdf|docx?|zip|rar|mp4)$/i)) {
            await sendDocument(m, item.title || "");
          }
        }
      }
    } catch (e) {
      console.error("Source error:", src.name, e.message);
    }
  }
}

// -------- Run --------
(async () => {
  await sendTelegram("🟢 OSINT Monitor بدأ العمل");
  await scan();
  setInterval(scan, INTERVAL_MS);
})();
