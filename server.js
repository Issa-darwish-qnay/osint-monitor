/* ================== CONFIGURATION ================== */
const config = {
  botToken: "7884775926:AAF9x36fBXeuB2iCUn0AHqoBUZuPXGO61C0",
  chatId: "6837315281",
  scanInterval: 5 * 60 * 1000, // 5 دقائق
  port: process.env.PORT || 10000,
  dataPath: "./data/",
  
  // مصدور RSS جديدة ومتنوعة
  sources: [
    {
      name: "Google News Yemen",
      url: "https://news.google.com/rss/search?q=الدريهمي+OR+Durayhimi+OR+الحديدة&hl=ar&gl=YE&ceid=YE:ar",
      priority: 1,
      type: "news"
    },
    {
      name: "GDELT Yemen Conflict",
      url: "https://api.gdeltproject.org/api/v2/doc/doc?query=الدريهمي&mode=artlist&format=rss&timespan=1h",
      priority: 1,
      type: "intelligence"
    },
    {
      name: "Reuters Yemen",
      url: "https://www.reutersagency.com/feed/?best-topics=yemen&post_type=best",
      priority: 2,
      type: "news"
    },
    {
      name: "Al-Masirah Arabic",
      url: "https://www.almasirah.net/feed/",
      priority: 1,
      type: "local"
    },
    {
      name: "Yemen Press Network",
      url: "https://yemen-press.com/feed/",
      priority: 2,
      type: "local"
    },
    {
      name: "Twitter Yemen Trends",
      url: "https://rss.app/feeds/_u4iC9tkqVNP8FtzB.xml",
      priority: 3,
      type: "social"
    },
    {
      name: "BBC Arabic Yemen",
      url: "https://feeds.bbci.co.uk/arabic/middleeast/rss.xml",
      priority: 2,
      type: "news"
    },
    {
      name: "Al Jazeera Yemen",
      url: "https://www.aljazeera.net/xml/rss/all.xml",
      priority: 2,
      type: "news"
    }
  ],
  
  // كلمات مفتاحية موسعة ومنظمة
  keywords: {
    // المواقع الجغرافية
    locations: [
      "الدريهمي", "Durayhimi", "Al Durayhimi", "مديرية الدريهمي",
      "بني مرسي", "الحجبة السفلى", "الحجبة العليا", "الزرانيق",
      "المساعيد", "الزعفران", "الشجن", "الكرد", "الكنباحية",
      "اللاوية", "المحال", "المكيمنية", "المنقم الأعلى",
      "المنقم الأسفل", "دير حسن", "رغمين", "غليفقة", "الهايط",
      "بيت حسن جماعي", "خبت قوبع", "الحديدة", "Hodeidah",
      "الحديدة", "غرب اليمن", "الساحل الغربي"
    ],
    
    // الشخصيات والكيانات
    entities: [
      "مدير مديرية الدريهمي", "مدير أمن الدريهمي", "المكاتب التنفيذية",
      "السلطة المحلية", "الحوثيين", "المجلس الانتقالي", "التحالف العربي",
      "الجيش اليمني", "لجنة السلامة", "اللجان الشعبية", "أنصار الله",
      "القوات المشتركة", "التحالف بقيادة السعودية", "الأمم المتحدة",
      "الصليب الأحمر", "أطباء بلا حدود"
    ],
    
    // الأحداث العسكرية والأمنية
    militaryEvents: [
      "قصف", "غارة", "استهداف", "هجوم", "اشتباكات", "انفجار",
      "معركة", "عمليات عسكرية", "إطلاق نار", "قنص", "كمين",
      "انتهاكات", "خرق الهدنة", "تصعيد", "تراشق صاروخي"
    ],
    
    // الأحداث الإنسانية
    humanitarianEvents: [
      "ضحايا", "إصابة", "جرحى", "شهداء", "نزوح", "لاجئين",
      "مساعدات إنسانية", "إغاثة", "مجاعة", "جوع", "أزمة غذائية",
      "مشردين", "نازحين", "كارثة إنسانية", "أطفال", "نساء"
    ],
    
    // الأحداث السياسية
    politicalEvents: [
      "بيان", "تصريح", "مؤتمر صحفي", "اجتماع", "مفاوضات",
      "هدنة", "اتفاقية", "مباحثات سلام", "وساطة", "قرار أممي",
      "عقوبات", "حوار وطني", "انتخابات", "استفتاء"
    ],
    
    // المؤسسات والمنظمات
    organizations: [
      "الأمم المتحدة", "اليونيسف", "برنامج الغذاء العالمي",
      "منظمة الصحة العالمية", "اللجنة الدولية للصليب الأحمر",
      "أطباء بلا حدود", "منظمة الهجرة الدولية", "المفوضية السامية"
    ],
    
    // المصطلحات الاقتصادية
    economicTerms: [
      "حصار", "إغلاق", "منفذ", "ميناء", "استيراد", "تصدير",
      "وقود", "غاز", "أغذية", "أدوية", "نقص", "شح", "غلاء",
      "تضخم", "اقتصاد", "مساعدات", "تمويل", "دعم"
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
import { XMLParser } from "fast-xml-parser";

/* ================== INITIALIZATION ================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// إنشاء مجلدات البيانات
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};
ensureDir(config.dataPath);

/* ================== STORAGE ================== */
const sentFile = path.join(config.dataPath, "sent.json");
const dailyFile = path.join(config.dataPath, "daily.json");
const statsFile = path.join(config.dataPath, "stats.json");
const threatsFile = path.join(config.dataPath, "threats.json");
const timelineFile = path.join(config.dataPath, "timeline.json");
const patternsFile = path.join(config.dataPath, "patterns.json");
const locationsFile = path.join(config.dataPath, "locations.json");

// تهيئة الملفات
const initFile = (file, defaultValue) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(defaultValue, null, 2));
    return defaultValue;
  }
  return JSON.parse(fs.readFileSync(file));
};

const sent = new Set(initFile(sentFile, []));
let daily = initFile(dailyFile, []);
let stats = initFile(statsFile, {
  totalScans: 0,
  totalMatches: 0,
  highThreats: 0,
  mediumThreats: 0,
  lastScan: null,
  sourcesStats: {},
  threatPatterns: {},
  locationsActivity: {}
});
let threats = initFile(threatsFile, []);
let timeline = initFile(timelineFile, []);
let patterns = initFile(patternsFile, {});
let locationsActivity = initFile(locationsFile, {});

/* ================== RSS PARSER ================== */
const parser = new Parser({
  timeout: 30000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml',
    'Accept-Language': 'ar,en-US;q=0.9,en;q=0.8'
  },
  customFields: {
    item: [
      'media:content',
      'media:thumbnail',
      'enclosure',
      'source',
      'author',
      'dc:creator',
      'category',
      'guid'
    ]
  },
  maxRedirects: 3
});

/* ================== UTILITY FUNCTIONS ================== */
function safeURL(url) {
  try {
    return encodeURI(decodeURI(url));
  } catch {
    return url;
  }
}

