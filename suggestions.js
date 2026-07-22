"use strict";

const fs = require("fs");

function getSuggestions(query) {

    query = query.toLowerCase().trim();

    const pages = JSON.parse(
        fs.readFileSync("index.json", "utf8")
    );

    const list = [];

    const seen = new Set();

    for (const page of pages) {

        const title = page.title || "";

        if (
            title.toLowerCase().startsWith(query)
            && !seen.has(title)
        ) {

            seen.add(title);

            list.push(title);

        }

        if (list.length >= 10)
            break;

    }

    return list;

}

module.exports = {

    getSuggestions

};
