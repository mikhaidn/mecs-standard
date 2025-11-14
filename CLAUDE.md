# CLAUDE.md - AI Assistant Guide for MECS Standard Repository

## Project Overview

**MECS (Modular Educational Content Standard)** is an open JSON format for structuring educational content (courses, lessons, modules) that works across platforms. It enables content portability and interoperability between different learning management systems and educational platforms.

**Current Version:** 0.2.0 (Draft)
**License:** CC0 1.0 Universal (Public Domain)
**Repository:** https://github.com/mikhaidn/mecs-standard

### Key Principles

- **Simple:** JSON-based format, easy to read and write
- **Portable:** Content works across different platforms
- **Extensible:** Support for custom content types
- **Open:** No vendor lock-in, completely free to use
- **Modular:** Supports reusable modules via URL imports

## Repository Structure

```
mecs-standard/
├── schema/                      # JSON schemas and type definitions
│   ├── v1.0/                    # Version 1.0 schemas
│   │   ├── course.schema.json   # Course structure
│   │   ├── module.schema.json   # Module structure (v0.2.0+)
│   │   ├── section.schema.json  # Section structure
│   │   └── content-types/       # Content type schemas
│   │       ├── text.schema.json
│   │       ├── video.schema.json
│   │       ├── document.schema.json
│   │       └── module-ref.schema.json
│   ├── typescript/              # TypeScript type definitions
│   │   └── types.ts             # Complete TS types with builders
│   ├── python/                  # Python type stubs (future)
│   └── protobuf/                # Protocol buffers (future)
│
├── examples/                    # Sample MECS files
│   ├── intro-to-programming.json
│   ├── course-with-module-import.json
│   └── modules/                 # Standalone modules
│       └── python-functions.json
│
├── docs/                        # Documentation (Jekyll site)
│   ├── specification.md         # Technical specification
│   ├── implementation.md        # Implementation guide
│   ├── content-types.md         # Content type reference
│   ├── module-imports.md        # Module system guide
│   ├── roadmap.md              # Future plans
│   ├── related-standards.md    # Comparison with other standards
│   └── _layouts/               # Jekyll templates
│
├── .github/                    # GitHub configuration
│   └── workflows/              # CI/CD pipelines
│
├── README.md                   # Main project README
├── CHANGELOG.md                # Version history
├── IMPLEMENTATION_ROADMAP.md   # Detailed development plan
├── LICENSE                     # CC0 license
└── CLAUDE.md                   # This file
```

## Core Concepts

### 1. MECS Document Types

#### Course (`mecs:course`)
A complete educational course with metadata and sections.

**Required fields:**
- `mecsVersion`: String (e.g., "0.2.0")
- `type`: "mecs:course"
- `id`: Unique identifier
- `title`: Course title
- `sections`: Array of sections

**Optional fields:**
- `description`: Course description
- `metadata`: CourseMetadata object
- `createdAt`, `updatedAt`: ISO 8601 timestamps
- `assessments`: Quizzes, assignments, exams (future)
- `extensions`: Custom extensions

#### Module (`mecs:module`)
A standalone, reusable collection of sections that can be imported into courses.

**Required fields:**
- `mecsVersion`: String (e.g., "0.2.0")
- `type`: "mecs:module"
- `id`: Unique identifier
- `title`: Module title
- `sections`: Array of sections

**Same optional fields as Course**

### 2. Sections

Sections are the building blocks of courses and modules. Each section has:

**Required fields:**
- `id`: Unique identifier
- `title`: Section title
- `contentType`: Namespaced type (e.g., "mecs:text")
- `content`: Content object (structure varies by type)

**Optional fields:**
- `order`: Display order (number)
- `metadata`: Duration, difficulty, learning objectives, etc.
- `createdAt`, `updatedAt`: ISO 8601 timestamps

### 3. Content Types (v0.2.0)

