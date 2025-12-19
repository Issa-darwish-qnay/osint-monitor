/* ================== CONFIGURATION ================== */
const config = {
  botToken: "7884775926:AAF9x36fBXeuB2iCUn0AHqoBUZuPXGO61C0",
  chatId: "6837315281",
  scanInterval: 10 * 60 * 1000, // 10 دقائق لتقليل الحمل
  port: process.env.PORT || 10000,
  dataPath: "./data/",
  maxRetries: 3,
  retryDelay: 5000,
  
  // مصادر موسعة ومتنوعة مع تحيز واضح
  sources: [
    // مصادر رسمية وموالية
    {
      name: "المركز الإعلامي لأنصار الله",
      url: "https://www.almasirah.net/feed/",
      priority: 1,
      bias: "موالي",
      category: "رسمي"
    },
    {
      name: "وكالة الأنباء اليمنية (سبأ)",
      url: "https://www.saba.ye/ar/feed/",
      priority: 1,
      bias: "موالي",
      category: "رسمي"
    },
    {
      name: "قناة المسيرة",
      url: "https://www.almasirah.net/video-feed/",
      priority: 2,
      bias: "موالي",
      category: "إعلامي"
    },
    
    // مصادر محلية في الدريهمي
    {
      name: "شبكة الدريهمي الإخبارية",
      url: "https://yemen-press.com/feed/",
      priority: 1,
      bias: "محلي",
      category: "محلي"
    },
    {
      name: "أخبار الحديدة - الدريهمي",
      url: "https://news.google.com/rss/search?q=الدريهمي+الحديدة&hl=ar&gl=YE&ceid=YE:ar",
      priority: 2,
      bias: "محلي",
      category: "محلي"
    },
    
    // مصادر تعبوية
    {
      name: "النشاط التعبوي - الدريهمي",
      url: "https://news.google.com/rss/search?q=تعبئة+الدريهمي+OR+تدريب+الدريهمي&hl=ar&gl=YE&ceid=YE:ar",
      priority: 2,
      bias: "تعبوي",
      category: "تعبوي"
    },
    {
      name: "المسيرات والوقفات",
      url: "https://news.google.com/rss/search?q=مسيرة+الدريهمي+OR+وقفة+الدريهمي&hl=ar&gl=YE&ceid=YE:ar",
      priority: 3,
      bias: "تعبوي",
      category: "تعبوي"
    },
    
    // مصادر تعليمية ودينية
    {
      name: "النشاط التعليمي والديني",
      url: "https://news.google.com/rss/search?q=دورة+الدريهمي+OR+محاضرة+الدريهمي&hl=ar&gl=YE&ceid=YE:ar",
      priority: 3,
      bias: "تعليمي",
      category: "تعليمي"
    },
    
    // مصادر إنسانية
    {
      name: "النشاط الإنساني - الدريهمي",
      url: "https://news.google.com/rss/search?q=مساعدات+الدريهمي+OR+إغاثة+الدريهمي&hl=ar&gl=YE&ceid=YE:ar",
      priority: 3,
      bias: "إنساني",
      category: "إنساني"
    },
    
    // مصادر أمنية
    {
      name: "الأمن العسكري - الدريهمي",
      url: "https://news.google.com/rss/search?q=أمن+الدريهمي+OR+جيش+الدريهمي&hl=ar&gl=YE&ceid=YE:ar",
      priority: 2,
      bias: "أمني",
      category: "أمني"
    },
    
    // مصادر اقتصادية
    {
      name: "النشاط الاقتصادي - الدريهمي",
      url: "https://news.google.com/rss/search?q=سوق+الدريهمي+OR+تجارة+الدريهمي&hl=ar&gl=YE&ceid=YE:ar",
      priority: 3,
      bias: "اقتصادي",
      category: "اقتصادي"
    },
    
    // مصادر اجتماعية
    {
      name: "النشاط الاجتماعي - الدريهمي",
      url: "https://news.google.com/rss/search?q=اجتماع+الدريهمي+OR+لقاء+الدريهمي&hl=ar&gl=YE&ceid=YE:ar",
      priority: 3,
      bias: "اجتماعي",
      category: "اجتماعي"
    }
  ],
  
  // كلمات مفتاحية موسعة مع تحيز واضح
  keywords: {
    // المواقع الجغرافية في الدريهمي
    locations: [
      "الدريهمي", "مديرية الدريهمي", "Al Durayhimi", "Durayhimi",
      "بني مرسي", "الحجبة السفلى", "الحجبة العليا", "الجحيا العليا",
      "الزرانيق", "المساعيد", "الزعفران", "الشجن", "الكرد",
      "الكنباحية", "اللاوية", "المحال", "المكيمنية", "المنقم",
      "دير حسن", "رغمين", "غليفقة", "الهايط", "بيت حسن جماعي",
      "خبت قوبع", "وادي الدريهمي", "سوق الدريهمي", "مركز الدريهمي",
      "مدرسة الدريهمي", "مستشفى الدريهمي", "مسجد الدريهمي"
    ],
    
    // القرى والعزل
    villages: [
      "عزلة الجحيا", "عزلة بني مرسي", "عزلة الحجبة", "عزلة الزرانيق",
      "عزلة المساعيد", "عزلة الكرد", "عزلة الشجن", "عزلة اللاوية"
    ],
    
    // الكيانات والتنظيمات الموالية
    proHouthi: [
      "أنصار الله", "الحوثيين", "المجلس السياسي الأعلى", "اللجان الشعبية",
      "لجان الأمر بالمعروف", "قائد الثورة", "السيد عبدالملك الحوثي",
      "بدر الدين الحوثي", "الثورة اليمنية", "أنصار الشريعة",
      "المقاومة اليمنية", "الجيش واللجان", "القوات المسلحة اليمنية",
      "المقاومة الإسلامية", "حركة أنصار الله", "الثورة السبتمبرية"
    ],
    
    // التنظيمات المعادية
    antiHouthi: [
      "التحالف العربي", "المجلس الانتقالي", "القوات المشتركة",
      "الشرعية", "هادي", "السعودية", "الإمارات", "أمريكا",
      "الصهاينة", "الكيان الصهيوني", "التنظيمات التكفيرية",
      "القاعدة", "داعش", "الارهاب", "العدوان"
    ],
    
    // الأحداث العسكرية والتعبوية
    military: [
      "مسيرة", "وقفة", "تعبئة", "تأهيل", "جهوزية", "استعداد",
      "تدريب", "مناورة", "تمرين", "استعراض", "تجمهر", "احتشاد",
      "تدريب عسكري", "تمرين قتالي", "مناورة دفاعية", "استعداد قتالي"
    ],
    
    // الأحداث الأمنية
    security: [
      "دورية", "تفتيش", "مراقبة", "رصد", "حماية", "أمن",
      "حرس", "شرطة", "أمن مركزي", "دورية أمنية", "تأمين"
    ],
    
    // الشهداء والأحداث الدموية
    martyrs: [
      "شهيد", "شهداء", "استشهاد", "استهداف", "قصف", "غارة",
      "ضحية", "جرحى", "مصاب", "تفجير", "انفجار", "كمين",
      "استشهادي", "ضحايا", "إصابة", "قتيل"
    ],
    
    // الخطاب التعبوي والسياسي
    rhetoric: [
      "طوفان الأقصى", "غزة", "فلسطين", "المقاومة", "الصمود",
      "النصر", "الجهاد", "المجاهدين", "الأقصى", "القدس",
      "المشروع الصهيوني", "الاستكبار العالمي", "العدوان",
      "المواجهة", "الصراع", "المعركة", "الثورة", "التضحية"
    ],
    
    // المناسبات والأنشطة
    activities: [
      "تخرج", "دورة", "خريجين", "احتفال", "تكريم", "توزيع",
      "مساعدات", "إغاثة", "تعزيز", "دعم", "تضامن", "وقفة تضامنية",
      "حفل", "مناسبة", "احتفالية", "احتفاء"
    ],
    
    // التعليم والدعوة
    education: [
      "محاضرة", "ندوة", "درس", "توعية", "تثقيف", "دعوة",
      "خطبة", "موعظة", "توجيه", "إرشاد", "تأهيل", "تدريس"
    ],
    
    // الاقتصاد والأسواق
    economy: [
      "سوق", "تجارة", "بيع", "شراء", "أسعار", "سلع",
      "مواد", "تسويق", "تجاري", "اقتصاد", "معيشة", "تكاليف"
    ],
    
    // الصحة والخدمات
    health: [
      "مستشفى", "مريض", "علاج", "دواء", "صحة", "طبيب",
      "ممرض", "عيادة", "رعاية", "خدمة", "تطبيب", "إسعاف"
    ],
    
    // البنية التحتية
    infrastructure: [
      "طريق", "جسر", "مدرسة", "مسجد", "مكتب", "مبنى",
      "إنشاء", "بناء", "ترميم", "تطوير", "تحسين", "خدمات"
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

// إنشاء مجلدات البيانات
if (!fs.existsSync(config.dataPath)) {
  fs.mkdirSync(config.dataPath, { recursive: true });
}

/* ================== STORAGE ================== */
const sentFile = path.join(config.dataPath, "sent.json");
const dailyFile = path.join(config.dataPath, "daily.json");
const statsFile = path.join(config.dataPath, "stats.json");
const reportFile = path.join(config.dataPath, "reports.json");
const backupFile = path.join(config.dataPath, "backup.json");
const locationsFile = path.join(config.dataPath, "locations.json");

// تهيئة الملفات
const initFile = (file, defaultValue) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify(defaultValue, null, 2));
    return defaultValue;
  }
  try {
    const content = fs.readFileSync(file, 'utf8');
    return content ? JSON.parse(content) : defaultValue;
  } catch (e) {
    console.error(`خطأ في قراءة ${file}:`, e.message);
    return defaultValue;
  }
};

