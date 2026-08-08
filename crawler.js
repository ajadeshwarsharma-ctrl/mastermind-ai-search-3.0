"use strict";

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

console.log("🔥 Mastermind X Crawler v6 Started");

const USER_AGENT = "MastermindXBot/6.0";

const SEED_FILE = path.join(__dirname, "seed-urls.json");
const QUEUE_FILE = path.join(__dirname, "queue.json");
const VISITED_FILE = path.join(__dirname, "visited.json");

const RAW_DIR = path.join(
    __dirname,
    "database",
    "raw"
);

const MAX_VISITED = 5000;
const MAX_QUEUE = 5000;

const MAX_PAGE_BYTES = 5 * 1024 * 1024;

const MAX_BODY_CHARS = 5000;

const MAX_LINKS_PER_PAGE = 200;

const RAW_LIMIT_BYTES =
    35 * 1024 * 1024;

if (!fs.existsSync(RAW_DIR)) {
    fs.mkdirSync(RAW_DIR, {
        recursive: true
    });
}


/* =========================
   JSON HELPERS
========================= */

function readJSON(file, fallback = []) {

    try {

        if (!fs.existsSync(file)) {
            return fallback;
        }

        const text =
            fs.readFileSync(
                file,
                "utf8"
            ).trim();

        if (!text) {
            return fallback;
        }

        return JSON.parse(text);

    } catch (err) {

        console.log(
            "❌ JSON read failed:",
            file
        );

        return fallback;
    }
}


function writeJSON(file, data) {

    const temp =
        file + ".tmp";

    fs.writeFileSync(
        temp,
        JSON.stringify(
            data,
            null,
            2
        ),
        "utf8"
    );

    fs.renameSync(
        temp,
        file
    );
}


/* =========================
   SEEDS
========================= */

function loadSeeds() {

    const seeds =
        readJSON(
            SEED_FILE,
            []
        );

    return seeds
        .map(item => {

            if (
                typeof item !==
                "string"
            ) {
                return "";
            }

            const match =
                item.match(
                    /\((https?:\/\/[^)]+)\)/
                );

            if (match) {
                return match[1];
            }

            return item.trim();

        })
        .filter(
            url =>
                url.startsWith(
                    "http://"
                ) ||
                url.startsWith(
                    "https://"
                )
        );
}


/* =========================
   QUEUE
========================= */

function loadQueue() {

    const queue =
        readJSON(
            QUEUE_FILE,
            []
        );

    return Array.isArray(queue)
        ? queue.slice(0, MAX_QUEUE)
        : [];
}


function saveQueue(queue) {

    writeJSON(
        QUEUE_FILE,
        queue.slice(
            0,
            MAX_QUEUE
        )
    );
}


/* =========================
   VISITED
========================= */

function loadVisited() {

    const visited =
        readJSON(
            VISITED_FILE,
            []
        );

    if (
        !Array.isArray(
            visited
        )
    ) {
        return [];
    }

    return visited.slice(
        -MAX_VISITED
    );
}


function saveVisited(visited) {

    writeJSON(
        VISITED_FILE,
        visited.slice(
            -MAX_VISITED
        )
    );
}


/* =========================
   NORMALIZE
========================= */

function normalize(text) {

    return String(
        text || ""
    )
        .replace(
            /\s+/g,
            " "
        )
        .trim();
}


/* =========================
   SECRET SANITIZER
========================= */

function sanitizeText(text) {

    return String(
        text || ""
    )

        // AWS Access Key
        .replace(
            /AKIA[0-9A-Z]{16}/g,
            "[AWS_ACCESS_KEY]"
        )

        // Generic AWS-like secret
        .replace(
            /[A-Za-z0-9/+=]{40}/g,
            "[AWS_SECRET_KEY]"
        )

        // Google API key
        .replace(
            /AIza[0-9A-Za-z\-_]{35}/g,
            "[GOOGLE_API_KEY]"
        )

        // GitHub token
        .replace(
            /ghp_[A-Za-z0-9]{36}/g,
            "[GITHUB_TOKEN]"
        )

        // OpenAI-looking key
        .replace(
            /sk-[A-Za-z0-9]{20,}/g,
            "[OPENAI_KEY]"
        );
}


/* =========================
   GOOGLE BLOCK
========================= */

