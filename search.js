"use strict";

const fs = require("fs");

const knowledge = JSON.parse(
    fs.readFileSync("knowledge.json", "utf8")
);

const index = JSON.parse(
    fs.readFileSync("index.json", "utf8")
);

const { rankResults } = require("./ranker");

// ===============================
// MASTERMIND SEARCH ENGINE
// ===============================

function search(query) {

    query = String(query || "").trim();

    if (!query) return [];

    const q = query.toLowerCase();

    // ===========================
    // OFFICIAL KNOWLEDGE FIRST
    // ===========================
    const official = knowledge.filter(item => {

        if (!item.keywords) return false;

        return item.keywords.some(keyword =>
            String(keyword).toLowerCase().includes(q)
        );

    });

    if (official.length > 0) {

        return official.map(item => ({

            title: item.title,

            url: item.url,

            description: item.description,

            score: 999999,

            source: "knowledge"

        }));

    }

    // ===========================
    // NORMAL INDEX SEARCH
    // ===========================
    const ranked = rankResults(query, index);

    return ranked.filter(page => page.score > 0);

}

module.exports = {
    search
};