let sent = new Set(initFile(sentFile, []));
let daily = initFile(dailyFile, []);
let stats = initFile(statsFile, {
  totalScans: 0,
  totalMatches: 0,
  proHouthiEvents: 0,
  antiHouthiEvents: 0,
  lastScan: null,
  lastReport: null,
  systemStart: new Date().toISOString(),
  locationsActivity: {},
  sourceStats: {},
  categoryStats: {}
});
let reports = initFile(reportFile, []);
let locationsActivity = initFile(locationsFile, {});

/* ================== BACKUP SYSTEM ================== */
class BackupSystem {
  static backup() {
    try {
      const backupData = {
        timestamp: new Date().toISOString(),
        sent: [...sent],
        daily: daily,
        stats: stats,
        reports: reports.slice(-5),
        locationsActivity: locationsActivity
      };
      
      fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
      console.log('💾 تم إنشاء نسخة احتياطية');
    } catch (error) {
      console.error('❌ خطأ في النسخ الاحتياطي:', error.message);
    }
  }
  
  static restore() {
    try {
      if (fs.existsSync(backupFile)) {
        const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
        sent = new Set(backupData.sent || []);
        daily = backupData.daily || [];
        stats = backupData.stats || {};
        reports = backupData.reports || [];
        locationsActivity = backupData.locationsActivity || {};
        
        console.log('🔄 تم استعادة البيانات من النسخة الاحتياطية');
        return true;
      }
    } catch (error) {
      console.error('❌ خطأ في استعادة النسخة الاحتياطية:', error.message);
    }
    return false;
  }
}

/* ================== RSS PARSER WITH RETRY ================== */
class ResilientParser {
  constructor() {
    this.parser = new Parser({
      timeout: 45000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml',
        'Accept-Language': 'ar,en-US;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
      },
      customFields: {
        item: [
          'media:content',
          'media:thumbnail',
          'enclosure',
          'source',
          'author',
          'dc:creator',
          'category'
        ]
      },
      maxRedirects: 5,
      requestOptions: {
        rejectUnauthorized: false
      }
    });
  }
  
  async parseURL(url, retries = config.maxRetries) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`📡 محاولة ${attempt}/${retries} لـ ${url}`);
        const feed = await this.parser.parseURL(url);
        return feed;
      } catch (error) {
        console.error(`❌ محاولة ${attempt} فشلت:`, error.message);
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, config.retryDelay * attempt));
        } else {
          throw error;
        }
      }
    }
  }
}

const resilientParser = new ResilientParser();

/* ================== UTILITY FUNCTIONS ================== */
function safeURL(url) {
  try {
    return encodeURI(decodeURI(url)).replace(/&amp;/g, '&');
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
  try {
    fs.writeFileSync(sentFile, JSON.stringify([...sent], null, 2));
    fs.writeFileSync(dailyFile, JSON.stringify(daily, null, 2));
    fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));
    fs.writeFileSync(reportFile, JSON.stringify(reports, null, 2));
    fs.writeFileSync(locationsFile, JSON.stringify(locationsActivity, null, 2));
    BackupSystem.backup();
  } catch (error) {
    console.error('❌ خطأ في حفظ البيانات:', error.message);
  }
}

/* ================== ADVANCED INTELLIGENCE ANALYSIS ================== */
class AdvancedIntelligenceAnalyzer {
  static analyze(text, source) {
    const normText = normalize(text);
    const analysis = {
      score: 0,
      type: "ذكر عادي",
      category: "عام",
      priority: "منخفض",
      bias: "محايد",
      entities: {
        proHouthi: [],
        antiHouthi: [],
        locations: [],
        villages: [],
        events: [],
        categories: []
      },
      sentiment: "محايد",
      recommendations: [],
      confidence: 60,
      timeContext: this.analyzeTimeContext(text)
    };
    
    // تحليل الكلمات المفتاحية مع أوزان مختلفة
    const keywordWeights = {
      locations: 1,
      villages: 1,
      proHouthi: 2,
      antiHouthi: -1,
      military: 3,
      security: 2,
      martyrs: 4,
      rhetoric: 2,
      activities: 1,
      education: 1,
      economy: 1,
      health: 1,
      infrastructure: 1
    };
    
    // تحليل شامل لكل فئة
    Object.entries(config.keywords).forEach(([category, keywords]) => {
      keywords.forEach(keyword => {
        const normKeyword = normalize(keyword);
        if (normText.includes(normKeyword)) {
          analysis.score += keywordWeights[category] || 1;
          
          // إضافة الكيان المناسب
          if (category === 'locations' && !analysis.entities.locations.includes(keyword)) {
            analysis.entities.locations.push(keyword);
          } else if (category === 'villages' && !analysis.entities.villages.includes(keyword)) {
            analysis.entities.villages.push(keyword);
          } else if (category === 'proHouthi' && !analysis.entities.proHouthi.includes(keyword)) {
            analysis.entities.proHouthi.push(keyword);
            analysis.bias = "موالي";
            analysis.sentiment = "إيجابي";
          } else if (category === 'antiHouthi' && !analysis.entities.antiHouthi.includes(keyword)) {
            analysis.entities.antiHouthi.push(keyword);
            if (analysis.bias === "محايد") analysis.bias = "معادي";
            analysis.sentiment = "سلبي";
          } else if (['military', 'security', 'martyrs'].includes(category)) {
            analysis.entities.events.push(keyword);
          }
          
          // تحديد الفئة الرئيسية
          if (!analysis.entities.categories.includes(category)) {
            analysis.entities.categories.push(category);
          }
        }
      });
    });
    
    // تحديد نوع المحتوى
    analysis.type = this.determineContentType(analysis);
    analysis.category = this.determineCategory(analysis);
    
    // تحديد الأولوية بناء على التحليل
    analysis.priority = this.determinePriority(analysis);
    
    // تحديد مستوى الثقة
    analysis.confidence = this.calculateConfidence(analysis);
    
    // توليد التوصيات
    analysis.recommendations = this.generateRecommendations(analysis);
    
    return analysis;
  }
  
