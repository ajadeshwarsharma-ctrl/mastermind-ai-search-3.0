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
const pageData = {

    title: "Example Website",

    url: url,

    textLength: html.length

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