#### `mecs:text`
Rich text in various formats.
```json
{
  "format": "markdown" | "html" | "plain",
  "text": "Content here..."
}
```

#### `mecs:video`
Video content from various providers.
```json
{
  "url": "https://youtube.com/watch?v=...",
  "provider": "youtube" | "vimeo" | "custom",
  "title": "Optional title",
  "description": "Optional description",
  "duration": 720,  // seconds
  "transcript": "Optional transcript"
}
```

#### `mecs:document`
External documents (PDFs, presentations, etc.).
```json
{
  "url": "https://example.com/doc.pdf",
  "title": "Document Title",
  "docType": "pdf" | "docx" | "pptx" | "xlsx" | "txt",
  "description": "Optional description",
  "fileSize": 2457600,  // bytes
  "pages": 12,
  "downloadable": true
}
```

#### `mecs:module-ref` (NEW in v0.2.0)
Import entire modules from external URLs.
```json
{
  "url": "https://example.com/modules/python-functions.json",
  "title": "Optional override title",
  "description": "Optional override description",
  "cache": {
    "strategy": "always-fetch" | "cache-first" | "network-first",
    "ttl": 3600  // seconds
  },
  "overrides": {
    "metadata": {},
    "sectionOrder": ["sec-1", "sec-3"],  // reorder sections
    "excludeSections": ["sec-2"]  // exclude sections
  }
}
```

### 4. Metadata Objects

#### CourseMetadata / ModuleMetadata
- `author`: Creator name
- `institution`: Educational institution
- `subject`: Subject area
- `level`: "beginner" | "intermediate" | "advanced" | "expert"
- `language`: ISO 639-1 code (e.g., "en", "es")
- `duration`: `{ value: number, unit: "minutes" | "hours" | "days" | "weeks" | "months" }`
- `prerequisites`: Array of prerequisite courses/topics
- `learningObjectives`: Array of learning goals
- `tags`: Array of searchable tags
- `license`: Content license (e.g., "CC-BY-4.0")
- `version`: Content version

#### SectionMetadata
- `duration`: Duration object
- `difficulty`: "easy" | "medium" | "hard"
- `learningObjectives`: Array of objectives
- `keywords`: Array of keywords
- `isOptional`: Boolean
- `prerequisites`: Array of prerequisite sections

## Development Workflows

### Adding a New Content Type

1. **Create JSON Schema** in `schema/v1.0/content-types/{name}.schema.json`
2. **Update TypeScript types** in `schema/typescript/types.ts`:
   - Add interface for the content type
   - Update `SectionContent` union type
   - Add type guard function
3. **Update documentation** in `docs/content-types.md`
4. **Create example** in `examples/` directory
5. **Update CHANGELOG.md** with the new feature
6. **Update version** if needed (minor version bump for new features)

### Updating Schemas

1. **Edit schema file** in `schema/v1.0/`
2. **Update TypeScript types** to match schema changes
3. **Test validation** against example files
4. **Update documentation** if schema changes affect usage
5. **Update examples** if needed
6. **Document in CHANGELOG.md**
7. **Consider versioning impact:**
   - Breaking changes → Major version
   - New features → Minor version
   - Bug fixes → Patch version

### Creating Examples

1. **Create JSON file** in `examples/` or `examples/modules/`
2. **Follow naming convention:** lowercase-with-dashes.json
3. **Include comprehensive metadata** to demonstrate capabilities
4. **Use current mecsVersion** (0.2.0)
5. **Validate against schemas** before committing
6. **Add comments** in accompanying README if complex
7. **Consider diverse use cases:**
   - Different content types
   - Different difficulty levels
   - Different subject areas
   - Module imports (if applicable)

### Updating Documentation

#### Main Documentation Files

- **README.md**: High-level overview, quick start
- **docs/specification.md**: Complete technical reference
- **docs/implementation.md**: Integration guide for developers
- **docs/content-types.md**: Content type reference
- **docs/module-imports.md**: Module system documentation
- **docs/roadmap.md**: Future plans and versions