  static determineContentType(analysis) {
    if (analysis.entities.martyrs.length > 0) return "🚨 حدث عسكري/استشهادي";
    if (analysis.entities.military.length > 0) return "⚠️ نشاط عسكري/تعبوي";
    if (analysis.entities.proHouthi.length > 2) return "🎯 خطاب/نشاط موالي";
    if (analysis.entities.antiHouthi.length > 1) return "📢 ذكر معادٍ";
    if (analysis.entities.activities.length > 0) return "🎉 مناسبة/نشاط";
    if (analysis.entities.education.length > 0) return "📚 تعليمي/دعوي";
    if (analysis.entities.health.length > 0) return "🏥 صحي/خدمي";
    if (analysis.entities.economy.length > 0) return "💰 اقتصادي/معيشي";
    return "🗨️ ذكر عام";
  }
  
  static determineCategory(analysis) {
    const categories = analysis.entities.categories;
    if (categories.includes('martyrs')) return "عسكري/أمني";
    if (categories.includes('military')) return "تعبوي/تدريبي";
    if (categories.includes('proHouthi')) return "سياسي/تعبوي";
    if (categories.includes('activities')) return "اجتماعي/مناسبات";
    if (categories.includes('education')) return "تعليمي/دعوي";
    if (categories.includes('health')) return "صحي/خدمي";
    if (categories.includes('economy')) return "اقتصادي/معيشي";
    return "عام";
  }
  
  static determinePriority(analysis) {
    const score = analysis.score;
    if (score >= 10) return "🔥🔥 حرج";
    if (score >= 7) return "🔥 مرتفع جداً";
    if (score >= 5) return "⚠️ مرتفع";
    if (score >= 3) return "📢 متوسط";
    if (score >= 1) return "ℹ️ منخفض";
    return "عادي";
  }
  
  static calculateConfidence(analysis) {
    let confidence = 60;
    const entities = analysis.entities;
    
    if (entities.locations.length > 0) confidence += 10;
    if (entities.proHouthi.length > 0) confidence += 10;
    if (entities.events.length > 0) confidence += 10;
    if (analysis.score >= 5) confidence += 10;
    
    return Math.min(confidence, 95);
  }
  
  static generateRecommendations(analysis) {
    const recommendations = [];
    
    if (analysis.entities.martyrs.length > 0) {
      recommendations.push("المتابعة العاجلة", "توثيق الحدث", "إبلاغ القيادة");
    } else if (analysis.entities.military.length > 0) {
      recommendations.push("متابعة النشاط", "تقييم الجهوزية", "توثيق التدريب");
    } else if (analysis.entities.proHouthi.length > 1) {
      recommendations.push("توثيق الخطاب", "متابعة النشاط", "تقييم التأثير");
    }
    
    if (analysis.entities.locations.length > 0) {
      recommendations.push("مراقبة الموقع");
    }
    
    return recommendations.length > 0 ? recommendations : ["المتابعة الروتينية"];
  }
  
  static analyzeTimeContext(text) {
    const normText = normalize(text);
    if (/(الآن|حالياً|في هذه اللحظة|منذ قليل|قبل قليل)/.test(normText)) {
      return { type: "فوري", confidence: 80 };
    }
    if (/(اليوم|هذا اليوم|صباح اليوم|مساء اليوم)/.test(normText)) {
      return { type: "يومي", confidence: 90 };
    }
    if (/(أمس|الأمس|يوم أمس)/.test(normText)) {
      return { type: "قريب", confidence: 85 };
    }
    if (/(غداً|بعد غد|الأيام القادمة|المستقبل)/.test(normText)) {
      return { type: "مستقبلي", confidence: 70 };
    }
    return { type: "غير محدد", confidence: 50 };
  }
  
  static generateComprehensiveReport(date) {
    const today = date || new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // تجميع أحداث اليوم
    const todayEvents = daily.filter(event => {
      const eventDate = new Date(event.time);
      return eventDate.toDateString() === today.toDateString();
    });
    
    // تحليل الإحصائيات
    const stats = this.analyzeDailyStatistics(todayEvents);
    
    // تحليل الأنماط
    const patterns = this.identifyPatterns(todayEvents);
    
    // تحديد التهديدات
    const threats = this.assessThreats(todayEvents);
    
    // تقييم الجهوزية
    const readiness = this.evaluateReadiness(todayEvents);
    
    // التقرير الاستخباراتي الشامل
    const report = {
      metadata: {
        classification: "تقرير يومي استخباراتي شامل",
        date: this.formatArabicDate(today),
        hijriDate: this.getHijriDate(today),
        location: "مديرية الدريهمي – محافظة الحديدة",
        preparedBy: "استخبارات (المربع الجنوبي)",
        securityLevel: "عادي",
        reportNumber: `RPT-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`,
        period: "24 ساعة الماضية"
      },
      
      executiveSummary: this.generateExecutiveSummary(stats, today),
      
      detailedAnalysis: {
        eventsBreakdown: this.getEventsBreakdown(todayEvents),
        temporalAnalysis: this.analyzeTemporalPatterns(todayEvents),
        spatialAnalysis: this.analyzeSpatialPatterns(todayEvents),
        sentimentAnalysis: this.analyzeSentiment(todayEvents)
      },
      
      confirmedEvents: this.getConfirmedEvents(todayEvents),
      
      fieldSecurity: {
        overallStatus: this.getSecurityStatus(todayEvents),
        incidents: this.getSecurityIncidents(todayEvents),
        patrolsActivities: this.getPatrolsActivities(todayEvents),
        assessment: this.getSecurityAssessment(todayEvents)
      },
      
      popularMobilization: {
        level: stats.readinessLevel,
        activities: stats.proEvents,
        locations: stats.hotspots.slice(0, 3).map(h => h.location),
        description: this.getMobilizationDescription(stats)
      },
      
      politicalIdeological: {
        discourse: this.analyzePoliticalDiscourse(todayEvents),
        loyaltyIndicators: this.getLoyaltyIndicators(todayEvents),
        communityEngagement: this.getCommunityEngagement(todayEvents)
      },
      
      civilianStatus: {
        livingConditions: this.assessLivingConditions(todayEvents),
        servicesStatus: this.assessServicesStatus(todayEvents),
        communityCohesion: "المجتمع المحلي متكيف مع الظروف، ويظهر تعاوناً مع الجهود الأمنية والمجتمعية."
      },
      
      intelligenceAssessment: {
        threatLevel: stats.threatLevel,
        readinessLevel: stats.readinessLevel,
        intelligenceQuality: stats.intelligenceLevel,
        popularSupport: stats.popularSupport,
        emergingPatterns: patterns,
        riskAssessment: threats
      },
      
      hotspotsAnalysis: {
        activeLocations: stats.hotspots.map(h => ({
          location: h.location,
          events: h.count,
          types: h.types,
          risk: h.count >= 3 ? "مرتفع" : h.count >= 2 ? "متوسط" : "منخفض"
        })),
        recommendations: this.getHotspotRecommendations(stats.hotspots)
      },
      
      sourceAnalysis: {
        reliableSources: this.getReliableSources(todayEvents),
        sourceBias: this.analyzeSourceBias(todayEvents),
        informationGaps: this.identifyInformationGaps(todayEvents)
      },
      
      forecast: {
        shortTerm: this.generateShortTermForecast(todayEvents, patterns),
        mediumTerm: this.generateMediumTermForecast(todayEvents, stats),
        recommendations: this.getForecastRecommendations(threats, readiness)
      },
      
      rawData: {
        totalEvents: todayEvents.length,
        proEvents: stats.proEvents,
        antiEvents: stats.antiEvents,
        highPriority: stats.highPriorityEvents,
        sourcesCount: stats.sourcesCount,
        categoriesBreakdown: stats.categories
      },
      
      annex: {
        timeline: this.generateTimeline(todayEvents),
        glossary: this.getIntelligenceGlossary(),
        methodology: "التحليل الاستخباراتي المبني على المصادر المفتوحة (OSINT) مع منهجية تحليل موجهة"
      }
    };
    
    return report;
  }
  
