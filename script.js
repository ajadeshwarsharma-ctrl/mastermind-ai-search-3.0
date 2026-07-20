/* =====================================================
   AJADESH INDEX — STEP 1
   NURSERY CLASS 🤖
===================================================== */

const AJADESH_INDEX = [

    {
        title: "GTA Vice City",
        description: "GTA Vice City ek popular open-world action game hai.",
        url: "https://www.rockstargames.com/games/vice-city"
    },

    {
        title: "YouTube",
        description: "YouTube ek video sharing platform hai.",
        url: "https://www.youtube.com"
    },

    {
        title: "Instagram",
        description: "Instagram photo aur video sharing platform hai.",
        url: "https://www.instagram.com"
    },

    {
        title: "Google",
        description: "Google ek web search engine hai.",
        url: "https://www.google.com"
    },

    {
        title: "Ajadeshwar Search Engine",
        description: "Ajadeshwar ka apna search engine project.",
        url: "https://mastermind-search.onrender.com/"
    }

];

console.log("🔥 AJADESH INDEX LOADED");
console.log("📚 TOTAL DATA:", AJADESH_INDEX.length);
/* =====================================================
   AJADESH LOCAL SEARCH — STEP 2
===================================================== */

function searchAjadeshIndex(query) {

    const cleanQuery = query.toLowerCase().trim();

    if (!cleanQuery) {
        return [];
    }

    const results = AJADESH_INDEX.filter(item => {

        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();

        return title.includes(cleanQuery) ||
               description.includes(cleanQuery);

    });

    console.log("🔎 AJADESH SEARCH:", query);
    console.log("📚 RESULTS FOUND:", results.length);

    return results;
}
"use strict";
/* =====================================================
   AJADESH DATA CONNECT — STEP 14
===================================================== */

let AJADESH_DATA = [];

async function loadAjadeshData() {

    try {

        const response = await fetch("./data.json", {
            cache: "no-store"
        });

        if (!response.ok) {

            console.log("⚠️ AJADESH DATA NOT FOUND");

            return;

        }

        AJADESH_DATA = await response.json();

        console.log(
            "🤖 AJADESH DATA LOADED:",
            AJADESH_DATA.length
        );

    } catch (error) {

        console.log(
            "💀 AJADESH DATA LOAD ERROR:",
            error
        );

    }

}

function searchAjadeshData(query) {

    const cleanQuery = query
        .toLowerCase()
        .trim();

    if (!cleanQuery) {

        return [];

    }

    return AJADESH_DATA
        .filter(page => {

            const title = String(
                page.title || ""
            ).toLowerCase();

            const text = String(
                page.text || ""
            ).toLowerCase();

            const url = String(
                page.url || ""
            ).toLowerCase();

            return (

                title.includes(cleanQuery) ||
                text.includes(cleanQuery) ||
                url.includes(cleanQuery)

            );

        })
        .slice(0, 30);

}

loadAjadeshData();
/* =========================================================
   MASTERMIND SEARCH ENGINE
   ULTIMATE SMART SEARCH ENGINE
   CODEPEN SAFE
========================================================= */


/* =========================================================
   MASTER STATE
========================================================= */

const MASTER_MIND = {

  version: "ULTIMATE-7.0",

  currentQuery: "",

  isSearching: false,

  history: [],

  wallpaper: "default",

  user: null,

  searchTimeout: null,

  suggestionTimeout: null,

  maxHistory: 50,

  maxSuggestions: 10,

  maxResults: 30

};


/* =========================================================
   DOM
========================================================= */

const byId = id => document.getElementById(id);

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);


const searchBox = byId("searchBox");

const resultSearch = byId("resultSearch");

const suggestions = byId("suggestions");

const homePage = byId("homePage");

const resultsPage = byId("resultsPage");

const results = byId("results");

const resultTitle = byId("resultTitle");

const historyList = byId("historyList");


/* =========================================================
   OFFICIAL WEBSITE DATABASE
========================================================= */

