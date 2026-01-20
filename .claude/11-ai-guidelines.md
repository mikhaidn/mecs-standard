# AI Assistant Guidelines

> **MECS Standard Documentation Module**  
> Part 11 of 12 | [← Back to Index](README.md)

---

python -m http.server 8000

# Test Jekyll site locally (if bundler installed)
cd docs && bundle exec jekyll serve

# Check JSON formatting
cat examples/course.json | jq '.'

# Find all JSON files
find . -name "*.json" -not -path "./.git/*"

# Search for a specific MECS version
grep -r "mecsVersion" examples/

# View git history for a file
git log --follow -- schema/v1.0/course.schema.json
```

### Resources for AI Assistants

**Essential Files to Reference**:
1. `/CHANGELOG.md` - Version history and changes
2. `/IMPLEMENTATION_ROADMAP.md` - Development plans
3. `/docs/specification.md` - Authoritative technical spec
4. `/docs/module-imports.md` - Module system details
5. `/schema/v1.0/*.schema.json` - Schema definitions
6. `/schema/typescript/types.ts` - Type system reference

**Example Files to Study**:
1. `/examples/intro-to-programming.json` - Complete course example
2. `/examples/modules/python-functions.json` - Module example
3. `/examples/course-with-module-import.json` - Module import example

---

## Appendix: Key Concepts Quick Reference

### MECS Hierarchy

```
Course (mecs:course)
├── Metadata (author, level, duration, etc.)
└── Sections[]
    ├── Section (mecs:text)
    ├── Section (mecs:video)
    ├── Section (mecs:document)
    └── Section (mecs:module-ref)
        └── Fetches → Module (mecs:module)
                      └── Sections[] (unfurled into course)
```

### Content Type Matrix (v0.2.0)

| Type | Purpose | Key Fields | Schema |
|------|---------|------------|--------|
| `mecs:text` | Rich text | `format`, `text` | text.schema.json |
| `mecs:video` | Videos | `url`, `provider` | video.schema.json |
| `mecs:document` | Documents | `url`, `docType` | document.schema.json |
| `mecs:module-ref` | Module imports | `url`, `cache`, `overrides` | module-ref.schema.json |

### Metadata Hierarchy

**Course/Module Metadata**:
- author, institution, subject, level
- language, duration, prerequisites
- learningObjectives, tags, license, version

**Section Metadata**:
- duration, difficulty, learningObjectives
- keywords, isOptional, prerequisites

### File Extensions

- `.json` - MECS courses, modules, schemas
- `.md` - Documentation (Markdown)
- `.ts` - TypeScript type definitions
- `.py` - Python type definitions
