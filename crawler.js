"use strict";

/*
=========================================
 Mastermind X Search Engine
 Crawler v4.0
 Developer : Ajadeshwar Sharma
=========================================
*/

const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");

/* =========================================
   FILE PATHS
========================================= */

const ROOT = __dirname;

const SEED_FILE = path.join(ROOT, "seed-urls.json");
const RAW_DATA_FILE = path.join(ROOT, "raw-data.json");

/* =========================================
   CONFIGURATION
========================================= */

const CONFIG = {

    USER_AGENT:
        "MastermindXBot/4.0",

    REQUEST_TIMEOUT:
        15000,

    MAX_PAGES:
        1000,

    MAX_LINKS_PER_PAGE:
        200,

    MAX_SITEMAP_LINKS:
        500

};

console.log("🚀 Mastermind X Crawler v4.0 Loaded");