const OFFICIAL_SITES = [

  {
    name: "YouTube",
    url: "https://www.youtube.com/",
    keywords: ["youtube", "yt", "video"]
  },

  {
    name: "Facebook",
    url: "https://www.facebook.com/",
    keywords: ["facebook", "fb"]
  },

  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    keywords: ["instagram", "insta", "reels"]
  },

  {
    name: "X / Twitter",
    url: "https://x.com/",
    keywords: ["x", "twitter"]
  },

  {
    name: "Reddit",
    url: "https://www.reddit.com/",
    keywords: ["reddit"]
  },

  {
    name: "TikTok",
    url: "https://www.tiktok.com/",
    keywords: ["tiktok"]
  },

  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    keywords: ["linkedin", "jobs"]
  },

  {
    name: "Pinterest",
    url: "https://www.pinterest.com/",
    keywords: ["pinterest", "pins"]
  },

  {
    name: "Tumblr",
    url: "https://www.tumblr.com/",
    keywords: ["tumblr"]
  },

  {
    name: "VK",
    url: "https://vk.com/",
    keywords: ["vk", "vkontakte"]
  },

  {
    name: "Quora",
    url: "https://www.quora.com/",
    keywords: ["quora", "questions"]
  },

  {
    name: "Discord",
    url: "https://discord.com/",
    keywords: ["discord"]
  },

  {
    name: "Twitch",
    url: "https://www.twitch.tv/",
    keywords: ["twitch", "live gaming"]
  },

  {
    name: "Weibo",
    url: "https://weibo.com/",
    keywords: ["weibo"]
  },

  {
    name: "Bilibili",
    url: "https://www.bilibili.com/",
    keywords: ["bilibili"]
  },

  {
    name: "ChatGPT",
    url: "https://chatgpt.com/",
    keywords: ["chatgpt", "gpt", "openai"]
  },

  {
    name: "Google Gemini",
    url: "https://gemini.google.com/",
    keywords: ["gemini", "google gemini"]
  },

  {
    name: "Claude",
    url: "https://claude.ai/",
    keywords: ["claude", "anthropic"]
  },

  {
    name: "DeepSeek",
    url: "https://chat.deepseek.com/",
    keywords: ["deepseek"]
  },

  {
    name: "Canva",
    url: "https://www.canva.com/",
    keywords: ["canva", "design"]
  },

  {
    name: "Midjourney",
    url: "https://www.midjourney.com/",
    keywords: ["midjourney", "ai image"]
  },

  {
    name: "Hugging Face",
    url: "https://huggingface.co/",
    keywords: ["hugging face", "huggingface", "ai models"]
  },

  {
    name: "Perplexity",
    url: "https://www.perplexity.ai/",
    keywords: ["perplexity", "ai search"]
  },

  {
    name: "Amazon",
    url: "https://www.amazon.in/",
    keywords: ["amazon", "shopping"]
  },

  {
    name: "eBay",
    url: "https://www.ebay.com/",
    keywords: ["ebay"]
  },

  {
    name: "AliExpress",
    url: "https://www.aliexpress.com/",
    keywords: ["aliexpress"]
  },

  {
    name: "Taobao",
    url: "https://www.taobao.com/",
    keywords: ["taobao"]
  },

  {
    name: "Temu",
    url: "https://www.temu.com/",
    keywords: ["temu"]
  },

  {
    name: "Walmart",
    url: "https://www.walmart.com/",
    keywords: ["walmart"]
  },

  {
    name: "SHEIN",
    url: "https://www.shein.com/",
    keywords: ["shein"]
  },

  {
    name: "Etsy",
    url: "https://www.etsy.com/",
    keywords: ["etsy"]
  },

  {
    name: "Flipkart",
    url: "https://www.flipkart.com/",
    keywords: ["flipkart"]
  },

  {
    name: "Target",
    url: "https://www.target.com/",
    keywords: ["target store"]
  },

  {
    name: "Best Buy",
    url: "https://www.bestbuy.com/",
    keywords: ["best buy", "electronics"]
  },

  {
    name: "Alibaba",
    url: "https://www.alibaba.com/",
    keywords: ["alibaba"]
  },

  {
    name: "Rakuten",
    url: "https://www.rakuten.com/",
    keywords: ["rakuten"]
  },

  {
    name: "Wikipedia",
    url: "https://www.wikipedia.org/",
    keywords: ["wikipedia", "wiki", "encyclopedia"]
  },

  {
    name: "Fandom",
    url: "https://www.fandom.com/",
    keywords: ["fandom", "wiki games"]
  },

  {
    name: "GitHub",
    url: "https://github.com/",
    keywords: ["github", "code", "coding"]
  },

  {
    name: "Stack Overflow",
    url: "https://stackoverflow.com/",
    keywords: ["stackoverflow", "stack overflow", "programming"]
  },

  {
    name: "Coursera",
    url: "https://www.coursera.org/",
    keywords: ["coursera", "courses"]
  },

  {
    name: "Udemy",
    url: "https://www.udemy.com/",
    keywords: ["udemy", "learn"]
  },

  {
    name: "Duolingo",
    url: "https://www.duolingo.com/",
    keywords: ["duolingo", "language"]
  },

  {
    name: "Medium",
    url: "https://medium.com/",
    keywords: ["medium", "articles"]
  },

  {
    name: "ResearchGate",
    url: "https://www.researchgate.net/",
    keywords: ["researchgate", "research"]
  },

  {
    name: "Britannica",
    url: "https://www.britannica.com/",
    keywords: ["britannica"]
  },

  {
    name: "Internet Archive",
    url: "https://archive.org/",
    keywords: ["internet archive", "archive"]
  },

  {
    name: "Netflix",
    url: "https://www.netflix.com/",
    keywords: ["netflix", "movies", "series"]
  },

  {
    name: "Spotify",
    url: "https://open.spotify.com/",
    keywords: ["spotify", "music"]
  },

  {
    name: "IMDb",
    url: "https://www.imdb.com/",
    keywords: ["imdb", "movies rating", "film"]
  },

  {
    name: "Disney+",
    url: "https://www.disneyplus.com/",
    keywords: ["disney", "disney plus"]
  },

  {
    name: "Max",
    url: "https://www.max.com/",
    keywords: ["max", "hbo"]
  },

  {
    name: "Amazon Prime Video",
    url: "https://www.primevideo.com/",
    keywords: ["prime video", "amazon prime"]
  },

  {
    name: "Roblox",
    url: "https://www.roblox.com/",
    keywords: ["roblox", "game"]
  },

  {
    name: "Steam",
    url: "https://store.steampowered.com/",
    keywords: ["steam", "pc games"]
  },

  {
    name: "Crunchyroll",
    url: "https://www.crunchyroll.com/",
    keywords: ["crunchyroll", "anime"]
  },

  {
    name: "SoundCloud",
    url: "https://soundcloud.com/",
    keywords: ["soundcloud"]
  },

  {
    name: "Gmail",
    url: "https://mail.google.com/",
    keywords: ["gmail", "email", "mail"]
  },

  {
    name: "Outlook",
    url: "https://outlook.live.com/",
    keywords: ["outlook", "live mail"]
  },

  {
    name: "WhatsApp Web",
    url: "https://web.whatsapp.com/",
    keywords: ["whatsapp", "whatsapp web"]
  },

  {
    name: "Telegram Web",
    url: "https://web.telegram.org/",
    keywords: ["telegram", "telegram web"]
  },

  {
    name: "Proton Mail",
    url: "https://proton.me/mail",
    keywords: ["protonmail", "proton mail"]
  },

  {
    name: "Skype",
    url: "https://www.skype.com/",
    keywords: ["skype", "video call"]
  },

  {
    name: "PayPal",
    url: "https://www.paypal.com/",
    keywords: ["paypal", "payment"]
  },

  {
    name: "Yahoo Finance",
    url: "https://finance.yahoo.com/",
    keywords: ["yahoo finance", "stocks"]
  },

  {
    name: "TradingView",
    url: "https://www.tradingview.com/",
    keywords: ["tradingview", "share market", "charts"]
  },

  {
    name: "Booking.com",
    url: "https://www.booking.com/",
    keywords: ["booking", "hotel booking"]
  },

  {
    name: "Tripadvisor",
    url: "https://www.tripadvisor.com/",
    keywords: ["tripadvisor", "travel reviews"]
  },

  {
    name: "CoinMarketCap",
    url: "https://coinmarketcap.com/",
    keywords: ["coinmarketcap", "crypto"]
  },

  {
    name: "Investing.com",
    url: "https://www.investing.com/",
    keywords: ["investing", "finance"]
  },

  {
    name: "Airbnb",
    url: "https://www.airbnb.com/",
    keywords: ["airbnb", "homestay"]
  },

  {
    name: "Expedia",
    url: "https://www.expedia.com/",
    keywords: ["expedia", "travel"]
  },

  {
    name: "Google",
    url: "https://www.google.com/",
    keywords: ["google"]
  },

  {
    name: "Google Maps",
    url: "https://maps.google.com/",
    keywords: ["google maps", "maps", "location"]
  },

  {
    name: "Microsoft",
    url: "https://www.microsoft.com/",
    keywords: ["microsoft"]
  },

  {
    name: "Apple",
    url: "https://www.apple.com/",
    keywords: ["apple", "iphone"]
  },

  {
    name: "Samsung",
    url: "https://www.samsung.com/",
    keywords: ["samsung"]
  },

  {
    name: "vivo",
    url: "https://www.vivo.com/",
    keywords: ["vivo"]
  },

  {
    name: "OPPO",
    url: "https://www.oppo.com/",
    keywords: ["oppo"]
  },

  {
    name: "OnePlus",
    url: "https://www.oneplus.com/",
    keywords: ["oneplus", "one plus"]
  },

  {
    name: "realme",
    url: "https://www.realme.com/",
    keywords: ["realme"]
  },

  {
    name: "Xiaomi",
    url: "https://www.mi.com/",
    keywords: ["xiaomi", "mi"]
  },

  {
    name: "UIDAI",
    url: "https://uidai.gov.in/",
    keywords: ["uidai", "aadhaar", "aadhar"]
  },

  {
    name: "MPBSE",
    url: "https://www.mpbse.nic.in/",
    keywords: ["mpbse", "mp board", "mp board result"]
  },

  {
    name: "MPOnline",
    url: "https://www.mponline.gov.in/",
    keywords: ["mponline", "mp online"]
  },

  {
    name: "DigiLocker",
    url: "https://www.digilocker.gov.in/",
    keywords: ["digilocker", "digi locker"]
  },

  {
    name: "CSC Digital Seva",
    url: "https://digitalseva.csc.gov.in/",
    keywords: ["csc", "digital seva", "csc portal"]
  },

  {
    name: "DigiPay",
    url: "https://digipay.csccloud.in/",
    keywords: ["digipay"]
  },

  {
    name: "GST Portal",
    url: "https://www.gst.gov.in/",
    keywords: ["gst", "gst portal"]
  },

  {
    name: "Income Tax India",
    url: "https://www.incometax.gov.in/",
    keywords: ["income tax", "incometax"]
  },

  {
    name: "Passport Seva",
    url: "https://www.passportindia.gov.in/",
    keywords: ["passport", "passport seva"]
  },

  {
    name: "Parivahan",
    url: "https://parivahan.gov.in/",
    keywords: ["parivahan", "driving licence", "vehicle"]
  },

  {
    name: "IRCTC",
    url: "https://www.irctc.co.in/",
    keywords: ["irctc", "train ticket", "railway"]
  },

  {
    name: "Airtel",
    url: "https://www.airtel.in/",
    keywords: ["airtel"]
  },

  {
    name: "Jio",
    url: "https://www.jio.com/",
    keywords: ["jio"]
  },

  {
    name: "Vi",
    url: "https://www.myvi.in/",
    keywords: ["vi", "vodafone idea"]
  },

  {
    name: "BSNL",
    url: "https://www.bsnl.co.in/",
    keywords: ["bsnl"]
  },

  {
    name: "PhonePe",
    url: "https://www.phonepe.com/",
    keywords: ["phonepe"]
  },

  {
    name: "Paytm",
    url: "https://paytm.com/",
    keywords: ["paytm"]
  },

  {
    name: "Minecraft",
    url: "https://www.minecraft.net/",
    keywords: ["minecraft"]
  },

  {
    name: "Rockstar Games",
    url: "https://www.rockstargames.com/",
    keywords: ["gta", "rockstar", "grand theft auto"]
  },

  {
    name: "Epic Games",
    url: "https://store.epicgames.com/",
    keywords: ["epic games"]
  },

  {
    name: "PlayStation",
    url: "https://www.playstation.com/",
    keywords: ["playstation", "ps5", "ps4"]
  },

  {
    name: "Xbox",
    url: "https://www.xbox.com/",
    keywords: ["xbox"]
  },

  {
    name: "Canva",
    url: "https://www.canva.com/",
    keywords: ["canva"]
  },

  {
    name: "Adobe",
    url: "https://www.adobe.com/",
    keywords: ["adobe", "photoshop"]
  },

  {
    name: "CapCut",
    url: "https://www.capcut.com/",
    keywords: ["capcut", "video editing"]
  },

  {
    name: "Figma",
    url: "https://www.figma.com/",
    keywords: ["figma"]
  },

  {
    name: "Notion",
    url: "https://www.notion.so/",
    keywords: ["notion"]
  },

  {
    name: "Zoom",
    url: "https://zoom.us/",
    keywords: ["zoom"]
  },

  {
    name: "Google Meet",
    url: "https://meet.google.com/",
    keywords: ["google meet", "meet"]
  },

  {
    name: "NASA",
    url: "https://www.nasa.gov/",
    keywords: ["nasa", "space"]
  },

  {
    name: "BBC",
    url: "https://www.bbc.com/",
    keywords: ["bbc", "news"]
  },

  {
    name: "NDTV",
    url: "https://www.ndtv.com/",
    keywords: ["ndtv", "news"]
  },

  {
    name: "Aaj Tak",
    url: "https://www.aajtak.in/",
    keywords: ["aaj tak"]
  },

  {
    name: "Cricbuzz",
    url: "https://www.cricbuzz.com/",
    keywords: ["cricbuzz", "cricket"]
  },

  {
    name: "ESPN",
    url: "https://www.espn.com/",
    keywords: ["espn", "sports"]

  }

];


