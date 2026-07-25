"use strict";
console.log("🔥 CRAWLER FILE STARTED");
/*
=========================================
 Mastermind X Search Engine
 Crawler v4.0
 Developer : Ajadeshwar Sharma
=========================================
*/

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

/* =========================================
   FILE PATHS
========================================= */

const ROOT = __dirname;

const SEED_FILE = path.join(ROOT, "seed-urls.json");
const RAW_DATA_FILE = path.join(ROOT, "raw-data.json");

/* =========================================
   CONFIGURATION
========================================= */

const CONFIG = {

    USER_AGENT:
        "MastermindXBot/4.0",

    REQUEST_TIMEOUT:
        15000,

    MAX_PAGES:
        1000,

    MAX_LINKS_PER_PAGE:
        200,

    MAX_SITEMAP_LINKS:
        500

};

console.log("🚀 Mastermind X Crawler v4.0 Loaded");
/* =========================================
   MEMORY
========================================= */

const queue = [];

const visited = new Set();

const failed = new Set();

const database = [];

const report = {

    pages: 0,

    saved: 0,

    failed: 0,

    skipped: 0,

    links: 0,

    images: 0,

    started: new Date().toISOString(),

    finished: null

};

/* =========================================
   QUEUE SYSTEM
========================================= */

function enqueue(url){

    if(!url) return;

    if(visited.has(url))
        return;

    visited.add(url);

    queue.push(url);

}

function enqueueMany(list){

    for(const url of list){

        enqueue(url);

    }

}

function dequeue(){

    if(queue.length===0)
        return null;

    return queue.shift();

}

function queueSize(){

    return queue.length;

}

console.log("🧠 Queue System Ready");
/* =========================================
   JSON FILE SYSTEM
========================================= */

function readJSON(filePath){

    try{

        if(!fs.existsSync(filePath))
            return [];

        return JSON.parse(

            fs.readFileSync(

                filePath,

                "utf8"

            )

        );

    }

    catch(error){

        console.log(

            "⚠ Cannot Read",

            path.basename(filePath)

        );

        return [];

    }

}



function saveJSON(filePath,data){

    fs.writeFileSync(

        filePath,

        JSON.stringify(

            data,

            null,

            2

        ),

        "utf8"

    );

}



/* =========================================
   LOADERS
========================================= */

function loadSeeds(){

    return readJSON(

        SEED_FILE

    );

}



function loadDatabase(){

    const data = readJSON(

        RAW_DATA_FILE

    );

    database.length = 0;

    database.push(...data);

}



/* =========================================
   SAVERS
========================================= */

function saveDatabase(){

    saveJSON(

        RAW_DATA_FILE,

        database

    );

}

console.log("💾 File System Ready");
/* =========================================
   URL UTILITIES
========================================= */

function normalizeURL(url){

    try{

        const u = new URL(url);

        u.hash = "";

        if(u.pathname.endsWith("/")){

            u.pathname =

            u.pathname.slice(0,-1);

        }

        return u.toString();

    }

    catch{

        return null;

    }

}



function absoluteURL(base,link){

    try{

        return new URL(

            link,

            base

        ).toString();

    }

    catch{

        return null;

    }

}



/* =========================================
   HTTP DOWNLOADER
========================================= */

async function download(url){

    try{

        console.log("🌍",url);

        const response =

        await axios.get(

            url,

            {

                timeout:

                CONFIG.REQUEST_TIMEOUT,

                headers:{

                    "User-Agent":

                    CONFIG.USER_AGENT,

                    "Accept":

                    "text/html"

                },

                maxRedirects:5

            }

        );

        return response.data;

    }

    catch(error){

        failed.add(url);

        report.failed++;

        console.log(

            "❌ Failed :",url

        );

        return null;

    }

}

console.log("🌐 Network Engine Ready");
/* =========================================
   HTML PARSER
========================================= */

function cleanText(text){

    return String(text || "")

        .replace(/\s+/g," ")

        .replace(/\n/g," ")

        .trim();

}



/* =========================================
   META DATA
========================================= */

function extractMeta($){

    return{

        title:

            cleanText(

                $("title").text()

            ),

        description:

            cleanText(

                $('meta[name="description"]').attr("content")

            ),

        keywords:

            cleanText(

                $('meta[name="keywords"]').attr("content")

            ),

        language:

            cleanText(

                $("html").attr("lang")

            ),

        canonical:

            cleanText(

                $('link[rel="canonical"]').attr("href")

            )

    };

}



/* =========================================
   BODY TEXT
========================================= */

function extractBody($){

    return cleanText(

        $("body").text()

    );

}



/* =========================================
   HEADINGS
========================================= */

