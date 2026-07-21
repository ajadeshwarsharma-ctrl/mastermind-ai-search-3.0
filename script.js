"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { 
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
/* =====================================================
   MASTERMIND SEARCH ENGINE — CLEAN BUG FIX VERSION
   ===================================================== */


/* =====================================================
   AJADESH INDEX
   ===================================================== */
const firebaseConfig = {
    apiKey: "AIzaSyD60CDixs5q56UjZxjh3obvAdWYMBs3gCA",
    authDomain: "mastermind-ajadesh-search.firebaseapp.com",
    projectId: "mastermind-ajadesh-search",
    storageBucket: "mastermind-ajadesh-search.firebasestorage.app",
    messagingSenderId: "908591909403",
    appId: "1:908591909403:web:dac78f8a731a2923bac6be",
    measurementId: "G-DTDRLFFKTZ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();
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
   AJADESH LOCAL SEARCH
   ===================================================== */

function searchAjadeshIndex(query) {

    const cleanQuery = String(query || "")
        .toLowerCase()
        .trim();

    if (!cleanQuery) {
        return [];
    }

    const results = AJADESH_INDEX.map(item => {

    const title = String(item.title || "").toLowerCase();
    const description = String(item.description || "").toLowerCase();
    const url = String(item.url || "").toLowerCase();

    let score = 0;

    if(title.includes(cleanQuery)){
        score += 100;
    }

    if(url.includes(cleanQuery)){
        score += 50;
    }

    if(description.includes(cleanQuery)){
        score += 20;
    }

    if(
        url.includes(".gov.in") ||
        url.includes(".nic.in")
    ){
        score += 30;
    }

    return {
        ...item,
        score
    };

})
.filter(item => item.score > 0)
.sort((a,b)=> b.score - a.score);

return results;

}


/* =====================================================
   STEP 14 — DATA CONNECT
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

    const cleanQuery = String(query || "")
        .toLowerCase()
        .trim();

    if (!cleanQuery) {
        return [];
    }

    return AJADESH_DATA
        .filter(page => {

            const title = String(page.title || "")
                .toLowerCase();

            const text = String(page.text || "")
                .toLowerCase();

            const url = String(page.url || "")
                .toLowerCase();

            return (
                title.includes(cleanQuery) ||
                text.includes(cleanQuery) ||
                url.includes(cleanQuery)
            );

        })
        .slice(0, 30);

}

loadAjadeshData();


/* =====================================================
   MASTER STATE
   ===================================================== */

const MASTER_MIND = {

    version: "ULTIMATE-BUG-FIX-8.0",

    currentQuery: "",

    isSearching: false,

    history: [],

    wallpaper: "default",

    user: null,

    maxHistory: 50,

    maxSuggestions: 10,

    maxResults: 30

};


/* =====================================================
   DOM
   ===================================================== */

const byId = id => document.getElementById(id);

const searchBox = byId("searchBox");
const resultSearch = byId("resultSearch");
const suggestions = byId("suggestions");
const homePage = byId("homePage");
const resultsPage = byId("resultsPage");
const results = byId("results");
const resultTitle = byId("resultTitle");
const historyList = byId("historyList");
const searchButton = byId("searchBtn");


/* =====================================================
   OFFICIAL WEBSITES
   ===================================================== */

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
        name: "Google",
        url: "https://www.google.com/",
        keywords: ["google"]
    },

    {
        name: "ChatGPT",
        url: "https://chatgpt.com/",
        keywords: ["chatgpt", "gpt", "openai"]
    },

    {
        name: "Google Gemini",
        url: "https://gemini.google.com/",
        keywords: ["gemini"]
    },

    {
        name: "Claude",
        url: "https://claude.ai/",
        keywords: ["claude"]
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
        name: "Amazon",
        url: "https://www.amazon.in/",
        keywords: ["amazon", "shopping"]
    },

    {
        name: "Flipkart",
        url: "https://www.flipkart.com/",
        keywords: ["flipkart"]
    },

    {
        name: "Wikipedia",
        url: "https://www.wikipedia.org/",
        keywords: ["wikipedia", "wiki"]
    },

    {
        name: "GitHub",
        url: "https://github.com/",
        keywords: ["github", "code", "coding"]
    },

    {
        name: "Stack Overflow",
        url: "https://stackoverflow.com/",
        keywords: ["stackoverflow", "programming"]
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
        name: "Gmail",
        url: "https://mail.google.com/",
        keywords: ["gmail", "email", "mail"]
    },

    {
        name: "WhatsApp Web",
        url: "https://web.whatsapp.com/",
        keywords: ["whatsapp"]
    },

    {
        name: "Telegram Web",
        url: "https://web.telegram.org/",
        keywords: ["telegram"]
    },

    {
        name: "Google Maps",
        url: "https://maps.google.com/",
        keywords: ["maps", "location"]
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
        keywords: ["oneplus"]
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
        keywords: ["mpbse", "mp board"]
    },

    {
        name: "MPOnline",
        url: "https://www.mponline.gov.in/",
        keywords: ["mponline"]
    },

    {
        name: "DigiLocker",
        url: "https://www.digilocker.gov.in/",
        keywords: ["digilocker"]
    },

    {
        name: "CSC Digital Seva",
        url: "https://digitalseva.csc.gov.in/",
        keywords: ["csc", "digital seva"]
    },

    {
        name: "GST Portal",
        url: "https://www.gst.gov.in/",
        keywords: ["gst"]
    },

    {
        name: "Income Tax India",
        url: "https://www.incometax.gov.in/",
        keywords: ["income tax"]
    },

    {
        name: "Passport Seva",
        url: "https://www.passportindia.gov.in/",
        keywords: ["passport"]
    },

    {
        name: "Parivahan",
        url: "https://parivahan.gov.in/",
        keywords: ["parivahan", "vehicle"]
    },

    {
        name: "IRCTC",
        url: "https://www.irctc.co.in/",
        keywords: ["irctc", "train"]
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
        name: "Steam",
        url: "https://store.steampowered.com/",
        keywords: ["steam", "pc games"]
    },

    {
        name: "CapCut",
        url: "https://www.capcut.com/",
        keywords: ["capcut", "video editing"]
    },

    {
        name: "Adobe",
        url: "https://www.adobe.com/",
        keywords: ["adobe", "photoshop"]
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
    }

];