/* =========================================================
   SEARCH SUGGESTION DATABASE
========================================================= */

const SEARCH_TOPICS = [

  "E=mc2 kya hai",

  "भारत का इतिहास",

  "भारत के वर्तमान प्रधानमंत्री",

  "भारत की राजधानी",

  "मध्य प्रदेश का मौसम",

  "आज का मौसम",

  "weather near me",

  "temperature today",

  "news today",

  "latest news",

  "world news",

  "India news",

  "MP news",

  "MPBSE result",

  "MP board result",

  "best smartphone under 10000",

  "best phone under 20000",

  "best laptop",

  "phone comparison",

  "mobile price",

  "best gaming phone",

  "GTA Vice City",

  "GTA San Andreas",

  "Minecraft",

  "new movies",

  "best movies",

  "Netflix movies",

  "new web series",

  "anime",

  "football",

  "cricket",

  "India cricket",

  "HTML CSS JavaScript",

  "JavaScript tutorial",

  "HTML tutorial",

  "CSS tutorial",

  "Python tutorial",

  "coding",

  "AI tools",

  "best AI website",

  "ChatGPT",

  "Gemini",

  "Claude",

  "DeepSeek",

  "Perplexity",

  "how to make website",

  "how to make search engine",

  "Google Maps",

  "nearby ATM",

  "nearby restaurant",

  "best restaurant near me",

  "currency conversion",

  "100 USD to INR",

  "50 ka 20 percent",

  "calculator",

  "math",

  "Wikipedia",

  "YouTube",

  "Instagram",

  "Facebook",

  "Pinterest",

  "ChatGPT",

  "Gemini",

  "Claude",

  "DeepSeek",

  "Canva",

  "Midjourney",

  "Hugging Face",

  "Perplexity",

  "Amazon",

  "eBay",

  "AliExpress",

  "Taobao",

  "Temu",

  "Walmart",

  "SHEIN",

  "Etsy",

  "Flipkart",

  "Target",

  "Best Buy",

  "Alibaba",

  "Rakuten",

  "Fandom",

  "GitHub",

  "Stack Overflow",

  "Coursera",

  "Udemy",

  "Duolingo",

  "Medium",

  "ResearchGate",

  "Britannica",

  "Internet Archive",

  "Netflix",

  "Spotify",

  "IMDb",

  "Disney Plus",

  "Max HBO",

  "Prime Video",

  "Roblox",

  "Steam",

  "Crunchyroll",

  "SoundCloud",

  "Gmail",

  "Outlook",

  "WhatsApp Web",

  "Telegram Web",

  "ProtonMail",

  "Skype",

  "PayPal",

  "Yahoo Finance",

  "TradingView",

  "Booking.com",

  "Tripadvisor",

  "CoinMarketCap",

  "Investing.com",

  "Airbnb",

  "Expedia",

  "UIDAI",

  "Aadhaar",

  "CSC",

  "DigiPay",

  "AEPS",

  "XpressO AEPS",

  "MPBSE",

  "MPOnline",

  "DigiLocker",

  "GST",

  "Income Tax",

  "Passport Seva",

  "Parivahan",

  "IRCTC",

  "Airtel",

  "Jio",

  "PhonePe",

  "Paytm",

  "Samsung",

  "vivo",

  "OPPO",

  "OnePlus",

  "realme",

  "Xiaomi",

  "Apple",

  "Microsoft",

  "Google",

  "NASA",

  "BBC",

  "NDTV",

  "Aaj Tak",

  "Cricbuzz",

  "ESPN"

];


