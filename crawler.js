"use strict";

/*
=========================================================
 AJADESH SEARCH ENGINE
 Production Crawler v2
 Part 1
=========================================================
*/

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const SEED_FILE = path.join(__dirname, "seed-urls.json");

function loadSeeds() {

    if (!fs.existsSync(SEED_FILE)) {
        return [];
    }

    return JSON.parse(
        fs.readFileSync(SEED_FILE, "utf8")
    );

}
const RAW_DATA_FILE = path.join(__dirname, "raw-data.json");

const USER_AGENT =
"AjadeshBot/2.0 (+https://github.com/ajadeshwarsharma-ctrl/mastermind-ai-search-3.0)";

const MAX_PAGES = 100;

const REQUEST_TIMEOUT = 15000;

const queue = [];

const visited = new Set();

const database = [];

const statistics = {

    crawled: 0,

    failed: 0,

    skipped: 0

};

function normalizeUrl(url){

    try{

        const u = new URL(url);

        u.hash = "";

        if(u.pathname.endsWith("/"))

            u.pathname = u.pathname.slice(0,-1);

        return u.toString();

    }

    catch{

        return null;

    }

}

function enqueue(url){

    const clean = normalizeUrl(url);

    if(!clean) return;

    if(visited.has(clean)) return;

    visited.add(clean);

    queue.push(clean);

}

function absolute(base,link){

    try{

        return new URL(link,base).toString();

    }

    catch{

        return null;

    }

}

async function download(url){

    try{

        const response = await axios.get(url,{

            timeout:REQUEST_TIMEOUT,

            headers:{

                "User-Agent":USER_AGENT,

                "Accept":"text/html"

            },

            maxRedirects:5

        });

        return response.data;

    }

    catch(error){

        statistics.failed++;

        console.log("❌",url);

        return null;

    }

}

function text(node){

    return node

        .text()

        .replace(/\s+/g," ")

        .trim();

}

function extractMeta($){

    const meta = {};

    meta.description =
        $('meta[name="description"]').attr("content") || "";

    meta.keywords =
        $('meta[name="keywords"]').attr("content") || "";

    meta.language =
        $("html").attr("lang") || "";

    meta.canonical =
        $('link[rel="canonical"]').attr("href") || "";

    return meta;

}function extractHeadings($){

    const headings = [];

    $("h1,h2,h3,h4,h5,h6").each((i,el)=>{

        const value = text($(el));

        if(value.length>0){

            headings.push({

                tag:el.tagName.toLowerCase(),

                text:value

            });

        }

    });

    return headings;

}

function extractParagraphs($){

    const paragraphs = [];

    $("p").each((i,el)=>{

        const value = text($(el));

        if(value.length>30){

            paragraphs.push(value);

        }

    });

    return paragraphs;

}

function extractLinks($,base){

    const links = [];

    $("a[href]").each((i,el)=>{

        const href = $(el).attr("href");

        const absoluteUrl = absolute(base,href);

        if(!absoluteUrl) return;

        links.push({

            url:absoluteUrl,

            text:text($(el))

        });

    });

    return links;

}

function extractImages($,base){

    const images = [];

    $("img").each((i,el)=>{

        const src=$(el).attr("src");

        if(!src) return;

        const imageUrl=absolute(base,src);

        if(!imageUrl) return;

        images.push({

            src:imageUrl,

            alt:$(el).attr("alt")||""

        });

    });

    return images;

}

function extractText($){

    return $("body")

        .text()

        .replace(/\s+/g," ")

        .trim();

}

function buildRecord(url,$){

    const meta=extractMeta($);

    return{

        url,

        title:$("title").text().trim(),

        description:meta.description,

        keywords:meta.keywords,

        language:meta.language,

        canonical:meta.canonical,

        headings:extractHeadings($),

        paragraphs:extractParagraphs($),

        links:extractLinks($,url),

        images:extractImages($,url),

        body:extractText($),

        crawledAt:new Date().toISOString()

    };

}async function crawlPage(url){

    console.log("🌍 Crawling:", url);

    const html = await download(url);

    if(!html) return;

    const $ = cheerio.load(html);

    const record = buildRecord(url,$);

    database.push(record);

    statistics.crawled++;

    for(const link of record.links){

        if(queue.length >= MAX_PAGES) break;

        enqueue(link.url);

    }

}

async function startCrawler(seedUrls){

    for(const url of seedUrls){

        enqueue(url);

    }

    while(queue.length > 0){

        if(database.length >= MAX_PAGES){

            console.log("✅ Crawl limit reached.");

            break;

        }

        const current = queue.shift();

        await crawlPage(current);

    }

}

function saveDatabase(){

    fs.writeFileSync(

        RAW_DATA_FILE,

        JSON.stringify(database,null,2),

        "utf8"

    );

}

function printStatistics(){

    console.log("");

    console.log("===================================");

    console.log(" AJADESH SEARCH ENGINE");

    console.log(" Production Crawler Report");

    console.log("===================================");

    console.log("Pages Crawled :", statistics.crawled);

    console.log("Failed Pages  :", statistics.failed);

    console.log("Skipped Pages :", statistics.skipped);

    console.log("Saved Records :", database.length);

    console.log("===================================");

    console.log("");

}async function main(){

    console.log("🚀 Ajadesh Crawler Starting...");

    const seedUrls = [

    "https://www.youtube.com",
    "https://www.instagram.com",
    "https://www.facebook.com",
    "https://www.uidai.gov.in",
    "https://www.mpbse.nic.in",
    "https://openai.com"

];
const dynamicSeeds = loadSeeds();
 if (dynamicSeeds.length > 0) {
    seedUrls.push(...dynamicSeeds);
}
    await startCrawler(seedUrls);

    saveDatabase();

    printStatistics();

    console.log("✅ raw-data.json updated successfully.");

}


main()
.catch(error=>{

    console.error("🔥 Crawler Error:");

    console.error(error);

});