function normalize(text) {
  if (!text) return '';
  return text.toString().toLowerCase()
    .replace(/[^\w\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
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
  fs.writeFileSync(patternsFile, JSON.stringify(patterns, null, 2));
  fs.writeFileSync(locationsFile, JSON.stringify(locationsActivity, null, 2));
}

/* ================== ADVANCED THREAT ANALYSIS ================== */
class AdvancedThreatAnalyzer {
  static analyze(text, sourceType = "unknown") {
    const normText = normalize(text);
    const analysis = {
      score: 0,
      threats: [],
      type: "🗨️ ذكر عام",
      priority: "ℹ️ منخفض",
      categories: [],
      confidence: 0,
      urgency: "عادي",
      recommendations: []
    };
    
    // تحليل التهديدات العسكرية
    config.keywords.militaryEvents.forEach(word => {
      const regex = new RegExp(`\\b${normalize(word)}\\b`, 'g');
      const matches = normText.match(regex);
      if (matches) {
        analysis.score += matches.length * 3;
        analysis.threats.push(...matches.map(m => config.keywords.militaryEvents.find(w => normalize(w) === m)));
        analysis.categories.push("عسكري");
        analysis.urgency = "فوري";
      }
    });
    
    // تحليل الأحداث الإنسانية
    config.keywords.humanitarianEvents.forEach(word => {
      if (normText.includes(normalize(word))) {
        analysis.score += 2;
        analysis.threats.push(word);
        analysis.categories.push("إنساني");
        if (analysis.urgency === "عادي") analysis.urgency = "متوسط";
      }
    });
    
    // تحليل المواقع الجغرافية
    let locationMatches = [];
    config.keywords.locations.forEach(location => {
      if (normText.includes(normalize(location))) {
        analysis.score += 1;
        locationMatches.push(location);
        
        // تحديث نشاط الموقع
        if (!locationsActivity[location]) {
          locationsActivity[location] = { count: 0, lastSeen: null, events: [] };
        }
        locationsActivity[location].count++;
        locationsActivity[location].lastSeen = new Date().toISOString();
        locationsActivity[location].events.push({
          timestamp: new Date().toISOString(),
          text: text.substring(0, 100),
          score: analysis.score
        });
      }
    });
    
    // تحديد مستوى التهديد
    if (analysis.score >= 8) {
      analysis.priority = "🔥🔥 عالي جداً (حرج)";
      analysis.type = "🚨 حالة طوارئ أمنية";
      analysis.confidence = 90;
      analysis.recommendations = [
        "التأهب الفوري",
        "إبلاغ السلطات",
        "نشر تحذيرات أمنية"
      ];
    } else if (analysis.score >= 5) {
      analysis.priority = "🔥 مرتفع";
      analysis.type = "⚠️ تهديد أمني خطير";
      analysis.confidence = 75;
      analysis.recommendations = [
        "متابعة دقيقة",
        "تقييم الوضع",
        "استعداد للطوارئ"
      ];
    } else if (analysis.score >= 3) {
      analysis.priority = "⚠️ متوسط";
      analysis.type = "📢 تطور مهم";
      analysis.confidence = 60;
      analysis.recommendations = [
        "متابعة",
        "توثيق الحدث",
        "تقييم التأثير"
      ];
    } else if (analysis.score >= 1) {
      analysis.priority = "ℹ️ منخفض";
      analysis.type = "🗨️ ذكر عادي";
      analysis.confidence = 40;
    }
    
    // تحليل الأنماط
    this.analyzePatterns(text, analysis, sourceType);
    
    // تحليل السياق الزمني
    analysis.temporalContext = this.analyzeTemporalContext(normText);
    
    return analysis;
  }
  
  static analyzePatterns(text, analysis, sourceType) {
    const patternsToCheck = [
      { pattern: /(عاجل|طارئ|فوري)/, weight: 2 },
      { pattern: /(تحذير|إنذار|خطر)/, weight: 3 },
      { pattern: /(مستمر|متواصل|متكرر)/, weight: 1.5 },
      { pattern: /(مؤكد|مثبت|موثق)/, weight: 1.2 },
      { pattern: /(شائعات|غير مؤكد|محتمل)/, weight: 0.5 }
    ];
    
    patternsToCheck.forEach(p => {
      if (p.pattern.test(text)) {
        analysis.score *= p.weight;
        analysis.confidence = Math.min(100, analysis.confidence * 1.1);
      }
    });
    
    // تحديث أنماط التهديد
    const patternKey = `${sourceType}_${analysis.categories.join('_')}`;
    if (!patterns[patternKey]) {
      patterns[patternKey] = { count: 0, firstSeen: null, lastSeen: null };
    }
    patterns[patternKey].count++;
    patterns[patternKey].lastSeen = new Date().toISOString();
    if (!patterns[patternKey].firstSeen) {
      patterns[patternKey].firstSeen = new Date().toISOString();
    }
  }
  
  static analyzeTemporalContext(text) {
    const temporalIndicators = {
      immediate: /(الآن|حالياً|في هذه اللحظة|منذ قليل)/,
      recent: /(اليوم|أمس|خلال الساعات الماضية)/,
      future: /(غداً|قريباً|الأيام القادمة|المستقبل)/,
      ongoing: /(مستمر|متواصل|لا يزال)/,
      past: /(سابقاً|في الماضي|منذ فترة)/
    };
    
    const context = { type: "غير محدد", confidence: 0 };
    
    for (const [type, pattern] of Object.entries(temporalIndicators)) {
      if (pattern.test(text)) {
        context.type = type;
        context.confidence = 70;
        break;
      }
    }
    
    return context;
  }
  
  static extractEntities(text) {
    const entities = {
      locations: [],
      organizations: [],
      persons: [],
      events: [],
      dates: [],
      numbers: []
    };
    
    // استخراج المواقع
    config.keywords.locations.forEach(loc => {
      if (normalize(text).includes(normalize(loc))) {
        entities.locations.push(loc);
      }
    });
    
    // استخراج المنظمات
    config.keywords.entities.concat(config.keywords.organizations).forEach(org => {
      if (normalize(text).includes(normalize(org))) {
        entities.organizations.push(org);
      }
    });
    
    // استخراج التواريخ
    const datePatterns = [
      /\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g,
      /\b(\d{4})\/(\d{1,2})\/(\d{1,2})\b/g,
      /\b(اليوم|أمس|غداً|بعد غد)\b/g
    ];
    
    datePatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) entities.dates.push(...matches);
    });
    
    // استخراج الأرقام (ضحايا، إصابات، إلخ)
    const numberPattern = /\b(\d+)\s*(قتيل|جريح|مصاب|ضحية|أسير|معتقل)\b/g;
    const numberMatches = text.match(numberPattern);
    if (numberMatches) entities.numbers.push(...numberMatches);
    
    return entities;
  }
}

/* ================== MEDIA PROCESSOR ================== */
class EnhancedMediaProcessor {
  static extract(item) {
    const media = {
      images: [],
      videos: [],
      documents: [],
      audio: [],
      links: []
    };
    
    // استخراج الروابط من المحتوى
    const linkRegex = /https?:\/\/[^\s<>"]+|www\.[^\s<>"]+/g;
    const textContent = `${item.content || ''} ${item.contentSnippet || ''}`;
    const links = textContent.match(linkRegex) || [];
    media.links = [...new Set(links)];
    
    // استخراج من enclosure
    if (item.enclosure?.url) {
      this.classifyAndAdd(item.enclosure.url, media);
    }
    
    // استخراج من media:content
    if (item['media:content']) {
      const mediaContent = item['media:content'];
      if (Array.isArray(mediaContent)) {
        mediaContent.forEach(mc => {
          if (mc.url) this.classifyAndAdd(mc.url, media);
        });
      } else if (mediaContent.url) {
        this.classifyAndAdd(mediaContent.url, media);
      }
    }
    
    // استخراج من media:thumbnail
    if (item['media:thumbnail']?.url) {
      media.images.push(item['media:thumbnail'].url);
    }
    
    return media;
  }
  