/* =====================================================
   SEARCH TOPICS
   ===================================================== */

const SEARCH_TOPICS = [

    "weather",
    "आज का मौसम",
    "मध्य प्रदेश का मौसम",
    "news today",
    "latest news",
    "India news",
    "MP news",
    "MPBSE result",
    "best smartphone under 10000",
    "best phone under 20000",
    "best laptop",
    "GTA Vice City",
    "GTA San Andreas",
    "Minecraft",
    "new movies",
    "anime",
    "cricket",
    "India cricket",
    "HTML CSS JavaScript",
    "JavaScript tutorial",
    "Python tutorial",
    "coding",
    "AI tools",
    "how to make website",
    "how to make search engine",
    "nearby ATM",
    "nearby restaurant",
    "currency conversion",
    "100 USD to INR",
    "calculator",
    "math",
    "YouTube",
    "Instagram",
    "Facebook",
    "ChatGPT",
    "Gemini",
    "Claude",
    "DeepSeek",
    "Canva",
    "Amazon",
    "Flipkart",
    "GitHub",
    "Netflix",
    "Spotify",
    "Gmail",
    "WhatsApp Web",
    "UIDAI",
    "Aadhaar",
    "CSC",
    "DigiLocker",
    "GST",
    "Passport Seva",
    "IRCTC",
    "Airtel",
    "Jio",
    "PhonePe",
    "Paytm",
    "Samsung",
    "vivo",
    "Apple",
    "Google",
    "NASA",
    "BBC",
    "Cricbuzz"

];


/* =====================================================
   UTILITY
   ===================================================== */