/* =========================================================
   NORMALIZE
========================================================= */

function normalizeText(value) {

  return String(value || "")

    .toLowerCase()

    .trim()

    .replace(/\s+/g, " ");

}


function escapeHTML(value) {

  if (value === null || value === undefined) {

    return "";

  }


  return String(value).replace(/[&<>"']/g, character => {

    const map = {

      "&": "&amp;",

      "<": "&lt;",

      ">": "&gt;",

      '"': "&quot;",

      "'": "&#039;"

    };


    return map[character];

  });

}


function safeURL(value) {

  try {

    const url = new URL(value);


    if (

      url.protocol === "http:" ||

      url.protocol === "https:"

    ) {

      return url.href;

    }

  }

  catch {

    return "#";

  }


  return "#";

}


/* =========================================================
   STORAGE
========================================================= */

function loadStorage() {

  try {

    MASTER_MIND.history = JSON.parse(

      localStorage.getItem(

        "mastermind_history"

      ) || "[]"

    );

  }

  catch {

    MASTER_MIND.history = [];

  }


  MASTER_MIND.wallpaper =

    localStorage.getItem(

      "mastermind_wallpaper"

    ) || "default";


  MASTER_MIND.user =

    localStorage.getItem(

      "mastermind_user"

    ) || null;

}


function saveStorage() {

  localStorage.setItem(

    "mastermind_history",

    JSON.stringify(

      MASTER_MIND.history

    )

  );


  localStorage.setItem(

    "mastermind_wallpaper",

    MASTER_MIND.wallpaper

  );

}


/* =========================================================
   HISTORY
========================================================= */

function addHistory(query) {

  const clean = query.trim();


  if (!clean) return;


  MASTER_MIND.history =

    MASTER_MIND.history.filter(

      item =>

        normalizeText(item) !==

        normalizeText(clean)

    );


  MASTER_MIND.history.unshift(clean);


  MASTER_MIND.history =

    MASTER_MIND.history.slice(

      0,

      MASTER_MIND.maxHistory

    );


  saveStorage();

  renderHistory();

}


function renderHistory() {

  if (!historyList) return;


  historyList.innerHTML = "";


  if (!MASTER_MIND.history.length) {

    historyList.innerHTML =

      "<span>No search history yet 😭</span>";

    return;

  }


  MASTER_MIND.history.forEach(query => {

    const item = document.createElement("span");


    item.className = "history-item";


    item.textContent = query;


    item.addEventListener(

      "click",

      () => startSearch(query)

    );


    historyList.appendChild(item);

  });

}


