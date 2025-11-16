# Wikipedia Integration Tools

Tools for fetching and integrating Wikipedia/Wikidata concepts into MECS Learning Course Builder.

---

## Overview

These scripts demonstrate how to:

1. **Search** Wikipedia/Wikidata for concepts
2. **Fetch** structured data about concepts
3. **Create** canonical concept references for MECS
4. **Integrate** Wikipedia data into course metadata

---

## Quick Start

### Option 1: Python Script (Recommended)

**Requirements:**
```bash
pip install requests
```

**Usage:**
```bash
# Search by name
python examples/wikipedia_concept_fetcher.py "Arithmetic"
python examples/wikipedia_concept_fetcher.py "Photosynthesis"
python examples/wikipedia_concept_fetcher.py "Linear Algebra"

# Use Wikidata ID directly
python examples/wikipedia_concept_fetcher.py "Q11205"
```

**Make it executable (Unix/Mac):**
```bash
chmod +x examples/wikipedia_concept_fetcher.py
./examples/wikipedia_concept_fetcher.py "Arithmetic"
```

---

### Option 2: JavaScript/Node.js Script

**Requirements:**
```bash
npm install node-fetch
# OR use Node.js 18+ which has fetch built-in
```

**Usage:**
```bash
# Search by name
node examples/wikipedia-concept-fetcher.js "Arithmetic"
node examples/wikipedia-concept-fetcher.js "Photosynthesis"

# Use Wikidata ID directly
node examples/wikipedia-concept-fetcher.js "Q11205"
```

---

## Example Output

### Running the Script

```bash
$ python examples/wikipedia_concept_fetcher.py "Arithmetic"
```

**Console Output:**
```
🔎 Searching for: 'Arithmetic'

📋 Search Results:

1. arithmetic (Q11205)
   branch of mathematics

2. arithmetical hierarchy (Q413496)
   classification of formulas

✅ Using top result: arithmetic (Q11205)

📥 Fetching Wikidata entity: Q11205
📄 Fetching Wikipedia summary: Arithmetic

📦 Creating canonical concept...

================================================================================
CANONICAL CONCEPT
================================================================================

{
  "conceptId": "Q11205",
  "title": "Arithmetic",
  "sourceUrl": "https://en.wikipedia.org/wiki/Arithmetic",
  "sourceType": "wikipedia",
  "metadata": {
    "wikidataId": "Q11205",
    "wikidataUrl": "https://www.wikidata.org/wiki/Q11205",
    "description": "branch of mathematics",
    "aliases": ["elementary arithmetic"],
    "instanceOf": "Q7754",
    "extract": "Arithmetic is an elementary part of mathematics that consists of the study of the properties of the traditional operations on numbers—addition, subtraction, multiplication, division, exponentiation, and extraction of roots.",
    "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Napier%27s_rods.JPG/320px-Napier%27s_rods.JPG",
    "categories": [
      "Arithmetic",
      "Elementary mathematics",
      "Mathematics",
      "Mathematical terminology"
    ],
    "relatedConcepts": [
      {
        "wikidataId": "Q395",
        "relationship": "part-of"
      }
    ],
    "lastVerified": "2025-11-16T12:34:56Z"
  }
}

================================================================================
MECS COURSE METADATA (Example)
================================================================================

{
  "mecsVersion": "0.3.0",
  "type": "mecs:course",
  "id": "q11205-example",
  "title": "Introduction to Arithmetic",
  "metadata": {
    "canonicalConcept": {
      "conceptId": "Q11205",
      "title": "Arithmetic",
      "sourceUrl": "https://en.wikipedia.org/wiki/Arithmetic",
      "sourceType": "wikipedia"
    },
    "description": "branch of mathematics",
    "learningType": "concept",
    "academicLevel": "undergrad-lower",
    "proficiencyLevel": "understand"
  }
}

✅ Done!
```

---

## What Each Script Does

### 1. Search Wikidata

Finds concepts matching your search term:

```python
results = search_wikidata("Arithmetic")
# Returns: [
#   {
#     "id": "Q11205",
#     "label": "arithmetic",
#     "description": "branch of mathematics"
#   },
#   ...
# ]
```

### 2. Fetch Wikidata Entity

Gets detailed structured data:

```python
entity = get_wikidata_entity("Q11205")
# Returns entity with:
# - labels (in multiple languages)
# - descriptions
# - claims (properties like "part of", "instance of")
# - sitelinks (Wikipedia articles in different languages)
```

### 3. Fetch Wikipedia Summary

Gets human-readable summary and metadata:

```python
summary = get_wikipedia_summary("Arithmetic")
# Returns:
# - extract (plain text summary)
# - thumbnail image
# - URLs
```

### 4. Get Categories

Retrieves Wikipedia categories (taxonomy):

```python
categories = get_wikipedia_categories("Arithmetic")
# Returns: ["Arithmetic", "Elementary mathematics", "Mathematics"]
```

### 5. Get Related Concepts

Finds related Wikidata concepts:

```python
related = get_related_concepts(entity)
# Returns concepts linked via "part of", "has part", etc.
```

### 6. Create Canonical Concept

Combines all data into a MECS-compatible structure:

```python
concept = create_canonical_concept("Q11205")
# Returns complete canonical concept reference
```

---

## Use Cases

### 1. Build a Concept Registry

Populate a database of canonical concepts:

```bash
# Fetch multiple concepts
for concept in "Arithmetic" "Algebra" "Geometry" "Calculus"; do
  python examples/wikipedia_concept_fetcher.py "$concept" >> concepts.json
done
```

### 2. Validate Canonical Concepts

Check if a concept exists before creating a course:

