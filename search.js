const fs = require("fs");
const { rankResults } = require("./ranker");

function search(query) {

    const index = JSON.parse(
        fs.readFileSync("index.json", "utf8")
    );

    const ranked = rankResults(query, index);

    return ranked.filter(page => page.score > 0);
}

module.exports = {
    search
};
