"use strict";

function scorePage(page, query) {

    query = query.toLowerCase();

    let score = 0;

    if (page.title.toLowerCase().includes(query))
        score += 100;

    if (page.description.toLowerCase().includes(query))
        score += 50;

    if (page.keywords.toLowerCase().includes(query))
        score += 40;

    if (page.url.toLowerCase().includes(query))
        score += 30;

    for (const h of page.headings) {

        if (h.text.toLowerCase().includes(query))
            score += 20;

    }

    if (page.body.toLowerCase().includes(query))
        score += 10;

    return score;

}

module.exports = {

    scorePage

};
