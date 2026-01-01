# Core Concepts

> **MECS Standard Documentation Module**  
> Part 03 of 12 | [← Back to Index](README.md)

---

- `title`: Module title
- `sections`: Array of Section objects

**Example**: `/examples/modules/python-functions.json`

### 2. Sections

Individual content units within a course or module.

**Required Fields**:
- `id`: Unique section identifier
- `title`: Section title
- `contentType`: Namespaced type (e.g., "mecs:text")
- `content`: Type-specific content object

### 3. Content Types (v0.2.0)

#### Core Content Types

1. **`mecs:text`** - Rich text content
   - Supports: markdown, html, plain text
   - Schema: `/schema/v1.0/content-types/text.schema.json`

2. **`mecs:video`** - Video content
   - Providers: YouTube, Vimeo, direct URLs
   - Schema: `/schema/v1.0/content-types/video.schema.json`

3. **`mecs:document`** - Document references
   - Types: PDF, DOCX, PPTX, XLSX, etc.
   - Schema: `/schema/v1.0/content-types/document.schema.json`

4. **`mecs:module-ref`** - Module imports (NEW in v0.2.0)
   - Imports external modules via URL
   - Supports caching strategies and overrides
   - Schema: `/schema/v1.0/content-types/module-ref.schema.json`

#### Custom Content Types

Use namespacing for custom types:
- `mecs:*` - Reserved for core standard
- `custom:*` - For experimental types
- `org.example:*` - Organization-specific types

### 4. Module Import System (v0.2.0)

**Key Feature**: Modules can be hosted anywhere and imported into courses via URL.

**Unfurling Process**:
1. Platform detects `mecs:module-ref` section
2. Fetches module JSON from URL
3. Validates against schema
4. Applies any overrides (exclude sections, reorder, etc.)
5. Inserts module's sections into the course
6. Caches based on strategy

**Documentation**: `/docs/module-imports.md`

---

## Development Workflows

### Working with Git

**Current Branch**: `claude/add-claude-documentation-AtO79`

**Main Branch**: Not specified (check with user)

**Git Practices**:
1. Always develop on the designated feature branch
2. Use descriptive commit messages following conventional commits style
3. Push with `-u origin <branch-name>` for new branches
4. Retry network operations up to 4 times with exponential backoff (2s, 4s, 8s, 16s)

### Making Changes

#### 1. Schema Changes

When updating JSON schemas:

```bash
# 1. Edit schema file
vi schema/v1.0/course.schema.json

# 2. Update TypeScript types (if needed)
vi schema/typescript/types.ts

# 3. Update Python types (if needed)
vi schema/python/mecs_types.py

# 4. Update version in CHANGELOG.md

# 5. Test with example files
# (Validate examples against updated schema)
```

#### 2. Documentation Changes

Documentation uses Jekyll + GitHub Pages:

```bash
# 1. Edit markdown files in /docs
vi docs/specification.md

# 2. Test locally (if Jekyll installed)
cd docs
bundle exec jekyll serve

# 3. Push to trigger auto-deployment
git add docs/
git commit -m "docs: update specification"
git push