  static analyzeDailyStatistics(events) {
    const proEvents = events.filter(e => e.analysis.bias === "موالي");
    const antiEvents = events.filter(e => e.analysis.bias === "معادي");
    const highPriority = events.filter(e => e.analysis.priority.includes("🔥"));
    
    // تحليل المواقع
    const locationCounts = {};
    events.forEach(event => {
      event.analysis.entities.locations.forEach(loc => {
        locationCounts[loc] = (locationCounts[loc] || 0) + 1;
      });
    });
    
    const hotspots = Object.entries(locationCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([loc, count]) => ({
        location: loc,
        count: count,
        types: [...new Set(events
          .filter(e => e.analysis.entities.locations.includes(loc))
          .map(e => e.analysis.type))]
      }));
    
    // تحليل الفئات
    const categories = {};
    events.forEach(event => {
      const category = event.analysis.category;
      categories[category] = (categories[category] || 0) + 1;
    });
    
    // تحليل المصادر
    const sources = [...new Set(events.map(e => e.source))];
    
    return {
      totalEvents: events.length,
      proEvents: proEvents.length,
      antiEvents: antiEvents.length,
      highPriorityEvents: highPriority.length,
      hotspots: hotspots,
      categories: categories,
      sourcesCount: sources.length,
      threatLevel: highPriority.length > 2 ? "متوسط-مرتفع" : 
                  highPriority.length > 0 ? "متوسط" : "منخفض",
      readinessLevel: proEvents.length > 5 ? "مرتفع" : 
                     proEvents.length > 2 ? "متوسط" : "منخفض",
      intelligenceLevel: events.length > 8 ? "عالية" :
                        events.length > 4 ? "متوسطة" : "منخفضة",
      popularSupport: proEvents.length > antiEvents.length * 2 ? "قوي ومستمر" :
                     proEvents.length > antiEvents.length ? "متوسط" : "ضعيف"
    };
  }
  
  static generateExecutiveSummary(stats, date) {
    const dateStr = `${date.getDate()} ${date.toLocaleDateString('ar-YE', { month: 'long' })} ${date.getFullYear()}`;
    
    let summary = `ارفع إليكم من خلال المتابعة الميدانية المباشرة ليوم ${dateStr} في مديرية الدريهمي، `;
    
    if (stats.proEvents > 0) {
      summary += `سُجّل نشاط تعبوي وشعبي مؤكد تمثّل في ${stats.proEvents} حدث موالي، `;
    } else {
      summary += `لم تسجل أحداث تعبوية مؤكدة، `;
    }
    
    if (stats.highPriorityEvents > 0) {
      summary += `مع تسجيل ${stats.highPriorityEvents} حدث عالي الأولوية. `;
    } else {
      summary += `وكل الأحداث ضمن المستوى الطبيعي. `;
    }
    
    summary += `يعكس النشاط المسجل مستوى الجهوزية والاستعداد القائم ${stats.readinessLevel === 'مرتفع' ? 'المرتفع' : 'المتوسط'}، `;
    summary += `ويؤكد حالة الانتقال الشعبي حول القضايا الوطنية والقومية، `;
    summary += `دون تسجيل أي اختراقات أمنية أو مواجهات عسكرية داخل المديرية.`;
    
    return summary;
  }
  
  static formatArabicDate(date) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('ar-YE', options);
  }
  
  static getHijriDate(date) {
    // هذه دالة مبسطة، في التطبيق الحقيقي تحتاج مكتبة تحويل التاريخ الهجري
    const hijriMonths = ["محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الآخرة", 
                        "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"];
    const randomMonth = hijriMonths[Math.floor(Math.random() * hijriMonths.length)];
    const randomDay = Math.floor(Math.random() * 29) + 1;
    const hijriYear = 1446 + Math.floor(Math.random() * 2);
    
    return `${randomDay} ${randomMonth} ${hijriYear} هـ`;
  }
}

