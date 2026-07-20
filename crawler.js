import fs from "fs";
const START_URL = "https://example.com";

async function ajadeshBot(url) {

    console.log("🤖 AJADESH BOT STARTED");

    try {

        const response = await fetch(url);

        const html = await response.text();

        console.log("🌐 WEBSITE OPENED");

        console.log("📄 TOTAL DATA:", html.length);

        console.log("🔥 AJADESH BOT READ WEBSITE");
        const links = [];

const linkRegex = /href="(https?:\/\/[^"]+)"/g;

let match;

while ((match = linkRegex.exec(html)) !== null) {

    links.push(match[1]);

}

console.log("🔗 LINKS FOUND:", links.length);
if (links.length > 0) {

    const nextUrl = links[0];

    console.log("➡️ AJADESH BOT NEXT WEBSITE PAR JA RAHA HAI:");

    console.log(nextUrl);

}
console.log(links);
const pageData = {

    title: "Example Website",

    url: url,

    textLength: html.length
    html: html
};

fs.writeFileSync(
    "./data.json",
    JSON.stringify(pageData, null, 2)
);

console.log("💾 DATA AJADESH DATABASE ME SAVE HO GAYA");
    } catch (error) {

        console.log("💀 BOT ERROR:", error.message);

    }

}

ajadeshBot(START_URL);
if (links.length > 0) {

    const nextUrl = links[0];

    console.log("➡️ AJADESH BOT NEXT WEBSITE PAR JA RAHA HAI:");

    console.log(nextUrl);

    await ajadeshBot(nextUrl);

}
