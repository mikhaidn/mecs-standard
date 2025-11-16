/**
 * Wikipedia Concept Fetcher
 *
 * Demonstrates how to fetch canonical concept data from Wikipedia and Wikidata
 * for use in MECS Learning Course Builder.
 *
 * Usage:
 *   node examples/wikipedia-concept-fetcher.js "Arithmetic"
 *   node examples/wikipedia-concept-fetcher.js "Q11205"
 */

// Simple fetch for Node.js (works in modern Node versions)
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/**
 * Search Wikidata for a concept by name
 */
async function searchWikidata(query) {
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(query)}&language=en&format=json&origin=*`;

  console.log(`🔍 Searching Wikidata for: "${query}"`);

  const response = await fetch(url);
  const data = await response.json();

  return data.search;
}

/**
 * Get detailed entity data from Wikidata
 */
async function getWikidataEntity(wikidataId) {
  const url = `https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`;

  console.log(`📥 Fetching Wikidata entity: ${wikidataId}`);

  const response = await fetch(url);
  const data = await response.json();

  return data.entities[wikidataId];
}

/**
 * Get Wikipedia page summary
 */
async function getWikipediaSummary(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;

  console.log(`📄 Fetching Wikipedia summary: ${title}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Wikipedia API error: ${response.status}`);
  }

  return await response.json();
}

/**
 * Get Wikipedia page categories
 */
async function getWikipediaCategories(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=categories&format=json&origin=*`;

  const response = await fetch(url);
  const data = await response.json();

  const pages = Object.values(data.query.pages)[0];

  if (pages.categories) {
    return pages.categories.map(c => c.title.replace('Category:', ''));
  }

  return [];
}

/**
 * Get related concepts from Wikidata
 */
function getRelatedConcepts(entity) {
  const related = [];

  // Get "has part" (P527)
  const hasPart = entity.claims?.P527 || [];
  for (const claim of hasPart) {
    const value = claim.mainsnak?.datavalue?.value;
    if (value?.id) {
      related.push({
        wikidataId: value.id,
        relationship: 'has-part'
      });
    }
  }

  // Get "part of" (P361)
  const partOf = entity.claims?.P361 || [];
  for (const claim of partOf) {
    const value = claim.mainsnak?.datavalue?.value;
    if (value?.id) {
      related.push({
        wikidataId: value.id,
        relationship: 'part-of'
      });
    }
  }

  return related;
}

/**
 * Create a canonical concept reference from Wikidata + Wikipedia data
 */
async function createCanonicalConcept(wikidataId) {
  // 1. Fetch Wikidata entity
  const entity = await getWikidataEntity(wikidataId);

  if (!entity) {
    throw new Error(`Wikidata entity ${wikidataId} not found`);
  }

  // 2. Extract basic info
  const title = entity.labels?.en?.value;
  const description = entity.descriptions?.en?.value;
  const aliases = entity.aliases?.en?.map(a => a.value) || [];
  const wikipediaTitle = entity.sitelinks?.enwiki?.title;

  if (!title) {
    throw new Error("Missing English label");
  }

  if (!wikipediaTitle) {
    console.warn("⚠️  No English Wikipedia article found");
  }

  // 3. Fetch Wikipedia data (if available)
  let wikipediaSummary = null;
  let categories = [];
  let wikipediaUrl = null;

  if (wikipediaTitle) {
    try {
      wikipediaSummary = await getWikipediaSummary(wikipediaTitle);
      categories = await getWikipediaCategories(wikipediaTitle);
      wikipediaUrl = wikipediaSummary.content_urls.desktop.page;
    } catch (error) {
      console.warn(`⚠️  Could not fetch Wikipedia data: ${error.message}`);
    }
  }

  // 4. Get related concepts
  const relatedConcepts = getRelatedConcepts(entity);

  // 5. Get instance of (P31)
  const instanceOf = entity.claims?.P31?.[0]?.mainsnak?.datavalue?.value?.id;

  // 6. Create canonical concept
  const canonicalConcept = {
    conceptId: wikidataId,
    title: title,
    sourceUrl: wikipediaUrl || `https://www.wikidata.org/wiki/${wikidataId}`,
    sourceType: wikipediaUrl ? "wikipedia" : "wikidata",
    metadata: {
      wikidataId: wikidataId,
      wikidataUrl: `https://www.wikidata.org/wiki/${wikidataId}`,
      description: description,
      aliases: aliases,
      instanceOf: instanceOf,
      extract: wikipediaSummary?.extract,
      thumbnail: wikipediaSummary?.thumbnail?.source,
      categories: categories,
      relatedConcepts: relatedConcepts,
      lastVerified: new Date().toISOString()
    }
  };

  return canonicalConcept;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`
Usage:
  node examples/wikipedia-concept-fetcher.js <search-term>
  node examples/wikipedia-concept-fetcher.js <wikidata-id>

Examples:
  node examples/wikipedia-concept-fetcher.js "Arithmetic"
  node examples/wikipedia-concept-fetcher.js "Q11205"
  node examples/wikipedia-concept-fetcher.js "Photosynthesis"
  node examples/wikipedia-concept-fetcher.js "Linear Algebra"
    `);
    process.exit(1);
  }

  const input = args[0];

  try {
    let wikidataId;

    // Check if input is already a Wikidata ID
    if (input.match(/^Q\d+$/)) {
      wikidataId = input;
      console.log(`✅ Using Wikidata ID: ${wikidataId}\n`);
    } else {
      // Search for the concept
      console.log(`🔎 Searching for: "${input}"\n`);
      const results = await searchWikidata(input);

      if (results.length === 0) {
        console.error(`❌ No results found for "${input}"`);
        process.exit(1);
      }

      console.log(`📋 Search Results:\n`);
      results.slice(0, 5).forEach((result, i) => {
        console.log(`${i + 1}. ${result.label} (${result.id})`);
        if (result.description) {
          console.log(`   ${result.description}`);
        }
        console.log();
      });

      // Use the first result
      wikidataId = results[0].id;
      console.log(`✅ Using top result: ${results[0].label} (${wikidataId})\n`);
    }

    // Fetch and create canonical concept
    console.log(`📦 Creating canonical concept...\n`);
    const concept = await createCanonicalConcept(wikidataId);

    // Display results
    console.log(`\n${'='.repeat(80)}`);
    console.log(`CANONICAL CONCEPT`);
    console.log(`${'='.repeat(80)}\n`);

    console.log(JSON.stringify(concept, null, 2));

    console.log(`\n${'='.repeat(80)}`);
    console.log(`MECS COURSE METADATA (Example)`);
    console.log(`${'='.repeat(80)}\n`);

    const mecsMetadata = {
      "mecsVersion": "0.3.0",
      "type": "mecs:course",
      "id": `${concept.conceptId.toLowerCase()}-example`,
      "title": `Introduction to ${concept.title}`,
      "metadata": {
        "canonicalConcept": {
          "conceptId": concept.conceptId,
          "title": concept.title,
          "sourceUrl": concept.sourceUrl,
          "sourceType": concept.sourceType
        },
        "description": concept.metadata.description,
        "learningType": "concept",
        "academicLevel": "undergrad-lower",
        "proficiencyLevel": "understand"
      }
    };

    console.log(JSON.stringify(mecsMetadata, null, 2));

    console.log(`\n✅ Done!\n`);

  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// Also support CommonJS
if (typeof require !== 'undefined' && require.main === module) {
  main();
}