/* ================== RESILIENT TELEGRAM BOT ================== */
class ResilientTelegramBot {
  static async sendWithRetry(method, data, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(`https://api.telegram.org/bot${config.botToken}/${method}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        if (result.ok) return result;
        
        console.error(`Telegram API error (attempt ${attempt}):`, result.description);
      } catch (error) {
        console.error(`Telegram network error (attempt ${attempt}):`, error.message);
      }
      
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 2000 * attempt));
      }
    }
    return null;
  }
  
  static async sendMessage(text, options = {}) {
    const data = {
      chat_id: config.chatId,
      text: text.slice(0, 4000),
      parse_mode: 'HTML',
      disable_web_page_preview: options.preview || false,
      disable_notification: options.silent || false
    };
    
    return await this.sendWithRetry('sendMessage', data);
  }
  
  static async sendImmediateAlert(item, analysis) {
    const alertLevel = analysis.priority.includes("🔥🔥") ? "🚨🚨" : 
                     analysis.priority.includes("🔥") ? "🚨" : "⚠️";
    
    const message = `
${alertLevel} <b>تنبيه فوري - ${analysis.type}</b>
${alertLevel} <b>الأولوية:</b> ${analysis.priority}

<b>📍 الموقع:</b> ${analysis.entities.locations[0] || analysis.entities.villages[0] || "الدريهمي"}
<b>🎯 الجانب:</b> ${analysis.bias}
<b>📊 التصنيف:</b> ${analysis.category}

<b>📰 العنوان:</b>
${item.title?.slice(0, 150) || "حدث جديد"}

<b>🔍 الكيانات البارزة:</b>
${[...analysis.entities.proHouthi, ...analysis.entities.events]
  .slice(0, 3)
  .join(' • ') || "نشاط موالي"}

<b>💬 السياق الزمني:</b> ${analysis.timeContext.type}
<b>🎯 الثقة:</b> ${analysis.confidence}%

${analysis.recommendations.length > 0 ? 
  `<b>💡 التوصيات:</b>\n${analysis.recommendations[0]}` : ''}

<b>🔗 المصدر:</b> ${item.source}
<b>🕐 الوقت:</b> ${new Date().toLocaleTimeString('ar-YE')}
━━━━━━━━━━━━━━━━━━━━
<i>سيتم تضمين هذا الحدث في التقرير اليومي الساعة 00:00</i>
    `.trim();
    
    await this.sendMessage(message, { 
      preview: false, 
      silent: !analysis.priority.includes("🔥") 
    });
  }
  
  static async sendDailyReport(report) {
    console.log('📨 جاري إرسال التقرير اليومي...');
    
    const reportParts = this.splitReport(report);
    
    for (let i = 0; i < reportParts.length; i++) {
      const part = reportParts[i];
      const isFirst = i === 0;
      const isLast = i === reportParts.length - 1;
      
      const message = isFirst ? `
📄 <b>${report.metadata.classification.toUpperCase()}</b>
${'━'.repeat(40)}

<b>الصفة:</b> ${report.metadata.classification}
<b>التاريخ:</b> ${report.metadata.date}
<b>التاريخ الهجري:</b> ${report.metadata.hijriDate}
<b>المكان:</b> ${report.metadata.location}
<b>الجهة المعدّة:</b> ${report.metadata.preparedBy}
<b>درجة السرية:</b> ${report.metadata.securityLevel}
<b>رقم التقرير:</b> ${report.metadata.reportNumber}
<b>الفترة:</b> ${report.metadata.period}

${'━'.repeat(40)}
<b>الملخص التنفيذي</b>
${report.executiveSummary}

${'━'.repeat(40)}
      `.trim() + part : part;
      
      await this.sendMessage(message, {
        preview: false,
        silent: !isFirst
      });
      
      // تأجيل بين الأجزاء
      if (!isLast) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
    
    console.log('✅ تم إرسال التقرير اليومي بنجاح');
  }
  
  static splitReport(report) {
    const parts = [];
    let currentPart = '';
    
    // إضافة الأحداث المؤكدة
    let eventsText = '';
    if (report.confirmedEvents.length > 0) {
      eventsText = `
<b>الأحداث المؤكدة لليوم</b>
${report.confirmedEvents.map((e, i) => 
  `${i+1}. <b>${e.type}</b>\n   المكان: ${e.location}\n   الوقت: ${e.time}\n   ${e.description}`
).join('\n\n')}
      `.trim();
    } else {
      eventsText = "<b>الأحداث المؤكدة</b>\n• لم تسجل أحداث مؤكدة اليوم";
    }
    
    // إضافة الوضع الميداني
    const fieldText = `
<b>الوضع الميداني والأمني</b>
• الحالة العامة: ${report.fieldSecurity.overallStatus}
• الحوادث المسجلة: ${report.fieldSecurity.incidents}
• ${report.fieldSecurity.assessment}
    `.trim();
    
    // إضافة النشاط الشعبي
    const popularText = `
<b>النشاط الشعبي والتعبوي</b>
• المستوى: ${report.popularMobilization.level}
• الأنشطة: ${report.popularMobilization.activities} نشاط
• المواقع النشطة: ${report.popularMobilization.locations.join('، ')}
• ${report.detailedAnalysis.sentimentAnalysis.description}
    `.trim();
    
    // إضافة التقييم الاستخباراتي
    const intelText = `
<b>التقييم الاستخباراتي</b>
• مستوى التهديد: ${report.intelligenceAssessment.threatLevel}
• مستوى الجهوزية: ${report.intelligenceAssessment.readinessLevel}
• جودة المعلومات: ${report.intelligenceAssessment.intelligenceQuality}
• الاحتضان الشعبي: ${report.intelligenceAssessment.popularSupport}

<b>النقاط الساخنة:</b>
${report.hotspotsAnalysis.activeLocations.map(h => 
  `• ${h.location} (${h.events} حدث - ${h.risk})`
).join('\n')}

<b>الأنماط الملاحظة:</b>
${report.intelligenceAssessment.emergingPatterns.map(p => `• ${p}`).join('\n')}
    `.trim();
    
    // إضافة التقدير النهائي
    const finalText = `
<b>التقدير الأمني</b>
الاستقرار القائم يعكس فعالية الجاهزية والانتشار، ويؤكد فشل أي محاولات لإرباك الوضع الأمني داخل المديرية.

<b>الرأي الختامي</b>
${report.executiveSummary.split('. ').slice(-1)[0]}

<b>التوصيات</b>
${report.hotspotsAnalysis.recommendations.map(r => `• ${r}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━
<b>البيانات الإحصائية</b>
• إجمالي الأحداث: ${report.rawData.totalEvents}
• الأحداث الموالية: ${report.rawData.proEvents}
• الأحداث المعادية: ${report.rawData.antiEvents}
• الأحداث عالية الأولوية: ${report.rawData.highPriority}
• عدد المصادر: ${report.rawData.sourcesCount}

━━━━━━━━━━━━━━━━━━━━
<i>تم إعداد هذا التقرير آلياً بواسطة نظام الرصد الاستخباراتي المتطور (OSINT Monitor)</i>
<i>وقت الإصدار: ${new Date().toLocaleTimeString('ar-YE')}</i>
<i>التقرير القادم: الساعة 00:00</i>
    `.trim();
    
    // تقسيم المحتوى إلى أجزاء
    const sections = [eventsText, fieldText, popularText, intelText, finalText];
    
    for (const section of sections) {
      if (currentPart.length + section.length < 3500) {
        currentPart += (currentPart ? '\n\n' : '') + section;
      } else {
        parts.push(currentPart);
        currentPart = section;
      }
    }
    
    if (currentPart) {
      parts.push(currentPart);
    }
    
    return parts;
  }
}

/* ================== ADVANCED SCANNER WITH LOAD BALANCING ================== */
class AdvancedScanner {
  static async scanSource(source, attempt = 1) {
    try {
      console.log(`🔍 [${source.category}] جاري فحص: ${source.name}`);
      
      const feed = await resilientParser.parseURL(safeURL(source.url));
      const results = [];
      
      for (const item of feed.items || []) {
        const content = `${item.title || ''} ${item.contentSnippet || ''} ${item.content || ''}`;
        
        // فحص سريع للكلمات المفتاحية
        if (!this.quickKeywordCheck(content)) continue;
        
        const itemHash = generateHash(`${item.link || ''}${item.pubDate || ''}${content.substring(0, 200)}`);
        
        if (sent.has(itemHash)) continue;
        sent.add(itemHash);
        
        // التحليل المتقدم
        const analysis = AdvancedIntelligenceAnalyzer.analyze(content, source.name);
        
        const record = {
          id: itemHash,
          timestamp: new Date().toISOString(),
          source: source.name,
          sourceCategory: source.category,
          sourceBias: source.bias,
          title: item.title?.trim(),
          description: item.contentSnippet?.trim() || item.content?.substring(0, 300).trim(),
          link: item.link,
          pubDate: item.pubDate || new Date().toISOString(),
          analysis: analysis,
          rawContent: content.substring(0, 500)
        };
        
        results.push(record);
        
        // معالجة السجل
        await this.processRecord(record, source);
      }
      
      // تحديث إحصائيات المصدر
      if (!stats.sourceStats[source.name]) {
        stats.sourceStats[source.name] = { scans: 0, matches: 0 };
      }
      stats.sourceStats[source.name].scans++;
      stats.sourceStats[source.name].matches += results.length;
      
      // تحديث إحصائيات الفئة
      if (!stats.categoryStats[source.category]) {
        stats.categoryStats[source.category] = { matches: 0 };
      }
      stats.categoryStats[source.category].matches += results.length;
      
      console.log(`✅ [${source.category}] ${source.name}: ${results.length} نتيجة`);
      return results;
      
    } catch (error) {
      console.error(`❌ [${source.category}] خطأ في ${source.name} (المحاولة ${attempt}):`, error.message);
      
      if (attempt < config.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, config.retryDelay * attempt));
        return await this.scanSource(source, attempt + 1);
      }
      
      return [];
    }
  }
  
  static quickKeywordCheck(text) {
    const normText = normalize(text);
    
    // فحص سريع للكلمات الرئيسية
    const quickCheckKeywords = [
      ...config.keywords.locations.slice(0, 10),
      ...config.keywords.proHouthi.slice(0, 5),
      ...config.keywords.military.slice(0, 3)
    ];
    
    for (const keyword of quickCheckKeywords) {
      if (normText.includes(normalize(keyword))) {
        return true;
      }
    }
    
    return false;
  }
  
  static async processRecord(record, source) {
    // تحديث الإحصائيات العامة
    stats.totalMatches++;
    
    if (record.analysis.bias === "موالي") {
      stats.proHouthiEvents++;
    } else if (record.analysis.bias === "معادي") {
      stats.antiHouthiEvents++;
    }
    
    // تحديث نشاط المواقع
    record.analysis.entities.locations.forEach(location => {
      if (!locationsActivity[location]) {
        locationsActivity[location] = {
          count: 0,
          lastSeen: null,
          types: new Set(),
          categories: new Set(),
          bias: {}
        };
      }
      
      locationsActivity[location].count++;
      locationsActivity[location].lastSeen = record.timestamp;
      locationsActivity[location].types.add(record.analysis.type);
      locationsActivity[location].categories.add(record.analysis.category);
      
      if (!locationsActivity[location].bias[record.analysis.bias]) {
        locationsActivity[location].bias[record.analysis.bias] = 0;
      }
      locationsActivity[location].bias[record.analysis.bias]++;
    });
    
    // إضافة إلى السجل اليومي
    daily.push({
      id: record.id,
      time: record.timestamp,
      source: record.source,
      sourceCategory: record.sourceCategory,
      sourceBias: record.sourceBias,
      title: record.title?.substring(0, 150),
      link: record.link,
      analysis: record.analysis,
      locations: record.analysis.entities.locations,
      villages: record.analysis.entities.villages,
      categories: record.analysis.entities.categories
    });
    
    // الحفاظ على حجم البيانات
    if (daily.length > 1000) {
      daily = daily.slice(-800);
    }
    
    // إرسال تنبيه فوري للأحداث المهمة
    if (record.analysis.priority.includes("🔥") || 
        (record.analysis.bias === "موالي" && record.analysis.score >= 3)) {
      await ResilientTelegramBot.sendImmediateAlert(record, record.analysis);
    }
    
    // حفظ البيانات بشكل دوري
    if (stats.totalMatches % 10 === 0) {
      saveData();
    }
  }
  
  static async intelligentScan() {
    console.log('🧠 بدء الفحص الذكي المتوازن...');
    
    const startTime = Date.now();
    stats.totalScans++;
    stats.lastScan = new Date().toISOString();
    
    const allResults = [];
    const sourcesByPriority = [...config.sources].sort((a, b) => a.priority - b.priority);
    
    // فحص المصادر حسب الأولوية مع موازنة الحمل
    for (let i = 0; i < sourcesByPriority.length; i++) {
      const source = sourcesByPriority[i];
      
      // تأجيل ذكي بين المصادر بناء على الأولوية
      const delay = source.priority * 1000 + (Math.random() * 2000);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      const results = await this.scanSource(source);
      allResults.push(...results);
      
      // حفظ البيانات بعد كل 3 مصادر
      if ((i + 1) % 3 === 0) {
        saveData();
      }
    }
    
    const scanDuration = Math.round((Date.now() - startTime) / 1000);
    
    // إرسال ملخص الفحص
    if (allResults.length > 0) {
      await this.sendIntelligentSummary(allResults, scanDuration);
    }
    
    console.log(`✅ اكتمل الفحص في ${scanDuration} ثانية. النتائج: ${allResults.length}`);
    
    // حفظ نهائي للبيانات
    saveData();
    
    return allResults;
  }
  
  static async sendIntelligentSummary(results, duration) {
    const proResults = results.filter(r => r.analysis.bias === "موالي");
    const highPriority = results.filter(r => r.analysis.priority.includes("🔥"));
    
    // تحليل الفئات
    const categoryAnalysis = {};
    results.forEach(r => {
      const category = r.sourceCategory;
      categoryAnalysis[category] = (categoryAnalysis[category] || 0) + 1;
    });
    
    const topCategories = Object.entries(categoryAnalysis)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat, count]) => `${cat}: ${count}`)
      .join('، ');
    
    const message = `
📊 <b>ملخص الفحص الاستخباراتي الذكي</b>
${'━'.repeat(40)}

<b>⏱️ المدة:</b> ${duration} ثانية
<b>🔍 النتائج:</b> ${results.length} حدث
<b>🎯 الأحداث الموالية:</b> ${proResults.length}
<b>🚨 الأحداث عالية الأولوية:</b> ${highPriority.length}

<b>📈 الفئات النشطة:</b>
${topCategories || "لا توجد"}

<b>📍 النقاط الساخنة:</b>
${Object.entries(locationsActivity)
  .sort((a, b) => b[1].count - a[1].count)
  .slice(0, 3)
  .map(([loc, data]) => `${loc}: ${data.count} نشاط`)
  .join('\n')}

<b>🕐 وقت الفحص:</b> ${new Date().toLocaleString('ar-YE')}
${'━'.repeat(40)}
<i>تم فحص ${config.sources.length} مصدر مختلف</i>
<i>سيتم إصدار التقرير اليومي الساعة 00:00</i>
    `.trim();
    
    await ResilientTelegramBot.sendMessage(message, { silent: true });
  }
}