function isBlockedDomain(link) {

    const blocked = [

        "google.com",
        "www.google.com",
        "google.co.in",
        "google.co.uk",

        "googleusercontent.com",
        "gstatic.com",

        "googleapis.com",

        "googlesyndication.com",

        "doubleclick.net",

        "googleadservices.com",

        "googlevideo.com"

    ];

    const lower =
        link.toLowerCase();

    return blocked.some(
        domain =>
            lower.includes(
                domain
            )
    );
}


/* =========================
   LINK VALIDATION
========================= */

function isValidLink(link) {

    if (!link) {
        return false;
    }

    if (
        !link.startsWith(
            "http://"
        ) &&
        !link.startsWith(
            "https://"
        )
    ) {
        return false;
    }

    if (
        isBlockedDomain(link)
    ) {
        return false;
    }

    const bad = [

        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".svg",

        ".webp",
        ".ico",

        ".pdf",

        ".zip",
        ".rar",
        ".7z",

        ".mp4",
        ".mp3",
        ".avi",
        ".mkv",

        ".exe",
        ".apk",

        "mailto:",
        "javascript:",
        "tel:"

    ];

    const lower =
        link.toLowerCase();

    for (
        const item of bad
    ) {

        if (
            lower.includes(
                item
            )
        ) {
            return false;
        }
    }

    return true;
}


/* =========================
   RAW FILE MANAGEMENT
========================= */

function getRawFiles() {

    return fs
        .readdirSync(
            RAW_DIR
        )
        .filter(
            file =>
                /^raw-data-\d+\.json$/
                    .test(file)
        )
        .sort();
}


function getNextRawFile() {

    const files =
        getRawFiles();

    if (
        files.length === 0
    ) {

        return path.join(
            RAW_DIR,
            "raw-data-0001.json"
        );
    }

    const last =
        files[
            files.length - 1
        ];

    const number =
        parseInt(
            last.match(
                /(\d+)\.json$/
            )[1],
            10
        );

    return path.join(
        RAW_DIR,
        `raw-data-${String(
            number + 1
        ).padStart(4, "0")}.json`
    );
}


function getLatestRawFile() {

    const files =
        getRawFiles();

    if (
        files.length === 0
    ) {

        const file =
            path.join(
                RAW_DIR,
                "raw-data-0001.json"
            );

        writeJSON(
            file,
            []
        );

        return file;
    }

    const latest =
        path.join(
            RAW_DIR,
            files[
                files.length - 1
            ]
        );

    const size =
        fs.statSync(
            latest
        ).size;

    if (
        size >=
        RAW_LIMIT_BYTES
    ) {

        return getNextRawFile();

    }

    return latest;
}


/* =========================
   SAVE RAW PAGE
========================= */

function saveRaw(page) {

    let file =
        getLatestRawFile();

    let pages =
        readJSON(
            file,
            []
        );

    if (
        !Array.isArray(
            pages
        )
    ) {
        pages = [];
    }

    if (
        pages.some(
            item =>
                item.url ===
                page.url
        )
    ) {
        return;
    }

    pages.push(
        page
    );

    const json =
        JSON.stringify(
            pages,
            null,
            2
        );

    if (
        Buffer.byteLength(
            json,
            "utf8"
        ) >=
        RAW_LIMIT_BYTES
    ) {

        pages.pop();

        const finalJSON =
            JSON.stringify(
                pages,
                null,
                2
            );

        fs.writeFileSync(
            file,
            finalJSON,
            "utf8"
        );

        file =
            getNextRawFile();

        writeJSON(
            file,
            [page]
        );

        console.log(
            "📦 New Raw Chunk:",
            path.basename(
                file
            )
        );

        return;
    }

    fs.writeFileSync(
        file,
        json,
        "utf8"
    );
}


/* =========================
   CRAWL PAGE
========================= */