/* =========================================================
   BUILD SUGGESTIONS
========================================================= */

function buildSuggestions() {

  const list = [];


  SEARCH_TOPICS.forEach(item => {

    list.push(item);

  });


  OFFICIAL_SITES.forEach(site => {

    list.push(site.name);


    site.keywords.forEach(keyword => {

      list.push(keyword);

    });

  });


  return [

    ...new Set(list)

  ];

}


const suggestionDatabase =

  buildSuggestions();


/* =========================================================
   GOOGLE-LIKE SUGGESTION ENGINE
========================================================= */

function renderSuggestions(items) {

  if (!suggestions) return;


  suggestions.innerHTML = "";


  items

    .slice(

      0,

      MASTER_MIND.maxSuggestions

    )

    .forEach(item => {

      const div =

        document.createElement("div");


      div.className = "suggestion";


      div.textContent = "🔍 " + item;


      div.addEventListener(

        "click",

        () => {

          if (searchBox) {

            searchBox.value = item;

          }


          suggestions.innerHTML = "";


          startSearch(item);

        }

      );


      suggestions.appendChild(div);

    });

}


async function getGoogleSuggestions(query) {

  try {

    const controller =

      new AbortController();


    const timer = setTimeout(

      () => controller.abort(),

      1800

    );


    const url =

      "https://suggestqueries.google.com/complete/search" +

      "?client=firefox&q=" +

      encodeURIComponent(query);


    const response = await fetch(

      url,

      {

        signal: controller.signal

      }

    );


    clearTimeout(timer);


    if (!response.ok) {

      return [];

    }


    const data = await response.json();


    if (

      Array.isArray(data) &&

      Array.isArray(data[1])

    ) {

      return data[1];

    }

  }

  catch {

    return [];

  }


  return [];

}


function showSuggestions(value) {

  const query =

    normalizeText(value);


  if (!suggestions) return;


  suggestions.innerHTML = "";


  if (!query) return;


  const local =

    suggestionDatabase

      .filter(item =>

        normalizeText(item)

          .includes(query)

      );


  renderSuggestions(local);


  clearTimeout(

    MASTER_MIND.suggestionTimeout

  );


  MASTER_MIND.suggestionTimeout =

    setTimeout(async () => {

      const remote =

        await getGoogleSuggestions(query);


      const combined = [

        ...remote,

        ...local

      ];


      const unique = [

        ...new Set(

          combined.map(

            item => String(item)

          )

        )

      ];


      renderSuggestions(unique);

    }, 220);

}


/* =========================================================
   OFFICIAL SITE FINDER
========================================================= */

function findOfficialSites(query) {

  const clean =

    normalizeText(query);


  const exact =

    OFFICIAL_SITES.filter(site => {

      const words = [

        site.name,

        ...site.keywords

      ];


      return words.some(word =>

        normalizeText(word) === clean

      );

    });


  if (exact.length) {

    return exact;

  }


  const partial =

    OFFICIAL_SITES.filter(site => {

      const words = [

        site.name,

        ...site.keywords

      ];


      return words.some(word => {

        const value =

          normalizeText(word);


        return (

          value.includes(clean) ||

          clean.includes(value)

        );

      });

    });


  return partial.slice(0, 5);

}


/* =========================================================
   RESULT CARD
========================================================= */

function createCard({

  title,

  url,

  description,

  badge = ""

}) {

  const card =

    document.createElement("div");


  card.className = "result-card";


  const safe = safeURL(url);


  card.innerHTML = `

    ${badge ? `<small>${escapeHTML(badge)}</small>` : ""}


    <a

      href="${safe}"

      target="_blank"

      rel="noopener noreferrer"

    >

      ${escapeHTML(title)}

    </a>


    <div class="result-url">

      ${escapeHTML(url)}

    </div>


    <div class="result-desc">

      ${escapeHTML(description || "")}

    </div>

  `;


  return card;

}


function addCard(data) {

  if (!results) return;


  results.appendChild(

    createCard(data)

  );

}


/* =========================================================
   MATH ENGINE
========================================================= */

function isMathQuery(query) {

  const clean =

    query

      .toLowerCase()

      .replace(/what is/g, "")

      .replace(/calculate/g, "")

      .replace(/solve/g, "")

      .replace(/kitna/g, "")

      .replace(/hoga/g, "")

      .trim();


  return (

    /^[0-9+\-*/().%\s]+$/.test(clean) &&

    /[+\-*/%]/.test(clean)

  );

}


function calculateMath(query) {

  try {

    const clean =

      query

        .toLowerCase()

        .replace(/what is/g, "")

        .replace(/calculate/g, "")

        .replace(/solve/g, "")

        .replace(/kitna/g, "")

        .replace(/hoga/g, "")

        .trim();


    if (

      !/^[0-9+\-*/().%\s]+$/.test(clean)

    ) {

      return null;

    }


    const result =

      Function(

        `"use strict"; return (${clean})`

      )();


    if (

      typeof result !== "number" ||

      !Number.isFinite(result)

    ) {

      return null;

    }


    return result;

  }

  catch {

    return null;

  }

}


function tryMath(query) {

  if (!isMathQuery(query)) {

    return false;

  }


  const answer =

    calculateMath(query);


  if (answer === null) {

    return false;

  }


  const card =

    document.createElement("div");


  card.className = "result-card";


  card.innerHTML = `

    <h2>🧮 Calculator</h2>

    <p>

      ${escapeHTML(query)}

    </p>

    <h1>

      ${escapeHTML(answer)}

    </h1>

  `;


  results.appendChild(card);


  return true;

}


/* =========================================================
   PERCENTAGE
========================================================= */

function tryPercentage(query) {

  const match = query.match(

    /(\d+(?:\.\d+)?)\s*(?:का|ka|of)\s*(\d+(?:\.\d+)?)\s*%?/i

  );


  if (!match) return false;


  const first =

    Number(match[1]);


  const second =

    Number(match[2]);


  const answer =

    first * second / 100;


  const card =

    document.createElement("div");


  card.className = "result-card";


  card.innerHTML = `

    <h2>🧮 Percentage</h2>

    <p>

      ${escapeHTML(query)}

    </p>

    <h1>

      ${answer}

    </h1>

  `;


  results.appendChild(card);


  return true;

}


