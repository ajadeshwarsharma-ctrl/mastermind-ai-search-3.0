const fs = require("fs");

const START_URLS = [
    "https://example.com"
];

const MAX_PAGES = 25;

const visited = new Set();

const pages = [];

const queue = [...START_URLS];

function cleanText(html) {

    return html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}

function extractTitle(html) {

    const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);

    if (!match) {
        return "Untitled Page";
    }

    return match[1]
        .replace(/\s+/g, " ")
        .trim();

}

function extractLinks(html, currentUrl) {

    const links = [];

    const linkRegex = /href=["']([^"']+)["']/gi;

    let match;

    while ((match = linkRegex.exec(html)) !== null) {

        try {

            const absoluteUrl = new URL(
                match[1],
                currentUrl
            ).href;

            if (
                absoluteUrl.startsWith("http://") ||
                absoluteUrl.startsWith("https://")
            ) {

                const cleanUrl = absoluteUrl.split("#")[0];

                if (!links.includes(cleanUrl)) {
                    links.push(cleanUrl);
                }

            }

        } catch {

            // Invalid link skip

        }

    }

    return links;

}

async function ajadeshBot(url) {

    if (visited.has(url)) {
        return;
    }

    if (visited.size >= MAX_PAGES) {
        return;
    }

    visited.add(url);

    console.log("");
    console.log("🤖 AJADESH BOT READING:");
    console.log(url);

    try {

        const response = await fetch(url, {
            headers: {
                "User-Agent": "AjadeshBot/1.0"
            }
        });

        if (!response.ok) {

            console.log("❌ PAGE ERROR:", response.status);

            return;

        }

        const html = await response.text();

        const title = extractTitle(html);

        const text = cleanText(html);

        const links = extractLinks(html, url);

        const pageData = {

            title: title,

            url: url,

            text: text,

            links: links,

            crawledAt: new Date().toISOString()

        };

        pages.push(pageData);

        console.log("📄 TITLE:", title);

        console.log("📝 TEXT LENGTH:", text.length);

        console.log("🔗 LINKS FOUND:", links.length);

        fs.writeFileSync(
            "data.json",
            JSON.stringify(pages, null, 2)
        );

        console.log("💾 DATA SAVED TO AJADESH DATABASE");

        for (const link of links) {

            if (visited.size >= MAX_PAGES) {
                break;
            }

            await ajadeshBot(link);

        }

    } catch (error) {

        console.log("💀 BOT ERROR:", error.message);

    }

}

async function startAjadeshEngine() {

    console.log("");
    console.log("🔥 AJADESH SEARCH ENGINE CRAWLER STARTED");
    console.log("🤖 AJADESH BOT ONLINE");
    console.log("");

    for (const url of queue) {

        await ajadeshBot(url);

    }

    console.log("");
    console.log("✅ AJADESH CRAWLER FINISHED");
    console.log("📚 TOTAL PAGES:", pages.length);
    console.log("💾 AJADESH DATABASE UPDATED");
    console.log("");

}

startAjadeshEngine();
