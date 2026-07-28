"use strict";

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

console.log("🔥 Mastermind X Crawler Started");

const SEED_FILE = path.join(__dirname, "seed-urls.json");
const QUEUE_FILE = path.join(__dirname, "queue.json");
const VISITED_FILE = path.join(__dirname, "visited.json");
const RAW_FILE = path.join(__dirname, "raw-data.json");
function loadQueue() {
    if (!fs.existsSync(QUEUE_FILE)) return [];

    try {
        return JSON.parse(fs.readFileSync(QUEUE_FILE, "utf8"));
    } catch {
        return [];
    }
}

function saveQueue(queue) {
    fs.writeFileSync(
        QUEUE_FILE,
        JSON.stringify(queue, null, 2),
        "utf8"
    );
}

function loadVisited() {
    if (!fs.existsSync(VISITED_FILE)) return [];

    try {
        return JSON.parse(fs.readFileSync(VISITED_FILE, "utf8"));
    } catch {
        return [];
    }
}

function saveVisited(visited) {
    fs.writeFileSync(
        VISITED_FILE,
        JSON.stringify(visited, null, 2),
        "utf8"
    );
}

function loadRaw() {
    if (!fs.existsSync(RAW_FILE)) return [];

    try {
        return JSON.parse(fs.readFileSync(RAW_FILE, "utf8"));
    } catch {
        return [];
    }
}

function saveRaw(raw) {
    fs.writeFileSync(
        RAW_FILE,
        JSON.stringify(raw, null, 2),
        "utf8"
    );
}
function loadSeeds() {
    try {
        const text = fs.readFileSync(SEED_FILE, "utf8");

        console.log("📄 File Size:", text.length);

        const seeds = JSON.parse(text);

        const cleanSeeds = seeds.map(url => {
        if (typeof url !== "string") return "";

        const md = url.match(/\((https?:\/\/[^)]+)\)/);

        if (md) return md[1];

        return url.trim();
        }).filter(url => url.startsWith("http"));

        console.log("✅ Seed URLs Loaded:", cleanSeeds.length);

        return cleanSeeds;

    } catch (err) {

        console.log("❌ Seed Loader Error");
        console.log(err.message);

        return [];
    }
}

async function run() {

    console.log("🚀 run() started");

    const seeds = loadSeeds();
    
    let queue = loadQueue();
    let visited = loadVisited();
    let rawData = loadRaw();

if (queue.length === 0) {
    queue = [...seeds];
    saveQueue(queue);
}
    for (const url of seeds) {
     try {
    console.log("🌍 Crawling:", url);

    const { data } = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent": "MastermindXBot/1.0"
      }
    });

    const $ = cheerio.load(data);

    rawData.push({
      url,
      title: $("title").text().trim(),
      description: $('meta[name="description"]').attr("content") || "",
      body: $("body").text().replace(/\s+/g, " ").trim()
    });

  } catch (err) {
    console.log("❌ Failed:", url);
  }
}

fs.writeFileSync(
  "raw-data.json",
  JSON.stringify(rawData, null, 2)
);

console.log("✅ Crawled Pages:", rawData.length);
    console.log("📄 Total Seeds:", seeds.length);

    if (seeds.length > 0) {
        console.log("First URL:", seeds[0]);
        console.log("Type:", typeof seeds[0]);
        console.log("Raw:", JSON.stringify(seeds[0]));
        console.log("Last URL:", seeds[seeds.length - 1]);
    }

    console.log("🏁 Test Finished");
}

run().catch(console.error);