#### Documentation Website (`docs/`)

The docs directory is a Jekyll site for GitHub Pages:
- **_layouts/**: HTML templates
- **_includes/**: Reusable components (header, footer, sidebar)
- **assets/**: CSS and JavaScript
- **_config.yml**: Jekyll configuration

When updating docs:
1. Edit markdown files directly
2. Test locally with Jekyll if possible
3. Commit changes - GitHub Pages auto-deploys
4. Check live site after deployment

### Version Management

#### Semantic Versioning

MECS follows [semver](https://semver.org/):
- **Major (X.0.0)**: Breaking changes to schema or core concepts
- **Minor (0.X.0)**: New features, backward compatible
- **Patch (0.0.X)**: Bug fixes, clarifications

#### Version Update Checklist

1. **Update version** in all schema files (`mecsVersion`)
2. **Update README.md** version badge and references
3. **Update CHANGELOG.md** with all changes
4. **Update examples** to use new version
5. **Update TypeScript types** version references
6. **Tag release** in git: `git tag v0.X.0`
7. **Create GitHub release** with changelog

### Working with Examples

#### Example File Structure
All examples should be complete, valid MECS documents:
- Use realistic content (not Lorem Ipsum if possible)
- Include comprehensive metadata
- Demonstrate best practices
- Use current mecsVersion

#### Testing Examples
```bash
# Validate JSON syntax
cat examples/intro-to-programming.json | jq .

# More thorough validation would use JSON Schema validator
# (See examples/TESTING.md for details)
```

## Key Conventions

### Naming Conventions

#### Content Type Identifiers
- Format: `namespace:type-name`
- Core types: `mecs:text`, `mecs:video`, `mecs:document`, `mecs:module-ref`
- Custom types: `custom:my-type` or `org.example:my-type`
- Use lowercase with hyphens

#### IDs
- Format: kebab-case or with prefixes (e.g., `sec-001`, `intro-programming-101`)
- Must be unique within their scope
- Descriptive and human-readable

#### File Names
- JSON files: `lowercase-with-dashes.json`
- Schema files: `{name}.schema.json`
- Documentation: `lowercase-with-dashes.md`

### Code Style

#### JSON
- 2-space indentation
- No trailing commas
- Use descriptive property names
- Include optional fields when they add value to examples

#### TypeScript
- Follow types in `schema/typescript/types.ts`
- Use builder classes for complex object construction
- Export all types needed by consumers

#### Markdown
- Use ATX-style headers (`#`, `##`, `###`)
- Code blocks with language identifiers
- Link to other docs using relative paths

### Git Conventions

#### Branch Naming
- Feature: `feature/description`
- Fix: `fix/description`
- Docs: `docs/description`
- Working branch for Claude: `claude/claude-md-{session-id}`

#### Commit Messages
- Use conventional commits format when possible
- Start with verb: "Add", "Update", "Fix", "Remove"
- Be specific and concise
- Reference issues when applicable

#### Examples
```
feat(0.2.0): module via url
Add module import functionality with mecs:module-ref content type

Update to version 0.1.0 and add GitHub links

fix: correct schema validation for duration field
```

## Common Tasks for AI Assistants

### Task: Add New Content Type "mecs:quiz"

1. Create schema file: `schema/v1.0/content-types/quiz.schema.json`
2. Define quiz structure with questions, answers, scoring
3. Update `schema/typescript/types.ts`:
   ```typescript
   export interface QuizContent {
     questions: Question[];
     passingScore?: number;
     timeLimit?: number;  // seconds
     shuffleQuestions?: boolean;
     showFeedback?: boolean;
   }

   export interface Question {
     id: string;
     type: "multiple-choice" | "true-false" | "short-answer";
     question: string;
     options?: string[];  // for multiple choice
     correctAnswer: string | string[];
     explanation?: string;
     points?: number;
   }
   ```
4. Update `SectionContent` union type
5. Add type guard function `isQuizContent()`
6. Create example: `examples/course-with-quiz.json`
7. Document in `docs/content-types.md`
8. Update `CHANGELOG.md`

### Task: Update Schema for New Field

1. Locate schema file (e.g., `schema/v1.0/course.schema.json`)
2. Add new property with appropriate constraints
3. Update TypeScript interface in `schema/typescript/types.ts`
4. Update examples to demonstrate new field
5. Document in `docs/specification.md`
6. Consider backward compatibility
7. Update `CHANGELOG.md`

### Task: Create Comprehensive Example

1. Choose a realistic use case (e.g., "Data Science Course")
2. Create file: `examples/data-science-fundamentals.json`
3. Include:
   - Complete metadata (author, institution, level, etc.)
   - Mix of content types (text, video, document)
   - Varied difficulty levels in sections
   - Realistic learning objectives
   - Appropriate duration estimates
4. Validate structure
5. Consider adding to examples README if complex

### Task: Review and Validate Changes

Before committing changes:

1. **Schema validation:**
   - Ensure JSON is valid
   - Check all required fields present
   - Verify types match specifications

2. **Documentation check:**
   - Update relevant docs
   - Fix broken links
   - Ensure examples work

3. **Version check:**
   - Confirm `mecsVersion` is current
   - Update CHANGELOG if needed
   - Check backward compatibility

4. **File naming:**
   - Follow conventions
   - Use appropriate directories
   - Check for typos

## Technical Details

### TypeScript Type System

The repository includes comprehensive TypeScript types in `schema/typescript/types.ts`:

#### Type Guards
Use these to safely check content types:
```typescript
if (isCourse(doc)) { /* doc is Course */ }
if (isModule(doc)) { /* doc is Module */ }
if (isTextContent(content)) { /* content is TextContent */ }
if (isVideoContent(content)) { /* content is VideoContent */ }
```

#### Builder Pattern
Use builders for creating valid documents:
```typescript
const course = new CourseBuilder("course-id", "Course Title")
  .withDescription("A great course")
  .withMetadata({ author: "Dr. Smith", level: "beginner" })
  .addSection(section1)
  .addSection(section2)
  .build();