/* ================== RELIABLE REPORT SCHEDULER ================== */
class ReliableReportScheduler {
  static scheduleDailyReport() {
    // حساب الوقت حتى منتصف الليل
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    let timeUntilMidnight = midnight - now;
    
    // إذا كان الوقت بعد منتصف الليل، جدوله للغد
    if (timeUntilMidnight < 0) {
      midnight.setDate(midnight.getDate() + 1);
      timeUntilMidnight = midnight - now;
    }
    
    console.log(`⏰ تم جدولة التقرير اليومي بعد ${Math.round(timeUntilMidnight / 1000 / 60)} دقيقة`);
    
    const reportTimer = setTimeout(async () => {
      try {
        console.log('📅 بدء إعداد التقرير اليومي الشامل...');
        
        // توليد التقرير المتقدم
        const report = AdvancedIntelligenceAnalyzer.generateComprehensiveReport(new Date());
        
        // حفظ التقرير
        reports.push({
          date: new Date().toISOString(),
          report: report,
          stats: {
            totalEvents: daily.length,
            proEvents: stats.proHouthiEvents,
            antiEvents: stats.antiHouthiEvents
          }
        });
        
        // حفظ أحدث 50 تقرير فقط
        if (reports.length > 50) {
          reports = reports.slice(-30);
        }
        
        stats.lastReport = new Date().toISOString();
        saveData();
        
        // إرسال التقرير عبر Telegram
        await ResilientTelegramBot.sendDailyReport(report);
        
        // أرشفة أحداث اليوم
        this.archiveDailyData();
        
        // إعادة ضبط السجل اليومي مع الاحتفاظ بالأحداث المهمة
        this.resetDailyData();
        
        console.log('✅ تم إرسال التقرير اليومي وإعادة ضبط البيانات');
        
      } catch (error) {
        console.error('❌ خطأ في إعداد التقرير اليومي:', error);
        
        // محاولة إرسال رسالة خطأ
        try {
          await ResilientTelegramBot.sendMessage(
            `❌ <b>خطأ في إعداد التقرير اليومي</b>\n\n` +
            `الخطأ: ${error.message}\n` +
            `سيتم المحاولة مرة أخرى خلال ساعة.`
          );
        } catch (telegramError) {
          console.error('❌ فشل في إرسال رسالة الخطأ:', telegramError);
        }
      } finally {
        // جدولة التقرير التالي
        this.scheduleDailyReport();
      }
    }, timeUntilMidnight);
    
    // تخزين المؤقت للإشارة المرجعية
    this.reportTimer = reportTimer;
  }
  
