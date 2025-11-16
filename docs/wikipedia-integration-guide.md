# Wikipedia Integration Guide

**For MECS Learning Course Builder**

This guide explains how to understand and work with Wikipedia's data structures for canonical concept references.

---

## Overview

Wikipedia has multiple data sources and schemas you can use:

1. **Wikidata** - Structured, machine-readable data (THE KEY RESOURCE)
2. **Wikipedia API** - Page content and metadata
3. **DBpedia** - Extracted structured data from Wikipedia
4. **Wikipedia Exports** - Raw dumps of all content

**Recommendation**: Use **Wikidata** for structured canonical concepts.

---

## Part 1: Wikidata (Recommended)

### What is Wikidata?

Wikidata is Wikipedia's sister project providing **structured, machine-readable data** about entities.

**URL**: https://www.wikidata.org

**Example**: "Arithmetic" on Wikidata
- **Wikidata ID**: Q11205
- **URL**: https://www.wikidata.org/wiki/Q11205
- **Data**: Properties like "instance of", "part of", "subclass of", etc.

### Wikidata Schema

Wikidata uses a **property-based schema**:

```
Entity (Q-number)
├── Labels (names in different languages)
├── Descriptions
├── Aliases
└── Statements (properties)
    ├── Property: Value
    ├── Property: Value
    └── ...
```

**Example: Arithmetic (Q11205)**

```json
{
  "id": "Q11205",
  "labels": {
    "en": "arithmetic",
    "es": "aritmética",
    "fr": "arithmétique"
  },
  "descriptions": {
    "en": "branch of mathematics"
  },
  "claims": {
    "P31": [  // instance of
      {
        "mainsnak": {
          "datavalue": {
            "value": {"id": "Q7754"}  // "mathematical discipline"
          }
        }
      }
    ],
    "P361": [  // part of
      {
        "mainsnak": {
          "datavalue": {
            "value": {"id": "Q395"}  // "mathematics"
          }
        }
      }
    ],
    "P2578": "arithmetic",  // studied by (string)
    "P1687": "..."  // Wikidata property
  },
  "sitelinks": {
    "enwiki": {
      "site": "enwiki",
      "title": "Arithmetic",
      "url": "https://en.wikipedia.org/wiki/Arithmetic"
    }
  }
}
```

### Key Wikidata Properties

Common properties useful for educational content:

| Property | ID | Description | Example |
|----------|-----|-------------|---------|
| Instance of | P31 | What kind of thing is this | "mathematical discipline" |
| Part of | P361 | What is this part of | "mathematics" |
| Subclass of | P279 | Parent class | "number theory" |
| Has part | P527 | Components | "addition", "subtraction" |
| Topic's main category | P910 | Wikipedia category | "Category:Arithmetic" |
| Studied by | P2578 | Field of study | "mathematics" |
| Different from | P1889 | Disambiguation | |
| Described by source | P1343 | References | Encyclopedias |

### How to Query Wikidata

#### Option 1: Wikidata API (Simple)

**Get entity data:**
```bash
curl "https://www.wikidata.org/wiki/Special:EntityData/Q11205.json"
```

**Search for entities:**
```bash
curl "https://www.wikidata.org/w/api.php?action=wbsearchentities&search=arithmetic&language=en&format=json"
```

#### Option 2: SPARQL Query Service (Advanced)

**URL**: https://query.wikidata.org/

**Example Query**: Get all subfields of mathematics

```sparql
SELECT ?subject ?subjectLabel WHERE {
  ?subject wdt:P361 wd:Q395 .  # part of mathematics
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 100
```

**Example Query**: Get Wikipedia articles about mathematical concepts

```sparql
SELECT ?concept ?conceptLabel ?article WHERE {
  ?concept wdt:P31 wd:Q7754 .  # instance of mathematical discipline
  ?article schema:about ?concept .
  ?article schema:isPartOf <https://en.wikipedia.org/> .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 50
```

---