  static classifyAndAdd(url, media) {
    if (this.isImage(url)) media.images.push(url);
    else if (this.isVideo(url)) media.videos.push(url);
    else if (this.isAudio(url)) media.audio.push(url);
    else if (this.isDocument(url)) media.documents.push(url);
  }
  
  static isImage(url) {
    return /\.(jpg|jpeg|png|gif|webp|bmp|svg|tiff)$/i.test(url) || 
           /(img|image|photo|picture|thumbnail|صورة|صور)/i.test(url);
  }
  
  static isVideo(url) {
    return /\.(mp4|avi|mov|wmv|flv|mkv|webm|m4v|mpg|mpeg)$/i.test(url) || 
           /(video|youtube|vimeo|dailymotion|فيلم|فيديو)/i.test(url);
  }
  
  static isAudio(url) {
    return /\.(mp3|wav|aac|ogg|flac|m4a)$/i.test(url) ||
           /(audio|sound|صوت|محاضرة|تسجيل)/i.test(url);
  }
  
  static isDocument(url) {
    return /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|rtf|csv|odt)$/i.test(url) ||
           /(document|file|ملف|وثيقة|تقرير)/i.test(url);
  }
}

/* ================== INTELLIGENCE BOT ================== */
class IntelligenceBot {
  static async sendMessage(text, options = {}) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: config.chatId,
          text: text.slice(0, 4096),
          parse_mode: 'HTML',
          disable_web_page_preview: options.preview || false,
          disable_notification: options.silent || false
        })
      });
      
      const data = await response.json();
      if (!data.ok) {
        console.error('Telegram API error:', data);
      }
      return data;
    } catch (error) {
      console.error('Telegram sendMessage error:', error.message);
      return null;
    }
  }
  
  static async sendPhoto(photoUrl, caption = "", options = {}) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${config.botToken}/sendPhoto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: config.chatId,
          photo: photoUrl,
          caption: caption.slice(0, 1024),
          parse_mode: 'HTML',
          disable_notification: options.silent || false
        })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Telegram sendPhoto error:', error.message);
      return null;
    }
  }
  
  static async sendDocument(documentUrl, caption = "", options = {}) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${config.botToken}/sendDocument`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: config.chatId,
          document: documentUrl,
          caption: caption.slice(0, 1024),
          parse_mode: 'HTML',
          disable_notification: options.silent || false
        })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Telegram sendDocument error:', error.message);
      return null;
    }
  }
  
  static async sendAlert(item, analysis) {
    const alertLevel = analysis.score >= 8 ? "🚨🚨" : analysis.score >= 5 ? "🚨" : "⚠️";
    
    const message = `
${alertLevel} <b>${analysis.priority}</b>

<b>📌 التصنيف:</b> ${analysis.type}
<b>📊 درجة الخطورة:</b> ${analysis.score}/20
<b>🎯 الثقة:</b> ${analysis.confidence}%

<b>📍 المواقع:</b>
${analysis.entities?.locations?.slice(0, 3).join(' • ') || 'غير محدد'}

<b>⚠️ التهديدات المكتشفة:</b>
${analysis.threats.slice(0, 5).join(' • ') || 'لا يوجد'}

<b>🏛️ الجهات المعنية:</b>
${analysis.entities?.organizations?.slice(0, 3).join(' • ') || 'غير محدد'}

<b>📰 العنوان:</b>
${item.title?.slice(0, 150) || 'بدون عنوان'}

<b>🕐 السياق الزمني:</b> ${analysis.temporalContext?.type || 'غير محدد'}

<b>🔗 المصدر:</b> ${item.source}
<b>📎 الرابط:</b> ${item.link || 'غير متوفر'}

<b>💡 التوصيات:</b>
${analysis.recommendations?.slice(0, 3).join('\n') || 'المتابعة العادية'}
    `.trim();
    
    const notification = analysis.score >= 5 ? false : true;
    await this.sendMessage(message, { preview: false, silent: notification });
    
    // إرسال الوسائط المرفقة
    if (item.media?.images?.length > 0) {
      for (const img of item.media.images.slice(0, 2)) {
        await this.sendPhoto(img, `📸 ${item.title?.slice(0, 100) || ''}`, { silent: true });
      }
    }
    
    if (item.media?.documents?.length > 0) {
      for (const doc of item.media.documents.slice(0, 2)) {
        await this.sendDocument(doc, `📄 ${item.title?.slice(0, 100) || ''}`, { silent: true });
      }
    }
  }
  
  static async sendIntelligenceReport(reportData) {
    const report = `
🕵️ <b>تقرير استخباراتي موجز</b>

<b>📅 الفترة:</b> ${reportData.period}
<b>🔍 إجمالي الفحوصات:</b> ${reportData.totalScans}

<b>📊 إحصائيات التهديدات:</b>
• 🔥 حرجة: ${reportData.critical || 0}
• 🚨 عالية: ${reportData.high || 0}
• ⚠️ متوسطة: ${reportData.medium || 0}
• ℹ️ منخفضة: ${reportData.low || 0}

<b>📍 النقاط الساخنة:</b>
${reportData.hotspots?.slice(0, 5).map((h, i) => `${i+1}. ${h.location} (${h.count} حدث)`).join('\n') || 'لا توجد'}

<b>📈 الأنماط الملاحظة:</b>
${reportData.patterns?.slice(0, 3).join('\n') || 'لا توجد'}

<b>⚠️ الإنذارات الحالية:</b>
${reportData.activeAlerts > 0 ? `🔴 ${reportData.activeAlerts} إنذار نشط` : '✅ لا توجد إنذارات نشطة'}

