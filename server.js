"use strict";

const express = require("express");
const cors = require("cors");

const { search } = require("./search");

const app = express();

app.use(cors());

app.get("/", (req, res) => {

    res.send("Ajadesh Search API Running 🚀");

});

app.get("/search", (req, res) => {

    const query = req.query.q || "";

    const results = search(query);

    res.json(results);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("🚀 Server Running on Port " + PORT);

});
