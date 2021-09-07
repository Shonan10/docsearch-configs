new Crawler({
  appId: "",
  apiKey: "",
  rateLimit: 8,
  startUrls: [
    "https://meta.arrow-kt.io/docs/apidocs/",
    "https://meta.arrow-kt.io/",
  ],
  renderJavaScript: false,
  sitemaps: [],
  exclusionPatterns: [],
  ignoreCanonicalTo: false,
  discoveryPatterns: ["https://meta.arrow-kt.io/**"],
  schedule: "at 01:40 on Tuesday",
  actions: [
    {
      indexName: "arrow_meta",
      pathsToMatch: ["https://meta.arrow-kt.io/docs/apidocs/**"],
      recordExtractor: ({ $, helpers }) => {
        // Removing DOM elements we don't want to crawl
        const toRemove =
          ".doc-content td:last-child a, .doc-content td:last-child code, .doc-content p:first-child";
        $(toRemove).remove();

        return helpers.docsearch({
          recordProps: {
            lvl1: ".doc-content h1, .doc-content h2",
            content:
              ".doc-content p, .doc-content li, .doc-content td:last-child",
            lvl0: {
              selectors: "",
              defaultValue: "API Docs",
            },
            lvl2: ".doc-content h3",
            lvl3: ".doc-content h4, .doc-content td:first-child",
            lvl5: ".doc-content h5",
            tags: {
              defaultValue: ["api"],
            },
          },
          indexHeadings: true,
        });
      },
    },
    {
      indexName: "arrow_meta",
      pathsToMatch: [
        "https://meta.arrow-kt.io/**",
        "!https://meta.arrow-kt.io/docs/apidocs/**",
      ],
      recordExtractor: ({ $, helpers }) => {
        // Removing DOM elements we don't want to crawl
        const toRemove =
          ".doc-content td:last-child a, .doc-content td:last-child code, .doc-content p:first-child";
        $(toRemove).remove();

        return helpers.docsearch({
          recordProps: {
            lvl1: ".doc-content h2",
            content: ".doc-content p, .doc-content li",
            lvl0: {
              selectors: ".open > button",
              defaultValue: "Documentation",
            },
            lvl2: ".doc-content h3",
            lvl3: ".doc-content h4",
            lvl4: ".doc-content h5",
          },
          indexHeadings: true,
        });
      },
    },
  ],
  initialIndexSettings: {
    arrow_meta: {
      attributesForFaceting: ["type", "lang"],
      attributesToRetrieve: ["hierarchy", "content", "anchor", "url"],
      attributesToHighlight: ["hierarchy", "hierarchy_camel", "content"],
      attributesToSnippet: ["content:10"],
      camelCaseAttributes: ["hierarchy", "hierarchy_radio", "content"],
      searchableAttributes: [
        "unordered(hierarchy_radio_camel.lvl0)",
        "unordered(hierarchy_radio.lvl0)",
        "unordered(hierarchy_radio_camel.lvl1)",
        "unordered(hierarchy_radio.lvl1)",
        "unordered(hierarchy_radio_camel.lvl2)",
        "unordered(hierarchy_radio.lvl2)",
        "unordered(hierarchy_radio_camel.lvl3)",
        "unordered(hierarchy_radio.lvl3)",
        "unordered(hierarchy_radio_camel.lvl4)",
        "unordered(hierarchy_radio.lvl4)",
        "unordered(hierarchy_radio_camel.lvl5)",
        "unordered(hierarchy_radio.lvl5)",
        "unordered(hierarchy_radio_camel.lvl6)",
        "unordered(hierarchy_radio.lvl6)",
        "unordered(hierarchy_camel.lvl0)",
        "unordered(hierarchy.lvl0)",
        "unordered(hierarchy_camel.lvl1)",
        "unordered(hierarchy.lvl1)",
        "unordered(hierarchy_camel.lvl2)",
        "unordered(hierarchy.lvl2)",
        "unordered(hierarchy_camel.lvl3)",
        "unordered(hierarchy.lvl3)",
        "unordered(hierarchy_camel.lvl4)",
        "unordered(hierarchy.lvl4)",
        "unordered(hierarchy_camel.lvl5)",
        "unordered(hierarchy.lvl5)",
        "unordered(hierarchy_camel.lvl6)",
        "unordered(hierarchy.lvl6)",
        "content",
      ],
      distinct: true,
      attributeForDistinct: "url",
      customRanking: [
        "desc(weight.page_rank)",
        "desc(weight.level)",
        "asc(weight.position)",
      ],
      ranking: [
        "words",
        "filters",
        "typo",
        "attribute",
        "proximity",
        "exact",
        "custom",
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: "</span>",
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: "allOptional",
    },
  },
});