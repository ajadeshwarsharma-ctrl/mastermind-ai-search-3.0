"use strict";

const fs = require("fs");
const path = require("path");

const RAW_FILE = path.join(__dirname, "raw-data.json");
const INDEX_FILE = path.join(__dirname, "index.json");
const KNOWLEDGE_FILE = path.join(__dirname, "knowledge.json");
function loadRawData() {

    if (!fs.existsSync(RAW_FILE)) {
        return [];
    }

    return JSON.parse(
        fs.readFileSync(RAW_FILE, "utf8")
    );

}
function loadKnowledge() {

    if (!fs.existsSync(KNOWLEDGE_FILE)) {
        return [];
    }

    return JSON.parse(
        fs.readFileSync(KNOWLEDGE_FILE, "utf8")
    );

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

    fs.writeFileSync(

        INDEX_FILE,

        JSON.stringify(index, null, 2),

        "utf8"

    );

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

    saveIndex(index);

    console.log("🌐 Raw Pages :", raw.length);

    console.log("🧠 Knowledge :", knowledge.length);

    console.log("✅ Indexed :", index.length);

}

main();