## Part 2: Wikipedia API

### MediaWiki API

Wikipedia uses the MediaWiki API for accessing content.

**Base URL**: `https://en.wikipedia.org/w/api.php`

### Common Queries

#### Get Page Summary

```bash
curl "https://en.wikipedia.org/api/rest_v1/page/summary/Arithmetic"
```

**Response:**
```json
{
  "title": "Arithmetic",
  "extract": "Arithmetic is an elementary part of mathematics...",
  "description": "branch of mathematics",
  "thumbnail": {
    "source": "https://upload.wikimedia.org/...",
    "width": 320,
    "height": 240
  },
  "content_urls": {
    "desktop": {
      "page": "https://en.wikipedia.org/wiki/Arithmetic"
    }
  }
}
```

#### Get Full Page Content

```bash
curl "https://en.wikipedia.org/w/api.php?action=query&titles=Arithmetic&prop=extracts&format=json"
```

#### Get Page Categories

```bash
curl "https://en.wikipedia.org/w/api.php?action=query&titles=Arithmetic&prop=categories&format=json"
```

#### Search Wikipedia

```bash
curl "https://en.wikipedia.org/w/api.php?action=opensearch&search=arithmetic&format=json"
```

---

## Part 3: Wikipedia Page Structure

### MediaWiki Markup

Wikipedia pages are written in **Wikitext** (MediaWiki markup).

**Example: Arithmetic page structure**

```wikitext
{{Short description|Branch of mathematics}}
{{Redirect|Elementary arithmetic|the song|Tom Lehrer}}

'''Arithmetic''' is an elementary part of [[mathematics]]...

== Elementary arithmetic ==

=== Addition ===
'''Addition''' is the basic operation...

=== Subtraction ===
...

== See also ==
* [[Number theory]]
* [[Mathematics education]]

== References ==
{{reflist}}

== External links ==
* [https://example.com Example]

[[Category:Arithmetic]]
[[Category:Mathematics]]
```

### Important Page Elements

1. **Infoboxes** - Structured data boxes (right side)
2. **Categories** - Taxonomic classification
3. **See also** - Related articles
4. **References** - Citations
5. **External links** - Additional resources

### Extracting Structured Data from Pages

Wikipedia has structured templates (infoboxes) that can be parsed:

```wikitext
{{Infobox mathematical concept
| name = Arithmetic
| field = Mathematics
| subdivisions = [[Addition]], [[Subtraction]], [[Multiplication]], [[Division]]
}}
```

---

## Part 4: DBpedia

### What is DBpedia?

DBpedia extracts structured data from Wikipedia infoboxes and creates a knowledge graph.

**URL**: https://dbpedia.org
**SPARQL Endpoint**: https://dbpedia.org/sparql

### Example SPARQL Query

```sparql
SELECT ?property ?value WHERE {
  <http://dbpedia.org/resource/Arithmetic> ?property ?value .
}
LIMIT 100
```

### DBpedia Schema

DBpedia uses ontologies (schemas):

- **Classes**: `dbo:MathematicalConcept`, `dbo:AcademicSubject`
- **Properties**: `dbo:field`, `dbo:knownFor`, `dbo:wikiPageWikiLink`

**Example Data:**
```turtle
<http://dbpedia.org/resource/Arithmetic>
  rdf:type dbo:MathematicalConcept ;
  rdfs:label "Arithmetic"@en ;
  dbo:abstract "Arithmetic is an elementary part of mathematics..."@en ;
  dbo:field <http://dbpedia.org/resource/Mathematics> ;
  dbo:wikiPageWikiLink <http://dbpedia.org/resource/Addition> .
```

---

## Part 5: Integration with MECS

### Recommended Approach for Canonical Concepts

Use **Wikidata ID + Wikipedia URL** for canonical references:

