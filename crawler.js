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

        if (err.message.includes("position")) {

            const pos = Number(
                err.message.match(/position (\\d+)/)?.[1] || 0
            );

            const text = fs.readFileSync(SEED_FILE, "utf8");

            console.log("------------ ERROR AREA ------------");

            console.log(
                text.substring(
                    Math.max(0, pos - 100),
                    pos + 100
                )
            );

            console.log("------------------------------------");
        }

        return [];
    }
}

async function run() {

    console.log("🚀 run() started");

    const seeds = loadSeeds();
console.log("📄 Total Seeds:", seeds.length);

if (seeds.length > 0) {

    console.log("First URL:", seeds[0]);

    console.log(typeof seeds[0]);

    console.log(JSON.stringify(seeds[0]));

    console.log("Last URL:", seeds[seeds.length - 1]);
}

console.log("🏁 Test Finished");