```python
try:
    concept = create_canonical_concept("Q11205")
    print(f"✅ Valid concept: {concept['title']}")
except Exception as e:
    print(f"❌ Invalid: {e}")
```

### 3. Auto-Generate Course Metadata

Create course templates with Wikipedia data:

```python
concept = create_canonical_concept("Q11205")

course = {
    "mecsVersion": "0.3.0",
    "type": "mecs:course",
    "title": f"Introduction to {concept['title']}",
    "description": concept['metadata']['description'],
    "metadata": {
        "canonicalConcept": {
            "conceptId": concept['conceptId'],
            "title": concept['title'],
            "sourceUrl": concept['sourceUrl'],
            "sourceType": concept['sourceType']
        }
    }
}
```

### 4. Discover Related Courses

Find concepts related to a topic:

```python
concept = create_canonical_concept("Q11205")  # Arithmetic
related = concept['metadata']['relatedConcepts']

for rel in related:
    related_concept = create_canonical_concept(rel['wikidataId'])
    print(f"Related: {related_concept['title']} ({rel['relationship']})")
```

---

## Understanding the Data

### Wikidata IDs

All entities have a **Q-number** (e.g., Q11205):

- **Q11205** = Arithmetic
- **Q395** = Mathematics
- **Q7754** = Mathematical discipline

These are stable, unique identifiers.

### Wikidata Properties

Common properties (P-numbers):

| Property | ID | Example |
|----------|-----|---------|
| Instance of | P31 | "mathematical discipline" |
| Part of | P361 | "mathematics" |
| Has part | P527 | "addition", "subtraction" |
| Subclass of | P279 | "number theory" |

### Wikipedia Categories

Categories form a taxonomy:

```
Category:Mathematics
  ├─ Category:Arithmetic
  │   ├─ Category:Addition
  │   └─ Category:Elementary arithmetic
  └─ Category:Algebra
```

---

## Integrating into Your Workflow

### Step 1: Search for Concepts

```bash
python examples/wikipedia_concept_fetcher.py "Photosynthesis"
```

### Step 2: Copy the Output

The script outputs JSON you can paste directly into:
- Concept registry
- MECS course metadata
- Database

### Step 3: Use in Course Creation

```json
{
  "mecsVersion": "0.3.0",
  "type": "mecs:course",
  "id": "photosynthesis-intro",
  "title": "Introduction to Photosynthesis",
  "metadata": {
    "canonicalConcept": {
      "conceptId": "Q11403",
      "title": "Photosynthesis",
      "sourceUrl": "https://en.wikipedia.org/wiki/Photosynthesis",
      "sourceType": "wikipedia"
    },
    "learningType": "concept",
    "academicLevel": "7-8",
    "proficiencyLevel": "understand"
  },
  "sections": [...]
}
```

---

## Advanced: SPARQL Queries

For more complex queries, use Wikidata's SPARQL endpoint:

**URL**: https://query.wikidata.org/

**Example: Find all mathematical disciplines**

```sparql
SELECT ?discipline ?disciplineLabel WHERE {
  ?discipline wdt:P31 wd:Q7754 .  # instance of mathematical discipline
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
LIMIT 100
```

**Try it**: https://query.wikidata.org/ (paste the query above)

---

## Common Wikidata IDs for Education

Here are some useful starting points:

| Concept | Wikidata ID | Wikipedia |
|---------|-------------|-----------|
| Mathematics | Q395 | [Link](https://en.wikipedia.org/wiki/Mathematics) |
| Arithmetic | Q11205 | [Link](https://en.wikipedia.org/wiki/Arithmetic) |
| Algebra | Q3968 | [Link](https://en.wikipedia.org/wiki/Algebra) |
| Geometry | Q8087 | [Link](https://en.wikipedia.org/wiki/Geometry) |
| Calculus | Q149972 | [Link](https://en.wikipedia.org/wiki/Calculus) |
| Physics | Q413 | [Link](https://en.wikipedia.org/wiki/Physics) |
| Chemistry | Q2329 | [Link](https://en.wikipedia.org/wiki/Chemistry) |
| Biology | Q420 | [Link](https://en.wikipedia.org/wiki/Biology) |
| Computer Science | Q21198 | [Link](https://en.wikipedia.org/wiki/Computer_science) |
| Programming | Q80006 | [Link](https://en.wikipedia.org/wiki/Computer_programming) |

---

## Troubleshooting

### Issue: "No results found"

**Cause**: Search term doesn't match any Wikidata entities

**Solution**: Try variations:
- "Math" → "Mathematics"
- "Bio" → "Biology"
- Use the Wikipedia article title exactly

### Issue: "No English Wikipedia article"

**Cause**: Concept exists in Wikidata but not English Wikipedia

**Solution**: The script will still work, using Wikidata as the source

### Issue: HTTP errors

**Cause**: Network issues or rate limiting

**Solution**:
- Wait a few seconds and retry
- Check internet connection
- Wikidata has generous rate limits (~60 requests/minute)

---

## Further Reading

- **Complete Guide**: See [docs/wikipedia-integration-guide.md](../docs/wikipedia-integration-guide.md)
- **Wikidata API**: https://www.wikidata.org/w/api.php
- **Wikipedia API**: https://en.wikipedia.org/w/api.php
- **SPARQL Tutorial**: https://www.wikidata.org/wiki/Wikidata:SPARQL_tutorial
- **MECS Learning Builder**: [docs/learning-course-builder.md](../docs/learning-course-builder.md)

---

## Contributing

Have improvements? Submit a PR!

Ideas:
- Add support for other languages
- Implement caching
- Add more data sources (DBpedia, etc.)
- Create a web interface
- Batch processing script

---

**Happy concept hunting! 🔍**
