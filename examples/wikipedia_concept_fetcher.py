#!/usr/bin/env python3
"""
Wikipedia Concept Fetcher (Python)

Demonstrates how to fetch canonical concept data from Wikipedia and Wikidata
for use in MECS Learning Course Builder.

Requirements:
    pip install requests

Usage:
    python examples/wikipedia_concept_fetcher.py "Arithmetic"
    python examples/wikipedia_concept_fetcher.py "Q11205"
"""

import sys
import json
import requests
from datetime import datetime
from typing import Dict, List, Optional, Any


def search_wikidata(query: str) -> List[Dict[str, Any]]:
    """Search Wikidata for a concept by name."""
    url = "https://www.wikidata.org/w/api.php"
    params = {
        "action": "wbsearchentities",
        "search": query,
        "language": "en",
        "format": "json",
    }

    print(f"🔍 Searching Wikidata for: '{query}'")

    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()

    return data.get("search", [])


def get_wikidata_entity(wikidata_id: str) -> Dict[str, Any]:
    """Get detailed entity data from Wikidata."""
    url = f"https://www.wikidata.org/wiki/Special:EntityData/{wikidata_id}.json"

    print(f"📥 Fetching Wikidata entity: {wikidata_id}")

    response = requests.get(url)
    response.raise_for_status()
    data = response.json()

    return data["entities"][wikidata_id]


def get_wikipedia_summary(title: str) -> Dict[str, Any]:
    """Get Wikipedia page summary."""
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{title}"

    print(f"📄 Fetching Wikipedia summary: {title}")

    response = requests.get(url)
    response.raise_for_status()

    return response.json()


def get_wikipedia_categories(title: str) -> List[str]:
    """Get Wikipedia page categories."""
    url = "https://en.wikipedia.org/w/api.php"
    params = {
        "action": "query",
        "titles": title,
        "prop": "categories",
        "format": "json",
    }

    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()

    pages = data["query"]["pages"]
    page = list(pages.values())[0]

    if "categories" in page:
        return [cat["title"].replace("Category:", "") for cat in page["categories"]]

    return []


def get_related_concepts(entity: Dict[str, Any]) -> List[Dict[str, str]]:
    """Get related concepts from Wikidata."""
    related = []
    claims = entity.get("claims", {})

    # Get "has part" (P527)
    has_part = claims.get("P527", [])
    for claim in has_part:
        value = claim.get("mainsnak", {}).get("datavalue", {}).get("value", {})
        if "id" in value:
            related.append({"wikidataId": value["id"], "relationship": "has-part"})

    # Get "part of" (P361)
    part_of = claims.get("P361", [])
    for claim in part_of:
        value = claim.get("mainsnak", {}).get("datavalue", {}).get("value", {})
        if "id" in value:
            related.append({"wikidataId": value["id"], "relationship": "part-of"})

    return related