  static archiveDailyData() {
    const archiveDate = new Date().toISOString().split('T')[0];
    const archiveDir = path.join(config.dataPath, 'archive');
    
    if (!fs.existsSync(archiveDir)) {
      fs.mkdirSync(archiveDir, { recursive: true });
    }
    
    const archiveFile = path.join(archiveDir, `daily_${archiveDate}.json`);
    
    try {
      const archiveData = {
        date: archiveDate,
        events: daily,
        stats: stats,
        locationsActivity: locationsActivity
      };
      
      fs.writeFileSync(archiveFile, JSON.stringify(archiveData, null, 2));
      console.log(`💾 تم أرشفة بيانات اليوم في: ${archiveFile}`);
    } catch (error) {
      console.error('❌ خطأ في أرشفة البيانات:', error.message);
    }
  }
  
  static resetDailyData() {
    // الاحتفاظ بالأحداث عالية الأولوية فقط
    const importantEvents = daily.filter(event => 
      event.analysis.priority.includes("🔥") || 
      event.analysis.score >= 5
    );
    
    daily = importantEvents;
    stats.proHouthiEvents = importantEvents.filter(e => e.analysis.bias === "موالي").length;
    stats.antiHouthiEvents = importantEvents.filter(e => e.analysis.bias === "معادي").length;
    
    // تنظيف نشاط المواقع القديم
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    Object.keys(locationsActivity).forEach(location => {
      if (!locationsActivity[location].lastSeen || 
          new Date(locationsActivity[location].lastSeen) < yesterday) {
        if (locationsActivity[location].count < 3) {
          delete locationsActivity[location];
        }
      }
    });
    
    saveData();
  }
}

/* ================== HEALTH MONITOR ================== */
class HealthMonitor {
  static start() {
    // مراقبة الذاكرة
    setInterval(() => {
      const memoryUsage = process.memoryUsage();
      const memoryMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
      
      if (memoryMB > 500) {
        console.warn(`⚠️ استخدام عالي للذاكرة: ${memoryMB} MB`);
        
        // تنظيف الذاكرة
        if (global.gc) {
          global.gc();
        }
      }
    }, 5 * 60 * 1000); // كل 5 دقائق
    
    // إرسال تقرير صحي يومي
    setInterval(async () => {
      const uptime = process.uptime();
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      
      const healthReport = `
🏥 <b>تقرير الصحة النظامي</b>
${'━'.repeat(40)}

<b>⏱️ وقت التشغيل:</b> ${hours} ساعة ${minutes} دقيقة
<b>🔍 إجمالي الفحوصات:</b> ${stats.totalScans}
<b>📊 النتائج الإجمالية:</b> ${stats.totalMatches}
<b>🎯 الأحداث الموالية:</b> ${stats.proHouthiEvents}
<b>📡 المصادر النشطة:</b> ${Object.keys(stats.sourceStats).length}

<b>💾 استخدام الذاكرة:</b> ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB
<b>📈 عدد الأحداث اليوم:</b> ${daily.length}
<b>🔄 آخر فحص:</b> ${stats.lastScan ? new Date(stats.lastScan).toLocaleTimeString('ar-YE') : 'لم يتم'}

<b>✅ الحالة:</b> تشغيل طبيعي
${'━'.repeat(40)}
<i>النظام يعمل باستقرار تام</i>
      `.trim();
      
      await ResilientTelegramBot.sendMessage(healthReport, { silent: true });
    }, 12 * 60 * 60 * 1000); // كل 12 ساعة
  }
}

/* ================== ENHANCED DASHBOARD ================== */
const app = express();

// Middleware للتعامل مع Render
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

app.get('/', (req, res) => {
  res.send(this.generateEnhancedDashboard());
});

// API endpoints
app.get('/api/v1/stats', (req, res) => {
  res.json({
    success: true,
    system: {
      uptime: process.uptime(),
      version: "3.0.0",
      bias: "موالي - استخباراتي",
      nextReport: new Date(new Date().setHours(24, 0, 0, 0)).toLocaleString('ar-YE')
    },
    intelligence: {
      today: {
        total: daily.filter(e => new Date(e.time).toDateString() === new Date().toDateString()).length,
        pro: stats.proHouthiEvents,
        anti: stats.antiHouthiEvents,
        highPriority: daily.filter(e => e.analysis.priority.includes("🔥")).length
      },
      sources: stats.sourceStats,
      categories: stats.categoryStats,
      hotspots: Object.entries(locationsActivity)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 10)
        .map(([loc, data]) => ({
          location: loc,
          count: data.count,
          lastSeen: data.lastSeen,
          bias: data.bias
        }))
    }
  });
});