```json
{
  "canonicalConcept": {
    "conceptId": "arithmetic",
    "title": "Arithmetic",
    "sourceUrl": "https://en.wikipedia.org/wiki/Arithmetic",
    "sourceType": "wikipedia",
    "metadata": {
      "wikidataId": "Q11205",
      "wikidataUrl": "https://www.wikidata.org/wiki/Q11205",
      "description": "branch of mathematics",
      "categories": [
        "Arithmetic",
        "Elementary mathematics",
        "Mathematics"
      ],
      "relatedConcepts": [
        {
          "id": "Q32043",
          "title": "Addition",
          "url": "https://en.wikipedia.org/wiki/Addition"
        },
        {
          "id": "Q40754",
          "title": "Subtraction",
          "url": "https://en.wikipedia.org/wiki/Subtraction"
        }
      ],
      "lastVerified": "2025-11-16T12:00:00Z"
    }
  }
}
```

### Building a Concept Registry

**Step 1: Search Wikidata**

```javascript
async function searchWikidata(query) {
  const url = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${query}&language=en&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.search;
}

// Example usage
const results = await searchWikidata("arithmetic");
// Returns: [{ id: "Q11205", label: "arithmetic", description: "branch of mathematics", ... }]
```

**Step 2: Get Entity Details**

```javascript
async function getWikidataEntity(wikidataId) {
  const url = `https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.entities[wikidataId];
}

const entity = await getWikidataEntity("Q11205");
```

**Step 3: Get Wikipedia Page Info**

```javascript
async function getWikipediaSummary(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
  const response = await fetch(url);
  return await response.json();
}

const summary = await getWikipediaSummary("Arithmetic");
```

**Step 4: Create Canonical Concept**

```javascript
function createCanonicalConcept(wikidataEntity, wikipediaSummary) {
  const wikidataId = wikidataEntity.id;
  const title = wikidataEntity.labels.en.value;
  const description = wikidataEntity.descriptions.en?.value;
  const wikipediaUrl = wikipediaSummary.content_urls.desktop.page;

  return {
    conceptId: title.toLowerCase().replace(/\s+/g, '-'),
    title: title,
    sourceUrl: wikipediaUrl,
    sourceType: "wikipedia",
    metadata: {
      wikidataId: wikidataId,
      wikidataUrl: `https://www.wikidata.org/wiki/${wikidataId}`,
      description: description,
      thumbnail: wikipediaSummary.thumbnail?.source,
      extract: wikipediaSummary.extract,
      lastVerified: new Date().toISOString()
    }
  };
}
```

---

## Part 6: Useful Tools & Libraries

### JavaScript/TypeScript

**wikidata-sdk**: Easy Wikidata access
```bash
npm install wikidata-sdk
```

```javascript
import wdk from 'wikidata-sdk';

// Search entities
const url = wdk.searchEntities('arithmetic');

// Get entity
const url = wdk.getEntities(['Q11205']);

// SPARQL query
const url = wdk.sparqlQuery(query);
```

**wtf_wikipedia**: Parse Wikipedia markup
```bash
npm install wtf_wikipedia
```

```javascript
import wtf from 'wtf_wikipedia';

const doc = await wtf.fetch('Arithmetic');
console.log(doc.categories());
console.log(doc.sections());
console.log(doc.infoboxes());
```

### Python

**wptools**: Wikipedia and Wikidata access
```bash
pip install wptools
```

```python
import wptools

page = wptools.page('Arithmetic').get()
print(page.data['wikidata_url'])
print(page.data['description'])
```

**SPARQLWrapper**: Query Wikidata
```bash
pip install SPARQLWrapper
```

```python
from SPARQLWrapper import SPARQLWrapper, JSON