```

#### Utility Types
- `PartialCourse`: Course with only required fields mandatory
- `PartialModule`: Module with only required fields mandatory
- `MECSDocument`: Union of Course | Module
- `ContentType`: Union of all content type strings

### JSON Schema Validation

All schemas follow JSON Schema Draft 7:
- Located in `schema/v1.0/`
- Use `$ref` for composition
- Include descriptions and examples
- Define constraints (minLength, pattern, enum, etc.)

Schema URLs (when published):
- Base: `https://mecs-standard.org/schema/v1.0/`
- Course: `https://mecs-standard.org/schema/v1.0/course.schema.json`
- Module: `https://mecs-standard.org/schema/v1.0/module.schema.json`

### Module Import System (v0.2.0)

The module system allows importing external content:

1. **Define standalone module:**
   ```json
   {
     "mecsVersion": "0.2.0",
     "type": "mecs:module",
     "id": "python-functions",
     "title": "Python Functions",
     "sections": [...]
   }
   ```

2. **Host module:** Upload JSON to web server, CDN, or GitHub

3. **Import in course:**
   ```json
   {
     "title": "Functions Section",
     "contentType": "mecs:module-ref",
     "content": {
       "url": "https://example.com/modules/python-functions.json"
     }
   }
   ```

4. **Platform unfurls module:** Fetches URL and expands sections into course

**Benefits:**
- Share content across courses
- Update once, reflected everywhere
- Multi-institution collaboration
- Modular, composable curricula

## Testing and Validation

### Manual Validation

