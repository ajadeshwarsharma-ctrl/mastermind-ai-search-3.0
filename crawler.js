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

        console.log("✅ Seed URLs Loaded:", seeds.length);

        return seeds;

    } catch (err) {

        console.log("❌ Seed Loader Error");
        console.log(err.message);

        return [];
    }
}

async function run() {

    console.log("🚀 run() started");

    const seeds = loadSeeds();

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
