async function startSearch(query) {

    query = String(query || "").trim();

    if (!query) {
        alert("Bhai kuchh search to kar 😭");
        return;
    }

    if (MASTER_MIND.isSearching) {
        return;
    }

    MASTER_MIND.isSearching = true;
    MASTER_MIND.currentQuery = query;

    if (searchBox) {
        searchBox.value = query;
    }

    if (resultSearch) {
        resultSearch.value = query;
    }

    if (suggestions) {
        suggestions.innerHTML = "";
    }

    if (homePage) {
        homePage.style.display = "none";
    }

    if (resultsPage) {
        resultsPage.style.display = "block";
    }

    if (resultTitle) {
        resultTitle.innerHTML =
            "Search results for: <b>" +
            escapeHTML(query) +
            "</b>";
    }

    if (results) {
        results.innerHTML = `
            <div class="result-card">
                <h2>🔍 Searching...</h2>
                <p>
                    Mastermind X apna database check kar raha hai 😎🔥
                </p>
            </div>
        `;
    }

    addHistory(query);

    let found = false;

    try {

        // =====================================================
        // 🥇 1. MASTERmind LOCAL DATABASE — FIRST
        // =====================================================

        try {

            const response = await fetch(
                `/search?q=${encodeURIComponent(query)}`
            );

            if (response.ok) {

                const localResults = await response.json();

                if (
                    Array.isArray(localResults) &&
                    localResults.length > 0
                ) {

                    results.innerHTML = "";

                    localResults.forEach(item => {

                        addCard({
                            title:
                                item.title ||
                                item.url ||
                                "Mastermind Result",

                            url:
                                item.url ||
                                "#",

                            description:
                                item.description ||
                                "",

                            badge:
                                "🥇 Mastermind Database"
                        });

                    });

                    found = true;

                }

            }

        } catch (error) {

            console.log(
                "⚠️ Mastermind Database unavailable:",
                error
            );

        }


        // =====================================================
        // 🥇 2. OLD AJADESHWAR LOCAL DATA
        // =====================================================

        const ajadeshResults =
            searchAjadeshIndex(query);

        if (ajadeshResults.length) {

            if (!found) {
                results.innerHTML = "";
            }

            ajadeshResults.forEach(item => {

                addCard({

                    title:
                        item.title,

                    url:
                        item.url,

                    description:
                        item.description,

                    badge:
                        "🥇 Ajadeshwar Data"

                });

            });

            found = true;

        }


        // =====================================================
        // 🥇 3. data.json LOCAL DATA
        // =====================================================

        const dataResults =
            searchAjadeshData(query);

        if (dataResults.length) {

            if (!found) {
                results.innerHTML = "";
            }

            renderAjadeshData(dataResults);

            found = true;

        }


        // =====================================================
        // 🧮 SPECIAL SEARCH TOOLS
        // =====================================================

        if (tryMath(query)) {
            found = true;
        }

        if (tryPercentage(query)) {
            found = true;
        }

        if (await tryCurrency(query)) {
            found = true;
        }

        if (await tryWeather(query)) {
            found = true;
        }

        if (await tryLocalSearch(query)) {
            found = true;
        }


        // =====================================================
        // 🥈 OFFICIAL WEBSITES
        // =====================================================

        if (renderOfficialResults(query)) {
            found = true;
        }


        // =====================================================
        // 🥉 WEB RESULTS
        // =====================================================

        const duckData =
            await searchDuckDuckGo(query);

        const webItems =
            normalizeDuckResults(
                duckData,
                query
            );

        if (
            renderWebResults(
                webItems,
                query
            )
        ) {
            found = true;
        }


        // =====================================================
        // 📚 WIKIPEDIA
        // =====================================================

        if (await tryWikipedia(query)) {
            found = true;
        }


        // =====================================================
        // ❌ NOTHING FOUND
        // =====================================================

        if (!found) {

            results.innerHTML = `

                <div class="result-card">

                    <h2>
                        😕 Result nahi mila
                    </h2>

                    <p>
                        ${escapeHTML(query)}
                    </p>

                    <p>
                        Mastermind Database,
                        Official Sites aur Web
                        sab jagah check kiya gaya.
                    </p>

                </div>

            `;

        }

    } catch (error) {

        console.error(
            "💀 SEARCH ERROR:",
            error
        );

        if (!found) {

            results.innerHTML = `

                <div class="result-card">

                    <h2>
                        ⚠️ Search Error
                    </h2>

                    <p>
                        Bhai network ya API me
                        panga aa gaya 😭
                    </p>

                </div>

            `;

        }

    }

    MASTER_MIND.isSearching = false;

}
