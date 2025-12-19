/* ================== CONFIGURATION ================== */
const config = {
  botToken: "7884775926:AAF9x36fBXeuB2iCUn0AHqoBUZuPXGO61C0",
  chatId: "6837315281",
  scanInterval: 15 * 60 * 1000, // 15 دقيقة لتقليل الحمل مع زيادة التغطية
  socialMediaScanInterval: 30 * 60 * 1000, // 30 دقيقة لمواقع التواصل
  port: process.env.PORT || 10000,
  dataPath: "./data/",
  maxRetries: 5,
  retryDelay: 10000,
  
  // مصادر موسعة ومتنوعة مع تحيز واضح - مصححة
  sources: [
    // مصادر رسمية وموالية
    {
      name: "المركز الإعلامي لأنصار الله",
      url: "https://www.almasirah.net/feed/",
      priority: 1,
      bias: "موالي",
      category: "رسمي",
      type: "rss"
    },
    {
      name: "وكالة الأنباء اليمنية (سبأ)",
      url: "https://www.saba.ye/ar/feed/",
      priority: 1,
      bias: "موالي",
      category: "رسمي",
      type: "rss"
    },
    {
      name: "قناة المسيرة",
      url: "https://www.almasirah.net/video-feed/",
      priority: 2,
      bias: "موالي",
      category: "إعلامي",
      type: "rss"
    },
    
    // مصادر محلية في الدريهمي - مصححة
    {
      name: "موقع أخبار اليمن",
      url: "https://www.akhbaralyemen.net/feed/",
      priority: 1,
      bias: "محلي",
      category: "محلي",
      type: "rss"
    },
    {
      name: "اليمن نت - أخبار الحديدة",
      url: "https://www.yemen-nn.com/feed/",
      priority: 2,
      bias: "محلي",
      category: "محلي",
      type: "rss"
    },
    
    // مصادر تعبوية - مصححة
    {
      name: "الموقع الحوثي الرسمي",
      url: "https://www.ansarollah.com/feed/",
      priority: 2,
      bias: "تعبوي",
      category: "تعبوي",
      type: "rss"
    },
    
    // مصادر تعليمية ودينية - مصححة
    {
      name: "مركز الدراسات الإسلامية",
      url: "https://www.islamic-study.org/feed/",
      priority: 3,
      bias: "تعليمي",
      category: "تعليمي",
      type: "rss"
    },
    
    // مصادر إنسانية - مصححة
    {
      name: "الهلال الأحمر اليمني",
      url: "https://www.yemenrc.org/feed/",
      priority: 3,
      bias: "إنساني",
      category: "إنساني",
      type: "rss"
    }
  ],
  
  // مرايا مواقع التواصل الاجتماعي (بدون API)
  socialMediaMirrors: [
    // مواقع تجميع تغريدات تويتر عن اليمن
    {
      name: "تغريدات عن الدريهمي - Nitter",
      url: "https://nitter.net/search?f=tweets&q=%22%D8%A7%D9%84%D8%AF%D8%B1%D9%8A%D9%87%D9%85%D9%8A%22+OR+%22%D8%A7%D9%84%D8%AF%D8%B1%D9%8A%D9%87%D9%85%D9%8A%22+%23%D8%A7%D9%84%D9%8A%D9%85%D9%86",
      priority: 1,
      bias: "اجتماعي",
      category: "تواصل_اجتماعي",
      type: "web_scrape",
      platform: "twitter"
    },
    {
      name: "تغريدات أنصار الله - Nitter",
      url: "https://nitter.net/search?f=tweets&q=%D8%A3%D9%86%D8%B5%D8%A7%D8%B1+%D8%A7%D9%84%D9%84%D9%87+%23%D8%A7%D9%84%D9%8A%D9%85%D9%86",
      priority: 2,
      bias: "موالي",
      category: "تواصل_اجتماعي",
      type: "web_scrape",
      platform: "twitter"
    },
    {
      name: "أخبار الحديدة - Twitter Search",
      url: "https://nitter.net/search?f=tweets&q=%23%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D8%AF%D8%A9+OR+%23%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D8%B1%D9%8A%D8%A9_%D8%A7%D9%84%D8%AF%D8%B1%D9%8A%D9%87%D9%85%D9%8A",
      priority: 2,
      bias: "محلي",
      category: "تواصل_اجتماعي",
      type: "web_scrape",
      platform: "twitter"
    },
    
    // مواقع تجميع منشورات فيسبوك
    {
      name: "منشورات فيسبوك عن الدريهمي - FB-Tracking",
      url: "https://fb.watch/search/?q=%D8%A7%D9%84%D8%AF%D8%B1%D9%8A%D9%87%D9%85%D9%8A+%D8%A7%D9%84%D9%8A%D9%85%D9%86",
      priority: 2,
      bias: "اجتماعي",
      category: "تواصل_اجتماعي",
      type: "web_scrape",
      platform: "facebook"
    },
    
    // مواقع تجميع قنوات تليجرام
    {
      name: "قنوات تليجرام يمنية - TGStat",
      url: "https://tgstat.com/search?q=%D8%A7%D9%84%D9%8A%D9%85%D9%86+%D8%A7%D9%84%D8%AF%D8%B1%D9%8A%D9%87%D9%85%D9%8A",
      priority: 3,
      bias: "اجتماعي",
      category: "تواصل_اجتماعي",
      type: "web_scrape",
      platform: "telegram"
    },
    
    // مدونات ونقاط تجميع
    {
      name: "مجمع أخبار يمنية - Yemen Social",
      url: "https://www.yemensocial.net/search/label/%D8%A7%D9%84%D8%AF%D8%B1%D9%8A%D9%87%D9%85%D9%8A",
      priority: 2,
      bias: "اجتماعي",
      category: "تواصل_اجتماعي",
      type: "web_scrape",
      platform: "aggregator"
    },
    
    // مواقع تقارير إخبارية من تويتر
    {
      name: "Twitter Moments Yemen",
      url: "https://tweettopik.com/search/%D8%A7%D9%84%D9%8A%D9%85%D9%86",
      priority: 3,
      bias: "اجتماعي",
      category: "تواصل_اجتماعي",
      type: "web_scrape",
      platform: "twitter"
    }
  ],
  
  // كلمات مفتاحية موسعة مع تحيز واضح
  keywords: {
    // المواقع الجغرافية في الدريهمي (عربي + إنجليزي)
    locations: [
      "الدريهمي", "مديرية الدريهمي", "Al Durayhimi", "Durayhimi", "Al-Durayhimi",
      "بني مرسي", "الحجبة السفلى", "الحجبة العليا", "الجحيا العليا",
      "الزرانيق", "المساعيد", "الزعفران", "الشجن", "الكرد",
      "الكنباحية", "اللاوية", "المحال", "المكيمنية", "المنقم",
      "دير حسن", "رغمين", "غليفقة", "الهايط", "بيت حسن جماعي",
      "خبت قوبع", "وادي الدريهمي", "سوق الدريهمي", "مركز الدريهمي",
      "مدرسة الدريهمي", "مستشفى الدريهمي", "مسجد الدريهمي",
      // إضافات باللغة الإنجليزية
      "Durayhimi district", "Al Durayhimi area", "Durayhimi Yemen",
      "Bani Marsi", "Al-Hajbah", "Al-Jahya", "Al-Zaraniq",
      "Al-Masa'id", "Al-Za'faran", "Al-Shajan", "Al-Kurd",
      "Al-Kanbahiyah", "Al-Lawiyah", "Al-Mahal", "Al-Mukayminah",
      "Dar Hassan", "Rughmayn", "Ghalifqah", "Al-Hayit"
    ],
    
    // القرى والعزل (عربي + إنجليزي)
    villages: [
      "عزلة الجحيا", "عزلة بني مرسي", "عزلة الحجبة", "عزلة الزرانيق",
      "عزلة المساعيد", "عزلة الكرد", "عزلة الشجن", "عزلة اللاوية",
      // إضافات باللغة الإنجليزية
      "Al-Jahya sub-district", "Bani Marsi sub-district", 
      "Al-Hajbah sub-district", "Al-Zaraniq sub-district",
      "Al-Masa'id sub-district", "Al-Kurd sub-district",
      "Al-Shajan sub-district", "Al-Lawiyah sub-district"
    ],
    
    // الكيانات والتنظيمات الموالية (عربي + إنجليزي)
    proHouthi: [
      "أنصار الله", "الحوثيين", "المجلس السياسي الأعلى", "اللجان الشعبية",
      "لجان الأمر بالمعروف", "قائد الثورة", "السيد عبدالملك الحوثي",
      "بدر الدين الحوثي", "الثورة اليمنية", "أنصار الشريعة",
      "المقاومة اليمنية", "الجيش واللجان", "القوات المسلحة اليمنية",
      "المقاومة الإسلامية", "حركة أنصار الله", "الثورة السبتمبرية",
      // إضافات باللغة الإنجليزية
      "Ansar Allah", "Houthis", "Houthi movement", "Supreme Political Council",
      "Popular Committees", "Commander of the Revolution", "Abdul-Malik al-Houthi",
      "Badr al-Din al-Houthi", "Yemeni Revolution", "Ansar al-Sharia",
      "Yemeni Resistance", "Army and Committees", "Yemeni Armed Forces",
      "Islamic Resistance", "Ansarullah movement", "September Revolution"
    ],
    
    // التنظيمات المعادية (عربي + إنجليزي)
    antiHouthi: [
      "التحالف العربي", "المجلس الانتقالي", "القوات المشتركة",
      "الشرعية", "هادي", "السعودية", "الإمارات", "أمريكا",
      "الصهاينة", "الكيان الصهيوني", "التنظيمات التكفيرية",
      "القاعدة", "داعش", "الارهاب", "العدوان",
      // إضافات باللغة الإنجليزية
      "Arab Coalition", "Transitional Council", "Joint Forces",
      "Legitimacy", "Hadi", "Saudi Arabia", "UAE", "America",
      "Zionists", "Zionist entity", "Takfiri organizations",
      "Al-Qaeda", "ISIS", "terrorism", "aggression"
    ],
    
    // الأحداث العسكرية والتعبوية (عربي + إنجليزي)
    military: [
      "مسيرة", "وقفة", "تعبئة", "تأهيل", "جهوزية", "استعداد",
      "تدريب", "مناورة", "تمرين", "استعراض", "تجمهر", "احتشاد",
      "تدريب عسكري", "تمرين قتالي", "مناورة دفاعية", "استعداد قتالي",
      // إضافات باللغة الإنجليزية
      "march", "rally", "demonstration", "mobilization", "preparation",
      "readiness", "training", "maneuver", "exercise", "parade",
      "gathering", "crowd", "military training", "combat exercise",
      "defensive maneuver", "combat readiness"
    ],
    
    // الأحداث الأمنية (عربي + إنجليزي)
    security: [
      "دورية", "تفتيش", "مراقبة", "رصد", "حماية", "أمن",
      "حرس", "شرطة", "أمن مركزي", "دورية أمنية", "تأمين",
      // إضافات باللغة الإنجليزية
      "patrol", "inspection", "monitoring", "surveillance", "protection",
      "security", "guard", "police", "central security", "security patrol",
      "securing"
    ],
    
    // الشهداء والأحداث الدموية (عربي + إنجليزي)
    martyrs: [
      "شهيد", "شهداء", "استشهاد", "استهداف", "قصف", "غارة",
      "ضحية", "جرحى", "مصاب", "تفجير", "انفجار", "كمين",
      "استشهادي", "ضحايا", "إصابة", "قتيل",
      // إضافات باللغة الإنجليزية
      "martyr", "martyrs", "martyrdom", "targeting", "bombing", "airstrike",
      "victim", "wounded", "injured", "explosion", "blast", "ambush",
      "suicide bomber", "casualties", "injury", "killed"
    ],
    
    // الخطاب التعبوي والسياسي (عربي + إنجليزي)
    rhetoric: [
      "طوفان الأقصى", "غزة", "فلسطين", "المقاومة", "الصمود",
      "النصر", "الجهاد", "المجاهدين", "الأقصى", "القدس",
      "المشروع الصهيوني", "الاستكبار العالمي", "العدوان",
      "المواجهة", "الصراع", "المعركة", "الثورة", "التضحية",
      // إضافات باللغة الإنجليزية
      "Al-Aqsa Flood", "Gaza", "Palestine", "resistance", "steadfastness",
      "victory", "jihad", "mujahideen", "Al-Aqsa", "Jerusalem",
      "Zionist project", "global arrogance", "aggression",
      "confrontation", "conflict", "battle", "revolution", "sacrifice"
    ],
    
    // المناسبات والأنشطة (عربي + إنجليزي)
    activities: [
      "تخرج", "دورة", "خريجين", "احتفال", "تكريم", "توزيع",
      "مساعدات", "إغاثة", "تعزيز", "دعم", "تضامن", "وقفة تضامنية",
      "حفل", "مناسبة", "احتفالية", "احتفاء",
      // إضافات باللغة الإنجليزية
      "graduation", "course", "graduates", "celebration", "honoring", "distribution",
      "aid", "relief", "reinforcement", "support", "solidarity", "solidarity stand",
      "ceremony", "occasion", "festivity", "commemoration"
    ],
    
    // التعليم والدعوة (عربي + إنجليزي)
    education: [
      "محاضرة", "ندوة", "درس", "توعية", "تثقيف", "دعوة",
      "خطبة", "موعظة", "توجيه", "إرشاد", "تأهيل", "تدريس",
      // إضافات باللغة الإنجليزية
      "lecture", "seminar", "lesson", "awareness", "education", "invitation",
      "sermon", "advice", "guidance", "counseling", "rehabilitation", "teaching"
    ],
    
    // الاقتصاد والأسواق (عربي + إنجليزي)
    economy: [
      "سوق", "تجارة", "بيع", "شراء", "أسعار", "سلع",
      "مواد", "تسويق", "تجاري", "اقتصاد", "معيشة", "تكاليف",
      // إضافات باللغة الإنجليزية
      "market", "trade", "selling", "buying", "prices", "goods",
      "materials", "marketing", "commercial", "economy", "livelihood", "costs"
    ],
    
    // الصحة والخدمات (عربي + إنجليزي)
    health: [
      "مستشفى", "مريض", "علاج", "دواء", "صحة", "طبيب",
      "ممرض", "عيادة", "رعاية", "خدمة", "تطبيب", "إسعاف",
      // إضافات باللغة الإنجليزية
      "hospital", "patient", "treatment", "medicine", "health", "doctor",
      "nurse", "clinic", "care", "service", "medical treatment", "ambulance"
    ],
    
    // البنية التحتية (عربي + إنجليزي)
    infrastructure: [
      "طريق", "جسر", "مدرسة", "مسجد", "مكتب", "مبنى",
      "إنشاء", "بناء", "ترميم", "تطوير", "تحسين", "خدمات",
      // إضافات باللغة الإنجليزية
      "road", "bridge", "school", "mosque", "office", "building",
      "construction", "building", "renovation", "development", "improvement", "services"
    ],
    
    // هاشتاقات شائعة (عربي + إنجليزي)
    hashtags: [
      "#الدريهمي", "#الحديدة", "#اليمن", "#أنصار_الله",
      "#الحوثيين", "#المقاومة_اليمنية", "#غزة", "#فلسطين",
      // إضافات باللغة الإنجليزية
      "#Durayhimi", "#Hodeidah", "#Yemen", "#AnsarAllah",
      "#Houthis", "#YemeniResistance", "#Gaza", "#Palestine"
    ],
    
    // منصات التواصل الاجتماعي
    socialMediaTerms: [
      "تغريدة", "تويتر", "فيسبوك", "تليجرام", "انستغرام",
      "منشور", "بوست", "هاشتاق", "مشاركة", "تعليق",
      // إضافات باللغة الإنجليزية
      "tweet", "Twitter", "Facebook", "Telegram", "Instagram",
      "post", "hashtag", "share", "comment", "social media"
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
import * as cheerio from 'cheerio';

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
const socialMediaFile = path.join(config.dataPath, "social_media.json");

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
  socialMediaMatches: 0,
  lastScan: null,
  lastSocialScan: null,
  lastReport: null,
  systemStart: new Date().toISOString(),
  locationsActivity: {},
  sourceStats: {},
  categoryStats: {},
  platformStats: {}
});
let reports = initFile(reportFile, []);
let locationsActivity = initFile(locationsFile, {});
let socialMediaCache = initFile(socialMediaFile, {
  lastScans: {},
  discoveredAccounts: [],
  trendingHashtags: []
});

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
        locationsActivity: locationsActivity,
        socialMediaCache: socialMediaCache
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
        socialMediaCache = backupData.socialMediaCache || {
          lastScans: {},
          discoveredAccounts: [],
          trendingHashtags: []
        };
        
        console.log('🔄 تم استعادة البيانات من النسخة الاحتياطية');
        return true;
      }
    } catch (error) {
      console.error('❌ خطأ في استعادة النسخة الاحتياطية:', error.message);
    }
    return false;
  }
}

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
    .replace(/[^\w\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF#@]/g, '')
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
    fs.writeFileSync(socialMediaFile, JSON.stringify(socialMediaCache, null, 2));
    BackupSystem.backup();
  } catch (error) {
    console.error('❌ خطأ في حفظ البيانات:', error.message);
  }
}

