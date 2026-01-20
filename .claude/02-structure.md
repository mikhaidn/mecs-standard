# Repository Structure

> **MECS Standard Documentation Module**  
> Part 02 of 12 | [← Back to Index](README.md)

---


## Repository Structure

```
mecs-standard/
├── .github/
│   └── workflows/
│       └── jekyll.yml              # GitHub Pages deployment
├── docs/                           # Documentation (Jekyll site)
│   ├── _config.yml                 # Jekyll configuration
│   ├── _includes/                  # Reusable components
│   ├── _layouts/                   # Page templates
│   ├── assets/                     # CSS, JS, images
│   │   ├── css/
│   │   └── js/
│   ├── index.md                    # Homepage
│   ├── specification.md            # Technical spec
│   ├── implementation.md           # Implementation guide
│   ├── content-types.md            # Content type reference
│   ├── module-imports.md           # Module system guide (v0.2.0)
│   ├── related-standards.md        # Comparison with other standards
│   ├── roadmap.md                  # Future plans
│   ├── README.md                   # Docs overview
│   ├── PORTABILITY_GUIDE.md        # Cross-platform guide
│   └── WEBSITE_PLAN.md             # Website development plan
├── examples/                       # Example MECS files
│   ├── intro-to-programming.json   # Sample course
│   ├── course-with-module-import.json
│   ├── course-with-local-module.json
│   ├── modules/                    # Standalone modules
│   │   ├── python-functions.json
│   │   └── README.md
│   └── TESTING.md                  # Testing guide for examples
├── schema/                         # JSON schemas & type definitions
│   ├── v1.0/                       # Version 1.0 schemas
│   │   ├── course.schema.json      # Course schema
│   │   ├── module.schema.json      # Module schema (v0.2.0)
│   │   ├── section.schema.json     # Section schema
│   │   └── content-types/          # Content type schemas
│   │       ├── text.schema.json
│   │       ├── video.schema.json
│   │       ├── document.schema.json
│   │       └── module-ref.schema.json
│   ├── typescript/
│   │   └── types.ts                # TypeScript definitions
│   ├── python/
│   │   └── mecs_types.py           # Python type hints
│   ├── protobuf/                   # (Future: Protocol Buffers)
│   └── README.md                   # Schema documentation
├── CHANGELOG.md                    # Version history
├── IMPLEMENTATION_ROADMAP.md       # Detailed development roadmap
├── LICENSE                         # CC0 1.0 license
└── README.md                       # Main documentation
```

### Key Directories

- **`/docs`**: Jekyll-based documentation website (auto-deployed to GitHub Pages)
- **`/examples`**: Reference implementations and sample MECS files
- **`/schema`**: JSON schemas for validation + type definitions (TypeScript, Python)
- **`/.github/workflows`**: CI/CD automation

---

## Core Concepts

### 1. MECS Document Types

#### Course (`mecs:course`)
A complete learning experience with metadata and sections.

**Required Fields**:
- `mecsVersion`: Version string (e.g., "0.2.0")
- `type`: Always "mecs:course"
- `id`: Unique identifier
- `title`: Course title
- `sections`: Array of Section objects

**Example**: `/examples/intro-to-programming.json`

#### Module (`mecs:module`)
A standalone, reusable collection of sections (new in v0.2.0).

**Required Fields**:
- `mecsVersion`: Version string
- `type`: Always "mecs:module"
