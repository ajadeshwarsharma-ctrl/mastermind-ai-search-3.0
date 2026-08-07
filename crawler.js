"use strict";

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

console.log("🔥 Mastermind X Crawler v5 Started");

const USER_AGENT = "MastermindXBot/5.0";

const SEED_FILE = path.join(__dirname, "seed-urls.json");
const QUEUE_FILE = path.join(__dirname, "queue.json");
const VISITED_FILE = path.join(__dirname, "visited.json");

const RAW_DIR = path.join(__dirname, "database", "raw");

if (!fs.existsSync(RAW_DIR)) {
    fs.mkdirSync(RAW_DIR, { recursive: true });
}

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

    fs.writeFileSync(
        file,
        JSON.stringify(data, null, 2),
        "utf8"
    );

}

function loadSeeds() {

    const seeds = readJSON(SEED_FILE, []);

    return seeds
        .map(s => {

            if (typeof s !== "string") return "";

            const md = s.match(/\((https?:\/\/[^)]+)\)/);

            if (md) return md[1];

            return s.trim();

        })
        .filter(s => s.startsWith("http"));

}

function loadQueue() {

    return readJSON(QUEUE_FILE, []);

}

function saveQueue(queue) {

    writeJSON(QUEUE_FILE, queue);

}

function loadVisited() {

    return readJSON(VISITED_FILE, []);

}

function saveVisited(visited) {

    writeJSON(VISITED_FILE, visited);

}

function normalize(text) {

    return String(text || "")
        .replace(/\s+/g, " ")
        .trim();

}

function isValidLink(link) {

    if (!link) return false;

    if (!link.startsWith("http")) return false;

    const bad = [

        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".svg",
        ".pdf",
        ".zip",
        ".rar",
        ".mp4",
        ".mp3",
        ".avi",
        "mailto:",
        "javascript:",

        // Google Block
        "google.com",
        "www.google.com",
        "google.co.in",
        "googleusercontent.com",
        "gstatic.com",
        "googlesyndication.com",
        "doubleclick.net",
        "googleapis.com"

    ];

    for (const ext of bad) {

        if (link.toLowerCase().includes(ext.toLowerCase())) {

            return false;

        }

    }

    return true;

}

function getLatestRawFile() {

    const files = fs.readdirSync(RAW_DIR)
        .filter(f => f.startsWith("raw-data-"))
        .sort();

    if (files.length === 0) {

        return path.join(
            RAW_DIR,
            "raw-data-0001.json"
        );

    }

    let latest = path.join(
        RAW_DIR,
        files[files.length - 1]
    );

    if (fs.existsSync(latest)) {

        const sizeMB =
            fs.statSync(latest).size / 1024 / 1024;

        if (sizeMB >= 40) {

            const next = String(files.length + 1).padStart(4, "0");

            latest = path.join(
                RAW_DIR,
                `raw-data-${next}.json`
            );

            if (!fs.existsSync(latest)) {

                writeJSON(latest, []);

            }

        }

    }

    return latest;

}
function loadRaw(file) {

    return readJSON(file, []);

}

function saveRaw(page) {

    let file = getLatestRawFile();

    let raw = loadRaw(file);

    // Duplicate URL check
    if (raw.some(p => p.url === page.url)) {
        return;
    }

    raw.push(page);

    writeJSON(file, raw);

    let sizeMB = fs.statSync(file).size / 1024 / 1024;

    if (sizeMB >= 40) {

        const files = fs.readdirSync(RAW_DIR)
            .filter(f => f.startsWith("raw-data-"))
            .sort();

        const next = String(files.length + 1).padStart(4, "0");

        const newFile = path.join(
            RAW_DIR,
            `raw-data-${next}.json`
        );

        if (!fs.existsSync(newFile)) {

            writeJSON(newFile, []);

            console.log("📦 Created:", newFile);

        }

    }

}

async function crawl(url) {

    try {

        console.log("🌍", url);

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
   body: normalize(
    $("body")
        .text()
        .replace(/AKIA[0-9A-Z]{16}/g, "[AWS_ACCESS_KEY]")
        .replace(/[A-Za-z0-9\/+=]{40}/g, "[AWS_SECRET_KEY]")
        .replace(/AIza[0-9A-Za-z\-_]{35}/g, "[GOOGLE_API_KEY]")
        .replace(/ghp_[A-Za-z0-9]{36}/g, "[GITHUB_TOKEN]")
        .replace(/sk-[A-Za-z0-9]{20,}/g, "[OPENAI_KEY]")
        .replace(/\s+/g, " ")
        .substring(0, 5000)
),
            links: []

        };

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

                page.links.push(href);

            }

        });

        page.links = [...new Set(page.links)];

        return page;

    } catch {

        console.log("❌ Failed:", url);

        return null;

    }

}
async function run() {

    console.log("🚀 Starting Crawl...");

    const seeds = loadSeeds();

    let queue = loadQueue();

    let visited = loadVisited();

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

        const page = await crawl(url);

        if (!page) {

            continue;

        }

        saveRaw(page);

        for (const link of page.links) {

            if (
                !visited.includes(link) &&
                !queue.includes(link)
            ) {

                queue.push(link);

            }

        }

        saveQueue(queue);

        console.log("📥 Queue :", queue.length);
        console.log("📚 Visited :", visited.length);

        // GitHub Actions timeout se bachne ke liye
        if (visited.length % 500 === 0) {

            console.log("💾 Progress Saved");
            break;

        }

    }

    console.log("=================================");
    console.log("✅ Crawl Finished");
    console.log("🌱 Seeds :", seeds.length);
    console.log("📚 Visited :", visited.length);
    console.log("📥 Queue Left :", queue.length);
    console.log("=================================");

}

run().catch(err => {

    console.error(err);

});