```bash
# Validate JSON syntax
jq empty examples/intro-to-programming.json

# Pretty print
jq . examples/intro-to-programming.json

# Check specific field
jq '.mecsVersion' examples/*.json
```

### Schema Validation (Future)

The roadmap includes building:
- Online validator tool
- CLI validation tool
- Pre-commit hooks for validation

## Documentation Standards

### Writing Documentation

1. **Be clear and concise**: Avoid jargon when possible
2. **Use examples**: Show, don't just tell
3. **Structure logically**: Use headers, lists, code blocks
4. **Link appropriately**: Cross-reference related docs
5. **Keep updated**: Update docs when code changes

### Documentation Types

- **README.md**: Quick overview, getting started
- **specification.md**: Technical reference, complete spec
- **implementation.md**: How to integrate MECS
- **content-types.md**: Reference for each content type
- **CHANGELOG.md**: Version history, changes
- **IMPLEMENTATION_ROADMAP.md**: Future plans, progress

## Future Roadmap

### Version 0.3.0 (Planned)
- Quiz and assessment content types
- Interactive content support
- Enhanced validation tools

### Version 1.0.0 (Future)
- Stable API
- Complete documentation
- Multiple platform implementations
- Assessment features
- Analytics metadata

See `IMPLEMENTATION_ROADMAP.md` for detailed plans.

## Important Notes for AI Assistants

### Do's

✅ **Validate all changes** against schemas before committing
✅ **Update documentation** when changing functionality
✅ **Follow semantic versioning** strictly
✅ **Create comprehensive examples** for new features
✅ **Maintain backward compatibility** when possible
✅ **Use TypeScript types** as source of truth for structure
✅ **Test examples** to ensure they're valid
✅ **Update CHANGELOG.md** for all notable changes
✅ **Consider accessibility** and internationalization
✅ **Link to relevant documentation** in code and examples

### Don'ts

❌ **Don't break backward compatibility** without major version bump
❌ **Don't skip updating TypeScript types** when changing schemas
❌ **Don't create examples with invalid structure**
❌ **Don't use "lorem ipsum"** in examples - use realistic content
❌ **Don't forget to update mecsVersion** in all relevant files
❌ **Don't add features without documentation**
❌ **Don't commit without validating JSON syntax**
❌ **Don't create new namespaces** without discussion
❌ **Don't modify schemas** without understanding impact
❌ **Don't merge breaking changes** without proper versioning

### When in Doubt

1. Check existing examples for patterns
2. Refer to `docs/specification.md` for technical details
3. Review `CHANGELOG.md` for historical context
4. Look at `IMPLEMENTATION_ROADMAP.md` for future direction
5. Follow TypeScript types as definitive structure
6. Maintain consistency with existing code and docs

## Quick Reference

### Current Version
- **MECS Version:** 0.2.0
- **Status:** Draft / Pre-release
- **Schema Version:** v1.0

### Content Types
- `mecs:text` - Text content (markdown, HTML, plain)
- `mecs:video` - Video content (YouTube, Vimeo, custom)
- `mecs:document` - Documents (PDF, DOCX, PPTX, etc.)
- `mecs:module-ref` - Module imports (NEW in v0.2.0)

### Document Types
- `mecs:course` - Complete course
- `mecs:module` - Reusable module (NEW in v0.2.0)

### Key Files
- `README.md` - Start here
- `docs/specification.md` - Technical spec
- `schema/typescript/types.ts` - Type definitions
- `examples/intro-to-programming.json` - Reference example
- `CHANGELOG.md` - Version history

### Resources
- **GitHub:** https://github.com/mikhaidn/mecs-standard
- **License:** CC0 1.0 Universal (Public Domain)
- **Documentation:** https://mikhaidn.github.io/mecs-standard (planned)

---

**Last Updated:** 2025-01-15
**MECS Version:** 0.2.0
**For:** AI Assistants (Claude, GPT, etc.)