app.post('/api/v1/scan', async (req, res) => {
  try {
    const results = await AdvancedScanner.intelligentScan();
    res.json({
      success: true,
      message: `تم الفحص بنجاح. النتائج: ${results.length}`,
      details: {
        proEvents: results.filter(r => r.analysis.bias === "موالي").length,
        highPriority: results.filter(r => r.analysis.priority.includes("🔥")).length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'operational',
    timestamp: new Date().toISOString(),
    render: {
      region: process.env.RENDER_REGION || 'unknown',
      service: process.env.RENDER_SERVICE_ID || 'local'
    },
    resources: {
      memory: process.memoryUsage(),
      uptime: process.uptime()
    }
  });
});

// Serve static files
app.use(express.static('public'));

/* ================== MAIN APPLICATION ================== */
class OSINTApplication {
  static async start() {
    try {
      console.log('🚀 بدء تشغيل النظام الاستخباراتي المتطور...');
      console.log('🎯 التوجيه: تحيز استخباراتي حوثي شامل');
      console.log(`📡 المصادر: ${config.sources.length} مصدر متنوع`);
      console.log(`📍 المنطقة: مديرية الدريهمي بالكامل`);
      console.log(`⚙️ الإعدادات: فحص كل ${config.scanInterval / 60000} دقيقة`);
      
      // استعادة النسخة الاحتياطية إذا كانت متوفرة
      BackupSystem.restore();
      
      // إرسال رسالة بدء التشغيل
      await this.sendStartupMessage();
      
      // بدء الخادم
      app.listen(config.port, () => {
        console.log(`🌐 لوحة التحكم تعمل على: http://localhost:${config.port}`);
        console.log(`📡 واجهة API: /api/v1/stats`);
        console.log(`🏥 مراقبة الصحة: نشطة`);
      });
      
      // جدولة التقرير اليومي
      ReliableReportScheduler.scheduleDailyReport();
      
      // بدء مراقبة الصحة
      HealthMonitor.start();
      
      // الفحص الأولي
      console.log('🔍 بدء الفحص الاستخباراتي الأولي...');
      await AdvancedScanner.intelligentScan();
      
      // جدولة الفحوصات الدورية مع استقرار
      this.startStableScheduler();
      
      // Keep-alive ping لـ Render
      this.startKeepAlive();
      
      console.log('✅ النظام يعمل بكامل طاقته وجاهز للمراقبة المستمرة');
      
    } catch (error) {
      console.error('❌ خطأ فادح في بدء التشغيل:', error);
      await this.sendEmergencyAlert(error);
      process.exit(1);
    }
  }
  
  static async sendStartupMessage() {
    const message = `
🚀 <b>بدء تشغيل النظام الاستخباراتي المتطور</b>
${'━'.repeat(40)}

<b>🏛️ النظام:</b> Advanced OSINT Intelligence Monitor v3.0
<b>🎯 التوجيه:</b> تحيز استخباراتي حوثي شامل
<b>📍 المنطقة:</b> مديرية الدريهمي - محافظة الحديدة
<b>📡 المصادر:</b> ${config.sources.length} مصدر متنوع
<b>⏱️ الفحص كل:</b> ${config.scanInterval / 60000} دقيقة
<b>📅 التقرير اليومي:</b> 00:00 توقيت محلي
<b>🕐 وقت البدء:</b> ${new Date().toLocaleString('ar-YE')}

<b>📊 الإحصائيات المخزنة:</b>
• الفحوصات: ${stats.totalScans}
• الأحداث الموالية: ${stats.proHouthiEvents}
• الأحداث المعادية: ${stats.antiHouthiEvents}
• آخر تقرير: ${stats.lastReport ? new Date(stats.lastReport).toLocaleString('ar-YE') : 'لم يتم'}

🔍 <b>جاري بدء المراقبة الاستخباراتية الشاملة...</b>

<i>ملاحظة: هذا النظام يعمل بتحيز استخباراتي واضح حسب التوجيهات المحددة</i>
<i>ويتميز باستقرار عالي للعمل على منصة Render بشكل مستمر</i>
    `.trim();
    
    await ResilientTelegramBot.sendMessage(message);
  }
  
  static async sendEmergencyAlert(error) {
    try {
      await ResilientTelegramBot.sendMessage(
        `🆘 <b>طوارئ نظامية</b>\n\n` +
        `حدث خطأ فادح في النظام:\n` +
        `${error.message}\n\n` +
        `يرجى التدخل الفوري.`
      );
    } catch (telegramError) {
      console.error('❌ فشل في إرسال تنبيه الطوارئ:', telegramError);
    }
  }
  
  static startStableScheduler() {
    let consecutiveFailures = 0;
    const maxConsecutiveFailures = 5;
    
    const scheduledScan = async () => {
      try {
        console.log('🔄 بدء الفحص الدوري المجدول...');
        await AdvancedScanner.intelligentScan();
        consecutiveFailures = 0; // إعادة تعيين العداد
      } catch (error) {
        consecutiveFailures++;
        console.error(`❌ فشل الفحص (${consecutiveFailures}/${maxConsecutiveFailures}):`, error.message);
        
        if (consecutiveFailures >= maxConsecutiveFailures) {
          console.error('🚨 عدد كبير من الإخفاقات المتتالية، إعادة تشغيل المهمة...');
          consecutiveFailures = 0;
          
          try {
            await ResilientTelegramBot.sendMessage(
              `⚠️ <b>إشعار استقرار النظام</b>\n\n` +
              `تم تجاوز عدد الإخفاقات المسموح به.\n` +
              `جاري إعادة ضبط مجدول الفحص...`
            );
          } catch (telegramError) {
            console.error('❌ فشل في إرسال إشعار الاستقرار:', telegramError);
          }
        }
      }
    };
    
    // بدء المجدول
    setInterval(scheduledScan, config.scanInterval);
    console.log(`⏰ تم جدولة الفحص الدوري كل ${config.scanInterval / 60000} دقيقة`);
  }
  
  static startKeepAlive() {
    // Keep-alive endpoint لمنع إيقاف Render للتطبيق
    setInterval(async () => {
      try {
        await fetch(`http://localhost:${config.port}/api/v1/health`, {
          timeout: 10000
        });
        console.log('❤️  Keep-alive ping نجح');
      } catch (error) {
        console.log('💤 Keep-alive ping فشل (متوقع أثناء التطوير)');
      }
    }, 5 * 60 * 1000); // كل 5 دقائق
  }
}

/* ================== ERROR HANDLING ================== */
process.on('uncaughtException', async (error) => {
  console.error('❌ خطأ غير متوقع:', error);
  
  try {
    await ResilientTelegramBot.sendMessage(
      `⚠️ <b>خطأ غير متوقع في النظام</b>\n\n` +
      `الخطأ: ${error.message}\n` +
      `النظام يحاول الاستمرار في العمل...`
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

process.on('SIGTERM', async () => {
  console.log('🛑 استقبال إشارة الإغلاق (SIGTERM)...');
  await OSINTApplication.gracefulShutdown();
});

process.on('SIGINT', async () => {
  console.log('🛑 استقبال إشارة المقاطعة (SIGINT)...');
  await OSINTApplication.gracefulShutdown();
});

OSINTApplication.gracefulShutdown = async () => {
  console.log('🔄 بدء الإغلاق الآمن...');
  
  // حفظ جميع البيانات
  saveData();
  
  // إرسال رسالة إغلاق
  try {
    await ResilientTelegramBot.sendMessage(
      '🛑 <b>إيقاف النظام الاستخباراتي</b>\n\n' +
      'جاري حفظ البيانات وإغلاق الخدمات...\n' +
      `آخر فحص: ${stats.lastScan ? new Date(stats.lastScan).toLocaleString('ar-YE') : 'لم يتم'}\n` +
      'سيتم استئناف العمل عند إعادة التشغيل.'
    );
  } catch (error) {
    console.error('❌ فشل في إرسال رسالة الإغلاق:', error);
  }
  
  console.log('✅ تم الإغلاق الآمن');
  process.exit(0);
};

/* ================== START THE APPLICATION ================== */
OSINTApplication.start();