/* =========================================================
   CURRENCY
========================================================= */

const CURRENCY_WORDS = {

  usd: "USD",

  dollar: "USD",

  dollars: "USD",

  inr: "INR",

  rupee: "INR",

  rs: "INR",

  eur: "EUR",

  euro: "EUR",

  gbp: "GBP",

  pound: "GBP",

  jpy: "JPY",

  yen: "JPY"

};


function findCurrency(value) {

  const clean =

    value.toLowerCase();


  for (const key in CURRENCY_WORDS) {

    if (clean.includes(key)) {

      return CURRENCY_WORDS[key];

    }

  }


  return null;

}


async function tryCurrency(query) {

  const amountMatch =

    query.match(

      /(\d+(?:\.\d+)?)/

    );


  if (!amountMatch) return false;


  const from =

    findCurrency(query);


  if (!from) return false;


  const currencies = [

    "USD",

    "INR",

    "EUR",

    "GBP",

    "JPY"

  ];


  let to = null;


  for (const currency of currencies) {

    if (

      query.toUpperCase()

        .includes(currency)

    ) {

      to = currency;

    }

  }


  if (!to) {

    if (from === "USD") to = "INR";

    else if (from === "INR") to = "USD";

  }


  if (!to || from === to) {

    return false;

  }


  try {

    const amount =

      Number(amountMatch[1]);


    const response =

      await fetch(

        "https://api.frankfurter.dev/v2/rate/" +

        from +

        "/" +

        to

      );


    if (!response.ok) {

      return false;

    }


    const data =

      await response.json();


    const result =

      amount * data.rate;


    const card =

      document.createElement("div");


    card.className = "result-card";


    card.innerHTML = `

      <h2>💱 Currency Converter</h2>

      <p>

        ${amount} ${from}

        =

      </p>

      <h1>

        ${result.toFixed(2)} ${to}

      </h1>

      <p>

        Current exchange rate

      </p>

    `;


    results.appendChild(card);


    return true;

  }

  catch {

    return false;

  }

}


/* =========================================================
   WEATHER
========================================================= */

function isWeatherQuery(query) {

  return [

    "weather",

    "mausam",

    "temperature",

    "temp",

    "forecast"

  ].some(word =>

    query.toLowerCase()

      .includes(word)

  );

}


async function tryWeather(query) {

  if (!isWeatherQuery(query)) {

    return false;

  }


  let location =

    query

      .replace(/weather/gi, "")

      .replace(/mausam/gi, "")

      .replace(/temperature/gi, "")

      .replace(/temp/gi, "")

      .replace(/forecast/gi, "")

      .replace(/today/gi, "")

      .replace(/aaj/gi, "")

      .trim();


  if (!location) {

    location = "Bhopal";

  }


  try {

    const geoURL =

      "https://geocoding-api.open-meteo.com/v1/search" +

      "?name=" +

      encodeURIComponent(location) +

      "&count=1" +

      "&language=en" +

      "&format=json";


    const geoResponse =

      await fetch(geoURL);


    const geo =

      await geoResponse.json();


    if (

      !geo.results ||

      !geo.results.length

    ) {

      return false;

    }


    const place = geo.results[0];


    const weatherURL =

      "https://api.open-meteo.com/v1/forecast" +

      "?latitude=" +

      place.latitude +

      "&longitude=" +

      place.longitude +

      "&current=temperature_2m,weather_code,wind_speed_10m";


    const weatherResponse =

      await fetch(weatherURL);


    const weather =

      await weatherResponse.json();


    const current =

      weather.current;


    const card =

      document.createElement("div");


    card.className = "result-card";


    card.innerHTML = `

      <h2>🌤️ Weather</h2>

      <p>

        ${escapeHTML(place.name)},

        ${escapeHTML(place.country || "")}

      </p>

      <h1>

        ${current.temperature_2m}°C

      </h1>

      <p>

        Wind:

        ${current.wind_speed_10m} km/h

      </p>

    `;


    results.appendChild(card);


    return true;

  }

  catch {

    return false;

  }

}


/* =========================================================
   WIKIPEDIA / FACTS
========================================================= */

async function tryWikipedia(query) {

  const url =

    "https://en.wikipedia.org/w/api.php" +

    "?action=query" +

    "&list=search" +

    "&srsearch=" +

    encodeURIComponent(query) +

    "&format=json" +

    "&origin=*";


  try {

    const response =

      await fetch(url);


    if (!response.ok) {

      return false;

    }


    const data =

      await response.json();


    const items =

      data.query &&

      data.query.search;


    if (

      !items ||

      !items.length

    ) {

      return false;

    }


    const heading =

      document.createElement("div");


    heading.className = "result-card";


    heading.innerHTML = `

      <h2>📚 Knowledge & Facts</h2>

      <p>

        Wikipedia results

      </p>

    `;


    results.appendChild(heading);


    items.slice(0, 5).forEach(item => {

      const title =

        item.title;


      const wikiURL =

        "https://en.wikipedia.org/wiki/" +

        encodeURIComponent(

          title.replace(/ /g, "_")

        );


      addCard({

        title: title,

        url: wikiURL,

        description:

          item.snippet

            .replace(/<[^>]*>/g, ""),

        badge: "Wikipedia"

      });

    });


    return true;

  }

  catch {

    return false;

  }

}


/* =========================================================
   MAPS / LOCAL SEARCH
========================================================= */

function isLocalQuery(query) {

  return [

    "near me",

    "nearby",

    "mere aas paas",

    "mere pas",

    "restaurant",

    "atm",

    "hospital",

    "hotel",

    "shop",

    "location"

  ].some(word =>

    query.toLowerCase()

      .includes(word)

  );

}


