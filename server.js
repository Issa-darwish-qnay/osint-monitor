/* ================== CONFIGURATION ================== */
const config = {
  botToken: "7884775926:AAF9x36fBXeuB2iCUn0AHqoBUZuPXGO61C0",
  chatId: "6837315281",
  scanInterval: 5 * 60 * 1000, // 5 دقائق
  port: process.env.PORT || 10000,
  dataPath: "./data/",
  sources: [
    {
      name: "Google News AR",
      url: "https://news.google.com/rss/search?q=الدريهمي&hl=ar&gl=YE&ceid=YE:ar",
      priority: 1
    },
    {
      name: "Google News EN",
      url: "https://news.google.com/rss/search?q=Durayhimi",
      priority: 2
    },
    {
      name: "GDELT Yemen",
      url: "https://api.gdeltproject.org/api/v2/doc/doc?query=الدريهمي&mode=artlist&format=rss",
      priority: 1
    },
    {
      name: "Twitter Trends",
      url: "https://rss.app/feeds/_u4iC9tkqVNP8FtzB.xml",
      priority: 3
    },
    {
      name: "Al-Masirah Feed",
      url: "https://www.almasirah.net/feed/",
      priority: 1
    },
    {
      name: "Yemen Press",
      url: "https://yemen-press.com/feed/",
      priority: 2
    }
  ],
  keywords: {
    locations: [
      "الدريهمي", "Durayhimi", "Al Durayhimi", "مديرية الدريهمي",
      "بني مرسي", "الحجبة السفلى", "الحجبة العليا", "الزرانيق",
      "المساعيد", "الزعفران", "الشجن", "الكرد", "الكنباحية",
      "اللاوية", "المحال", "المكيمنية", "المنقم الأعلى",
      "المنقم الأسفل", "دير حسن", "رغمين", "غليفقة", "الهايط",
      "بيت حسن جماعي", "خبت قوبع"
    ],
    entities: [
      "مدير مديرية الدريهمي", "مدير أمن الدريهمي", "المكاتب التنفيذية",
      "السلطة المحلية", "الحوثيين", "المجلس الانتقالي", "التحالف العربي",
      "الجيش اليمني", "لجنة السلامة", "اللجان الشعبية"
    ],
    events: [
      "قصف", "غارة", "استهداف", "هجوم", "اشتباكات", "انفجار",
      "تحرك", "ضحايا", "إصابة", "جرحى", "شهداء", "اعتقال",
      "مداهمة", "تفتيش", "احتجاج", "تظاهرة", "مسيرة", "إغاثة",
      "مساعدات", "أممية", "منظمة", "مشروع", "تنموي"
    ],
    threats: [
      "عاجل", "تحذير", "تهديد", "خطر", "خطير", "نزوح",
      "تهجير", "مجاعة", "أزمة", "كارثة", "وباء", "تفشي",
      "سقوط", "انهيار", "انقطاع", "توقف", "حصار"
    ],
    media: [
      "أخبار الدريهمي", "الدريهمي الآن", "شبكة الدريهمي",
      "مستجدات الدريهمي", "المكتب الإعلامي", "مراسل الدريهمي",
      "ناشط من الدريهمي", "قناة الدريهمي", "صفحة الدريهمي"
    ]
  }
};

/* ================== IMPORTS ================== */
import fetch from "node-fetch";
import Parser from "rss-parser";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import express from "express";
import { fileURLToPath } from 'url';

/* ================== INITIALIZATION ================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// إنشاء مجلد البيانات إذا لم يكن موجوداً
if (!fs.existsSync(config.dataPath)) {
  fs.mkdirSync(config.dataPath, { recursive: true });
}

/* ================== STORAGE ================== */
const sentFile = path.join(config.dataPath, "sent.json");
const dailyFile = path.join(config.dataPath, "daily.json");
const statsFile = path.join(config.dataPath, "stats.json");
const threatsFile = path.join(config.dataPath, "threats.json");
const timelineFile = path.join(config.dataPath, "timeline.json");

// تهيئة الملفات إذا لم تكن موجودة
const initFile = (file, defaultValue = []) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(defaultValue, null, 2));
  }
};

initFile(sentFile, []);
initFile(dailyFile, []);
initFile(statsFile, {
  totalScans: 0,
  totalMatches: 0,
  highThreats: 0,
  lastScan: null,
  sourcesStats: {}
});
initFile(threatsFile, []);
initFile(timelineFile, []);