def create_canonical_concept(wikidata_id: str) -> Dict[str, Any]:
    """Create a canonical concept reference from Wikidata + Wikipedia data."""

    # 1. Fetch Wikidata entity
    entity = get_wikidata_entity(wikidata_id)

    if not entity:
        raise ValueError(f"Wikidata entity {wikidata_id} not found")

    # 2. Extract basic info
    title = entity.get("labels", {}).get("en", {}).get("value")
    description = entity.get("descriptions", {}).get("en", {}).get("value")
    aliases = [a["value"] for a in entity.get("aliases", {}).get("en", [])]
    wikipedia_title = entity.get("sitelinks", {}).get("enwiki", {}).get("title")

    if not title:
        raise ValueError("Missing English label")

    if not wikipedia_title:
        print("⚠️  No English Wikipedia article found")

    # 3. Fetch Wikipedia data (if available)
    wikipedia_summary = None
    categories = []
    wikipedia_url = None

    if wikipedia_title:
        try:
            wikipedia_summary = get_wikipedia_summary(wikipedia_title)
            categories = get_wikipedia_categories(wikipedia_title)
            wikipedia_url = wikipedia_summary["content_urls"]["desktop"]["page"]
        except Exception as e:
            print(f"⚠️  Could not fetch Wikipedia data: {e}")

    # 4. Get related concepts
    related_concepts = get_related_concepts(entity)

    # 5. Get instance of (P31)
    instance_of = None
    claims_p31 = entity.get("claims", {}).get("P31", [])
    if claims_p31:
        instance_of = (
            claims_p31[0].get("mainsnak", {}).get("datavalue", {}).get("value", {}).get("id")
        )

    # 6. Create canonical concept
    canonical_concept = {
        "conceptId": wikidata_id,
        "title": title,
        "sourceUrl": wikipedia_url or f"https://www.wikidata.org/wiki/{wikidata_id}",
        "sourceType": "wikipedia" if wikipedia_url else "wikidata",
        "metadata": {
            "wikidataId": wikidata_id,
            "wikidataUrl": f"https://www.wikidata.org/wiki/{wikidata_id}",
            "description": description,
            "aliases": aliases,
            "instanceOf": instance_of,
            "extract": wikipedia_summary.get("extract") if wikipedia_summary else None,
            "thumbnail": wikipedia_summary.get("thumbnail", {}).get("source")
            if wikipedia_summary
            else None,
            "categories": categories,
            "relatedConcepts": related_concepts,
            "lastVerified": datetime.utcnow().isoformat() + "Z",
        },
    }

    return canonical_concept


def main():
    """Main function."""
    if len(sys.argv) < 2:
        print(
            """
Usage:
  python examples/wikipedia_concept_fetcher.py <search-term>
  python examples/wikipedia_concept_fetcher.py <wikidata-id>

Examples:
  python examples/wikipedia_concept_fetcher.py "Arithmetic"
  python examples/wikipedia_concept_fetcher.py "Q11205"
  python examples/wikipedia_concept_fetcher.py "Photosynthesis"
  python examples/wikipedia_concept_fetcher.py "Linear Algebra"
        """
        )
        sys.exit(1)

    input_query = sys.argv[1]

    try:
        wikidata_id = None

        # Check if input is already a Wikidata ID
        if input_query.startswith("Q") and input_query[1:].isdigit():
            wikidata_id = input_query
            print(f"✅ Using Wikidata ID: {wikidata_id}\n")
        else:
            # Search for the concept
            print(f"🔎 Searching for: '{input_query}'\n")
            results = search_wikidata(input_query)

            if not results:
                print(f"❌ No results found for '{input_query}'")
                sys.exit(1)

            print("📋 Search Results:\n")
            for i, result in enumerate(results[:5], 1):
                print(f"{i}. {result['label']} ({result['id']})")
                if result.get("description"):
                    print(f"   {result['description']}")
                print()

            # Use the first result
            wikidata_id = results[0]["id"]
            print(f"✅ Using top result: {results[0]['label']} ({wikidata_id})\n")

        # Fetch and create canonical concept
        print("📦 Creating canonical concept...\n")
        concept = create_canonical_concept(wikidata_id)

        # Display results
        print("\n" + "=" * 80)
        print("CANONICAL CONCEPT")
        print("=" * 80 + "\n")

        print(json.dumps(concept, indent=2))

        print("\n" + "=" * 80)
        print("MECS COURSE METADATA (Example)")
        print("=" * 80 + "\n")

        mecs_metadata = {
            "mecsVersion": "0.3.0",
            "type": "mecs:course",
            "id": f"{concept['conceptId'].lower()}-example",
            "title": f"Introduction to {concept['title']}",
            "metadata": {
                "canonicalConcept": {
                    "conceptId": concept["conceptId"],
                    "title": concept["title"],
                    "sourceUrl": concept["sourceUrl"],
                    "sourceType": concept["sourceType"],
                },
                "description": concept["metadata"]["description"],
                "learningType": "concept",
                "academicLevel": "undergrad-lower",
                "proficiencyLevel": "understand",
            },
        }

        print(json.dumps(mecs_metadata, indent=2))

        print("\n✅ Done!\n")

    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback

        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
