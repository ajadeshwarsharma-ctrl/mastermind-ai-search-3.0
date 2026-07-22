// ===============================
// AJADESH RANKER v2
// ===============================

"use strict";
const { getAuthority } = require("./authority");
function calculateScore(query, page) {

    query = query.toLowerCase().trim();

    let score = 0;

    const title = (page.title || "").toLowerCase();
    const url = (page.url || "").toLowerCase();
    const text = (page.text || page.body || "").toLowerCase();

    const keywords = Array.isArray(page.keywords)
        ? page.keywords
        : String(page.keywords || "").split(",");

    // ==========================
    // Exact Title Match
    // ==========================
    if (title === query)
        score += 300;

    else if (title.startsWith(query))
        score += 220;

    else if (title.includes(query))
        score += 150;

    // ==========================
    // URL Match
    // ==========================
    if (url.includes(query))
        score += 80;

    // ==========================
    // Keywords
    // ==========================
    for (const word of keywords) {

        if (String(word).toLowerCase().includes(query))
            score += 15;

    }

    // ==========================
    // Body/Text Match
    // ==========================
    if (text.includes(query))
        score += 40;

    // ==========================
    // Homepage Bonus
    // ==========================
    if (
        url.endsWith("/") ||
        url.split("/").length <= 4
    ) {
        score += 15;
    }

    // ==========================
    // HTTPS Bonus
    // ==========================
    if (url.startsWith("https://"))
        score += 10;
// Authority Bonus
score += getAuthority(url);
    return score;

}

function rankResults(query, pages) {

    const ranked = [];

    for (const page of pages) {

        const copy = { ...page };

        copy.score = calculateScore(query, copy);

        if (copy.score > 0)
            ranked.push(copy);

    }

    ranked.sort((a, b) => b.score - a.score);

    return ranked;

}

module.exports = {

    rankResults

};