sparql = SPARQLWrapper("https://query.wikidata.org/sparql")
sparql.setQuery("""
    SELECT ?item ?itemLabel WHERE {
      ?item wdt:P31 wd:Q7754 .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    LIMIT 10
""")
sparql.setReturnFormat(JSON)
results = sparql.query().convert()
```

---

## Part 7: Wikipedia Data Schema Reference

### Key Namespaces

- **Main**: Article pages (e.g., "Arithmetic")
- **Category**: Category pages (e.g., "Category:Mathematics")
- **Template**: Reusable page templates
- **File**: Images and media
- **Help**: Help documentation
- **Portal**: Topic portals

### Page Properties (via API)

| Property | Description |
|----------|-------------|
| `pageid` | Unique page ID |
| `title` | Page title |
| `categories` | Categories the page belongs to |
| `links` | Internal links |
| `templates` | Templates used |
| `images` | Images on the page |
| `revisions` | Edit history |
| `extracts` | Plain text extract |

### Category Hierarchy

Wikipedia categories form a taxonomy:

```
Category:Mathematics
├── Category:Arithmetic
│   ├── Category:Addition
│   ├── Category:Subtraction
│   └── Category:Elementary arithmetic
├── Category:Algebra
└── Category:Geometry
```

**Get category tree:**
```bash
curl "https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Arithmetic&format=json"
```

---

## Part 8: Best Practices for MECS

### 1. Use Wikidata ID as Primary Key

```json
{
  "conceptId": "Q11205",  // Use Wikidata ID
  "title": "Arithmetic",
  "sourceUrl": "https://www.wikidata.org/wiki/Q11205"
}
```

**Why**: Wikidata IDs are:
- Stable (won't change)
- Language-independent
- Globally unique
- Machine-readable

### 2. Cache Wikipedia Data

Don't fetch Wikipedia/Wikidata on every request:

```json
{
  "canonicalConcept": {
    "wikidataId": "Q11205",
    "cached": {
      "title": "Arithmetic",
      "description": "branch of mathematics",
      "wikipediaUrl": "https://en.wikipedia.org/wiki/Arithmetic",
      "cachedAt": "2025-11-16T12:00:00Z",
      "expiresAt": "2025-12-16T12:00:00Z"
    }
  }
}
```

### 3. Handle Multiple Languages

Wikidata supports multiple languages:

```json
{
  "canonicalConcept": {
    "wikidataId": "Q11205",
    "labels": {
      "en": "Arithmetic",
      "es": "Aritmética",
      "fr": "Arithmétique",
      "de": "Arithmetik"
    },
    "wikipediaUrls": {
      "en": "https://en.wikipedia.org/wiki/Arithmetic",
      "es": "https://es.wikipedia.org/wiki/Aritmética",
      "fr": "https://fr.wikipedia.org/wiki/Arithmétique"
    }
  }
}
```

### 4. Validate Concepts

Before accepting a canonical concept, verify:

- ✅ Wikidata ID exists
- ✅ Has English label
- ✅ Has Wikipedia article
- ✅ Appropriate type (e.g., not a person, place, or thing)

```javascript
async function validateConcept(wikidataId) {
  const entity = await getWikidataEntity(wikidataId);

  // Check has English label
  if (!entity.labels.en) {
    throw new Error("No English label");
  }

  // Check has Wikipedia article
  if (!entity.sitelinks.enwiki) {
    throw new Error("No English Wikipedia article");
  }

  // Check is educational concept
  const instanceOf = entity.claims.P31?.[0]?.mainsnak?.datavalue?.value?.id;
  const validTypes = ["Q7754", "Q11862829", "Q973404"]; // mathematical discipline, academic discipline, academic subject

  if (!validTypes.includes(instanceOf)) {
    console.warn("May not be an educational concept");
  }

  return true;
}
```

---

## Part 9: Example Integration Code

### Complete Example: Fetch and Store Canonical Concept

```typescript
import type { CanonicalConceptRef } from '../schema/typescript/learning-extensions';

interface WikidataEntity {
  id: string;
  labels: { [lang: string]: { value: string } };
  descriptions: { [lang: string]: { value: string } };
  sitelinks: {
    enwiki?: { title: string; url: string };
  };
  claims: any;
}