/* ================== WEB SCRAPER FOR SOCIAL MEDIA ================== */
class SocialMediaScraper {
  static async scrapeWebsite(url, platform, retries = config.maxRetries) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`🌐 محاولة ${attempt}/${retries} لجلب ${platform}: ${url}`);
        
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'ar,en-US;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Cache-Control': 'max-age=0'
          },
          timeout: 30000
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const html = await response.text();
        const $ = cheerio.load(html);
        
        let results = [];
        
        switch(platform) {
          case 'twitter':
            results = this.scrapeTwitter($, url);
            break;
          case 'facebook':
            results = this.scrapeFacebook($, url);
            break;
          case 'telegram':
            results = this.scrapeTelegram($, url);
            break;
          case 'aggregator':
            results = this.scrapeAggregator($, url);
            break;
          default:
            results = this.scrapeGeneric($, url);
        }
        
        return results;
        
      } catch (error) {
        console.error(`❌ محاولة ${attempt} فشلت:`, error.message);
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, config.retryDelay * attempt));
        } else {
          console.error(`❌ فشل نهائي في جلب ${platform}:`, error.message);
          return [];
        }
      }
    }
  }
  
  static scrapeTwitter($, url) {
    const results = [];
    
    // محاولة أشكال مختلفة لتنسيقات Twitter/Nitter
    $('.timeline-item, .tweet, .timeline-item, .timeline-Tweet, .tweet-wrapper').each((i, elem) => {
      try {
        const $elem = $(elem);
        let text = '';
        let author = '';
        let timestamp = '';
        let link = '';
        
        // استخراج النص
        text = $elem.find('.tweet-content, .tweet-body, .tweet-text, .timeline-Tweet-text').text().trim();
        
        // استخراج المؤلف
        author = $elem.find('.fullname, .username, .tweet-header .username, .tweet-poster').text().trim();
        
        // استخراج الوقت
        timestamp = $elem.find('.tweet-date, .tweet-timestamp, .tweet-time, .date').attr('title') || 
                    $elem.find('.tweet-date, .tweet-timestamp, .tweet-time, .date').text().trim();
        
        // استخراج الرابط
        const tweetLink = $elem.find('.tweet-link, .tweet-permalink').attr('href');
        link = tweetLink ? `https://nitter.net${tweetLink}` : url;
        
        if (text && this.containsKeywords(text)) {
          results.push({
            text: text.substring(0, 500),
            author: author,
            timestamp: timestamp || new Date().toISOString(),
            link: link,
            platform: 'twitter',
            source_url: url
          });
        }
      } catch (e) {
        console.error('❌ خطأ في استخراج تغريدة:', e.message);
      }
    });
    
    // إذا لم نجد نتائج، نبحث عن أي نص يحتوي على الكلمات المفتاحية
    if (results.length === 0) {
      $('body').text().split('\n').forEach(line => {
        if (line.trim() && this.containsKeywords(line) && line.length > 50) {
          results.push({
            text: line.substring(0, 500),
            author: 'غير معروف',
            timestamp: new Date().toISOString(),
            link: url,
            platform: 'twitter',
            source_url: url
          });
        }
      });
    }
    
    return results;
  }
  
  static scrapeFacebook($, url) {
    const results = [];
    
    $('[id*="post"], [class*="post"], [role="article"], .userContent, ._5pcr').each((i, elem) => {
      try {
        const $elem = $(elem);
        let text = $elem.find('.userContent, ._5pbx, [data-testid="post_message"]').text().trim();
        
        if (!text) {
          text = $elem.text().trim();
        }
        
        if (text && this.containsKeywords(text)) {
          const author = $elem.find('.fwb, ._6qw4, [data-testid="post_author_link"]').text().trim() || 'غير معروف';
          
          results.push({
            text: text.substring(0, 500),
            author: author,
            timestamp: new Date().toISOString(),
            link: url,
            platform: 'facebook',
            source_url: url
          });
        }
      } catch (e) {
        console.error('❌ خطأ في استخراج منشور فيسبوك:', e.message);
      }
    });
    
    return results;
  }
  
  static scrapeTelegram($, url) {
    const results = [];
    
    $('.tgme_widget_message, .message, .tgme_channel_history').each((i, elem) => {
      try {
        const $elem = $(elem);
        const text = $elem.find('.tgme_widget_message_text, .message_text').text().trim();
        
        if (text && this.containsKeywords(text)) {
          const author = $elem.find('.tgme_widget_message_author, .message_author').text().trim() || 'غير معروف';
          
          results.push({
            text: text.substring(0, 500),
            author: author,
            timestamp: new Date().toISOString(),
            link: url,
            platform: 'telegram',
            source_url: url
          });
        }
      } catch (e) {
        console.error('❌ خطأ في استخراج رسالة تليجرام:', e.message);
      }
    });
    
    return results;
  }
  
  static scrapeAggregator($, url) {
    const results = [];
    
    // البحث عن أي محتوى قد يكون من وسائل التواصل الاجتماعي
    $('article, .post, .entry, .item, [class*="tweet"], [class*="post"]').each((i, elem) => {
      try {
        const $elem = $(elem);
        const text = $elem.text().trim();
        
        if (text && this.containsKeywords(text) && text.length > 100) {
          const author = $elem.find('.author, .byline, .posted-by').text().trim() || 'غير معروف';
          const time = $elem.find('.time, .date, .timestamp').text().trim() || new Date().toISOString();
          const linkElem = $elem.find('a').first();
          const link = linkElem.attr('href') ? new URL(linkElem.attr('href'), url).href : url;
          
          results.push({
            text: text.substring(0, 500),
            author: author,
            timestamp: time,
            link: link,
            platform: 'aggregator',
            source_url: url
          });
        }
      } catch (e) {
        console.error('❌ خطأ في استخراج محتوى تجميعي:', e.message);
      }
    });
    
    return results;
  }
  
  static scrapeGeneric($, url) {
    const results = [];
    const bodyText = $('body').text();
    
    // البحث عن أي إشارة إلى وسائل التواصل الاجتماعي
    if (bodyText.includes('twitter.com/') || bodyText.includes('tweet') || 
        bodyText.includes('facebook.com/') || bodyText.includes('post') ||
        bodyText.includes('telegram.me/') || bodyText.includes('t.me/')) {
      
      // استخراج أجزاء النص التي تحتوي على الكلمات المفتاحية
      const lines = bodyText.split('\n');
      lines.forEach(line => {
        if (this.containsKeywords(line) && line.length > 50) {
          results.push({
            text: line.substring(0, 500),
            author: 'غير معروف',
            timestamp: new Date().toISOString(),
            link: url,
            platform: 'generic',
            source_url: url
          });
        }
      });
    }
    
    return results;
  }
  
  static containsKeywords(text) {
    const normText = normalize(text);
    
    // فحص جميع الكلمات المفتاحية
    for (const category in config.keywords) {
      for (const keyword of config.keywords[category]) {
        if (normText.includes(normalize(keyword))) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  static async discoverNewSources() {
    const discovered = [];
    const searchTerms = [
      'الدريهمي اليمن تويتر',
      'الحديدة تويتر',
      'أنصار الله تويتر',
      'اليمن فيسبوك',
      'اليمن تليجرام',
      'Durayhimi Yemen Twitter',
      'Hodeidah Twitter',
      'Ansar Allah Telegram'
    ];
    
    for (const term of searchTerms) {
      try {
        // استخدام محركات بحث بديلة للعثور على مصادر
        const searchUrl = `https://duckduckgo.com/html/?q=${encodeURIComponent(term)}`;
        const response = await fetch(searchUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        if (response.ok) {
          const html = await response.text();
          const $ = cheerio.load(html);
          
          $('.result__url').each((i, elem) => {
            const url = $(elem).text().trim();
            if (url && (url.includes('twitter.com/') || url.includes('facebook.com/') || 
                       url.includes('t.me/') || url.includes('telegram.me/'))) {
              
              // تحويل روابط تويتر إلى nitter (بدون تسجيل دخول)
              let cleanUrl = url;
              if (url.includes('twitter.com/')) {
                const username = url.split('twitter.com/')[1]?.split('/')[0];
                if (username) {
                  cleanUrl = `https://nitter.net/${username}`;
                }
              }
              
              if (!socialMediaCache.discoveredAccounts.includes(cleanUrl)) {
                discovered.push({
                  url: cleanUrl,
                  platform: url.includes('twitter.com') ? 'twitter' : 
                          url.includes('facebook.com') ? 'facebook' : 'telegram',
                  discovered_at: new Date().toISOString()
                });
              }
            }
          });
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (error) {
        console.error(`❌ خطأ في اكتشاف مصادر لـ ${term}:`, error.message);
      }
    }
    
    return discovered;
  }
}

/* ================== ADVANCED INTELLIGENCE ANALYSIS ================== */
class AdvancedIntelligenceAnalyzer {
  static analyze(text, source, platform = 'rss') {
    const normText = normalize(text);
    const analysis = {
      score: 0,
      type: "ذكر عادي",
      category: "عام",
      priority: "منخفض",
      bias: "محايد",
      platform: platform,
      entities: {
        proHouthi: [],
        antiHouthi: [],
        locations: [],
        villages: [],
        events: [],
        categories: [],
        hashtags: [],
        socialMediaTerms: []
      },
      sentiment: "محايد",
      recommendations: [],
      confidence: 60,
      timeContext: this.analyzeTimeContext(text),
      isSocialMedia: platform !== 'rss'
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
      infrastructure: 1,
      hashtags: 1,
      socialMediaTerms: 0.5
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
          } else if (category === 'hashtags' && !analysis.entities.hashtags.includes(keyword)) {
            analysis.entities.hashtags.push(keyword);
          } else if (category === 'socialMediaTerms') {
            analysis.entities.socialMediaTerms.push(keyword);
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
    if (analysis.isSocialMedia) {
      if (analysis.entities.martyrs.length > 0) return "🚨 منشور تواصل عن حدث عسكري";
      if (analysis.entities.military.length > 0) return "⚠️ منشور تواصل عن نشاط عسكري";
      if (analysis.entities.proHouthi.length > 1) return "🎯 منشور تواصل موالي";
      return "🗨️ منشور تواصل اجتماعي";
    }
    
    if (analysis.entities.martyrs.length > 0) return "🚨 حدث عسكري/استشهادي";
    if (analysis.entities.military.length > 0) return "⚠️ نشاط عسكري/تعبوي";
    if (analysis.entities.proHouthi.length > 2) return "🎯 خطاب/نشاط موالي";
    if (analysis.entities.antiHouthi.length > 1) return "📢 ذكر معادٍ";
    if (analysis.entities.activities.length > 0) return "🎉 مناسبة/نشاط";
    return "🗨️ ذكر عام";
  }
  
  static determineCategory(analysis) {
    if (analysis.isSocialMedia) return "تواصل اجتماعي";
    
    const categories = analysis.entities.categories;
    if (categories.includes('martyrs')) return "عسكري/أمني";
    if (categories.includes('military')) return "تعبوي/تدريبي";
    if (categories.includes('proHouthi')) return "سياسي/تعبوي";
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
    let confidence = analysis.isSocialMedia ? 50 : 60;
    const entities = analysis.entities;
    
    if (entities.locations.length > 0) confidence += 10;
    if (entities.proHouthi.length > 0) confidence += 10;
    if (entities.events.length > 0) confidence += 10;
    if (analysis.score >= 5) confidence += 10;
    if (analysis.isSocialMedia && entities.hashtags.length > 0) confidence += 5;
    
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
    
    if (analysis.isSocialMedia) {
      recommendations.push("مراقبة الحساب", "تتبع النقاش");
    }
    
    return recommendations.length > 0 ? recommendations : ["المتابعة الروتينية"];
  }
  
  static analyzeTimeContext(text) {
    const normText = normalize(text);
    const timePatterns = {
      "فوري": /(الآن|حالياً|في هذه اللحظة|منذ قليل|قبل قليل|just now|currently|right now)/i,
      "يومي": /(اليوم|هذا اليوم|صباح اليوم|مساء اليوم|today|this morning|this evening)/i,
      "قريب": /(أمس|الأمس|يوم أمس|yesterday|last night)/i,
      "مستقبلي": /(غداً|بعد غد|الأيام القادمة|المستقبل|tomorrow|next days|future)/i
    };
    
    for (const [type, pattern] of Object.entries(timePatterns)) {
      if (pattern.test(normText)) {
        return { type: type, confidence: 80 };
      }
    }
    
    return { type: "غير محدد", confidence: 50 };
  }
}

/* ================== RSS PARSER WITH RETRY ================== */
class ResilientParser {
  constructor() {
    this.parser = new Parser({
      timeout: 45000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
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
        
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          timeout: 30000
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const text = await response.text();
        
        // التحقق من أن المحتوى هو XML صالح
        if (!text.trim().startsWith('<?xml') && !text.trim().startsWith('<rss')) {
          console.warn(`⚠️ قد لا يكون المحتوى XML صالحاً، ولكن سيتم المحاولة`);
        }
        
        const feed = await this.parser.parseString(text);
        return feed;
      } catch (error) {
        console.error(`❌ محاولة ${attempt} فشلت:`, error.message);
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, config.retryDelay * attempt));
        } else {
          console.error(`❌ فشل نهائي في تحليل ${url}:`, error.message);
          throw error;
        }
      }
    }
  }
}

const resilientParser = new ResilientParser();

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
  
  static async sendImmediateAlert(item, analysis, isSocialMedia = false) {
    const alertLevel = analysis.priority.includes("🔥🔥") ? "🚨🚨" : 
                     analysis.priority.includes("🔥") ? "🚨" : "⚠️";
    
    const platformIcon = isSocialMedia ? {
      'twitter': '🐦',
      'facebook': '📘',
      'telegram': '📨',
      'aggregator': '🔗',
      'generic': '🌐'
    }[analysis.platform] || '📱' : '📰';
    
    const message = `
${alertLevel} <b>${isSocialMedia ? 'منشور تواصل اجتماعي' : 'خبر جديد'} - ${analysis.type}</b>
${alertLevel} <b>الأولوية:</b> ${analysis.priority} ${platformIcon}

<b>📍 الموقع:</b> ${analysis.entities.locations[0] || analysis.entities.villages[0] || "الدريهمي"}
<b>🎯 الجانب:</b> ${analysis.bias}
<b>📊 التصنيف:</b> ${analysis.category}
${isSocialMedia ? `<b>📱 المنصة:</b> ${analysis.platform}` : ''}

<b>📰 ${isSocialMedia ? 'النص:' : 'العنوان:'}</b>
${(item.text || item.title || "حدث جديد").slice(0, 150)}

${item.author ? `<b>👤 المؤلف:</b> ${item.author}` : ''}

<b>🔍 الكيانات البارزة:</b>
${[...analysis.entities.proHouthi, ...analysis.entities.events, ...analysis.entities.hashtags]
  .slice(0, 3)
  .join(' • ') || "نشاط موالي"}

<b>💬 السياق الزمني:</b> ${analysis.timeContext.type}
<b>🎯 الثقة:</b> ${analysis.confidence}%

${analysis.recommendations.length > 0 ? 
  `<b>💡 التوصيات:</b>\n${analysis.recommendations[0]}` : ''}

<b>🔗 ${isSocialMedia ? 'المصدر:' : 'المصدر:'}</b> ${item.source || 'وسائل التواصل'}
<b>🕐 الوقت:</b> ${new Date().toLocaleTimeString('ar-YE')}
━━━━━━━━━━━━━━━━━━━━
<i>${isSocialMedia ? 'تم رصد هذا المنشور على مواقع التواصل' : 'سيتم تضمين هذا الحدث في التقرير اليومي الساعة 00:00'}</i>
    `.trim();
    
    await this.sendMessage(message, { 
      preview: false, 
      silent: !analysis.priority.includes("🔥") 
    });
  }
}

/* ================== ADVANCED SCANNER ================== */
class AdvancedScanner {
  static async scanSource(source, attempt = 1) {
    try {
      console.log(`🔍 [${source.category}] جاري فحص: ${source.name}`);
      
      let feed;
      if (source.type === 'rss') {
        feed = await resilientParser.parseURL(safeURL(source.url));
      } else {
        // للمصادر غير RSS، نقوم بالتحقق فقط
        return [];
      }
      
      const results = [];
      
      for (const item of feed.items || []) {
        const content = `${item.title || ''} ${item.contentSnippet || ''} ${item.content || ''}`;
        
        // فحص سريع للكلمات المفتاحية
        if (!this.quickKeywordCheck(content)) continue;
        
        const itemHash = generateHash(`${item.link || ''}${item.pubDate || ''}${content.substring(0, 200)}`);
        
        if (sent.has(itemHash)) continue;
        sent.add(itemHash);
        
        // التحليل المتقدم
        const analysis = AdvancedIntelligenceAnalyzer.analyze(content, source.name, 'rss');
        
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
      
      if (!stats.sourceStats[source.name]) {
        stats.sourceStats[source.name] = { scans: 0, matches: 0, errors: 0 };
      }
      stats.sourceStats[source.name].errors = (stats.sourceStats[source.name].errors || 0) + 1;
      
      if (attempt < config.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, config.retryDelay * attempt));
        return await this.scanSource(source, attempt + 1);
      }
      
      return [];
    }
  }
  
  static async scanSocialMedia(source, attempt = 1) {
    try {
      console.log(`📱 [${source.category}] جاري فحص وسائل التواصل: ${source.name}`);
      
      const results = await SocialMediaScraper.scrapeWebsite(
        safeURL(source.url), 
        source.platform
      );
      
      const processedResults = [];
      
      for (const item of results) {
        const itemHash = generateHash(`${item.link || ''}${item.timestamp}${item.text.substring(0, 200)}`);
        
        if (sent.has(itemHash)) continue;
        sent.add(itemHash);
        
        // التحليل المتقدم
        const analysis = AdvancedIntelligenceAnalyzer.analyze(item.text, source.name, source.platform);
        
        const record = {
          id: itemHash,
          timestamp: new Date().toISOString(),
          source: source.name,
          sourceCategory: source.category,
          sourceBias: source.bias,
          platform: source.platform,
          text: item.text,
          author: item.author,
          link: item.link,
          pubDate: item.timestamp,
          analysis: analysis,
          rawContent: item.text
        };
        
        processedResults.push(record);
        
        // معالجة السجل
        await this.processSocialMediaRecord(record, source);
      }
      
      // تحديث إحصائيات المنصة
      if (!stats.platformStats[source.platform]) {
        stats.platformStats[source.platform] = { scans: 0, matches: 0 };
      }
      stats.platformStats[source.platform].scans++;
      stats.platformStats[source.platform].matches += processedResults.length;
      
      // تحديث وقت آخر فحص للمصدر
      socialMediaCache.lastScans[source.url] = new Date().toISOString();
      
      console.log(`✅ [${source.category}] ${source.name}: ${processedResults.length} نتيجة`);
      return processedResults;
      
    } catch (error) {
      console.error(`❌ [${source.category}] خطأ في ${source.name} (المحاولة ${attempt}):`, error.message);
      
      if (attempt < config.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, config.retryDelay * attempt));
        return await this.scanSocialMedia(source, attempt + 1);
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
      ...config.keywords.military.slice(0, 3),
      ...config.keywords.hashtags.slice(0, 3)
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
      categories: record.analysis.entities.categories,
      isSocialMedia: false
    });
    
    // إرسال تنبيه فوري للأحداث المهمة
    if (record.analysis.priority.includes("🔥") || 
        (record.analysis.bias === "موالي" && record.analysis.score >= 3)) {
      await ResilientTelegramBot.sendImmediateAlert(record, record.analysis, false);
    }
    
    // حفظ البيانات بشكل دوري
    if (stats.totalMatches % 10 === 0) {
      saveData();
    }
  }
  
  static async processSocialMediaRecord(record, source) {
    // تحديث الإحصائيات العامة
    stats.totalMatches++;
    stats.socialMediaMatches++;
    
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
    
    // تحديث الهاشتاقات المتداولة
    record.analysis.entities.hashtags.forEach(hashtag => {
      if (!socialMediaCache.trendingHashtags.find(h => h.tag === hashtag)) {
        socialMediaCache.trendingHashtags.push({
          tag: hashtag,
          count: 1,
          firstSeen: record.timestamp,
          lastSeen: record.timestamp,
          platform: record.platform
        });
      } else {
        const hashtagObj = socialMediaCache.trendingHashtags.find(h => h.tag === hashtag);
        hashtagObj.count++;
        hashtagObj.lastSeen = record.timestamp;
      }
    });
    
    // إضافة إلى السجل اليومي
    daily.push({
      id: record.id,
      time: record.timestamp,
      source: record.source,
      sourceCategory: record.sourceCategory,
      sourceBias: record.sourceBias,
      platform: record.platform,
      title: record.text?.substring(0, 100) || 'منشور تواصل اجتماعي',
      author: record.author,
      link: record.link,
      analysis: record.analysis,
      locations: record.analysis.entities.locations,
      villages: record.analysis.entities.villages,
      categories: record.analysis.entities.categories,
      hashtags: record.analysis.entities.hashtags,
      isSocialMedia: true
    });
    
    // إرسال تنبيه فوري للأحداث المهمة
    if (record.analysis.priority.includes("🔥") || 
        (record.analysis.bias === "موالي" && record.analysis.score >= 2)) {
      await ResilientTelegramBot.sendImmediateAlert(record, record.analysis, true);
    }
    
    // حفظ البيانات بشكل دوري
    if (stats.socialMediaMatches % 5 === 0) {
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
    
    // فحص المصادر التقليدية
    for (let i = 0; i < sourcesByPriority.length; i++) {
      const source = sourcesByPriority[i];
      
      if (source.type !== 'rss') continue;
      
      const delay = source.priority * 1000 + (Math.random() * 2000);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      const results = await this.scanSource(source);
      allResults.push(...results);
      
      if ((i + 1) % 3 === 0) {
        saveData();
      }
    }
    
    const scanDuration = Math.round((Date.now() - startTime) / 1000);
    
    // إرسال ملخص الفحص
    if (allResults.length > 0) {
      await this.sendIntelligentSummary(allResults, scanDuration, false);
    }
    
    console.log(`✅ اكتمل فحص المصادر في ${scanDuration} ثانية. النتائج: ${allResults.length}`);
    
    return allResults;
  }
  
  static async scanSocialMediaSources() {
    console.log('📱 بدء فحص وسائل التواصل الاجتماعي...');
    
    const startTime = Date.now();
    stats.lastSocialScan = new Date().toISOString();
    
    const allResults = [];
    const socialSources = [...config.socialMediaMirrors].sort((a, b) => a.priority - b.priority);
    
    // فحص مصادر التواصل الاجتماعي
    for (let i = 0; i < socialSources.length; i++) {
      const source = socialSources[i];
      
      // فحص متباعد لتجنب الحظر
      const delay = source.priority * 2000 + (Math.random() * 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      const results = await this.scanSocialMedia(source);
      allResults.push(...results);
      
      // اكتشاف مصادر جديدة كل 5 فحوصات
      if (i % 5 === 0 && i > 0) {
        await this.discoverNewSocialMediaSources();
      }
      
      if ((i + 1) % 3 === 0) {
        saveData();
      }
    }
    
    const scanDuration = Math.round((Date.now() - startTime) / 1000);
    
    // إرسال ملخص فحص التواصل الاجتماعي
    if (allResults.length > 0) {
      await this.sendIntelligentSummary(allResults, scanDuration, true);
    }
    
    console.log(`✅ اكتمل فحص التواصل الاجتماعي في ${scanDuration} ثانية. النتائج: ${allResults.length}`);
    
    // حفظ نهائي للبيانات
    saveData();
    
    return allResults;
  }
  
  static async discoverNewSocialMediaSources() {
    console.log('🔍 جاري اكتشاف مصادر تواصل اجتماعي جديدة...');
    
    try {
      const newSources = await SocialMediaScraper.discoverNewSources();
      
      for (const source of newSources) {
        if (!socialMediaCache.discoveredAccounts.includes(source.url)) {
          socialMediaCache.discoveredAccounts.push(source.url);
          
          // إضافة إلى قائمة المصادر الديناميكية
          config.socialMediaMirrors.push({
            name: `مصدر مكتشف - ${source.platform}`,
            url: source.url,
            priority: 3,
            bias: "اجتماعي",
            category: "تواصل_اجتماعي",
            type: "web_scrape",
            platform: source.platform
          });
          
          console.log(`✅ تم اكتشاف مصدر جديد: ${source.url}`);
        }
      }
      
      if (newSources.length > 0) {
        await ResilientTelegramBot.sendMessage(
          `🆕 <b>اكتشاف مصادر جديدة</b>\n\n` +
          `تم اكتشاف ${newSources.length} مصدر جديد لوسائل التواصل الاجتماعي.\n` +
          `سيتم مراقبتها في الفحوصات القادمة.`
        );
      }
      
      saveData();
      
    } catch (error) {
      console.error('❌ خطأ في اكتشاف مصادر جديدة:', error.message);
    }
  }
  
  static async sendIntelligentSummary(results, duration, isSocialMedia = false) {
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
    
    const platformInfo = isSocialMedia ? 
      `<b>📱 المنصات:</b> ${[...new Set(results.map(r => r.platform))].join('، ')}\n` : '';
    
    const message = `
📊 <b>ملخص فحص ${isSocialMedia ? 'التواصل الاجتماعي' : 'المصادر'}</b>
${'━'.repeat(40)}

<b>⏱️ المدة:</b> ${duration} ثانية
<b>🔍 النتائج:</b> ${results.length} ${isSocialMedia ? 'منشور' : 'حدث'}
<b>🎯 الأحداث الموالية:</b> ${proResults.length}
<b>🚨 الأحداث عالية الأولوية:</b> ${highPriority.length}
${platformInfo}
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
<i>${isSocialMedia ? 'تم فحص مرايا وسائل التواصل الاجتماعي' : 'تم فحص المصادر التقليدية'}</i>
    `.trim();
    
    await ResilientTelegramBot.sendMessage(message, { silent: true });
  }
}

/* ================== RELIABLE REPORT SCHEDULER ================== */
class ReliableReportScheduler {
  static scheduleDailyReport() {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    let timeUntilMidnight = midnight - now;
    
    if (timeUntilMidnight < 0) {
      midnight.setDate(midnight.getDate() + 1);
      timeUntilMidnight = midnight - now;
    }
    
    console.log(`⏰ تم جدولة التقرير اليومي بعد ${Math.round(timeUntilMidnight / 1000 / 60)} دقيقة`);
    
    const reportTimer = setTimeout(async () => {
      try {
        console.log('📅 بدء إعداد التقرير اليومي الشامل...');
        
        // توليد التقرير المتقدم
        const report = this.generateDailyReport();
        
        // حفظ التقرير
        reports.push({
          date: new Date().toISOString(),
          report: report,
          stats: {
            totalEvents: daily.length,
            proEvents: stats.proHouthiEvents,
            antiEvents: stats.antiHouthiEvents,
            socialMediaEvents: stats.socialMediaMatches
          }
        });
        
        if (reports.length > 50) {
          reports = reports.slice(-30);
        }
        
        stats.lastReport = new Date().toISOString();
        
        // إرسال التقرير عبر Telegram
        await this.sendDailyReport(report);
        
        // أرشفة أحداث اليوم
        this.archiveDailyData();
        
        // إعادة ضبط السجل اليومي
        this.resetDailyData();
        
        console.log('✅ تم إرسال التقرير اليومي وإعادة ضبط البيانات');
        
      } catch (error) {
        console.error('❌ خطأ في إعداد التقرير اليومي:', error);
        
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
        this.scheduleDailyReport();
      }
    }, timeUntilMidnight);
    
    this.reportTimer = reportTimer;
  }
  
  static generateDailyReport() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // تجميع أحداث اليوم
    const todayEvents = daily.filter(event => {
      const eventDate = new Date(event.time);
      return eventDate.toDateString() === today.toDateString();
    });
    
    // تحليل الإحصائيات
    const socialMediaEvents = todayEvents.filter(e => e.isSocialMedia);
    const proEvents = todayEvents.filter(e => e.analysis.bias === "موالي");
    const antiEvents = todayEvents.filter(e => e.analysis.bias === "معادي");
    const highPriority = todayEvents.filter(e => e.analysis.priority.includes("🔥"));
    
    // تحليل المنصات
    const platformStats = {};
    socialMediaEvents.forEach(event => {
      const platform = event.platform || 'غير معروف';
      platformStats[platform] = (platformStats[platform] || 0) + 1;
    });
    
    // تحليل المواقع
    const locationCounts = {};
    todayEvents.forEach(event => {
      event.locations.forEach(loc => {
        locationCounts[loc] = (locationCounts[loc] || 0) + 1;
      });
    });
    
    const hotspots = Object.entries(locationCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([loc, count]) => ({
        location: loc,
        count: count
      }));
    
    // التقرير
    const report = {
      metadata: {
        classification: "تقرير يومي استخباراتي شامل",
        date: this.formatArabicDate(today),
        period: "24 ساعة الماضية",
        location: "مديرية الدريهمي – محافظة الحديدة"
      },
      
      summary: {
        totalEvents: todayEvents.length,
        socialMediaEvents: socialMediaEvents.length,
        proEvents: proEvents.length,
        antiEvents: antiEvents.length,
        highPriorityEvents: highPriority.length,
        platforms: platformStats,
        hotspots: hotspots
      },
      
      socialMediaAnalysis: {
        totalPosts: socialMediaEvents.length,
        byPlatform: platformStats,
        trendingHashtags: socialMediaCache.trendingHashtags
          .sort((a, b) => b.count - a.count)
          .slice(0, 10),
        discoveredAccounts: socialMediaCache.discoveredAccounts.length
      },
      
      notableEvents: todayEvents
        .filter(e => e.analysis.priority.includes("🔥") || e.analysis.score >= 5)
        .slice(0, 10)
        .map(e => ({
          type: e.analysis.type,
          source: e.source,
          platform: e.platform,
          locations: e.locations,
          priority: e.analysis.priority,
          time: new Date(e.time).toLocaleTimeString('ar-YE')
        })),
      
      recommendations: this.generateRecommendations(todayEvents)
    };
    
    return report;
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
  
  static generateRecommendations(events) {
    const recommendations = [];
    
    const highPriorityCount = events.filter(e => e.analysis.priority.includes("🔥")).length;
    if (highPriorityCount > 3) {
      recommendations.push("زيادة المراقبة الأمنية في النقاط الساخنة");
    }
    
    const socialMediaCount = events.filter(e => e.isSocialMedia).length;
    if (socialMediaCount > 10) {
      recommendations.push("تعزيز مراقبة وسائل التواصل الاجتماعي");
    }
    
    const proEventsCount = events.filter(e => e.analysis.bias === "موالي").length;
    if (proEventsCount > 5) {
      recommendations.push("تقييم النشاط التعبوي والاستعدادات");
    }
    
    if (recommendations.length === 0) {
      recommendations.push("الاستمرار في المراقبة الروتينية");
    }
    
    return recommendations;
  }
  
  static async sendDailyReport(report) {
    console.log('📨 جاري إرسال التقرير اليومي...');
    
    const message = `
📄 <b>${report.metadata.classification.toUpperCase()}</b>
${'━'.repeat(40)}

<b>التاريخ:</b> ${report.metadata.date}
<b>الفترة:</b> ${report.metadata.period}
<b>المكان:</b> ${report.metadata.location}

<b>ملخص النشاط:</b>
• إجمالي الأحداث: ${report.summary.totalEvents}
• منشورات التواصل: ${report.summary.socialMediaEvents}
• أحداث موالية: ${report.summary.proEvents}
• أحداث معادية: ${report.summary.antiEvents}
• أحداث عالية الأولوية: ${report.summary.highPriorityEvents}

<b>منصات التواصل الاجتماعي:</b>
${Object.entries(report.socialMediaAnalysis.byPlatform)
  .map(([platform, count]) => `• ${platform}: ${count} منشور`)
  .join('\n')}

<b>الهاشتاقات المتداولة:</b>
${report.socialMediaAnalysis.trendingHashtags
  .map(h => `• ${h.tag} (${h.count} ذكر)`)
  .join('\n') || '• لا توجد'}

<b>النقاط الساخنة:</b>
${report.summary.hotspots
  .map(h => `• ${h.location}: ${h.count} نشاط`)
  .join('\n')}

<b>التوصيات:</b>
${report.recommendations.map(r => `• ${r}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━
<i>تم إعداد هذا التقرير آلياً بواسطة نظام الرصد الاستخباراتي المتطور</i>
<i>وقت الإصدار: ${new Date().toLocaleTimeString('ar-YE')}</i>
    `.trim();
    
    await ResilientTelegramBot.sendMessage(message);
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
        locationsActivity: locationsActivity,
        socialMediaCache: socialMediaCache
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
    
    // تنظيف الذاكرة المؤقتة
    socialMediaCache.trendingHashtags = socialMediaCache.trendingHashtags
      .filter(h => h.count > 1)
      .slice(0, 20);
    
    saveData();
  }
}

/* ================== ENHANCED DASHBOARD ================== */
const app = express();

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

app.get('/', (req, res) => {
  const dashboard = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>نظام الرصد الاستخباراتي - الدريهمي</title>
    <style>
        body { font-family: 'Arial', sans-serif; background: #f0f2f5; margin: 0; padding: 20px; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 20px; }
        header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #4a5568; padding-bottom: 20px; }
        h1 { color: #2d3748; font-size: 2em; margin-bottom: 10px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .stat-card { background: #4a5568; color: white; padding: 15px; border-radius: 8px; text-align: center; }
        .stat-value { font-size: 1.8em; font-weight: bold; margin: 5px 0; }
        .btn { background: #4a5568; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin: 5px; }
        .btn:hover { background: #2d3748; }
        .sources-list { background: #f7fafc; border-radius: 8px; padding: 15px; margin-top: 20px; }
        .source-item { background: white; margin: 8px 0; padding: 10px; border-radius: 5px; border-left: 4px solid #4a5568; }
        .social-media { border-left-color: #4299e1 !important; }
        footer { text-align: center; margin-top: 30px; color: #718096; font-size: 0.9em; padding-top: 20px; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🚀 النظام الاستخباراتي المتطور</h1>
            <div>🎯 رصد وتحليل الأخبار في مديرية الدريهمي</div>
            <div style="margin-top: 10px;">
                <span style="background: #48bb78; color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.8em;">
                    ⚡ نشط
                </span>
                <span style="background: #4299e1; color: white; padding: 5px 10px; border-radius: 15px; margin-left: 5px; font-size: 0.8em;">
                    📱 مراقبة التواصل الاجتماعي
                </span>
            </div>
        </header>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div>🔍 الفحوصات الإجمالية</div>
                <div class="stat-value">${stats.totalScans}</div>
            </div>
            <div class="stat-card">
                <div>🎯 الأحداث الموالية</div>
                <div class="stat-value">${stats.proHouthiEvents}</div>
            </div>
            <div class="stat-card">
                <div>📊 النتائج الإجمالية</div>
                <div class="stat-value">${stats.totalMatches}</div>
            </div>
            <div class="stat-card">
                <div>📱 منشورات التواصل</div>
                <div class="stat-value">${stats.socialMediaMatches}</div>
            </div>
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
            <button class="btn" onclick="scanNow()">🔍 فحص فوري</button>
            <button class="btn" onclick="scanSocial()">📱 فحص التواصل</button>
            <button class="btn" onclick="location.reload()">🔄 تحديث</button>
        </div>
        
        <div class="sources-list">
            <h3>📡 المصادر النشطة</h3>
            ${config.sources.concat(config.socialMediaMirrors).slice(0, 10).map(source => `
                <div class="source-item ${source.type === 'web_scrape' ? 'social-media' : ''}">
                    <strong>${source.name}</strong> 
                    <span style="float: left; background: #e2e8f0; padding: 2px 8px; border-radius: 10px; font-size: 0.7em;">
                        ${source.type === 'web_scrape' ? '📱 ' : ''}${source.category}
                    </span>
                </div>
            `).join('')}
        </div>
        
        <footer>
            <div>💻 النظام الاستخباراتي المتطور v4.0</div>
            <div>📍 منطقة التغطية: مديرية الدريهمي - محافظة الحديدة</div>
            <div>🕐 آخر تحديث: ${new Date().toLocaleString('ar-YE')}</div>
        </footer>
    </div>
    
    <script>
        async function scanNow() {
            const response = await fetch('/api/scan', { method: 'POST' });
            const data = await response.json();
            alert(data.message);
            location.reload();
        }
        
        async function scanSocial() {
            const response = await fetch('/api/scan-social', { method: 'POST' });
            const data = await response.json();
            alert(data.message);
            location.reload();
        }
        
        setInterval(() => location.reload(), 60000);
    </script>
</body>
</html>
  `;
  
  res.send(dashboard);
});

// API endpoints
app.post('/api/scan', async (req, res) => {
  try {
    const results = await AdvancedScanner.intelligentScan();
    res.json({ 
      success: true, 
      message: `تم الفحص بنجاح. النتائج: ${results.length}` 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/scan-social', async (req, res) => {
  try {
    const results = await AdvancedScanner.scanSocialMediaSources();
    res.json({ 
      success: true, 
      message: `تم فحص التواصل الاجتماعي. النتائج: ${results.length}` 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/stats', (req, res) => {
  res.json({
    system: {
      uptime: process.uptime(),
      version: "4.0",
      coverage: "الدريهمي والحديدة"
    },
    stats: {
      totalScans: stats.totalScans,
      totalMatches: stats.totalMatches,
      socialMediaMatches: stats.socialMediaMatches,
      proEvents: stats.proHouthiEvents,
      lastScan: stats.lastScan,
      lastSocialScan: stats.lastSocialScan
    }
  });
});

/* ================== MAIN APPLICATION ================== */
class OSINTApplication {
  static async start() {
    try {
      console.log('🚀 بدء تشغيل النظام الاستخباراتي المتطور v4.0...');
      console.log('🎯 النظام يشمل الآن مراقبة وسائل التواصل الاجتماعي');
      console.log(`📡 مصادر RSS: ${config.sources.length} مصدر`);
      console.log(`📱 مرايا التواصل: ${config.socialMediaMirrors.length} مصدر`);
      
      // استعادة النسخة الاحتياطية
      BackupSystem.restore();
      
      // إرسال رسالة بدء التشغيل
      await this.sendStartupMessage();
      
      // بدء الخادم
      app.listen(config.port, () => {
        console.log(`🌐 لوحة التحكم تعمل على: http://localhost:${config.port}`);
      });
      
      // جدولة التقرير اليومي
      ReliableReportScheduler.scheduleDailyReport();
      
      // بدء الفحص الدوري للمصادر التقليدية
      this.startSourceScanner();
      
      // بدء الفحص الدوري لوسائل التواصل الاجتماعي
      this.startSocialMediaScanner();
      
      // اكتشاف مصادر جديدة كل 6 ساعات
      this.startSourceDiscovery();
      
      console.log('✅ النظام يعمل بكامل طاقته وجاهز للمراقبة المستمرة');
      
    } catch (error) {
      console.error('❌ خطأ فادح في بدء التشغيل:', error);
      await this.sendEmergencyAlert(error);
      process.exit(1);
    }
  }
  
  static async sendStartupMessage() {
    const message = `
🚀 <b>بدء تشغيل النظام الاستخباراتي المتطور v4.0</b>
${'━'.repeat(40)}

<b>🏛️ النظام:</b> Advanced OSINT Intelligence Monitor v4.0
<b>🎯 الميزة الجديدة:</b> مراقبة وسائل التواصل الاجتماعي
<b>📍 المنطقة:</b> مديرية الدريهمي - محافظة الحديدة
<b>📡 مصادر RSS:</b> ${config.sources.length} مصدر
<b>📱 مرايا التواصل:</b> ${config.socialMediaMirrors.length} مصدر
<b>⏱️ فحص المصادر:</b> كل ${config.scanInterval / 60000} دقيقة
<b>📱 فحص التواصل:</b> كل ${config.socialMediaScanInterval / 60000} دقيقة

<b>📊 الإحصائيات المخزنة:</b>
• الفحوصات: ${stats.totalScans}
• الأحداث الموالية: ${stats.proHouthiEvents}
• منشورات التواصل: ${stats.socialMediaMatches}

🔍 <b>جاري بدء المراقبة الشاملة...</b>

<i>ملاحظة: النظام يرصد الآن منشورات وسائل التواصل الاجتماعي باللغتين العربية والإنجليزية</i>
    `.trim();
    
    await ResilientTelegramBot.sendMessage(message);
  }
  
  static startSourceScanner() {
    setInterval(async () => {
      try {
        await AdvancedScanner.intelligentScan();
      } catch (error) {
        console.error('❌ خطأ في الفحص الدوري:', error.message);
      }
    }, config.scanInterval);
    
    console.log(`⏰ تم جدولة فحص المصادر كل ${config.scanInterval / 60000} دقيقة`);
  }
  
  static startSocialMediaScanner() {
    setInterval(async () => {
      try {
        await AdvancedScanner.scanSocialMediaSources();
      } catch (error) {
        console.error('❌ خطأ في فحص التواصل الاجتماعي:', error.message);
      }
    }, config.socialMediaScanInterval);
    
    console.log(`⏰ تم جدولة فحص التواصل الاجتماعي كل ${config.socialMediaScanInterval / 60000} دقيقة`);
  }
  
  static startSourceDiscovery() {
    setInterval(async () => {
      try {
        await AdvancedScanner.discoverNewSocialMediaSources();
      } catch (error) {
        console.error('❌ خطأ في اكتشاف مصادر جديدة:', error.message);
      }
    }, 6 * 60 * 60 * 1000); // كل 6 ساعات
    
    console.log('🔍 تم جدولة اكتشاف مصادر جديدة كل 6 ساعات');
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
}

/* ================== ERROR HANDLING ================== */
process.on('uncaughtException', async (error) => {
  console.error('❌ خطأ غير متوقع:', error);
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
  saveData();
  
  try {
    await ResilientTelegramBot.sendMessage(
      '🛑 <b>إيقاف النظام الاستخباراتي</b>\n\n' +
      'جاري حفظ البيانات وإغلاق الخدمات...\n' +
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