async function tryLocalSearch(query) {

  if (!isLocalQuery(query)) {

    return false;

  }


  try {

    const url =

      "https://nominatim.openstreetmap.org/search" +

      "?format=jsonv2" +

      "&limit=8" +

      "&q=" +

      encodeURIComponent(query);


    const response =

      await fetch(url);


    const data =

      await response.json();


    if (!data.length) {

      return false;

    }


    const heading =

      document.createElement("div");


    heading.className = "result-card";


    heading.innerHTML = `

      <h2>📍 Local & Places</h2>

      <p>

        ${escapeHTML(query)}

      </p>

    `;


    results.appendChild(heading);


    data.forEach(place => {

      addCard({

        title: place.display_name,

        url:

          "https://www.google.com/maps/search/" +

          encodeURIComponent(

            place.display_name

          ),

        description:

          "Open this place in Google Maps.",

        badge: "Location"

      });

    });


    return true;

  }

  catch {

    return false;

  }

}


/* =========================================================
   DUCKDUCKGO
========================================================= */

async function searchDuckDuckGo(query) {

  const url =

    "https://api.duckduckgo.com/?q=" +

    encodeURIComponent(query) +

    "&format=json" +

    "&no_html=1" +

    "&skip_disambig=1";


  const response =

    await fetch(url);


  if (!response.ok) {

    throw new Error(

      "Search failed"

    );

  }


  return await response.json();

}


/* =========================================================
   DUCK RESULTS
========================================================= */

function normalizeDuckResults(

  data,

  query

) {

  const output = [];


  if (

    data.AbstractText &&

    data.AbstractURL

  ) {

    output.push({

      title:

        data.Heading || query,

      url:

        data.AbstractURL,

      description:

        data.AbstractText

    });

  }


  if (

    Array.isArray(

      data.RelatedTopics

    )

  ) {

    data.RelatedTopics.forEach(topic => {

      if (

        topic &&

        topic.FirstURL &&

        topic.Text

      ) {

        output.push({

          title:

            topic.Text.split(" - ")[0],

          url:

            topic.FirstURL,

          description:

            topic.Text

        });

      }


      if (

        topic &&

        Array.isArray(topic.Topics)

      ) {

        topic.Topics.forEach(child => {

          if (

            child &&

            child.FirstURL &&

            child.Text

          ) {

            output.push({

              title:

                child.Text.split(" - ")[0],

              url:

                child.FirstURL,

              description:

                child.Text

            });

          }

        });

      }

    });

  }


  const seen = new Set();


  return output.filter(item => {

    if (seen.has(item.url)) {

      return false;

    }


    seen.add(item.url);


    return true;

  });

}


/* =========================================================
   OFFICIAL WEBSITE RESULTS
========================================================= */

function renderOfficialResults(query) {

  const sites =

    findOfficialSites(query);


  if (!sites.length) {

    return false;

  }


  const heading =

    document.createElement("div");


  heading.className = "result-card";


  heading.innerHTML = `

    <h2>🌐 Official Website Results</h2>

    <p>

      ${escapeHTML(query)}

    </p>

  `;


  results.appendChild(heading);


  sites.forEach(site => {

    addCard({

      title:

        site.name,

      url:

        site.url,

      description:

        "Official website of " +

        site.name,

      badge: "Official Website"

    });

  });


  return true;

}


/* =========================================================
   WEB RESULT RENDER
========================================================= */

function renderWebResults(

  items,

  query

) {

  if (!items.length) {

    return false;

  }


  const heading =

    document.createElement("div");


  heading.className = "result-card";


  heading.innerHTML = `

    <h2>🔥 Web Results</h2>

    <p>

      ${escapeHTML(query)}

    </p>

  `;


  results.appendChild(heading);


  items

    .slice(

      0,

      MASTER_MIND.maxResults

    )

    .forEach(item => {

      addCard({

        title:

          item.title,

        url:

          item.url,

        description:

          item.description,

        badge: "Web Result"

      });

    });


  return true;

}


/* =========================================================
   LOADING
========================================================= */

function showLoading(query) {

  results.innerHTML = `

    <div class="result-card">

      <h2>🔍 Searching...</h2>

      <p>

        Mastermind smart search

        chala raha hai 😎🔥

      </p>

      <p>

        ${escapeHTML(query)}

      </p>

    </div>

  `;

}


/* =========================================================
   NO RESULTS
========================================================= */

function showNoResults(query) {

  results.innerHTML = `

    <div class="result-card">

      <h2>😕 Result nahi mila</h2>

      <p>

        ${escapeHTML(query)}

      </p>

      <p>

        Dusre words se search karke dekh bhai 😭

      </p>

    </div>

  `;

}


/* =========================================================
   MAIN SEARCH ENGINE
========================================================= */

async function startSearch(query) {
    const ajadeshResults = searchAjadeshIndex(query);

    if (ajadeshResults.length > 0) {

        console.log("😈 AJADESH RESULT MIL GAYA BHAI");

        displayResults(
            ajadeshResults.map(item => ({
                title: item.title,
                description: item.description,
                url: item.url
            }))
        );

        return;
    }
  if (

    MASTER_MIND.isSearching

  ) {

    return;

  }


  query = String(

    query || ""

  ).trim();


  if (!query) {

    alert(

      "Bhai kuchh search to kar 😭"

    );

    return;

  }


  MASTER_MIND.isSearching = true;


  MASTER_MIND.currentQuery = query;


  if (searchBox) {

    searchBox.value = query;

  }


  if (resultSearch) {

    resultSearch.value = query;

  }


  if (suggestions) {

    suggestions.innerHTML = "";

  }


  if (homePage) {

    homePage.style.display = "none";

  }


  if (resultsPage) {

    resultsPage.style.display = "block";

  }


  if (resultTitle) {

    resultTitle.innerHTML =

      "Search results for: <b>" +

      escapeHTML(query) +

      "</b>";

  }


  addHistory(query);


  showLoading(query);


  results.innerHTML = "";


  let specialResult = false;


  try {

    specialResult =

      tryMath(query) ||

      tryPercentage(query);


    if (!specialResult) {

      specialResult =

        await tryCurrency(query);

    }


    if (!specialResult) {

      specialResult =

        await tryWeather(query);

    }


    if (!specialResult) {

      specialResult =

        await tryLocalSearch(query);

    }


    const officialShown =

      renderOfficialResults(query);


    if (officialShown) {

      specialResult = true;

    }


    const data =

      await searchDuckDuckGo(query);


    const webItems =

      normalizeDuckResults(

        data,

        query

      );


    if (webItems.length) {

      renderWebResults(

        webItems,

        query

      );

    }


    await tryWikipedia(query);


    if (

      !specialResult &&

      !webItems.length

    ) {

      showNoResults(query);

    }

  }

  catch {

    if (!specialResult) {

      try {

        await tryWikipedia(query);

      }

      catch {

        showNoResults(query);

      }

    }

  }


  MASTER_MIND.isSearching = false;

}


