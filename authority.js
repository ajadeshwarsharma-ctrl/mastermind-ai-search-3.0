"use strict";

function getAuthority(url) {

    url = url.toLowerCase();

    let score = 0;

    if (url.includes(".gov"))
        score += 120;

    if (url.includes(".edu"))
        score += 100;

    if (url.includes("wikipedia"))
        score += 90;

    if (url.includes("github"))
        score += 80;

    if (url.includes("youtube"))
        score += 80;

    if (url.includes("google"))
        score += 80;

    if (url.includes("openai"))
        score += 80;

    if (url.includes("instagram"))
        score += 70;

    if (url.includes("facebook"))
        score += 70;

    return score;

}

module.exports = {

    getAuthority

};