<b>👁️ التوصيات:</b>
${reportData.recommendations?.join('\n• ') || 'الوضع تحت السيطرة'}
    `.trim();
    
    await this.sendMessage(report);
  }
}

/* ================== ADVANCED OSINT SCANNER ================== */
class AdvancedOSINTScanner {
  static async scanSource(source) {
    try {
      console.log(`🔍 جاري فحص: ${source.name} (${source.type})`);
      
      const feed = await parser.parseURL(safeURL(source.url));
      const results = [];
      
      for (const item of feed.items || []) {
        const content = `${item.title || ''} ${item.contentSnippet || ''} ${item.content || ''}`;
        
        // التحقق من الكلمات المفتاحية بكفاءة
        const hasKeyword = this.checkKeywords(content);
        if (!hasKeyword) continue;
        
        const itemHash = generateHash(`${item.link || ''}${item.pubDate || ''}${content.substring(0, 200)}`);
        
        if (sent.has(itemHash)) continue;
        sent.add(itemHash);
        
        // التحليل المتقدم
        const threatAnalysis = AdvancedThreatAnalyzer.analyze(content, source.type);
        const entities = AdvancedThreatAnalyzer.extractEntities(content);
        const media = EnhancedMediaProcessor.extract(item);
        
        const record = {
          id: itemHash,
          timestamp: new Date().toISOString(),
          source: source.name,
          sourceType: source.type,
          title: item.title?.trim(),
          description: item.contentSnippet?.trim() || item.content?.substring(0, 300).trim(),
          link: item.link,
          pubDate: item.pubDate || new Date().toISOString(),
          threatAnalysis,
          entities,
          media,
          metadata: {
            author: item.author || item['dc:creator'],
            categories: item.categories || item.category,
            guid: item.guid,
            language: this.detectLanguage(content)
          }
        };
        
        results.push(record);
        await this.processRecord(record, source);
      }
      
      console.log(`✅ ${source.name}: ${results.length} نتيجة`);
      return results;
      
    } catch (error) {
      console.error(`❌ خطأ في ${source.name}:`, error.message);
      return [];
    }
  }
  
  static checkKeywords(text) {
    const normText = normalize(text);
    
    // بحث متقدم مع تحسين الأداء
    for (const category of Object.values(config.keywords)) {
      if (Array.isArray(category)) {
        for (const keyword of category) {
          if (normText.includes(normalize(keyword))) {
            return true;
          }
        }
      }
    }
    return false;
  }
  
  static async processRecord(record, source) {
    // تحديث الإحصائيات
    stats.totalMatches++;
    stats.sourcesStats[source.name] = (stats.sourcesStats[source.name] || 0) + 1;
    
    // تحديث السجل اليومي
    daily.push({
      id: record.id,
      time: new Date().toISOString(),
      source: record.source,
      sourceType: record.sourceType,
      title: record.title?.substring(0, 150),
      link: record.link,
      threat: record.threatAnalysis.priority,
      type: record.threatAnalysis.type,
      score: record.threatAnalysis.score,
      locations: record.entities.locations
    });
    
    // تحديث الخط الزمني
    timeline.push({
      id: record.id,
      timestamp: new Date().toISOString(),
      event: record.title?.substring(0, 100),
      source: record.source,
      sourceType: record.sourceType,
      threatLevel: record.threatAnalysis.score,
      threatPriority: record.threatAnalysis.priority,
      locations: record.entities.locations,
      categories: record.threatAnalysis.categories,
      link: record.link
    });
    
    // الحفاظ على حجم البيانات
    if (timeline.length > 1000) {
      timeline = timeline.slice(-800);
    }
    if (daily.length > 500) {
      daily = daily.slice(-400);
    }
    
    // تصنيف التهديدات
    if (record.threatAnalysis.score >= 8) {
      stats.criticalThreats = (stats.criticalThreats || 0) + 1;
      threats.push(record);
      await IntelligenceBot.sendAlert(record, record.threatAnalysis);
    } else if (record.threatAnalysis.score >= 5) {
      stats.highThreats++;
      threats.push(record);
      await IntelligenceBot.sendAlert(record, record.threatAnalysis);
    } else if (record.threatAnalysis.score >= 3) {
      stats.mediumThreats++;
    }
    
    // حفظ البيانات
    saveData();
  }
  
  static detectLanguage(text) {
    const arabicChars = text.match(/[\u0600-\u06FF]/g);
    const englishChars = text.match(/[a-zA-Z]/g);
    
    if (arabicChars && englishChars) {
      return arabicChars.length > englishChars.length ? 'ar' : 'en';
    } else if (arabicChars) {
      return 'ar';
    } else if (englishChars) {
      return 'en';
    }
    return 'unknown';
  }
  
  static async fullScan() {
    console.log('🔄 بدء الفحص الاستخباراتي الشامل...');
    
    const startTime = Date.now();
    stats.totalScans++;
    stats.lastScan = new Date().toISOString();
    
    const allResults = [];
    const sortedSources = [...config.sources].sort((a, b) => a.priority - b.priority);
    
    for (const source of sortedSources) {
      const results = await this.scanSource(source);
      allResults.push(...results);
      
      // تأجيل ذكي بين المصادر
      await new Promise(resolve => setTimeout(resolve, source.priority * 500));
    }
    
    const scanDuration = Math.round((Date.now() - startTime) / 1000);
    
    // إنشاء تقرير الفحص
    if (allResults.length > 0) {
      const summary = this.generateIntelligenceSummary(allResults, scanDuration);
      await IntelligenceBot.sendMessage(summary);
    }
    
    console.log(`✅ اكتمل الفحص في ${scanDuration} ثانية. النتائج: ${allResults.length}`);
    return allResults;
  }
  
  static generateIntelligenceSummary(results, duration) {
    const highThreats = results.filter(r => r.threatAnalysis.score >= 5);
    const criticalThreats = results.filter(r => r.threatAnalysis.score >= 8);
    
    // تحليل النقاط الساخنة
    const locationCounts = {};
    results.forEach(r => {
      r.entities.locations.forEach(loc => {
        locationCounts[loc] = (locationCounts[loc] || 0) + 1;
      });
    });
    
    const hotspots = Object.entries(locationCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([loc, count]) => ({ location: loc, count }));
    
    // تحليل الأنماط
    const patternAnalysis = this.analyzeThreatPatterns(results);
    
    return `
📊 <b>تقرير استخباراتي للفحص</b>

<b>⏱️ مدة الفحص:</b> ${duration} ثانية
<b>🔍 إجمالي النتائج:</b> ${results.length}
<b>🚨 تهديدات حرجة:</b> ${criticalThreats.length}
<b>⚠️ تهديدات عالية:</b> ${highThreats.length - criticalThreats.length}

<b>📍 النقاط الساخنة:</b>
${hotspots.map((h, i) => `${i+1}. ${h.location} (${h.count})`).join('\n') || 'لا توجد'}

<b>📈 الأنماط البارزة:</b>
${patternAnalysis.slice(0, 3).join('\n') || 'لا توجد'}

<b>🕐 وقت الفحص:</b> ${new Date().toLocaleString('ar-YE')}