/* ================== LOAD DATA ================== */
const sent = new Set(JSON.parse(fs.readFileSync(sentFile)));
let daily = JSON.parse(fs.readFileSync(dailyFile));
let stats = JSON.parse(fs.readFileSync(statsFile));
let threats = JSON.parse(fs.readFileSync(threatsFile));
let timeline = JSON.parse(fs.readFileSync(timelineFile));

/* ================== RSS PARSER ================== */
const parser = new Parser({
  timeout: 30000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  customFields: {
    item: [
      'media:content',
      'media:thumbnail',
      'enclosure',
      'source',
      'author'
    ]
  }
});

/* ================== UTILITY FUNCTIONS ================== */
function safeURL(url) {
  try {
    return encodeURI(url);
  } catch {
    return url;
  }
}

function normalize(text) {
  return (text || "").toLowerCase().replace(/[^\w\s\u0600-\u06FF]/g, '');
}

function generateHash(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function saveData() {
  fs.writeFileSync(sentFile, JSON.stringify([...sent], null, 2));
  fs.writeFileSync(dailyFile, JSON.stringify(daily, null, 2));
  fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
  fs.writeFileSync(threatsFile, JSON.stringify(threats, null, 2));
  fs.writeFileSync(timelineFile, JSON.stringify(timeline, null, 2));
}

/* ================== THREAT INTELLIGENCE ================== */
class ThreatAnalyzer {
  static analyze(text) {
    const normText = normalize(text);
    
    // تحليل الكلمات المفتاحية
    let score = 0;
    let threatsDetected = [];
    let type = "🗨️ ذكر عام";
    let priority = "ℹ️ منخفض";
    
    // كلمات ذات أولوية عالية
    const highPriorityWords = [
      "قصف", "غارة", "استهداف", "هجوم", "اشتباكات", "انفجار",
      "ضحايا", "شهداء", "إصابة", "جرحى", "عاجل", "تحذير"
    ];
    
    // كلمات ذات أولوية متوسطة
    const mediumPriorityWords = [
      "تحرك", "بيان", "تصريح", "مناورة", "احتجاج", "تظاهرة",
      "اعتقال", "مداهمة", "تفتيش", "أزمة", "كارثة"
    ];
    
    // التحقق من الكلمات عالية الأولوية
    highPriorityWords.forEach(word => {
      if (normText.includes(normalize(word))) {
        score += 3;
        threatsDetected.push(word);
        type = "🚨 حدث عسكري/أمني";
        priority = "🔥 مرتفع";
      }
    });
    
    // التحقق من الكلمات متوسطة الأولوية
    mediumPriorityWords.forEach(word => {
      if (normText.includes(normalize(word))) {
        score += 2;
        if (!threatsDetected.includes(word)) threatsDetected.push(word);
        if (priority !== "🔥 مرتفع") {
          type = "⚠️ تطور مهم";
          priority = "⚠️ متوسط";
        }
      }
    });
    
    // التحقق من الأماكن
    config.keywords.locations.forEach(location => {
      if (normText.includes(normalize(location))) {
        score += 1;
      }
    });
    
    // تحديد مستوى التهديد النهائي
    if (score >= 5) {
      priority = "🔥 عالي جداً";
      type = "🚨 حالة طوارئ";
    } else if (score >= 3) {
      priority = "🔥 مرتفع";
      type = "🚨 تهديد أمني";
    } else if (score >= 1) {
      priority = "⚠️ متوسط";
      type = "📢 تطور إخباري";
    }
    
    return {
      score,
      threats: threatsDetected,
      type,
      priority,
      timestamp: new Date().toISOString()
    };
  }
  
  static extractEntities(text) {
    const entities = {
      locations: [],
      persons: [],
      organizations: [],
      events: []
    };
    
    config.keywords.locations.forEach(loc => {
      if (normalize(text).includes(normalize(loc))) {
        entities.locations.push(loc);
      }
    });
    
    config.keywords.entities.forEach(ent => {
      if (normalize(text).includes(normalize(ent))) {
        entities.organizations.push(ent);
      }
    });
    
    return entities;
  }
}

/* ================== MEDIA PROCESSOR ================== */
class MediaProcessor {
  static extract(item) {
    const media = {
      images: [],
      videos: [],
      documents: []
    };
    
    // استخراج من enclosure
    if (item.enclosure?.url) {
      const url = item.enclosure.url;
      if (this.isImage(url)) media.images.push(url);
      else if (this.isVideo(url)) media.videos.push(url);
      else if (this.isDocument(url)) media.documents.push(url);
    }
    
    // استخراج من media:content
    if (item['media:content']) {
      const mediaContent = item['media:content'];
      if (Array.isArray(mediaContent)) {
        mediaContent.forEach(mc => {
          if (mc.url) {
            const url = mc.url;
            if (this.isImage(url)) media.images.push(url);
            else if (this.isVideo(url)) media.videos.push(url);
            else if (this.isDocument(url)) media.documents.push(url);
          }
        });
      } else if (mediaContent.url) {
        const url = mediaContent.url;
        if (this.isImage(url)) media.images.push(url);
        else if (this.isVideo(url)) media.videos.push(url);
        else if (this.isDocument(url)) media.documents.push(url);
      }
    }
    
    return media;
  }
  
  static isImage(url) {
    return /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(url) || 
           /(img|image|photo|picture|thumbnail)/i.test(url);
  }
  
  static isVideo(url) {
    return /\.(mp4|avi|mov|wmv|flv|mkv|webm)$/i.test(url) || 
           /(video|youtube|vimeo|dailymotion)/i.test(url);
  }
  
  static isDocument(url) {
    return /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|rtf)$/i.test(url);
  }
}

