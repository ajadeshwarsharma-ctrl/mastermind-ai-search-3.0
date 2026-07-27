"use strict";

const fs = require("fs");
const path = require("path");

console.log("🔥 Mastermind X Crawler Started");

const SEED_FILE = path.join(__dirname, "seed-urls.json");

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
const axios = require("axios");
const cheerio = require("cheerio");

let rawData = [];

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