function normalizeText(value) {

    return String(value || "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

}

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/[&<>"']/g, character => {

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

    } catch {

        return "#";

    }

    return "#";

}


/* =====================================================
   STORAGE
   ===================================================== */

function loadStorage() {

    try {

        MASTER_MIND.history = JSON.parse(
            localStorage.getItem("mastermind_history") || "[]"
        );

    } catch {

        MASTER_MIND.history = [];

    }

    MASTER_MIND.wallpaper =
        localStorage.getItem("mastermind_wallpaper") || "default";

    MASTER_MIND.user =
        localStorage.getItem("mastermind_user") || null;

}

function saveStorage() {

    localStorage.setItem(
        "mastermind_history",
        JSON.stringify(MASTER_MIND.history)
    );

    localStorage.setItem(
        "mastermind_wallpaper",
        MASTER_MIND.wallpaper
    );

}


/* =====================================================
   HISTORY
   ===================================================== */

function addHistory(query) {

    const clean = String(query || "").trim();

    if (!clean) {
        return;
    }

    MASTER_MIND.history =
        MASTER_MIND.history.filter(
            item => normalizeText(item) !== normalizeText(clean)
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

    if (!historyList) {
        return;
    }

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


/* =====================================================
   SUGGESTIONS
   ===================================================== */

function buildSuggestions() {

    const list = [

        ...SEARCH_TOPICS

    ];

    OFFICIAL_SITES.forEach(site => {

        list.push(site.name);

        site.keywords.forEach(keyword => {

            list.push(keyword);

        });

    });

    return [...new Set(list)];

}

const suggestionDatabase = buildSuggestions();

function renderSuggestions(items) {

    if (!suggestions) {
        return;
    }

    suggestions.innerHTML = "";

    items
        .slice(0, MASTER_MIND.maxSuggestions)
        .forEach(item => {

            const div = document.createElement("div");

            div.className = "suggestion";

            div.textContent = "🔍 " + item;

            div.addEventListener(
                "click",
                () => {

                    if (searchBox) {
                        searchBox.value = item;
                    }

                    if (resultSearch) {
                        resultSearch.value = item;
                    }

                    suggestions.innerHTML = "";

                    startSearch(item);

                }
            );

            suggestions.appendChild(div);

        });

}

function showSuggestions(value) {

    const query = normalizeText(value);

    if (!suggestions) {
        return;
    }

    suggestions.innerHTML = "";

    if (!query) {
        return;
    }

   const local = [
    ...suggestionDatabase,

    ...AJADESH_INDEX.map(item => item.title),

    ...AJADESH_INDEX.map(item => item.description)
]
.filter(Boolean)
.filter(item =>
    normalizeText(item).includes(query)
)
.slice(0,10);

    renderSuggestions(local);

}


/* =====================================================
   OFFICIAL SITE FINDER
   ===================================================== */

function findOfficialSites(query) {

    const clean = normalizeText(query);

    return OFFICIAL_SITES
        .filter(site => {

            const words = [
                site.name,
                ...site.keywords
            ];

            return words.some(word => {

                const value = normalizeText(word);

                return (
                    value === clean ||
                    value.includes(clean) ||
                    clean.includes(value)
                );

            });

        })
        .slice(0, 5);

}


/* =====================================================
   RESULT CARDS
   ===================================================== */

function createCard({

    title,
    url,
    description,
    badge = ""

}) {

    const card = document.createElement("div");

    card.className = "result-card";

    const safe = safeURL(url);

    card.innerHTML = `

        ${badge
            ? `<small>${escapeHTML(badge)}</small>`
            : ""
        }

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

    if (!results) {
        return;
    }

    results.appendChild(createCard(data));

}


/* =====================================================
   MATH
   ===================================================== */

function isMathQuery(query) {

    const clean = normalizeText(query)
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

        const clean = normalizeText(query)
            .replace(/what is/g, "")
            .replace(/calculate/g, "")
            .replace(/solve/g, "")
            .replace(/kitna/g, "")
            .replace(/hoga/g, "")
            .trim();

        if (!/^[0-9+\-*/().%\s]+$/.test(clean)) {
            return null;
        }

        const result = Function(
            `"use strict"; return (${clean})`
        )();

        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {

            return null;

        }

        return result;

    } catch {

        return null;

    }

}

function tryMath(query) {

    if (!isMathQuery(query)) {
        return false;
    }

    const answer = calculateMath(query);

    if (answer === null) {
        return false;
    }

    const card = document.createElement("div");

    card.className = "result-card";

    card.innerHTML = `

        <h2>🧮 Calculator</h2>

        <p>${escapeHTML(query)}</p>

        <h1>${escapeHTML(answer)}</h1>

    `;

    results.appendChild(card);

    return true;

}


/* =====================================================
   PERCENTAGE
   ===================================================== */

function tryPercentage(query) {

    const match = String(query).match(
        /(\d+(?:\.\d+)?)\s*(?:का|ka|of)\s*(\d+(?:\.\d+)?)\s*%?/i
    );

    if (!match) {
        return false;
    }

    const first = Number(match[1]);
    const second = Number(match[2]);

    const answer = first * second / 100;

    const card = document.createElement("div");

    card.className = "result-card";

    card.innerHTML = `

        <h2>🧮 Percentage</h2>

        <p>${escapeHTML(query)}</p>

        <h1>${answer}</h1>

    `;

    results.appendChild(card);

    return true;

}


/* =====================================================
   CURRENCY
   ===================================================== */

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

    const clean = normalizeText(value);

    for (const key in CURRENCY_WORDS) {

        if (clean.includes(key)) {
            return CURRENCY_WORDS[key];
        }

    }

    return null;

}

async function tryCurrency(query) {

    const amountMatch = String(query).match(
        /(\d+(?:\.\d+)?)/
    );

    if (!amountMatch) {
        return false;
    }

    const from = findCurrency(query);

    if (!from) {
        return false;
    }

    const currencies = [
        "USD",
        "INR",
        "EUR",
        "GBP",
        "JPY"
    ];

    let to = null;

    currencies.forEach(currency => {

        if (
            query.toUpperCase().includes(currency)
        ) {

            to = currency;

        }

    });

    if (!to) {

        if (from === "USD") {
            to = "INR";
        } else if (from === "INR") {
            to = "USD";
        }

    }

    if (!to || from === to) {
        return false;
    }

    try {

        const amount = Number(amountMatch[1]);

        const response = await fetch(
            "https://api.frankfurter.dev/v2/rate/" +
            from +
            "/" +
            to
        );

        if (!response.ok) {
            return false;
        }

        const data = await response.json();

        const result = amount * data.rate;

        const card = document.createElement("div");

        card.className = "result-card";

        card.innerHTML = `

            <h2>💱 Currency Converter</h2>

            <p>${amount} ${from}</p>

            <h1>
                ${result.toFixed(2)} ${to}
            </h1>

        `;

        results.appendChild(card);

        return true;

    } catch {

        return false;

    }

}


/* =====================================================
   WEATHER
   ===================================================== */

function isWeatherQuery(query) {

    return [

        "weather",
        "mausam",
        "temperature",
        "temp",
        "forecast"

    ].some(word =>
        normalizeText(query).includes(word)
    );

}

async function tryWeather(query) {

    if (!isWeatherQuery(query)) {
        return false;
    }

    let location = String(query)
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
            "&count=1&language=en&format=json";

        const geoResponse = await fetch(geoURL);

        const geo = await geoResponse.json();

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
            "&current=temperature_2m,wind_speed_10m";

        const weatherResponse =
            await fetch(weatherURL);

        const weather =
            await weatherResponse.json();

        const current = weather.current;

        const card = document.createElement("div");

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

    } catch {

        return false;

    }

}


/* =====================================================
   LOCAL DATA.JSON RESULTS
   ===================================================== */

function renderAjadeshData(items) {

    if (!items.length) {
        return false;
    }

    items.forEach(item => {

        addCard({

            title: item.title || "Ajadesh Result",

            url: item.url || "#",

            description: item.text || item.description || "",

            badge: "Ajadeshwar Data"

        });

    });

    return true;

}


/* =====================================================
   WIKIPEDIA
   ===================================================== */

async function tryWikipedia(query) {

    try {

        const url =
            "https://en.wikipedia.org/w/api.php" +
            "?action=query" +
            "&list=search" +
            "&srsearch=" +
            encodeURIComponent(query) +
            "&format=json" +
            "&origin=*";

        const response = await fetch(url);

        if (!response.ok) {
            return false;
        }

        const data = await response.json();

        const items =
            data.query &&
            data.query.search;

        if (
            !items ||
            !items.length
        ) {

            return false;

        }

        items.slice(0, 5).forEach(item => {

            const wikiURL =
                "https://en.wikipedia.org/wiki/" +
                encodeURIComponent(
                    item.title.replace(/ /g, "_")
                );

            addCard({

                title: item.title,

                url: wikiURL,

                description: item.snippet
                    .replace(/<[^>]*>/g, ""),

                badge: "Wikipedia"

            });

        });

        return true;

    } catch {

        return false;

    }

}


/* =====================================================
   LOCAL SEARCH
   ===================================================== */

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
        normalizeText(query).includes(word)
    );

}

async function tryLocalSearch(query) {

    if (!isLocalQuery(query)) {
        return false;
    }

    try {

        const url =
            "https://nominatim.openstreetmap.org/search" +
            "?format=jsonv2&limit=8&q=" +
            encodeURIComponent(query);

        const response = await fetch(url);

        const data = await response.json();

        if (!data.length) {
            return false;
        }

        data.forEach(place => {

            addCard({

                title: place.display_name,

                url:
                    "https://www.google.com/maps/search/" +
                    encodeURIComponent(place.display_name),

                description:
                    "Open this place in Google Maps.",

                badge: "Location"

            });

        });

        return true;

    } catch {

        return false;

    }

}


/* =====================================================
   DUCKDUCKGO
   ===================================================== */

async function searchDuckDuckGo(query) {

    const url =
        "https://api.duckduckgo.com/?q=" +
        encodeURIComponent(query) +
        "&format=json&no_html=1&skip_disambig=1";

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Search failed");
    }

    return await response.json();

}

function normalizeDuckResults(data, query) {

    const output = [];

    if (
        data.AbstractText &&
        data.AbstractURL
    ) {

        output.push({

            title: data.Heading || query,

            url: data.AbstractURL,

            description: data.AbstractText

        });

    }

    if (Array.isArray(data.RelatedTopics)) {

        data.RelatedTopics.forEach(topic => {

            if (
                topic &&
                topic.FirstURL &&
                topic.Text
            ) {

                output.push({

                    title:
                        topic.Text.split(" - ")[0],

                    url: topic.FirstURL,

                    description: topic.Text

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

                            url: child.FirstURL,

                            description: child.Text

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


/* =====================================================
   OFFICIAL RESULTS
   ===================================================== */

function renderOfficialResults(query) {

    const sites = findOfficialSites(query);

    if (!sites.length) {
        return false;
    }

    sites.forEach(site => {

        addCard({

            title: site.name,

            url: site.url,

            description:
                "Official website of " + site.name,

            badge: "Official Website"

        });

    });

    return true;

}


/* =====================================================
   WEB RESULTS
   ===================================================== */

function renderWebResults(items, query) {

    if (!items.length) {
        return false;
    }

    items
        .slice(0, MASTER_MIND.maxResults)
        .forEach(item => {

            addCard({

                title: item.title,

                url: item.url,

                description: item.description,

                badge: "Web Result"

            });

        });

    return true;

}


/* =====================================================
   MAIN SEARCH ENGINE
   ===================================================== */

async function startSearch(query) {

    query = String(query || "").trim();

    if (!query) {

        alert("Bhai kuchh search to kar 😭");

        return;

    }

    if (MASTER_MIND.isSearching) {
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

    if (results) {

        results.innerHTML = `

            <div class="result-card">

                <h2>🔍 Searching...</h2>

                <p>
                    Mastermind smart search
                    chala raha hai 😎🔥
                </p>

            </div>

        `;

    }

    addHistory(query);

    let found = false;

    try {

        const ajadeshResults =
            searchAjadeshIndex(query);

        if (ajadeshResults.length) {

            results.innerHTML = "";

            ajadeshResults.forEach(item => {

                addCard({

                    title: item.title,

                    url: item.url,

                    description: item.description,

                    badge: "Ajadeshwar Index"

                });

            });

            found = true;

        }

        const dataResults =
            searchAjadeshData(query);

        if (dataResults.length) {

            if (!found) {
                results.innerHTML = "";
            }

            renderAjadeshData(dataResults);

            found = true;

        }

        if (tryMath(query)) {
            found = true;
        }

        if (tryPercentage(query)) {
            found = true;
        }

        if (await tryCurrency(query)) {
            found = true;
        }

        if (await tryWeather(query)) {
            found = true;
        }

        if (await tryLocalSearch(query)) {
            found = true;
        }

        if (renderOfficialResults(query)) {
            found = true;
        }

        const duckData =
            await searchDuckDuckGo(query);

        const webItems =
            normalizeDuckResults(
                duckData,
                query
            );

        if (renderWebResults(webItems, query)) {
            found = true;
        }

        if (await tryWikipedia(query)) {
            found = true;
        }

        if (!found) {

            results.innerHTML = `

                <div class="result-card">

                    <h2>😕 Result nahi mila</h2>

                    <p>
                        ${escapeHTML(query)}
                    </p>

                    <p>
                        Dusre words se search karke
                        dekh bhai 😭
                    </p>

                </div>

            `;

        }

    } catch (error) {

        console.error("💀 SEARCH ERROR:", error);

        if (!found) {

            results.innerHTML = `

                <div class="result-card">

                    <h2>⚠️ Search Error</h2>

                    <p>
                        Bhai network ya API me
                        panga aa gaya 😭
                    </p>

                </div>

            `;

        }

    }

    MASTER_MIND.isSearching = false;

}


/* =====================================================
   SEARCH INPUT — ENTER FIX
   ===================================================== */

if (searchBox) {

    searchBox.addEventListener(
        "input",
        event => {

            showSuggestions(event.target.value);

        }
    );

    searchBox.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                startSearch(searchBox.value);

            }

        }
    );

}


/* =====================================================
   RESULT SEARCH — ENTER FIX
   ===================================================== */

if (resultSearch) {

    resultSearch.addEventListener(
        "input",
        event => {

            showSuggestions(event.target.value);

        }
    );

    resultSearch.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                startSearch(resultSearch.value);

            }

        }
    );

}


/* =====================================================
   SEARCH BUTTON — FIXED
   ===================================================== */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            const query =
                resultSearch?.value ||
                searchBox?.value ||
                "";

            startSearch(query);

        }
    );

}


/* =====================================================
   ALL QUICK BUTTONS — FIXED
   ===================================================== */

document
    .querySelectorAll("[data-search]")
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const query =
                    button.getAttribute("data-search");

                if (query) {

                    startSearch(query);

                }

            }
        );

    });


/* =====================================================
   BACK BUTTON
   ===================================================== */

const backButton = byId("backBtn");

if (backButton) {

    backButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            if (resultsPage) {
                resultsPage.style.display = "none";
            }

            if (homePage) {
                homePage.style.display = "block";
            }

        }
    );

}


/* =====================================================
   WALLPAPER
   ===================================================== */

function openWallpaper() {

    const modal = byId("wallpaperModal");

    if (modal) {
        modal.style.display = "flex";
    }

}

function closeWallpaper() {

    const modal = byId("wallpaperModal");

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

const wallpaperButton = byId("wallpaperBtn");

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

document
    .querySelectorAll("[data-wall]")
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


/* =====================================================
   LOGIN
   ===================================================== */

function openLogin() {

    const modal = byId("loginModal");

    if (modal) {
        modal.style.display = "flex";
    }

}

function closeLogin() {

    const modal = byId("loginModal");

    if (modal) {
        modal.style.display = "none";
    }

}

function loginUser() {

    const username = byId("username");
    const password = byId("password");

    if (!username || !password) {
        return;
    }

    const name = username.value.trim();
    const pass = password.value.trim();

    if (!name || !pass) {

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

    alert("Sign In successful 😎🔥");

    closeLogin();

    const signInButton =
        byId("signinBtn");

    if (signInButton) {

        signInButton.textContent =
            "👤 " + name;

    }

}

const signInButton = byId("signinBtn");

if (signInButton) {

 console.log("Firebase Sign In active");

}

const closeLoginButton =
    byId("closeLogin");

if (closeLoginButton) {

    closeLoginButton.addEventListener(
        "click",
        closeLogin
    );

}

const loginButton = byId("loginBtn");

if (loginButton) {

    loginButton.addEventListener(
        "click",
        loginUser
    );

}


/* =====================================================
   MODAL CLOSE
   ===================================================== */

window.addEventListener(
    "click",
    event => {

        const wallpaperModal =
            byId("wallpaperModal");

        const loginModal =
            byId("loginModal");

        if (
            event.target === wallpaperModal
        ) {

            closeWallpaper();

        }

        if (
            event.target === loginModal
        ) {

            closeLogin();

        }

    }
);


/* =====================================================
   ESCAPE
   ===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeWallpaper();
            closeLogin();

        }

    }
);


/* =====================================================
   INIT
   ===================================================== */

function initializeMastermind() {

    loadStorage();

    applyWallpaper(
        MASTER_MIND.wallpaper
    );

    renderHistory();

    if (MASTER_MIND.user) {

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


/* =====================================================
   GLOBAL API
   ===================================================== */

window.MASTERMIND = {

    search: startSearch,

    suggestions: suggestionDatabase,

    officialSites: OFFICIAL_SITES,

    version: MASTER_MIND.version

};

console.log(
    "🔥 MASTERMIND SEARCH ENGINE READY"
);
const signinBtn = document.getElementById("signinBtn");

if (signinBtn) {

    auth.onAuthStateChanged((user) => {

        if (user) {

            signinBtn.innerHTML = `
                <img src="${user.photoURL || ''}" 
                width="30" 
                style="border-radius:50%;vertical-align:middle;">
                ${user.displayName || "User"}
            `;

          signinBtn.onclick = () => {

    console.log("Profile Open");

};

        } else {

            signinBtn.innerHTML = "Sign In";

            signinBtn.onclick = async () => {

                try {

                    await signInWithPopup(auth, provider);

                } catch(error) {

                    console.log("Login Error:", error.message);

                }

            };

        }
// ================================
// FIREBASE PROFILE LOGIN SYSTEM
// ================================

auth.onAuthStateChanged((user) => {

    const signinBtn = document.getElementById("signinBtn");

    if (!signinBtn) return;

    if (user) {

        signinBtn.innerHTML = `
        <img src="${user.photoURL || ''}" 
        width="30"
        style="border-radius:50%;vertical-align:middle;">
        ${user.displayName || "Profile"}
        `;

        signinBtn.onclick = () => {

            alert(
                "👤 Name: " + (user.displayName || "") +
                "\n📧 Email: " + (user.email || "")
            );

        };

    } else {

        signinBtn.innerHTML = "Sign In";

        signinBtn.onclick = async () => {

            try {

                await signInWithPopup(auth, provider);

            } catch(error) {

                console.log(error.message);

            }

        };

    }

});
    });

}
// Disable old username/password login popup
document.addEventListener("DOMContentLoaded", () => {

    const oldLogin = document.getElementById("loginModal");

    if (oldLogin) {

        oldLogin.style.display = "none";

    }

});