/* ================== TELEGRAM BOT ================== */
class TelegramBot {
  static async sendMessage(text, options = {}) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: config.chatId,
          text: text.slice(0, 4000),
          parse_mode: 'HTML',
          disable_web_page_preview: options.preview || false
        })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Telegram sendMessage error:', error.message);
      return null;
    }
  }
  
  static async sendPhoto(photoUrl, caption = "") {
    try {
      const response = await fetch(`https://api.telegram.org/bot${config.botToken}/sendPhoto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: config.chatId,
          photo: photoUrl,
          caption: caption.slice(0, 1000),
          parse_mode: 'HTML'
        })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Telegram sendPhoto error:', error.message);
      return null;
    }
  }
  
  static async sendDocument(documentUrl, caption = "") {
    try {
      const response = await fetch(`https://api.telegram.org/bot${config.botToken}/sendDocument`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: config.chatId,
          document: documentUrl,
          caption: caption.slice(0, 1000),
          parse_mode: 'HTML'
        })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Telegram sendDocument error:', error.message);
      return null;
    }
  }
  
  static async sendAlert(item, analysis) {
    const emoji = analysis.priority.includes("🔥") ? "🚨" : "⚠️";
    const message = `
${emoji} <b>${analysis.priority}</b> | ${analysis.type}

<b>📰 العنوان:</b>
${item.title || "بدون عنوان"}

<b>📍 الكيانات المكتشفة:</b>
${analysis.entities.locations.join(", ") || "غير محدد"}

<b>⚠️ التهديدات:</b>
${analysis.threats.join(", ") || "غير محدد"}

<b>📊 درجة الخطورة:</b> ${analysis.score}/10

<b>🔗 المصدر:</b> ${item.source || "غير معروف"}

<b>📎 الرابط:</b>
${item.link || "غير متوفر"}
    `.trim();
    
    await this.sendMessage(message);
    
    // إرسال الوسائط إذا وجدت
    if (item.media?.images?.length > 0) {
      for (const img of item.media.images.slice(0, 3)) {
        await this.sendPhoto(img, `📸 ${item.title?.slice(0, 200) || ''}`);
      }
    }
    
    if (item.media?.documents?.length > 0) {
      for (const doc of item.media.documents.slice(0, 2)) {
        await this.sendDocument(doc, `📄 ${item.title?.slice(0, 200) || ''}`);
      }
    }
  }
}

