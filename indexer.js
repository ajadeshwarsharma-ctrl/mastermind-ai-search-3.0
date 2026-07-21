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
const searchIndex = [];

for (const page of pages) {

    searchIndex.push({

        title: page.title || "",

        url: page.url || "",

        text: page.text || ""
keywords: (page.text || "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(0, 100)
    });

}

console.log(
    "📚 Search Index Ready:",
    searchIndex.length
);
fs.writeFileSync(

    "index.json",

    JSON.stringify(

        searchIndex,

        null,

        2

    )

);

console.log(

    "💾 index.json Successfully Created!"

);