<b>💡 الملاحظات:</b>
${highThreats.length > 0 ? 'يوجد نشاط أمني يستدعي المتابعة' : 'الوضع تحت السيطرة'}
    `.trim();
  }
  
  static analyzeThreatPatterns(results) {
    const patterns = [];
    
    // تحليل تكرار التهديدات
    const threatFrequency = {};
    results.forEach(r => {
      r.threatAnalysis.threats.forEach(t => {
        threatFrequency[t] = (threatFrequency[t] || 0) + 1;
      });
    });
    
    // تحليل أنواع المصادر
    const sourceTypes = {};
    results.forEach(r => {
      sourceTypes[r.sourceType] = (sourceTypes[r.sourceType] || 0) + 1;
    });
    
    // تحديد الأنماط
    Object.entries(threatFrequency)
      .filter(([_, count]) => count >= 3)
      .forEach(([threat, count]) => {
        patterns.push(`تكرار ${threat}: ${count} مرة`);
      });
    
    Object.entries(sourceTypes)
      .filter(([_, count]) => count >= 5)
      .forEach(([type, count]) => {
        patterns.push(`نشاط ${type}: ${count} تقرير`);
      });
    
    return patterns;
  }
}

/* ================== DASHBOARD SERVER ================== */
class AdvancedDashboardServer {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupWebSocket();
  }
  
  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.static('public'));
    
    // CORS للواجهات البرمجية
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
  }
  
  setupWebSocket() {
    // يمكن إضافة WebSocket للتحديثات الحية لاحقاً
  }
  
  setupRoutes() {
    // الصفحة الرئيسية
    this.app.get('/', (req, res) => {
      const recentEvents = daily.slice(-15).reverse();
      const threatStats = {
        critical: threats.filter(t => t.threatAnalysis.score >= 8).length,
        high: threats.filter(t => t.threatAnalysis.score >= 5 && t.threatAnalysis.score < 8).length,
        medium: stats.mediumThreats || 0,
        low: daily.length - (stats.highThreats + stats.mediumThreats)
      };
      
      const hotspots = Object.entries(locationsActivity)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 5);
      
      res.send(this.generateDashboardHTML(recentEvents, threatStats, hotspots));
    });
    
    // واجهات برمجة التطبيقات
    this.app.get('/api/stats', (req, res) => {
      res.json({
        success: true,
        timestamp: new Date().toISOString(),
        system: {
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          sources: config.sources.length,
          keywords: Object.values(config.keywords).flat().length
        },
        statistics: stats,
        threats: {
          total: threats.length,
          critical: threats.filter(t => t.threatAnalysis.score >= 8).length,
          high: threats.filter(t => t.threatAnalysis.score >= 5 && t.threatAnalysis.score < 8).length
        },
        recent: {
          daily: daily.length,
          timeline: timeline.length
        }
      });
    });
    
    this.app.get('/api/events', (req, res) => {
      const limit = Math.min(parseInt(req.query.limit) || 50, 100);
      const page = parseInt(req.query.page) || 1;
      const start = (page - 1) * limit;
      const end = start + limit;
      
      res.json({
        success: true,
        page,
        limit,
        total: daily.length,
        events: daily.slice(-end).slice(-limit).reverse()
      });
    });
    
    this.app.get('/api/timeline', (req, res) => {
      const hours = parseInt(req.query.hours) || 24;
      const cutoff = Date.now() - (hours * 60 * 60 * 1000);
      
      const filteredTimeline = timeline.filter(event => 
        new Date(event.timestamp).getTime() > cutoff
      );
      
      res.json({
        success: true,
        hours,
        count: filteredTimeline.length,
        timeline: filteredTimeline.reverse()
      });
    });
    
    this.app.get('/api/threats', (req, res) => {
      const minScore = parseInt(req.query.minScore) || 5;
      const filteredThreats = threats.filter(t => 
        t.threatAnalysis.score >= minScore
      );
      
      res.json({
        success: true,
        minScore,
        count: filteredThreats.length,
        threats: filteredThreats.slice(-100).reverse()
      });
    });
    
    this.app.get('/api/locations', (req, res) => {
      res.json({
        success: true,
        count: Object.keys(locationsActivity).length,
        locations: Object.entries(locationsActivity)
          .sort((a, b) => b[1].count - a[1].count)
          .map(([location, data]) => ({
            location,
            count: data.count,
            lastSeen: data.lastSeen,
            recentEvents: data.events.slice(-5)
          }))
      });
    });
    
    this.app.get('/api/patterns', (req, res) => {
      res.json({
        success: true,
        patterns: patterns,
        sourcePatterns: this.analyzeSourcePatterns()
      });
    });
    
    this.app.post('/api/scan', async (req, res) => {
      try {
        const manualScan = req.query.manual === 'true';
        
        if (manualScan) {
          await AdvancedOSINTScanner.fullScan();
          res.json({ 
            success: true, 
            message: 'تم الفحص اليدوي بنجاح',
            timestamp: new Date().toISOString()
          });
        } else {
          res.json({ 
            success: true, 
            message: 'سيتم الفحص في الدورة القادمة',
            nextScan: new Date(Date.now() + config.scanInterval).toISOString()
          });
        }
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    });
    
    this.app.get('/api/health', (req, res) => {
      const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        system: {
          uptime: process.uptime(),
          memory: {
            used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
            total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB'
          },
          lastScan: stats.lastScan,
          nextScan: new Date(Date.now() + config.scanInterval).toISOString()
        },
        services: {
          telegram: config.botToken ? 'configured' : 'not_configured',
          sources: config.sources.filter(s => s.url).length,
          data: {
            sent: sent.size,
            daily: daily.length,
            threats: threats.length
          }
        }
      };
      
      res.json(health);
    });
    
    // صفحة المراقبة الحية
    this.app.get('/live', (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>المراقبة الحية - نظام الدريهمي الاستخباراتي</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body { 
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: #0f172a; color: #e2e8f0;
                }
                .header {
                    background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
                    padding: 1rem 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 2px solid #334155;
                }
                .header h1 {
                    font-size: 1.5rem;
                    color: white;
                }
                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .status-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #10b981;
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                .container {
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    height: calc(100vh - 70px);
                }
                .sidebar {
                    background: #1e293b;
                    padding: 1rem;
                    overflow-y: auto;
                    border-right: 1px solid #334155;
                }
                .main-content {
                    padding: 1rem;
                    overflow-y: auto;
                }
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                .stat-card {
                    background: #1e293b;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    border-left: 4px solid #3b82f6;
                }
                .stat-value {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #60a5fa;
                }
                .event-stream {
                    background: #1e293b;
                    border-radius: 0.5rem;
                    padding: 1rem;
                    max-height: 500px;
                    overflow-y: auto;
                }
                .event-item {
                    padding: 0.75rem;
                    margin-bottom: 0.5rem;
                    background: #334155;
                    border-radius: 0.25rem;
                    border-left: 3px solid;
                    transition: all 0.3s;
                }
                .event-item:hover {
                    background: #475569;
                    transform: translateX(5px);
                }
                .event-item.critical { border-left-color: #ef4444; }
                .event-item.high { border-left-color: #f59e0b; }
                .event-item.medium { border-left-color: #3b82f6; }
                .event-item.low { border-left-color: #10b981; }
                .location-tag {
                    display: inline-block;
                    background: #1e40af;
                    color: white;
                    padding: 0.25rem 0.5rem;
                    border-radius: 1rem;
                    font-size: 0.8rem;
                    margin: 0.25rem;
                }
                .time-ago {
                    font-size: 0.8rem;
                    color: #94a3b8;
                }
                .controls {
                    display: flex;
                    gap: 0.5rem;
                    margin: 1rem 0;
                }
                button {
                    padding: 0.5rem 1rem;
                    background: #3b82f6;
                    color: white;
                    border: none;
                    border-radius: 0.25rem;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                button:hover {
                    background: #2563eb;
                }
                .refresh-btn {
                    background: #10b981;
                }
                .refresh-btn:hover {
                    background: #059669;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🚨 لوحة المراقبة الحية - نظام الدريهمي الاستخباراتي</h1>
                <div class="status-indicator">
                    <div class="status-dot"></div>
                    <span>نشط • ${stats.totalScans} فحص</span>
                </div>
            </div>
            
            <div class="container">
                <div class="sidebar">
                    <h3>📍 النقاط الساخنة</h3>
                    <div id="hotspots"></div>
                    
                    <h3 style="margin-top: 2rem;">📊 الإحصائيات السريعة</h3>
                    <div class="stats-grid" style="grid-template-columns: 1fr;">
                        <div class="stat-card">
                            <div class="stat-label">التهديدات الحرجة</div>
                            <div class="stat-value" style="color: #ef4444;">${threatStats?.critical || 0}</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-label">آخر تحديث</div>
                            <div class="stat-value" style="font-size: 1.2rem;">${new Date().toLocaleTimeString('ar-YE')}</div>
                        </div>
                    </div>
                    
                    <div class="controls">
                        <button onclick="manualScan()">🔍 فحص يدوي</button>
                        <button class="refresh-btn" onclick="location.reload()">🔄 تحديث</button>
                    </div>
                </div>
                
                <div class="main-content">
                    <h2>📰 تدفق الأحداث الحية</h2>
                    <div class="event-stream" id="eventStream">
                        ${recentEvents.map(event => `
                            <div class="event-item ${this.getThreatClass(event.score)}">
                                <strong>${event.title}</strong>
                                <div style="margin: 0.5rem 0;">
                                    ${event.locations?.map(loc => `<span class="location-tag">${loc}</span>`).join('') || ''}
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span class="time-ago">${this.timeAgo(event.time)} • ${event.source}</span>
                                    <span style="color: ${this.getThreatColor(event.score)}; font-weight: bold;">
                                        ${event.score}/20
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <script>
                function manualScan() {
                    fetch('/api/scan?manual=true', { method: 'POST' })
                        .then(r => r.json())
                        .then(data => {
                            alert(data.message);
                            location.reload();
                        });
                }
                
                function updateLiveData() {
                    fetch('/api/events?limit=10')
                        .then(r => r.json())
                        .then(data => {
                            // تحديث تدفق الأحداث
                            // (يمكن إضافة تحديث حي هنا)
                        });
                }
                
                // تحديث كل 30 ثانية
                setInterval(updateLiveData, 30000);
                
                // تحديث الوقت المنقضي
                setInterval(() => {
                    document.querySelectorAll('.time-ago').forEach(el => {
                        const timestamp = el.dataset.timestamp;
                        if (timestamp) {
                            el.textContent = timeSince(new Date(timestamp)) + ' • ' + el.dataset.source;
                        }
                    });
                }, 60000);
                
                function timeSince(date) {
                    const seconds = Math.floor((new Date() - date) / 1000);
                    if (seconds < 60) return 'الآن';
                    const minutes = Math.floor(seconds / 60);
                    if (minutes < 60) return \`منذ \${minutes} دقيقة\`;
                    const hours = Math.floor(minutes / 60);
                    if (hours < 24) return \`منذ \${hours} ساعة\`;
                    const days = Math.floor(hours / 24);
                    return \`منذ \${days} يوم\`;
                }
            </script>
        </body>
        </html>
      `);
    });
  }
  
  analyzeSourcePatterns() {
    const sourceStats = {};
    
    config.sources.forEach(source => {
      const sourceEvents = daily.filter(event => event.source === source.name);
      sourceStats[source.name] = {
        count: sourceEvents.length,
        avgScore: sourceEvents.length > 0 ? 
          sourceEvents.reduce((sum, e) => sum + (e.score || 0), 0) / sourceEvents.length : 0,
        lastEvent: sourceEvents.length > 0 ? 
          sourceEvents[sourceEvents.length - 1].time : null
      };
    });
    
    return sourceStats;
  }
  
  getThreatClass(score) {
    if (score >= 8) return 'critical';
    if (score >= 5) return 'high';
    if (score >= 3) return 'medium';
    return 'low';
  }
  
  getThreatColor(score) {
    if (score >= 8) return '#ef4444';
    if (score >= 5) return '#f59e0b';
    if (score >= 3) return '#3b82f6';
    return '#10b981';
  }
  
  timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = now - past;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return 'الآن';
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
  }
  
  generateDashboardHTML(recentEvents, threatStats, hotspots) {
    return `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>نظام المراقبة الاستخباراتي المتقدم - الدريهمي</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
          <style>
              :root {
                  --primary: #1e40af;
                  --secondary: #3b82f6;
                  --danger: #ef4444;
                  --warning: #f59e0b;
                  --success: #10b981;
                  --dark: #0f172a;
                  --light: #f8fafc;
              }
              
              * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
              }
              
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                  color: #e2e8f0;
                  min-height: 100vh;
              }
              
              .container {
                  max-width: 1400px;
                  margin: 0 auto;
                  padding: 20px;
              }
              
              header {
                  background: linear-gradient(135deg, var(--primary) 0%, #1e3a8a 100%);
                  padding: 2rem;
                  border-radius: 1rem;
                  margin-bottom: 2rem;
                  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                  text-align: center;
                  border: 1px solid #334155;
              }
              
              header h1 {
                  font-size: 2.5rem;
                  margin-bottom: 0.5rem;
                  background: linear-gradient(90deg, #60a5fa, #93c5fd);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
              }
              
              header p {
                  color: #cbd5e1;
                  font-size: 1.1rem;
              }
              
              .status-bar {
                  display: flex;
                  justify-content: center;
                  gap: 1rem;
                  margin-top: 1rem;
                  flex-wrap: wrap;
              }
              
              .status-item {
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  background: rgba(255, 255, 255, 0.1);
                  padding: 0.5rem 1rem;
                  border-radius: 2rem;
                  backdrop-filter: blur(10px);
              }
              
              .status-dot {
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
              }
              
              .status-dot.active { background: var(--success); animation: pulse 2s infinite; }
              .status-dot.warning { background: var(--warning); }
              .status-dot.danger { background: var(--danger); }
              
              @keyframes pulse {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.5; }
              }
              
              .main-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                  gap: 1.5rem;
                  margin-bottom: 2rem;
              }
              
              .card {
                  background: #1e293b;
                  border-radius: 1rem;
                  padding: 1.5rem;
                  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                  border: 1px solid #334155;
                  transition: transform 0.3s, box-shadow 0.3s;
              }
              
              .card:hover {
                  transform: translateY(-5px);
                  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
              }
              
              .card-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 1rem;
                  padding-bottom: 0.5rem;
                  border-bottom: 2px solid #334155;
              }
              
              .card-header h3 {
                  font-size: 1.3rem;
                  color: #94a3b8;
              }
              
              .card-header i {
                  font-size: 1.5rem;
                  color: var(--secondary);
              }
              
              .stat-grid {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  gap: 1rem;
              }
              
              .stat-item {
                  text-align: center;
                  padding: 1rem;
                  background: #0f172a;
                  border-radius: 0.5rem;
              }
              
              .stat-value {
                  font-size: 2rem;
                  font-weight: bold;
                  margin-bottom: 0.5rem;
              }
              
              .stat-value.critical { color: var(--danger); }
              .stat-value.high { color: var(--warning); }
              .stat-value.medium { color: var(--secondary); }
              .stat-value.low { color: var(--success); }
              
              .stat-label {
                  font-size: 0.9rem;
                  color: #94a3b8;
              }
              
              .event-list {
                  max-height: 400px;
                  overflow-y: auto;
                  padding-right: 10px;
              }
              
              .event-list::-webkit-scrollbar {
                  width: 8px;
              }
              
              .event-list::-webkit-scrollbar-track {
                  background: #0f172a;
                  border-radius: 4px;
              }
              
              .event-list::-webkit-scrollbar-thumb {
                  background: var(--primary);
                  border-radius: 4px;
              }
              
              .event-item {
                  padding: 1rem;
                  margin-bottom: 0.75rem;
                  background: #0f172a;
                  border-radius: 0.5rem;
                  border-left: 4px solid;
                  transition: all 0.3s;
              }
              
              .event-item:hover {
                  background: #1e293b;
                  transform: translateX(5px);
              }
              
              .event-item.critical { border-left-color: var(--danger); }
              .event-item.high { border-left-color: var(--warning); }
              .event-item.medium { border-left-color: var(--secondary); }
              .event-item.low { border-left-color: var(--success); }
              
              .event-title {
                  font-weight: bold;
                  margin-bottom: 0.5rem;
                  color: #e2e8f0;
              }
              
              .event-meta {
                  display: flex;
                  justify-content: space-between;
                  font-size: 0.9rem;
                  color: #94a3b8;
              }
              
              .event-locations {
                  margin-top: 0.5rem;
              }
              
              .location-tag {
                  display: inline-block;
                  background: var(--primary);
                  color: white;
                  padding: 0.25rem 0.75rem;
                  border-radius: 1rem;
                  font-size: 0.8rem;
                  margin-right: 0.5rem;
                  margin-bottom: 0.5rem;
              }
              
              .controls {
                  display: flex;
                  gap: 1rem;
                  margin-top: 2rem;
                  justify-content: center;
                  flex-wrap: wrap;
              }
              
              .btn {
                  padding: 0.75rem 1.5rem;
                  border: none;
                  border-radius: 0.5rem;
                  font-weight: bold;
                  cursor: pointer;
                  transition: all 0.3s;
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
              }
              
              .btn-primary {
                  background: linear-gradient(135deg, var(--primary), var(--secondary));
                  color: white;
              }
              
              .btn-primary:hover {
                  transform: translateY(-3px);
                  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
              }
              
              .btn-secondary {
                  background: #334155;
                  color: #e2e8f0;
              }
              
              .btn-secondary:hover {
                  background: #475569;
              }
              
              .btn-danger {
                  background: var(--danger);
                  color: white;
              }
              
              .btn-danger:hover {
                  background: #dc2626;
              }
              
              .hotspot-item {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0.75rem;
                  margin-bottom: 0.5rem;
                  background: #0f172a;
                  border-radius: 0.5rem;
              }
              
              .hotspot-name {
                  font-weight: bold;
              }
              
              .hotspot-count {
                  background: var(--primary);
                  color: white;
                  padding: 0.25rem 0.75rem;
                  border-radius: 1rem;
                  font-size: 0.9rem;
              }
              
              .footer {
                  text-align: center;
                  margin-top: 3rem;
                  padding-top: 2rem;
                  border-top: 1px solid #334155;
                  color: #94a3b8;
                  font-size: 0.9rem;
              }
              
              @media (max-width: 768px) {
                  .main-grid {
                      grid-template-columns: 1fr;
                  }
                  
                  header h1 {
                      font-size: 2rem;
                  }
                  
                  .controls {
                      flex-direction: column;
                  }
                  
                  .btn {
                      width: 100%;
                      justify-content: center;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <header>
                  <h1><i class="fas fa-satellite-dish"></i> نظام المراقبة الاستخباراتي المتقدم</h1>
                  <p>مراقبة ذكية وشاملة للأحداث والتهديدات في مديرية الدريهمي</p>
                  
                  <div class="status-bar">
                      <div class="status-item">
                          <div class="status-dot active"></div>
                          <span>نشط • ${stats.totalScans} فحص</span>
                      </div>
                      <div class="status-item">
                          <div class="status-dot ${threatStats.critical > 0 ? 'danger' : 'warning'}"></div>
                          <span>${threatStats.critical > 0 ? 'تهديدات حرجة' : 'مستقر'}</span>
                      </div>
                      <div class="status-item">
                          <i class="fas fa-clock"></i>
                          <span>آخر تحديث: ${new Date().toLocaleString('ar-YE')}</span>
                      </div>
                  </div>
              </header>
              
              <div class="main-grid">
                  <!-- بطاقة الإحصائيات -->
                  <div class="card">
                      <div class="card-header">
                          <h3><i class="fas fa-chart-bar"></i> الإحصائيات الحية</h3>
                          <i class="fas fa-database"></i>
                      </div>
                      <div class="stat-grid">
                          <div class="stat-item">
                              <div class="stat-value critical">${threatStats.critical || 0}</div>
                              <div class="stat-label">تهديدات حرجة</div>
                          </div>
                          <div class="stat-item">
                              <div class="stat-value high">${threatStats.high || 0}</div>
                              <div class="stat-label">تهديدات عالية</div>
                          </div>
                          <div class="stat-item">
                              <div class="stat-value medium">${threatStats.medium || 0}</div>
                              <div class="stat-label">تهديدات متوسطة</div>
                          </div>
                          <div class="stat-item">
                              <div class="stat-value low">${threatStats.low || 0}</div>
                              <div class="stat-label">أحداث عادية</div>
                          </div>
                      </div>
                  </div>
                  
                  <!-- بطاقة النقاط الساخنة -->
                  <div class="card">
                      <div class="card-header">
                          <h3><i class="fas fa-fire"></i> النقاط الساخنة</h3>
                          <i class="fas fa-map-marker-alt"></i>
                      </div>
                      <div class="event-list">
                          ${hotspots.map(([location, data]) => `
                              <div class="hotspot-item">
                                  <div class="hotspot-name">${location}</div>
                                  <div class="hotspot-count">${data.count} حدث</div>
                              </div>
                          `).join('')}
                      </div>
                  </div>
                  
                  <!-- بطاقة الأحداث الأخيرة -->
                  <div class="card">
                      <div class="card-header">
                          <h3><i class="fas fa-history"></i> الأحداث الأخيرة</h3>
                          <i class="fas fa-bell"></i>
                      </div>
                      <div class="event-list">
                          ${recentEvents.map(event => `
                              <div class="event-item ${this.getThreatClass(event.score)}">
                                  <div class="event-title">${event.title || 'بدون عنوان'}</div>
                                  <div class="event-meta">
                                      <span><i class="fas fa-clock"></i> ${this.timeAgo(event.time)}</span>
                                      <span><i class="fas fa-source"></i> ${event.source}</span>
                                  </div>
                                  <div class="event-locations">
                                      ${event.locations?.map(loc => `<span class="location-tag">${loc}</span>`).join('') || ''}
                                  </div>
                              </div>
                          `).join('')}
                      </div>
                  </div>
                  
                  <!-- بطاقة النظام -->
                  <div class="card">
                      <div class="card-header">
                          <h3><i class="fas fa-cogs"></i> حالة النظام</h3>
                          <i class="fas fa-server"></i>
                      </div>
                      <div class="stat-grid">
                          <div class="stat-item">
                              <div class="stat-value">${config.sources.length}</div>
                              <div class="stat-label">مصدر مراقبة</div>
                          </div>
                          <div class="stat-item">
                              <div class="stat-value">${Object.values(config.keywords).flat().length}</div>
                              <div class="stat-label">كلمة مفتاحية</div>
                          </div>
                          <div class="stat-item">
                              <div class="stat-value">${Math.floor(process.uptime() / 3600)}</div>
                              <div class="stat-label">ساعة تشغيل</div>
                          </div>
                          <div class="stat-item">
                              <div class="stat-value">${daily.length}</div>
                              <div class="stat-label">حدث مسجل</div>
                          </div>
                      </div>
                  </div>
              </div>
              
              <!-- لوحة التحكم -->
              <div class="controls">
                  <button class="btn btn-primary" onclick="window.location.href='/live'">
                      <i class="fas fa-tv"></i> المراقبة الحية
                  </button>
                  <button class="btn btn-secondary" onclick="manualScan()">
                      <i class="fas fa-search"></i> فحص يدوي
                  </button>
                  <button class="btn btn-secondary" onclick="window.open('/api/stats', '_blank')">
                      <i class="fas fa-chart-pie"></i> إحصائيات مفصلة
                  </button>
                  <button class="btn btn-secondary" onclick="window.open('/api/patterns', '_blank')">
                      <i class="fas fa-project-diagram"></i> تحليل الأنماط
                  </button>
              </div>
              
              <div class="footer">
                  <p>نظام المراقبة الاستخباراتي المتقدم • مديرية الدريهمي • ${new Date().getFullYear()}</p>
                  <p>آخر تحديث للبيانات: ${stats.lastScan ? new Date(stats.lastScan).toLocaleString('ar-YE') : 'غير متوفر'}</p>
              </div>
          </div>
          
          <script>
              function manualScan() {
                  fetch('/api/scan?manual=true', { method: 'POST' })
                      .then(response => response.json())
                      .then(data => {
                          if (data.success) {
                              alert('✅ ' + data.message);
                              setTimeout(() => location.reload(), 2000);
                          } else {
                              alert('❌ ' + data.error);
                          }
                      })
                      .catch(error => {
                          alert('❌ خطأ في الاتصال: ' + error.message);
                      });
              }
              
              // تحديث الصفحة كل 5 دقائق
              setTimeout(() => location.reload(), 5 * 60 * 1000);
          </script>
      </body>
      </html>
    `;
  }
  
  start() {
    this.server = this.app.listen(config.port, () => {
      console.log(`🌐 لوحة التحكم المتقدمة تعمل على: http://localhost:${config.port}`);
      console.log(`📱 صفحة المراقبة الحية: http://localhost:${config.port}/live`);
      console.log(`🔧 واجهة برمجة التطبيقات: http://localhost:${config.port}/api/stats`);
    });
  }
}