/* ================== OSINT SCANNER ================== */
class OSINTScanner {
  static async scanSource(source) {
    try {
      console.log(`🔍 فحص المصدر: ${source.name}`);
      
      const feed = await parser.parseURL(safeURL(source.url));
      const results = [];
      
      for (const item of feed.items || []) {
        const content = `${item.title || ''} ${item.contentSnippet || ''} ${item.content || ''}`;
        
        // التحقق من وجود أي كلمة مفتاحية
        let hasKeyword = false;
        const normContent = normalize(content);
        
        // البحث في جميع مجموعات الكلمات المفتاحية
        for (const category of Object.values(config.keywords)) {
          if (Array.isArray(category)) {
            for (const keyword of category) {
              if (normContent.includes(normalize(keyword))) {
                hasKeyword = true;
                break;
              }
            }
            if (hasKeyword) break;
          }
        }
        
        if (!hasKeyword) continue;
        
        const itemHash = generateHash(`${item.link || ''}${item.pubDate || ''}${content}`);
        
        if (sent.has(itemHash)) continue;
        
        sent.add(itemHash);
        
        // تحليل التهديد
        const threatAnalysis = ThreatAnalyzer.analyze(content);
        const entities = ThreatAnalyzer.extractEntities(content);
        const media = MediaProcessor.extract(item);
        
        const record = {
          id: itemHash,
          timestamp: new Date().toISOString(),
          source: source.name,
          title: item.title,
          description: item.contentSnippet || item.content?.slice(0, 500),
          link: item.link,
          pubDate: item.pubDate || new Date().toISOString(),
          threatAnalysis,
          entities,
          media,
          raw: {
            content: content.slice(0, 1000),
            author: item.author,
            categories: item.categories
          }
        };
        
        results.push(record);
        
        // إضافة إلى السجل اليومي
        daily.push({
          id: itemHash,
          time: new Date().toISOString(),
          source: source.name,
          title: item.title?.slice(0, 200),
          link: item.link,
          threat: threatAnalysis.priority,
          type: threatAnalysis.type,
          score: threatAnalysis.score
        });
        
        // إضافة إلى الخط الزمني
        timeline.push({
          timestamp: new Date().toISOString(),
          event: item.title?.slice(0, 150),
          source: source.name,
          threatLevel: threatAnalysis.score,
          link: item.link
        });
        
        // الحفاظ على حجم الخط الزمني
        if (timeline.length > 1000) {
          timeline = timeline.slice(-500);
        }
        
        // تحديث الإحصائيات
        stats.totalMatches++;
        stats.sourcesStats[source.name] = (stats.sourcesStats[source.name] || 0) + 1;
        
        if (threatAnalysis.priority.includes("🔥")) {
          stats.highThreats++;
          threats.push(record);
          
          // إرسال تنبيه فوري للتهديدات العالية
          await TelegramBot.sendAlert(record, threatAnalysis);
        }
      }
      
      console.log(`✅ تم فحص ${results.length} عنصر من ${source.name}`);
      return results;
      
    } catch (error) {
      console.error(`❌ خطأ في فحص ${source.name}:`, error.message);
      return [];
    }
  }
  