async function crawl(url) {

    try {

        console.log(
            "🌍",
            url
        );

        const response =
            await axios.get(
                url,
                {

                    timeout:
                        10000,

                    responseType:
                        "arraybuffer",

                    maxContentLength:
                        MAX_PAGE_BYTES,

                    maxBodyLength:
                        MAX_PAGE_BYTES,

                    headers: {

                        "User-Agent":
                            USER_AGENT,

                        "Accept":
                            "text/html,application/xhtml+xml"

                    }

                }
            );

        const contentType =
            String(
                response.headers[
                    "content-type"
                ] || ""
            ).toLowerCase();

        if (
            contentType &&
            !contentType.includes(
                "text/html"
            ) &&
            !contentType.includes(
                "application/xhtml+xml"
            )
        ) {

            console.log(
                "⏭️ Not HTML:",
                url
            );

            return null;
        }


        const html =
            Buffer.from(
                response.data
            ).toString(
                "utf8"
            );


        if (
            Buffer.byteLength(
                html,
                "utf8"
            ) >
            MAX_PAGE_BYTES
        ) {

            console.log(
                "⏭️ Page too large:",
                url
            );

            return null;
        }


        const $ =
            cheerio.load(
                html
            );


        const title =
            sanitizeText(
                normalize(
                    $("title")
                        .text()
                )
            );


        const description =
            sanitizeText(
                normalize(
                    $(
                        'meta[name="description"]'
                    ).attr(
                        "content"
                    ) || ""
                )
            );


        const bodyText =
            $("body")
                .text();


        const body =
            sanitizeText(
                normalize(
                    bodyText
                )
            ).substring(
                0,
                MAX_BODY_CHARS
            );


        const page = {

            url,

            title,

            description,

            body,

            links: []

        };


        const links =
            new Set();


        $("a").each(
            (index, element) => {

                if (
                    links.size >=
                    MAX_LINKS_PER_PAGE
                ) {
                    return;
                }

                let href =
                    $(element).attr(
                        "href"
                    );

                if (!href) {
                    return;
                }

                try {

                    href =
                        new URL(
                            href,
                            url
                        ).href;

                } catch {

                    return;
                }

                href =
                    href.split(
                        "#"
                    )[0];

                if (
                    isValidLink(
                        href
                    )
                ) {

                    links.add(
                        href
                    );

                }

            }
        );


        page.links =
            [
                ...links
            ];


        return page;

    } catch (error) {

        if (
            error.code ===
            "ERR_FR_MAX_BODY_LENGTH_EXCEEDED"
        ) {

            console.log(
                "⏭️ Page exceeded size limit:",
                url
            );

        } else {

            console.log(
                "❌ Failed:",
                url
            );

        }

        return null;
    }
}


/* =========================
   MAIN CRAWLER
========================= */

async function run() {

    console.log(
        "🚀 Starting Crawl..."
    );

    const seeds =
        loadSeeds();

    let queue =
        loadQueue();

    let visited =
        loadVisited();


    const visitedSet =
        new Set(
            visited
        );


    const queueSet =
        new Set(
            queue
        );


    if (
        queue.length === 0
    ) {

        for (
            const seed of seeds
        ) {

            if (
                !visitedSet.has(
                    seed
                ) &&
                !queueSet.has(
                    seed
                )
            ) {

                queue.push(
                    seed
                );

                queueSet.add(
                    seed
                );

            }

            if (
                queue.length >=
                MAX_QUEUE
            ) {
                break;
            }

        }

        saveQueue(
            queue
        );
    }


    while (
        queue.length > 0
    ) {

        if (
            visitedSet.size >=
            MAX_VISITED
        ) {

            console.log(
                "🛑 Crawl limit reached:",
                MAX_VISITED
            );

            break;
        }


        const url =
            queue.shift();

        queueSet.delete(
            url
        );


        if (
            visitedSet.has(
                url
            )
        ) {

            continue;
        }


        visitedSet.add(
            url
        );

        visited.push(
            url
        );


        saveVisited(
            visited
        );

        saveQueue(
            queue
        );


        const page =
            await crawl(
                url
            );


        if (!page) {

            continue;
        }


        saveRaw(
            page
        );


        for (
            const link of
            page.links
        ) {

            if (
                visitedSet.has(
                    link
                )
            ) {
                continue;
            }

            if (
                queueSet.has(
                    link
                )
            ) {
                continue;
            }

            if (
                queue.length >=
                MAX_QUEUE
            ) {
                break;
            }


            queue.push(
                link
            );

            queueSet.add(
                link
            );
        }


        saveQueue(
            queue
        );


        console.log(
            "📥 Queue :",
            queue.length
        );

        console.log(
            "📚 Visited :",
            visited.length
        );


        if (
            visited.length %
            100 ===
            0
        ) {

            console.log(
                "💾 Progress Saved"
            );
        }
    }


    console.log(
        "================================="
    );

    console.log(
        "✅ Crawl Finished"
    );

    console.log(
        "🌱 Seeds :",
        seeds.length
    );

    console.log(
        "📚 Visited :",
        visited.length
    );

    console.log(
        "📥 Queue Left :",
        queue.length
    );

    console.log(
        "================================="
    );
}


run().catch(
    error => {

        console.error(
            "💥 Crawler Fatal Error:",
            error
        );

        process.exitCode =
            1;
    }
);
