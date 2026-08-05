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

const USER_AGENT = "MastermindXBot/2.0";

function readJSON(file, fallback = []) {
    try {
        if (!fs.existsSync(file)) return fallback;
        const txt = fs.readFileSync(file, "utf8").trim();
        if (!txt) return fallback;
        return JSON.parse(txt);
    } catch {
        return fallback;
    }
}

function writeJSON(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

function loadSeeds() {
    const seeds = readJSON(SEED_FILE, []);

    const clean = seeds
        .map(s => {
            if (typeof s !== "string") return "";

            const md = s.match(/\((https?:\/\/[^)]+)\)/);
            if (md) return md[1];

            return s.trim();
        })
        .filter(s => s.startsWith("http"));

    console.log("🌱 Seeds:", clean.length);

    return clean;
}

function loadQueue() {
    return readJSON(QUEUE_FILE, []);
}

function saveQueue(q) {
    writeJSON(QUEUE_FILE, q);
}

function loadVisited() {
    return readJSON(VISITED_FILE, []);
}

function saveVisited(v) {
    writeJSON(VISITED_FILE, v);
}

function loadRaw() {
    return readJSON(RAW_FILE, []);
}

function saveRaw(raw) {
    writeJSON(RAW_FILE, raw);
}

function normalize(text) {
    return String(text || "")
        .replace(/\s+/g, " ")
        .trim();
}

function pageExists(rawData, url) {
    return rawData.some(p => p.url === url);
}

function isValidLink(link) {

    if (!link) return false;

    if (!link.startsWith("http")) return false;

    if (
        link.includes(".jpg") ||
        link.includes(".jpeg") ||
        link.includes(".png") ||
        link.includes(".gif") ||
        link.includes(".svg") ||
        link.includes(".pdf") ||
        link.includes(".zip") ||
        link.includes("mailto:") ||
        link.includes("javascript:")
    ) {
        return false;
    }

    return true;
}
async function crawlPage(url) {

    try {

        console.log("🌍 Crawling:", url);

        const { data } = await axios.get(url, {
            timeout: 10000,
            headers: {
                "User-Agent": USER_AGENT
            }
        });

        const $ = cheerio.load(data);

        const page = {

            url,

            title: normalize($("title").text()),

            description: normalize(
                $('meta[name="description"]').attr("content") || ""
            ),

            body: normalize(
                $("body").text()
            )

        };

        const links = [];

        $("a").each((i, el) => {

            let href = $(el).attr("href");

            if (!href) return;

            try {

                href = new URL(href, url).href;

            } catch {

                return;

            }

            href = href.split("#")[0];

            if (isValidLink(href)) {

                links.push(href);

            }

        });

        page.links = [...new Set(links)];

        return page;

    } catch (err) {

        console.log("❌ Failed:", url);

        return null;

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

    while (queue.length > 0) {

        const url = queue.shift();

        if (visited.includes(url)) {

            continue;

        }

        visited.push(url);

        saveVisited(visited);

        saveQueue(queue);

        const page = await crawlPage(url);

        if (!page) {

            continue;

        }

        if (!pageExists(rawData, page.url)) {

            rawData.push(page);

            saveRaw(rawData);

            console.log("💾 Saved:", page.url);

        }
                for (const link of page.links) {

            if (!visited.includes(link) && !queue.includes(link)) {

                queue.push(link);

            }

        }

        saveQueue(queue);

        console.log("📥 Queue:", queue.length);
        console.log("📚 Visited:", visited.length);
        console.log("💾 Raw Pages:", rawData.length);

        // Safety limit per run (GitHub Actions timeout se bachne ke liye)
        if (visited.length % 500 === 0) {
            console.log("⏸️ Saved progress...");
            break;
        }

    }

    console.log("");
    console.log("======================================");
    console.log("🎉 Crawl Finished");
    console.log("🌱 Seeds      :", seeds.length);
    console.log("📚 Visited    :", visited.length);
    console.log("📥 Queue Left :", queue.length);
    console.log("💾 Raw Pages  :", rawData.length);
    console.log("======================================");
}

run().catch(err => {
    console.error("💥 Fatal Error");
    console.error(err);
});
