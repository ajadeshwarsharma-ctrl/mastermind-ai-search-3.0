"use strict";

const fs = require("fs");
const path = require("path");

const RAW_FILE = path.join(__dirname, "raw-data.json");
const OUTPUT_FILE = path.join(__dirname, "data.json");

function createData() {

    console.log("🚀 Creating search data...");

    if (!fs.existsSync(RAW_FILE)) {
        console.log("❌ raw-data.json not found");
        return;
    }

    const raw = JSON.parse(
        fs.readFileSync(RAW_FILE, "utf8")
    );

    const data = raw.map(page => {

        return {
            title: page.title || "",
            url: page.url || "",
            description: page.description || "",
            content: (
                page.body ||
                page.paragraphs?.join(" ") ||
                ""
            ).slice(0,5000),
            headings: page.headings || []
        };

    });

    fs.writeFileSync(
        OUTPUT_FILE,
        JSON.stringify(data, null, 2),
        "utf8"
    );

    console.log("✅ data.json created");
    console.log("📄 Records:", data.length);
}

createData();
