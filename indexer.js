console.log("🤖 AJADESH INDEXER STARTED");
const fs = require("fs");

console.log("📚 Loading pages database...");
let pages = [];

try {

    pages = JSON.parse(
        fs.readFileSync(
            "data.json",
            "utf8"
        )
    );

    console.log(
        "✅ Pages Loaded:",
        pages.length
    );

}

catch (error) {

    console.log(
        "❌ data.json nahi mila ya empty hai."
    );

}
