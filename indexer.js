"use strict";

const fs = require("fs");
const path = require("path");

const RAW_DIR = path.join(__dirname, "database", "raw");
const INDEX_DIR = path.join(__dirname, "database", "index");
const KNOWLEDGE_FILE = path.join(__dirname, "knowledge.json");

if (!fs.existsSync(INDEX_DIR)) {
    fs.mkdirSync(INDEX_DIR, { recursive: true });
}

function loadRawData() {

    if (!fs.existsSync(RAW_DIR)) {
        return [];
    }

    const files = fs.readdirSync(RAW_DIR)
        .filter(f => f.startsWith("raw-data-"))
        .sort();

    let pages = [];

    for (const file of files) {

        try {

            const data = JSON.parse(
                fs.readFileSync(
                    path.join(RAW_DIR, file),
                    "utf8"
                )
            );

            pages.push(...data);

        } catch {

            console.log("❌ Failed:", file);

        }

    }

    return pages;

}

function loadKnowledge() {
    if (!fs.existsSync(KNOWLEDGE_FILE)) {
        return [];
    }

    return JSON.parse(fs.readFileSync(KNOWLEDGE_FILE, "utf8"));
}

function normalize(text) {
    return String(text || "")
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function makeKeywords(page) {
    const source = [
        page.title,
        page.description,
        page.body
    ].join(" ");

    const words = normalize(source)
        .split(" ")
        .filter(word => word.length > 2);

    return [...new Set(words)];
}

function buildIndex(pages) {

    const visited = new Set();
    const index = [];

    for (const page of pages) {

        if (!page.url) continue;

        if (visited.has(page.url)) continue;

        visited.add(page.url);

        index.push({
            url: page.url,
            title: page.title || "",
            description: page.description || "",
            body: page.body || "",
            keywords: makeKeywords(page)
        });

    }

    return index;
}

function saveIndex(index) {

    const CHUNK_SIZE = 1000;

    let part = 1;

    for (let i = 0; i < index.length; i += CHUNK_SIZE) {

        const chunk = index.slice(i, i + CHUNK_SIZE);

        const file = path.join(
            INDEX_DIR,
            `index-${String(part).padStart(4, "0")}.json`
        );

        fs.writeFileSync(
            file,
            JSON.stringify(chunk, null, 2),
            "utf8"
        );

        console.log("✅ Written:", file);

        part++;

    }

}

function main() {

    console.log("📚 Building Search Index...");

    const raw = loadRawData();
    const knowledge = loadKnowledge();

    const allPages = [
        ...raw,
        ...knowledge
    ];

    const index = buildIndex(allPages);

    console.log("📄 allPages :", allPages.length);
    console.log("📄 index :", index.length);

    if (index.length > 0) {
        console.log("📌 First Index Entry:");
        console.log(index[0]);
    }

    saveIndex(index);

    console.log("🌐 Raw Pages :", raw.length);
    console.log("🧠 Knowledge :", knowledge.length);
    console.log("✅ Indexed :", index.length);

}

main();