/* =========================================================
   SEARCH BOX
========================================================= */

if (searchBox) {

  searchBox.addEventListener(

    "input",

    event => {

      clearTimeout(

        MASTER_MIND.searchTimeout

      );


      MASTER_MIND.searchTimeout =

        setTimeout(

          () => {

            showSuggestions(

              event.target.value

            );

          },

          80

        );

    }

  );


  searchBox.addEventListener(

    "keydown",

    event => {

      if (

        event.key === "Enter"

      ) {

        event.preventDefault();


        startSearch(

          searchBox.value

        );

      }

    }

  );

}


if (resultSearch) {

  resultSearch.addEventListener(

    "input",

    event => {

      showSuggestions(

        event.target.value

      );

    }

  );


  resultSearch.addEventListener(

    "keydown",

    event => {

      if (

        event.key === "Enter"

      ) {

        event.preventDefault();


        startSearch(

          resultSearch.value

        );

      }

    }

  );

}


/* =========================================================
   SEARCH BUTTON
========================================================= */

const searchButton =

  byId("searchBtn");


if (searchButton) {

  searchButton.addEventListener(

    "click",

    () => {

      startSearch(

        resultSearch.value

      );

    }

  );

}


/* =========================================================
   QUICK SEARCH
========================================================= */

$$("[data-search]")

  .forEach(button => {

    button.addEventListener(

      "click",

      () => {

        startSearch(

          button.dataset.search

        );

      }

    );

  });


/* =========================================================
   BACK BUTTON
========================================================= */

const backButton =

  byId("backBtn");


if (backButton) {

  backButton.addEventListener(

    "click",

    () => {

      if (resultsPage) {

        resultsPage.style.display =

          "none";

      }


      if (homePage) {

        homePage.style.display =

          "block";

      }

    }

  );

}


/* =========================================================
   WALLPAPER
========================================================= */

function openWallpaper() {

  const modal =

    byId("wallpaperModal");


  if (modal) {

    modal.style.display = "flex";

  }

}


function closeWallpaper() {

  const modal =

    byId("wallpaperModal");


  if (modal) {

    modal.style.display = "none";

  }

}


function applyWallpaper(name) {

  document.body.className = "";


  if (

    name &&

    name !== "default"

  ) {

    document.body.classList.add(name);

  }


  MASTER_MIND.wallpaper =

    name || "default";


  saveStorage();

}


const wallpaperButton =

  byId("wallpaperBtn");


if (wallpaperButton) {

  wallpaperButton.addEventListener(

    "click",

    openWallpaper

  );

}


const closeWallpaperButton =

  byId("closeWallpaper");


if (closeWallpaperButton) {

  closeWallpaperButton.addEventListener(

    "click",

    closeWallpaper

  );

}


$$("[data-wall]")

  .forEach(button => {

    button.addEventListener(

      "click",

      () => {

        applyWallpaper(

          button.dataset.wall

        );


        closeWallpaper();

      }

    );

  });


/* =========================================================
   LOGIN
========================================================= */

function openLogin() {

  const modal =

    byId("loginModal");


  if (modal) {

    modal.style.display = "flex";

  }

}


function closeLogin() {

  const modal =

    byId("loginModal");


  if (modal) {

    modal.style.display = "none";

  }

}


function loginUser() {

  const username =

    byId("username");


  const password =

    byId("password");


  if (

    !username ||

    !password

  ) {

    return;

  }


  const name =

    username.value.trim();


  const pass =

    password.value.trim();


  if (

    !name ||

    !pass

  ) {

    alert(

      "Username aur password bhar bhai 😭"

    );


    return;

  }


  MASTER_MIND.user = name;


  localStorage.setItem(

    "mastermind_user",

    name

  );


  alert(

    "Sign In successful 😎🔥"

  );


  closeLogin();


  const signInButton =

    byId("signinBtn");


  if (signInButton) {

    signInButton.textContent =

      "👤 " + name;

  }

}


const signInButton =

  byId("signinBtn");


if (signInButton) {

  signInButton.addEventListener(

    "click",

    openLogin

  );

}


const closeLoginButton =

  byId("closeLogin");


if (closeLoginButton) {

  closeLoginButton.addEventListener(

    "click",

    closeLogin

  );

}


const loginButton =

  byId("loginBtn");


if (loginButton) {

  loginButton.addEventListener(

    "click",

    loginUser

  );

}


/* =========================================================
   MODAL CLOSE
========================================================= */

window.addEventListener(

  "click",

  event => {

    const wallpaperModal =

      byId("wallpaperModal");


    const loginModal =

      byId("loginModal");


    if (

      event.target ===

      wallpaperModal

    ) {

      closeWallpaper();

    }


    if (

      event.target ===

      loginModal

    ) {

      closeLogin();

    }

  }

);


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(

  "keydown",

  event => {

    if (

      event.key === "Escape"

    ) {

      closeWallpaper();

      closeLogin();

    }

  }

);


/* =========================================================
   INIT
========================================================= */

function initializeMastermind() {

  loadStorage();


  applyWallpaper(

    MASTER_MIND.wallpaper

  );


  renderHistory();


  if (

    MASTER_MIND.user

  ) {

    const button =

      byId("signinBtn");


    if (button) {

      button.textContent =

        "👤 " +

        MASTER_MIND.user;

    }

  }

}


initializeMastermind();


/* =========================================================
   GLOBAL API
========================================================= */

window.MASTERMIND = {

  search: startSearch,

  suggestions: suggestionDatabase,

  officialSites: OFFICIAL_SITES,

  version: MASTER_MIND.version

};