  static async fullScan() {
    console.log('🔄 بدء الفحص الشامل...');
    stats.totalScans++;
    stats.lastScan = new Date().toISOString();
    
    const allResults = [];
    
    // فرز المصادر حسب الأولوية
    const sortedSources = [...config.sources].sort((a, b) => a.priority - b.priority);
    
    for (const source of sortedSources) {
      const results = await this.scanSource(source);
      allResults.push(...results);
      
      // تأجيل بسيط بين المصادر
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // حفظ البيانات
    saveData();
    
    console.log(`✅ اكتمل الفحص. تم العثور على ${allResults.length} نتيجة جديدة`);
    
    // تحديث الإحصائيات في حالة عدم وجود تهديدات عالية
    if (allResults.length > 0) {
      const summary = this.generateSummary(allResults);
      await TelegramBot.sendMessage(summary);
    }
    
    return allResults;
  }
  
  static generateSummary(results) {
    const highThreats = results.filter(r => r.threatAnalysis.priority.includes("🔥"));
    const locations = new Set();
    const threatTypes = new Set();
    
    results.forEach(r => {
      r.entities.locations.forEach(l => locations.add(l));
      r.threatAnalysis.threats.forEach(t => threatTypes.add(t));
    });
    
    return `
📊 <b>ملخص الفحص</b>

<b>النتائج:</b> ${results.length} نتيجة جديدة
<b>التهديدات العالية:</b> ${highThreats.length}
<b>الأماكن المذكورة:</b> ${Array.from(locations).join(', ') || 'لا يوجد'}
<b>أنواع التهديدات:</b> ${Array.from(threatTypes).join(', ') || 'لا يوجد'}

<b>آخر تحديث:</b> ${new Date().toLocaleString('ar-YE')}
    `.trim();
  }
}

/* ================== DASHBOARD SERVER ================== */
class DashboardServer {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
  }
  
  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }
  
  setupRoutes() {
    this.app.get('/', (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>نظام المراقبة الاستخباراتي - الدريهمي</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    margin: 0;
                    padding: 20px;
                    color: #333;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 20px;
                    padding: 30px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                }
                header {
                    text-align: center;
                    margin-bottom: 40px;
                    padding-bottom: 20px;
                    border-bottom: 3px solid #667eea;
                }
                h1 {
                    color: #2d3748;
                    margin-bottom: 10px;
                }
                .subtitle {
                    color: #718096;
                    font-size: 1.2em;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 40px;
                }
                .stat-card {
                    background: linear-gradient(135deg, #f6f9fc 0%, #e9eff5 100%);
                    padding: 25px;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    transition: transform 0.3s;
                }
                .stat-card:hover {
                    transform: translateY(-5px);
                }
                .stat-value {
                    font-size: 2.5em;
                    font-weight: bold;
                    color: #667eea;
                    margin: 10px 0;
                }
                .stat-label {
                    color: #718096;
                    font-size: 1.1em;
                }
                .threat-high { color: #e53e3e; }
                .threat-medium { color: #d69e2e; }
                .threat-low { color: #38a169; }
                .recent-events {
                    background: #f7fafc;
                    padding: 25px;
                    border-radius: 15px;
                    margin-bottom: 30px;
                }
                .event-item {
                    padding: 15px;
                    margin: 10px 0;
                    background: white;
                    border-radius: 10px;
                    border-left: 5px solid #667eea;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                }
                .controls {
                    display: flex;
                    gap: 15px;
                    margin-top: 30px;
                }
                button {
                    padding: 12px 25px;
                    border: none;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    font-size: 1em;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
                }
                .last-update {
                    text-align: center;
                    margin-top: 30px;
                    color: #718096;
                    font-size: 0.9em;
                }
                .map-container {
                    height: 400px;
                    background: #e2e8f0;
                    border-radius: 15px;
                    margin: 30px 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #718096;
                }
                .keyword-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 20px;
                }
                .keyword {
                    background: #edf2f7;
                    padding: 8px 15px;
                    border-radius: 20px;
                    font-size: 0.9em;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <header>
                    <h1>🚨 نظام المراقبة الاستخباراتي - الدريهمي</h1>
                    <p class="subtitle">مراقبة لحظية للأحداث والتهديدات في مديرية الدريهمي</p>
                </header>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">إجمالي الفحوصات</div>
                        <div class="stat-value">${stats.totalScans}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">النتائج المكتشفة</div>
                        <div class="stat-value">${stats.totalMatches}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">التهديدات العالية</div>
                        <div class="stat-value threat-high">${stats.highThreats}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">آخر فحص</div>
                        <div class="stat-value">${stats.lastScan ? new Date(stats.lastScan).toLocaleString('ar-YE') : 'لم يتم'}</div>
                    </div>
                </div>
                
                <div class="recent-events">
                    <h2>📰 الأحداث الأخيرة</h2>
                    ${daily.slice(-10).reverse().map(event => \`
                        <div class="event-item">
                            <strong>\${event.title}</strong><br>
                            <small>\${new Date(event.time).toLocaleString('ar-YE')} | \${event.source}</small><br>
                            <span class="\${event.threat.includes('🔥') ? 'threat-high' : event.threat.includes('⚠️') ? 'threat-medium' : 'threat-low'}">
                                \${event.threat}
                            </span>
                        </div>
                    \`).join('')}
                </div>
                
                <div class="map-container">
                    🗺️ خريطة توزيع التهديدات - منطقة الدريهمي
                </div>
                
                <div>
                    <h2>🔑 الكلمات المفتاحية المراقبة</h2>
                    <div class="keyword-list">
                        ${config.keywords.locations.slice(0, 15).map(k => \`
                            <div class="keyword">\${k}</div>
                        \`).join('')}
                    </div>
                </div>
                
                <div class="controls">
                    <button onclick="window.location.reload()">🔄 تحديث</button>
                    <button onclick="startScan()">🔍 فحص فوري</button>
                    <button onclick="window.open('/api/stats', '_blank')">📊 الإحصائيات</button>
                    <button onclick="window.open('/api/timeline', '_blank')">⏳ الخط الزمني</button>
                </div>
                
                <div class="last-update">
                    آخر تحديث: ${new Date().toLocaleString('ar-YE')}
                </div>
            </div>
            
            <script>
                async function startScan() {
                    const btn = event.target;
                    btn.disabled = true;
                    btn.innerHTML = '⏳ جاري الفحص...';
                    
                    const response = await fetch('/api/scan', { method: 'POST' });
                    const result = await response.json();
                    
                    alert(result.message || 'تم الفحص بنجاح');
                    window.location.reload();
                }
            </script>
        </body>
        </html>
      `);
    });
    
    // واجهات برمجة التطبيقات (APIs)
    this.app.get('/api/stats', (req, res) => {
      res.json({
        success: true,
        stats,
        dailyCount: daily.length,
        threatsCount: threats.length,
        timelineCount: timeline.length
      });
    });
    
    this.app.get('/api/daily', (req, res) => {
      res.json({
        success: true,
        count: daily.length,
        events: daily.slice(-50).reverse()
      });
    });
    
    this.app.get('/api/timeline', (req, res) => {
      res.json({
        success: true,
        count: timeline.length,
        timeline: timeline.slice(-100).reverse()
      });
    });
    
    this.app.get('/api/threats', (req, res) => {
      res.json({
        success: true,
        count: threats.length,
        threats: threats.slice(-50).reverse()
      });
    });
    
    this.app.post('/api/scan', async (req, res) => {
      try {
        await OSINTScanner.fullScan();
        res.json({ success: true, message: 'تم الفحص بنجاح' });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    });
    
    this.app.get('/api/health', (req, res) => {
      res.json({
        status: 'online',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        sources: config.sources.length
      });
    });
  }
  
  start() {
    this.server = this.app.listen(config.port, () => {
      console.log(`🌐 لوحة التحكم تعمل على: http://localhost:${config.port}`);
    });
  }
}

/* ================== MAIN EXECUTION ================== */
async function main() {
  try {
    console.log('🚀 بدء تشغيل نظام المراقبة الاستخباراتي...');
    
    // إرسال رسالة بدء التشغيل
    await TelegramBot.sendMessage(`
✅ <b>بدء تشغيل نظام المراقبة</b>

<b>نظام:</b> OSINT Intelligence Monitor
<b>المنطقة:</b> مديرية الدريهمي - الحديدة
<b>المصادر:</b> ${config.sources.length} مصدر
<b>الكلمات المفتاحية:</b> ${Object.values(config.keywords).flat().length} كلمة
<b>وقت البدء:</b> ${new Date().toLocaleString('ar-YE')}

🔍 جاري بدء المراقبة...
    `.trim());
    
    // بدء الخادم
    const dashboard = new DashboardServer();
    dashboard.start();
    
    // الفحص الأولي
    await OSINTScanner.fullScan();
    
    // جدولة الفحوصات الدورية
    setInterval(async () => {
      await OSINTScanner.fullScan();
    }, config.scanInterval);
    
    // جدولة التقرير اليومي
    setInterval(async () => {
      if (daily.length > 0) {
        const report = `
📅 <b>التقرير الاستخباراتي اليومي</b>

<b>التاريخ:</b> ${new Date().toLocaleDateString('ar-YE')}
<b>المنطقة:</b> مديرية الدريهمي

<b>الإحصائيات:</b>
• الفحوصات: ${stats.totalScans}
• النتائج: ${daily.length}
• التهديدات العالية: ${threats.filter(t => 
          t.threatAnalysis.priority.includes("🔥")).length}

<b>ملخص الأحداث:</b>
${daily.slice(-10).map((e, i) => 
          `${i+1}. ${e.title?.slice(0, 100)} (${e.threat})`).join('\n')}

<b>التوصيات:</b>
${threats.length > 0 ? '⚠️ يرجى متابعة التهديدات العالية' : '✅ الوضع تحت السيطرة'}
        `.trim();
        
        await TelegramBot.sendMessage(report);
        
        // إعادة ضبط السجل اليومي
        daily = [];
        saveData();
      }
    }, 24 * 60 * 60 * 1000); // كل 24 ساعة
    
    console.log('✅ النظام يعمل بكامل طاقته');
    
  } catch (error) {
    console.error('❌ خطأ في بدء التشغيل:', error);
    process.exit(1);
  }
}

// معالجة الأخطاء غير الملتقطة
process.on('uncaughtException', (error) => {
  console.error('❌ خطأ غير متوقع:', error);
  TelegramBot.sendMessage(`❌ خطأ في النظام: ${error.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ وعد مرفوض:', reason);
});

// بدء النظام
main();