/* ================== MAIN EXECUTION ================== */
async function main() {
  try {
    console.log('🚀 بدء تشغيل النظام الاستخباراتي المتقدم...');
    console.log('📌 المنطقة المستهدفة: مديرية الدريهمي');
    console.log(`🔧 عدد المصادر: ${config.sources.length}`);
    console.log(`🔑 عدد الكلمات المفتاحية: ${Object.values(config.keywords).flat().length}`);
    
    // إرسال رسالة بدء التشغيل
    await IntelligenceBot.sendMessage(`
🚀 <b>بدء تشغيل النظام الاستخباراتي المتقدم</b>

<b>🏛️ النظام:</b> Advanced OSINT Intelligence Monitor
<b>📍 المنطقة:</b> مديرية الدريهمي - محافظة الحديدة
<b>🔧 المصادر:</b> ${config.sources.length} مصدر متنوع
<b>🔑 الكلمات المفتاحية:</b> ${Object.values(config.keywords).flat().length} كلمة
<b>⏱️ الفحص كل:</b> ${config.scanInterval / 60000} دقيقة
<b>🕐 وقت البدء:</b> ${new Date().toLocaleString('ar-YE')}

<b>📊 الإحصائيات السابقة:</b>
• الفحوصات: ${stats.totalScans}
• النتائج: ${stats.totalMatches}
• التهديدات العالية: ${stats.highThreats}

🔍 <b>جاري بدء المراقبة الذكية...</b>
    `.trim());
    
    // بدء خادم لوحة التحكم المتقدمة
    const dashboard = new AdvancedDashboardServer();
    dashboard.start();
    
    // الفحص الأولي
    console.log('🔍 بدء الفحص الاستخباراتي الأولي...');
    await AdvancedOSINTScanner.fullScan();
    
    // جدولة الفحوصات الدورية
    const scanScheduler = setInterval(async () => {
      console.log('🔄 بدء الفحص الدوري المجدول...');
      await AdvancedOSINTScanner.fullScan();
    }, config.scanInterval);
    
    // جدولة التقرير الاستخباراتي اليومي
    const dailyReportScheduler = setInterval(async () => {
      if (daily.length > 0) {
        const reportData = {
          period: new Date().toLocaleDateString('ar-YE'),
          totalScans: stats.totalScans,
          critical: threats.filter(t => t.threatAnalysis.score >= 8).length,
          high: threats.filter(t => t.threatAnalysis.score >= 5 && t.threatAnalysis.score < 8).length,
          medium: stats.mediumThreats || 0,
          low: daily.length - (stats.highThreats + stats.mediumThreats),
          hotspots: Object.entries(locationsActivity)
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 5)
            .map(([loc, data]) => ({ location: loc, count: data.count })),
          patterns: Object.entries(patterns)
            .filter(([_, data]) => data.count >= 3)
            .map(([pattern, data]) => `${pattern}: ${data.count} مرة`),
          activeAlerts: threats.filter(t => 
            new Date(t.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000
          ).length,
          recommendations: threats.length > 10 ? [
            "زيادة المتابعة للمناطق الساخنة",
            "تقييم الوضع الأمني المتكرر",
            "تحديث قوائم المراقبة"
          ] : ["الوضع تحت السيطرة", "متابعة روتينية"]
        };
        
        await IntelligenceBot.sendIntelligenceReport(reportData);
        
        // أرشفة البيانات اليومية
        const archiveDate = new Date().toISOString().split('T')[0];
        const archiveFile = path.join(config.dataPath, `archive_${archiveDate}.json`);
        fs.writeFileSync(archiveFile, JSON.stringify({
          date: archiveDate,
          stats: stats,
          daily: daily,
          threats: threats.filter(t => t.threatAnalysis.score >= 5),
          timeline: timeline
        }, null, 2));
        
        // إعادة ضبط السجل اليومي مع الاحتفاظ بالأحداث المهمة
        daily = daily.filter(event => event.score >= 5);
        saveData();
        
        console.log(`📅 تم إرسال التقرير اليومي وأرشفة البيانات`);
      }
    }, 24 * 60 * 60 * 1000); // كل 24 ساعة
    
    // جدولة صيانة النظام الأسبوعية
    const maintenanceScheduler = setInterval(() => {
      console.log('🔧 بدء صيانة النظام الأسبوعية...');
      
      // تنظيف البيانات القديمة
      const twoWeeksAgo = Date.now() - (14 * 24 * 60 * 60 * 1000);
      timeline = timeline.filter(event => 
        new Date(event.timestamp).getTime() > twoWeeksAgo
      );
      
      // تنظيف سجل التهديدات
      threats = threats.filter(threat => 
        new Date(threat.timestamp).getTime() > twoWeeksAgo || 
        threat.threatAnalysis.score >= 8
      );
      
      // تنظيف أنشطة المواقع
      Object.keys(locationsActivity).forEach(location => {
        if (locationsActivity[location].count < 3 && 
            (!locationsActivity[location].lastSeen || 
             new Date(locationsActivity[location].lastSeen).getTime() < twoWeeksAgo)) {
          delete locationsActivity[location];
        }
      });
      
      saveData();
      console.log('✅ اكتملت صيانة النظام الأسبوعية');
    }, 7 * 24 * 60 * 60 * 1000); // كل أسبوع
    
    console.log('✅ النظام يعمل بكامل طاقته وجاهز للمراقبة');
    
    // إدارة عملية الإغلاق
    process.on('SIGTERM', async () => {
      console.log('🛑 استقبال إشارة الإغلاق...');
      clearInterval(scanScheduler);
      clearInterval(dailyReportScheduler);
      clearInterval(maintenanceScheduler);
      
      await IntelligenceBot.sendMessage(
        '🛑 <b>إيقاف النظام الاستخباراتي</b>\n\n' +
        'جاري حفظ البيانات وإغلاق الخدمات...'
      );
      
      saveData();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ خطأ فادح في بدء التشغيل:', error);
    
    await IntelligenceBot.sendMessage(
      '❌ <b>فشل بدء تشغيل النظام</b>\n\n' +
      `الخطأ: ${error.message}\n` +
      'يرجى مراجعة السجلات وإعادة التشغيل.'
    );
    
    process.exit(1);
  }
}

// معالجة الأخطاء غير الملتقطة
process.on('uncaughtException', async (error) => {
  console.error('❌ خطأ غير متوقع:', error);
  
  try {
    await IntelligenceBot.sendMessage(
      '⚠️ <b>خطأ غير متوقع في النظام</b>\n\n' +
      `الخطأ: ${error.message}\n` +
      'النظام يحاول الاستمرار في العمل...'
    );
  } catch (telegramError) {
    console.error('❌ فشل في إرسال تنبيه الخطأ:', telegramError);
  }
  
  // محاولة حفظ البيانات قبل أي شيء
  saveData();
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ وعد مرفوض:', reason);
});

// بدء النظام
main();
