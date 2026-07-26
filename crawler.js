"use strict";

const fs = require("fs");
const path = require("path");

console.log("🔥 Mastermind X Crawler Started");

const SEED_FILE = path.join(__dirname, "seed-urls.json");

function loadSeeds() {
    try {
        if (!fs.existsSync(SEED_FILE)) {
            console.log("❌ seed-urls.json not found");
            return [];
        }

        const data = JSON.parse(
            fs.readFileSync(SEED_FILE, "utf8")
        );

        console.log("🌱 Seed URLs Loaded:", data.length);

        return data;

    } catch (err) {
        console.log("❌ Seed Loader Error");
        console.error(err);
        return [];
    }
}

async function run() {

    const seeds = loadSeeds();

    console.log("🚀 run() started");

    console.log("📄 Total Seeds :", seeds.length);

}

run().catch(console.error);