async function fetchCanonicalConcept(
  wikidataId: string
): Promise<CanonicalConceptRef> {
  // 1. Fetch Wikidata entity
  const wikidataUrl = `https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`;
  const wikidataResponse = await fetch(wikidataUrl);
  const wikidataData = await wikidataResponse.json();
  const entity: WikidataEntity = wikidataData.entities[wikidataId];

  if (!entity) {
    throw new Error(`Wikidata entity ${wikidataId} not found`);
  }

  // 2. Extract basic info
  const title = entity.labels.en?.value;
  const description = entity.descriptions.en?.value;
  const wikipediaTitle = entity.sitelinks.enwiki?.title;

  if (!title || !wikipediaTitle) {
    throw new Error("Missing English label or Wikipedia article");
  }

  // 3. Fetch Wikipedia summary
  const wikipediaSummaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikipediaTitle)}`;
  const wikipediaResponse = await fetch(wikipediaSummaryUrl);
  const wikipediaSummary = await wikipediaResponse.json();

  // 4. Get categories
  const categoriesUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(wikipediaTitle)}&prop=categories&format=json`;
  const categoriesResponse = await fetch(categoriesUrl);
  const categoriesData = await categoriesResponse.json();
  const pages = Object.values(categoriesData.query.pages)[0] as any;
  const categories = pages.categories?.map((c: any) => c.title.replace('Category:', '')) || [];

  // 5. Create canonical concept
  const canonicalConcept: CanonicalConceptRef = {
    conceptId: wikidataId,
    title: title,
    sourceUrl: wikipediaSummary.content_urls.desktop.page,
    sourceType: "wikipedia",
    metadata: {
      wikidataId: wikidataId,
      wikidataUrl: `https://www.wikidata.org/wiki/${wikidataId}`,
      description: description,
      extract: wikipediaSummary.extract,
      thumbnail: wikipediaSummary.thumbnail?.source,
      categories: categories,
      lastVerified: new Date().toISOString()
    }
  };

  return canonicalConcept;
}

// Usage
const arithmeticConcept = await fetchCanonicalConcept("Q11205");
console.log(arithmeticConcept);
```

---

## Part 10: Resources

### Official Documentation

- **Wikidata API**: https://www.wikidata.org/w/api.php
- **MediaWiki API**: https://www.mediawiki.org/wiki/API:Main_page
- **Wikidata Query Service**: https://query.wikidata.org/
- **DBpedia**: https://www.dbpedia.org/

### Interactive Tools

- **Wikidata Query Builder**: https://query.wikidata.org/
- **Wikidata Entity Inspector**: https://www.wikidata.org/wiki/Special:EntityData
- **DBpedia SPARQL**: https://dbpedia.org/sparql

### Datasets & Dumps

- **Wikidata Dumps**: https://dumps.wikimedia.org/wikidatawiki/
- **Wikipedia Dumps**: https://dumps.wikimedia.org/enwiki/
- **DBpedia Downloads**: https://databus.dbpedia.org/

### Learning Resources

- **Wikidata Introduction**: https://www.wikidata.org/wiki/Wikidata:Introduction
- **SPARQL Tutorial**: https://www.wikidata.org/wiki/Wikidata:SPARQL_tutorial
- **MediaWiki API Tutorial**: https://www.mediawiki.org/wiki/API:Tutorial

---

## Summary: Recommended Approach

For MECS Learning Course Builder:

1. **Use Wikidata IDs** as primary canonical concept identifiers
2. **Fetch metadata** from Wikidata API (labels, descriptions, related concepts)
3. **Link to Wikipedia** for human-readable content
4. **Cache data** to avoid excessive API calls
5. **Validate concepts** before adding to registry
6. **Support multiple languages** via Wikidata

**Example Implementation**: See Part 9 for complete TypeScript code.

---

**Next Steps:**
1. Experiment with Wikidata Query Service: https://query.wikidata.org/
2. Try the example code in Part 9
3. Build a small proof-of-concept concept registry
4. Explore educational concepts in Wikidata
