"use strict";

const fs = require("fs");
const path = require("path");

const { rankResults } = require("./ranker");

const KNOWLEDGE_FILE = path.join(__dirname, "knowledge.json");
const INDEX_DIR = path.join(__dirname, "database", "index");

function loadKnowledge() {
    try {
        if (!fs.existsSync(KNOWLEDGE_FILE)) return [];

        return JSON.parse(
            fs.readFileSync(KNOWLEDGE_FILE, "utf8")
        );
    } catch {
        return [];
    }
}

function loadIndex() {
    if (!fs.existsSync(INDEX_DIR)) return [];

    const files = fs.readdirSync(INDEX_DIR)
        .filter(file =>
            /^index-\d+\.json$/.test(file)
        )
        .sort();

    let pages = [];

    for (const file of files) {
        try {
            const data = JSON.parse(
                fs.readFileSync(
                    path.join(INDEX_DIR, file),
                    "utf8"
                )
            );

            if (Array.isArray(data)) {
                pages.push(...data);
            }

        } catch {
            console.log("❌ Failed index:", file);
        }
    }

    return pages;
}

// ===============================
// MASTERMIND SEARCH ENGINE
// ===============================

function search(query) {

    query = String(query || "").trim();

    if (!query) return [];

    const knowledge = loadKnowledge();
    const index = loadIndex();

    // ===========================
    // OFFICIAL KNOWLEDGE
    // ===========================

    const q = query.toLowerCase();

    const official = knowledge.filter(item => {

        if (!item.keywords) return false;

        return item.keywords.some(keyword =>
            String(keyword)
                .toLowerCase()
                .includes(q)
        );

    });

    // ===========================
    // NORMAL INDEX SEARCH
    // ===========================

    const ranked = rankResults(query, index);

    const normal = ranked.filter(
        page => page.score > 0
    );

    // Knowledge first, crawler results after it
    const knowledgeResults = official.map(item => ({
        title: item.title || "",
        url: item.url || "",
        description: item.description || "",
        score: 999999,
        source: "knowledge"
    }));

    return [
        ...knowledgeResults,
        ...normal
    ];
}

module.exports = {
    search
};