function extractHeadings($){

    const list=[];

    $("h1,h2,h3,h4,h5,h6").each(

        (i,el)=>{

            const value=

            cleanText(

                $(el).text()

            );

            if(value.length){

                list.push({

                    tag:el.tagName.toLowerCase(),

                    text:value

                });

            }

        }

    );

    return list;

}

console.log("📄 HTML Parser Ready");
/* =========================================
   LINK EXTRACTOR
========================================= */

function extractLinks($, base){

    const links = [];
    const used = new Set();

    $("a[href]").each((i, el)=>{

        const href = $(el).attr("href");

        if(!href) return;

        const url = absoluteURL(base, href);

        if(!url) return;

        if(used.has(url)) return;

        used.add(url);

        links.push({

            url,

            text: cleanText($(el).text())

        });

    });

    return links;

}

/* =========================================
   IMAGE EXTRACTOR
========================================= */

function extractImages($, base){

    const images = [];

    $("img").each((i, el)=>{

        const src = $(el).attr("src");

        if(!src) return;

        const url = absoluteURL(base, src);

        if(!url) return;

        images.push({

            src: url,

            alt: cleanText($(el).attr("alt"))

        });

    });

    return images;

}

/* =========================================
   PAGE RECORD
========================================= */

function buildRecord(url, $){

    const meta = extractMeta($);

    return{

        id: normalizeURL(url),

        url,

        title: meta.title,

        description: meta.description,

        keywords: meta.keywords,

        language: meta.language,

        canonical: meta.canonical,

        headings: extractHeadings($),

        body: extractBody($),

        links: extractLinks($, url),

        images: extractImages($, url),

        crawledAt: new Date().toISOString()

    };

}

console.log("📦 Record Builder Ready");
/* =========================================
   CRAWL SINGLE PAGE
========================================= */

async function crawlPage(url){

    const html = await download(url);

    if(!html)
        return;

    const $ = cheerio.load(html);

    const record = buildRecord(url, $);

    database.push(record);

    report.pages++;
    report.saved++;
    report.links += record.links.length;
    report.images += record.images.length;

    for(const link of record.links){

        if(queueSize() >= CONFIG.MAX_PAGES)
            break;

        enqueue(link.url);

    }

}

/* =========================================
   START CRAWLER
========================================= */

async function startCrawler(seedUrls){

    enqueueMany(seedUrls);

    while(queueSize() > 0){

        if(report.pages >= CONFIG.MAX_PAGES){

            console.log("✅ Maximum Crawl Limit Reached");

            break;

        }

        const current = dequeue();

        if(!current)
            continue;

        await crawlPage(current);

    }

}

console.log("🕷️ Crawl Engine Ready");
/* =========================================
   MAIN CONTROLLER
========================================= */

async function run(){

    console.log("");

    console.log("======================================");
    console.log("🚀 Mastermind X Crawler v4.0");
    console.log("======================================");

    loadDatabase();

    console.log("📂 Existing Records :", database.length);

    const seeds = loadSeeds();

    console.log("🌱 Seed URLs :", seeds.length);

    const start = Date.now();

    await startCrawler(seeds);

    saveDatabase();

    report.finished = new Date().toISOString();

    const end = Date.now();

    console.log("");

    console.log("======================================");
    console.log("✅ CRAWL COMPLETED");
    console.log("======================================");
    console.log("Pages Crawled :", report.pages);
    console.log("Records Saved :", database.length);
    console.log("Failed :", report.failed);
    console.log("Visited :", visited.size);
    console.log("Queue Left :", queueSize());
    console.log("Time :", ((end-start)/1000).toFixed(2),"sec");
    console.log("======================================");

}
/* =========================================
   BOOT LOADER
========================================= */

run()

.then(()=>{

    console.log("");

    console.log("🎉 Mastermind X Crawler Started Successfully");

})

.catch(error=>{

    console.log("");

    console.error("💥 Fatal Error");

    console.error(error);

});
/* =========================================
   FINAL VERSION INFO
========================================= */

const ENGINE = {

    name: "Mastermind X Search Engine",

    module: "Crawler",

    version: "4.0",

    developer: "Ajadeshwar Sharma",

    bot: "MastermindXBot"

};

console.log("");

console.log("======================================");
console.log("🧠", ENGINE.name);
console.log("📦 Module :", ENGINE.module);
console.log("🤖 Bot :", ENGINE.bot);
console.log("🏷 Version :", ENGINE.version);
console.log("👨‍💻 Developer :", ENGINE.developer);
console.log("======================================");

process.on("uncaughtException",(err)=>{

    console.error("💥 Uncaught Exception");
    console.error(err);

});

process.on("unhandledRejection",(err)=>{

    console.error("💥 Unhandled Rejection");
    console.error(err);

});
