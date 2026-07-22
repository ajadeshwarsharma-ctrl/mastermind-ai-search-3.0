// ===============================
// AJADESH RANKER v1
// ===============================

function calculateScore(query, page) {
    query = query.toLowerCase();

    let score = 0;

    const title = (page.title || "").toLowerCase();
    const text = (page.text || "").toLowerCase();
    const keywords = page.keywords || [];

    // Title Match
    if (title.includes(query)) {
        score += 100;
    }

    // URL Match
    if ((page.url || "").toLowerCase().includes(query)) {
        score += 50;
    }

    // Text Match
    if (text.includes(query)) {
        score += 20;
    }

    // Keyword Match
    for (const word of keywords) {
        if (word.includes(query)) {
            score += 5;
        }
    }

    return score;
}

function rankResults(query, pages) {

    for (const page of pages) {
        page.score = calculateScore(query, page);
    }

    pages.sort((a, b) => b.score - a.score);

    return pages;
}

module.exports = {
    rankResults
};
