# CLAUDE.md - AI Assistant Guide for MECS Standard Repository

> Last Updated: 2026-01-01
> MECS Version: 0.2.0
> Purpose: Guide AI assistants working with the MECS (Modular Educational Content Standard) repository

## Table of Contents

1. [Project Overview](#project-overview)
2. [Repository Structure](#repository-structure)
3. [Core Concepts](#core-concepts)
4. [Development Workflows](#development-workflows)
5. [File Conventions](#file-conventions)
6. [Schema Management](#schema-management)
7. [Documentation Guidelines](#documentation-guidelines)
8. [Testing & Validation](#testing--validation)
9. [Version Control](#version-control)
10. [Common Tasks](#common-tasks)
11. [AI Assistant Guidelines](#ai-assistant-guidelines)

---

## Project Overview

**MECS (Modular Educational Content Standard)** is an open JSON-based standard for structuring educational content (courses, lessons, modules) in a platform-agnostic, portable format.

### Key Facts

- **Current Version**: 0.2.0
- **License**: CC0 1.0 Universal (Public Domain)
- **Repository**: https://github.com/mikhaidn/mecs-standard
- **Language**: JSON (with TypeScript/Python type definitions)
- **Status**: Pre-release (0.x.x series)

### Project Goals

1. **Portability**: Create once, use anywhere
2. **Simplicity**: Just JSON - easy to read/write
3. **Extensibility**: Support custom content types via namespacing
4. **Openness**: Free to use, no vendor lock-in

### Version History

- **v0.1.0** (2025-01-01): Initial release with basic course structure
- **v0.2.0** (2025-01-15): Added module imports via URL
- **v0.3.0** (planned): Quizzes and assessments
- **v1.0.0** (future): Stable release

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
- `id`: Unique module identifier
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
```

#### 3. Adding Examples

```bash
# 1. Create new example JSON file
vi examples/new-example-course.json

# 2. Validate against schema
# (Use JSON Schema validator)

# 3. Document in examples/README.md or examples/TESTING.md

# 4. Update main README.md if it's a showcase example
```

---

## File Conventions

### Naming Conventions

#### Files
- **JSON Schemas**: `{type}.schema.json` (e.g., `course.schema.json`)
- **Examples**: Descriptive kebab-case (e.g., `intro-to-programming.json`)
- **Modules**: Descriptive kebab-case (e.g., `python-functions.json`)
- **Documentation**: kebab-case with `.md` extension

#### Identifiers in JSON
- **Course/Module IDs**: Kebab-case (e.g., `"intro-programming-101"`)
- **Section IDs**: Prefix with `sec-` and zero-padded numbers (e.g., `"sec-001"`)
- **Content Types**: Namespace prefix with colon (e.g., `"mecs:text"`)

### JSON Formatting

- **Indentation**: 2 spaces (consistent across all JSON files)
- **Property Order** (preferred):
  1. `mecsVersion`
  2. `type`
  3. `id`
  4. `title`
  5. `description`
  6. `metadata`
  7. `sections` / `content`
  8. `createdAt` / `updatedAt`

### Version Numbers

Follow **Semantic Versioning** (semver):
- **Major** (X.0.0): Breaking changes
- **Minor** (0.X.0): New features, backward compatible
- **Patch** (0.0.X): Bug fixes, backward compatible

**Pre-release**: 0.x.x series until v1.0.0

---

## Schema Management

### JSON Schema Structure

All schemas follow JSON Schema Draft 7:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://mecs-standard.org/schema/v1.0/{type}.schema.json",
  "title": "MECS {Type} Schema",
  "description": "...",
  "type": "object",
  "required": [...],
  "properties": {...},
  "additionalProperties": false
}
```

### Schema Validation

**Tools**:
- JavaScript: Use `ajv` (AJV JSON Schema Validator)
- Python: Use `jsonschema` library
- Online: jsonschemavalidator.net

**Validation Pattern**:
```javascript
import Ajv from 'ajv';
const ajv = new Ajv();
const validate = ajv.compile(courseSchema);
if (!validate(data)) {
  console.error(validate.errors);
}
```

### Type Definitions

#### TypeScript (`/schema/typescript/types.ts`)
- Comprehensive TypeScript interfaces
- Type guards for runtime checking
- Builder classes for easier construction
- Exported for use in TypeScript projects

#### Python (`/schema/python/mecs_types.py`)
- Type hints using `typing` module
- TypedDict definitions
- Compatible with mypy type checking

### Schema References

Schemas use `$ref` for composition:
```json
{
  "sections": {
    "type": "array",
    "items": {
      "$ref": "section.schema.json"
    }
  }
}
```

---

## Documentation Guidelines

### Documentation Structure

**Primary Docs** (in `/docs`):
1. **specification.md** - Technical spec (authoritative reference)
2. **implementation.md** - How to integrate MECS
3. **content-types.md** - Content type reference
4. **module-imports.md** - Module system guide (v0.2.0+)
5. **related-standards.md** - Comparison with LTI, SCORM, xAPI, etc.
6. **roadmap.md** - Future plans

### Writing Style

- **Tone**: Professional but approachable
- **Audience**: Developers and educators
- **Format**: Markdown with code examples
- **Structure**: Clear headings, short paragraphs
- **Examples**: Always include practical examples

### Code Examples

Use fenced code blocks with language identifiers:

```markdown
```json
{
  "mecsVersion": "0.2.0",
  "type": "mecs:course"
}
```
```

### Jekyll Configuration

**Site**: GitHub Pages with Jekyll
**Theme**: Custom (see `/docs/_layouts` and `/docs/assets`)
**Deployment**: Automatic via `.github/workflows/jekyll.yml`
**Config**: `/docs/_config.yml`

---

## Testing & Validation

### Example Testing

**File**: `/examples/TESTING.md`

**Process**:
1. Validate all examples against JSON schemas
2. Test module imports (if applicable)
3. Verify all URLs are accessible
4. Check for consistency across examples

### Schema Testing

**Validate Schemas**:
- Ensure all schemas are valid JSON Schema Draft 7
- Test with example documents
- Check that `$ref` references resolve correctly

### Local Testing for Modules

Run a local HTTP server to test module imports:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server -p 8000 --cors

# Access modules at:
# http://localhost:8000/examples/modules/python-functions.json
```

### Integration Test Scenarios

From `/docs/module-imports.md`:

✅ **Should Pass**:
1. Valid module import
2. Module with overrides
3. Module with excluded sections
4. Module with custom ordering

❌ **Should Fail Gracefully**:
1. Invalid URL (404)
2. Invalid JSON
3. Invalid schema
4. CORS error
5. Network timeout

---

## Version Control

### Versioning Policy

From `CHANGELOG.md`:

- **0.x.x**: Pre-release, may have breaking changes between minors
- **1.0.0+**: Stable, strict semantic versioning

### Changelog Format

Follow [Keep a Changelog](https://keepachangelog.com/):

```markdown
## [0.2.0] - 2025-01-15

### Added
- New feature X
- New schema Y

### Changed
- Updated Z

### Deprecated
- Old feature W

### Removed
- Legacy feature V

### Fixed
- Bug fix U
```

### Backward Compatibility

**Policy** (from CHANGELOG.md):
- v0.2.0 is fully backward compatible with v0.1.0
- All v0.1.0 courses are valid v0.2.0 courses
- Platforms that don't support new features can ignore them gracefully

### Commit Message Convention

Use conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Examples**:
```
feat(modules): add module import support
fix(schema): correct video duration type
docs(implementation): update integration guide
```

---

## Common Tasks

### Task 1: Add a New Content Type

**Steps**:

1. **Create Schema** (`/schema/v1.0/content-types/{type}.schema.json`)
   ```json
   {
     "$schema": "http://json-schema.org/draft-07/schema#",
     "$id": "https://mecs-standard.org/schema/v1.0/content-types/{type}.schema.json",
     "title": "MECS {Type} Content Schema",
     "type": "object",
     "required": [...],
     "properties": {...}
   }
   ```

2. **Update TypeScript Types** (`/schema/typescript/types.ts`)
   - Add interface
   - Add to `SectionContent` union type
   - Add type guard function

3. **Update Python Types** (`/schema/python/mecs_types.py`)

4. **Create Example** (`/examples/course-with-{type}.json`)

5. **Document** (`/docs/content-types.md`)
   - Add section explaining the new type
   - Include usage examples
   - Document all properties

6. **Update Main Docs**
   - Update README.md content types list
   - Update specification.md

7. **Update Changelog** (CHANGELOG.md)

8. **Increment Version** if applicable

### Task 2: Update Documentation

**For Jekyll Site**:

1. Edit markdown file in `/docs`
2. Test locally (if possible): `cd docs && bundle exec jekyll serve`
3. Commit and push (auto-deploys via GitHub Actions)

**For README Updates**:

1. Edit `/README.md`
2. Keep it concise (detailed docs go in `/docs`)
3. Update badges if version changed

### Task 3: Add an Example Course/Module

1. **Create JSON File**
   - `/examples/{descriptive-name}.json`
   - Follow naming conventions
   - Use proper indentation (2 spaces)

2. **Validate**
   - Validate against appropriate schema
   - Check all required fields
   - Verify URLs (if any)

3. **Document**
   - Add description to `/examples/README.md` (if exists)
   - Or create inline comments explaining the example

4. **Test**
   - For modules: Test import functionality
   - Verify all content types render correctly

### Task 4: Bump Version

1. **Update `mecsVersion` in**:
   - All schema files (`/schema/v1.0/*.schema.json`)
   - All example files (`/examples/*.json`)
   - TypeScript types (`/schema/typescript/types.ts`)
   - Documentation files

2. **Update CHANGELOG.md**
   - Add new version section
   - Document all changes
   - Add comparison link

3. **Update README.md**
   - Update version badge
   - Update quick example if needed

4. **Git Tag**
   ```bash
   git tag -a v0.3.0 -m "Release v0.3.0"
   git push origin v0.3.0
   ```

### Task 5: Fix Schema Issues

1. **Identify Issue**
   - Review error reports
   - Test validation

2. **Update Schema**
   - Edit `/schema/v1.0/{type}.schema.json`
   - Fix validation rules

3. **Update Type Definitions**
   - Sync TypeScript types
   - Sync Python types

4. **Test Examples**
   - Re-validate all examples
   - Fix broken examples

5. **Document**
   - Add to CHANGELOG.md
   - Update docs if behavior changed

---

## AI Assistant Guidelines

### When Working with This Repository

#### 1. Always Read Before Writing

- **NEVER propose changes to schemas without reading them first**
- Check existing examples before creating new ones
- Review documentation before updating

#### 2. Maintain Consistency

- **JSON Formatting**: Always use 2-space indentation
- **Naming**: Follow kebab-case for files and IDs
- **Versioning**: Use semantic versioning (X.Y.Z)
- **Namespacing**: Respect `mecs:*` namespace for core types

#### 3. Validate Changes

- **Schemas**: Must be valid JSON Schema Draft 7
- **Examples**: Must validate against schemas
- **URLs**: Check that referenced URLs are accessible
- **Types**: Keep TypeScript/Python types in sync with schemas

#### 4. Documentation

- **Update All Relevant Docs**: Don't just update one file
- **Examples Required**: Always include practical examples
- **Cross-Reference**: Link related documentation
- **Changelog**: Update CHANGELOG.md for user-facing changes

#### 5. Backward Compatibility

- **Pre-1.0**: Breaking changes allowed but should be minimized
- **Post-1.0**: Strict backward compatibility required
- **Migrations**: Provide migration guides for breaking changes
- **Graceful Degradation**: Unknown types should be ignored, not error

#### 6. Schema Design Principles

- **Start Minimal**: Add fields as needed, don't over-engineer
- **Required vs Optional**: Be conservative with required fields
- **Extensibility**: Use `additionalProperties` or `extensions` object
- **Namespacing**: Always namespace custom types

#### 7. Module System (v0.2.0+)

- **URLs Must Be Stable**: Don't change module URLs once published
- **CORS Awareness**: Document CORS requirements for hosting
- **Caching Strategy**: Default to `network-first`
- **Error Handling**: Modules should fail gracefully
- **Security**: Validate and sanitize imported content

#### 8. Example Creation

- **Complete Examples**: Include all major features
- **Realistic Data**: Use plausible course/module content
- **Metadata**: Include rich metadata in examples
- **Comments**: JSON doesn't support comments, use README files
- **Testing**: Provide testing instructions

#### 9. Git Workflow for AI Assistants

- **Branch**: Always work on designated feature branches
- **Commits**: Use conventional commit format
- **Push**: Use `git push -u origin <branch>` for new branches
- **Retry**: Network operations should retry with backoff

#### 10. Don't Assume

- **Check Current State**: Read files to understand current state
- **Verify URLs**: Don't assume URLs work
- **Test Changes**: Validate against schemas
- **Ask Questions**: When ambiguous, ask the user

### Common Mistakes to Avoid

❌ **DON'T**:
- Change `mecsVersion` without updating ALL files
- Add breaking changes to patch versions
- Create examples that don't validate
- Use 4-space or tab indentation in JSON
- Skip updating type definitions when changing schemas
- Forget to update CHANGELOG.md
- Assume backward compatibility without testing
- Use generic IDs like "1", "2", "3"
- Over-engineer simple features
- Add fields without considering extensions

✅ **DO**:
- Read existing files before proposing changes
- Validate all JSON against schemas
- Keep TypeScript/Python types in sync
- Update documentation comprehensively
- Test module imports locally when possible
- Follow semantic versioning strictly
- Provide migration guides for breaking changes
- Use descriptive, semantic identifiers
- Start simple, extend later
- Consider how features compose together

### Understanding Project Maturity

**Current Status**: v0.2.0 (Pre-release)

**What This Means**:
- Core structure is stable but may evolve
- Breaking changes possible but should be minimized
- Focus on getting foundation right before v1.0
- Community feedback is crucial
- Documentation is high priority

**Next Milestones** (from IMPLEMENTATION_ROADMAP.md):
- **Phase 2**: Content & Documentation (2-3 weeks)
- **Phase 3**: Interactive Tools (weeks 4-5)
- **Phase 4**: Community & Ecosystem (weeks 6-8)
- **Phase 5**: Polish & Launch (weeks 9-10)
- **v0.3.0**: Quizzes and assessments
- **v1.0.0**: Stable release

### Quick Reference Commands

```bash
# Validate JSON against schema (conceptual - tool-dependent)
ajv validate -s schema/v1.0/course.schema.json -d examples/intro-to-programming.json

# Run local server for module testing
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
- `.yml/.yaml` - Jekyll config, GitHub Actions

### Special Files

- `_config.yml` - Jekyll site configuration
- `CHANGELOG.md` - Version history (Keep a Changelog format)
- `LICENSE` - CC0 1.0 Universal license
- `README.md` - Main project documentation
- `CLAUDE.md` - This file (AI assistant guide)

---

## Questions or Issues?

When uncertain:

1. **Check existing files** - Search for similar patterns
2. **Read the spec** - `/docs/specification.md` is authoritative
3. **Review examples** - `/examples/` shows real usage
4. **Ask the user** - Don't make assumptions about requirements

**For bugs or feature requests**: Open an issue on GitHub

**For implementation questions**: See `/docs/implementation.md`

**For module system questions**: See `/docs/module-imports.md`

---

*This guide is a living document. Update it as the project evolves.*
