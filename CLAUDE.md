# CLAUDE.md - AI Assistant Quick Start

> **MECS Standard Repository Guide**
> Last Updated: 2026-01-01 | MECS Version: 0.2.0

## 🚀 Quick Start (2-Minute Overview)

**MECS** is an open JSON standard for portable educational content (courses, lessons, modules).

- **Current Version**: 0.2.0 (pre-release)
- **License**: CC0 1.0 (Public Domain)
- **Repository**: https://github.com/mikhaidn/mecs-standard
- **Tech Stack**: JSON schemas, TypeScript/Python types, Jekyll docs

### What You Need to Know

1. **JSON-first**: All content is JSON with strict schemas
2. **Modular**: Courses → Modules → Sections → Content
3. **Portable**: Works across platforms (no vendor lock-in)
4. **Extensible**: Custom content types via namespacing

### Project Status

- ✅ **v0.1.0**: Basic course structure
- ✅ **v0.2.0**: Module imports via URL (current)
- 🔜 **v0.3.0**: Quizzes & assessments
- 🎯 **v1.0.0**: Stable release

---

## 📚 Documentation Modules

**Full documentation is split into 12 focused modules** (each <200 lines) in [`.claude/`](.claude/):

### Start Here (5 min read)
1. **[Project Overview](.claude/01-overview.md)** - Goals, version history
2. **[AI Guidelines](.claude/11-ai-guidelines.md)** - Best practices for AI assistants

### Core Reference (15 min)
3. **[Repository Structure](.claude/02-structure.md)** - Directory tree, file organization
4. **[Core Concepts](.claude/03-concepts.md)** - Courses, modules, sections, content types
5. **[Quick Reference](.claude/12-quick-reference.md)** - Commands, tables, lookups

### Development (20 min)
6. **[Workflows](.claude/04-workflows.md)** - Git practices, making changes
7. **[File Conventions](.claude/05-conventions.md)** - Naming, formatting, versioning
8. **[Common Tasks](.claude/10-tasks.md)** - Step-by-step guides

### Technical Deep Dive (30 min)
9. **[Schema Management](.claude/06-schemas.md)** - JSON schemas, validation, types
10. **[Testing](.claude/08-testing.md)** - Validation, testing procedures
11. **[Version Control](.claude/09-versioning.md)** - Changelog, semver, compatibility
12. **[Documentation](.claude/07-documentation.md)** - Jekyll site, writing style

📖 **[Browse all modules](.claude/README.md)**

---

## 🎯 Common Scenarios

### "I'm making my first change"
1. Read: [Workflows](.claude/04-workflows.md) + [Conventions](.claude/05-conventions.md)
2. Check: [Common Tasks](.claude/10-tasks.md)
3. Follow: [AI Guidelines](.claude/11-ai-guidelines.md)

### "I need to update a schema"
1. Read: [Schema Management](.claude/06-schemas.md)
2. Check: [Testing](.claude/08-testing.md)
3. Update: Schema + TypeScript/Python types + Examples + Docs

### "I'm adding new documentation"
1. Read: [Documentation](.claude/07-documentation.md)
2. Check: [Structure](.claude/02-structure.md) for file locations
3. Follow: Jekyll conventions, update relevant indexes

### "I need quick info"
1. Check: [Quick Reference](.claude/12-quick-reference.md)
2. Or grep: `grep -r "keyword" .claude/`

---

## 📂 Repository At-a-Glance

```
mecs-standard/
├── .claude/              # AI documentation modules (YOU ARE HERE)
├── docs/                 # Jekyll documentation website
│   ├── specification.md      # Authoritative spec
│   ├── module-imports.md     # Module system (v0.2.0)
│   └── implementation.md     # Integration guide
├── examples/             # Sample MECS files
│   ├── intro-to-programming.json
│   └── modules/              # Standalone modules
├── schema/               # JSON schemas + types
│   ├── v1.0/                 # Schemas
│   ├── typescript/types.ts   # TS definitions
│   └── python/mecs_types.py  # Python types
├── CHANGELOG.md          # Version history
└── README.md             # Main project docs
```

**Essential Files**:
- `/docs/specification.md` - Technical spec (authoritative)
- `/schema/v1.0/*.schema.json` - JSON schemas
- `/examples/*.json` - Reference implementations
- `/CHANGELOG.md` - What's new in each version

---

## ⚡ Quick Commands

```bash
# Validate JSON against schema
ajv validate -s schema/v1.0/course.schema.json -d examples/course.json

# Test module imports locally
python -m http.server 8000  # Then: http://localhost:8000/examples/modules/

# Run Jekyll site locally
cd docs && bundle exec jekyll serve

# Find all MECS files
find . -name "*.json" -not -path "./.git/*"

# Check version consistency
grep -r "mecsVersion" examples/
```

---

## 🚦 Before You Start

### ✅ DO
- **Read first**: Check existing files before proposing changes
- **Validate always**: Test against JSON schemas
- **Update all**: Schemas → Types → Examples → Docs
- **Follow conventions**: 2-space JSON indent, kebab-case names
- **Sync types**: Keep TypeScript/Python in sync with schemas

### ❌ DON'T
- Change `mecsVersion` without updating ALL files
- Skip schema validation
- Forget to update CHANGELOG.md
- Use 4-space or tabs in JSON
- Break backward compatibility (pre-1.0)

---

## 🤖 AI Assistant Critical Rules

### 1. Always Read Before Writing
**NEVER** propose changes without reading the target file first.

### 2. Maintain Consistency
- **JSON**: 2 spaces, kebab-case IDs
- **Schemas**: JSON Schema Draft 7
- **Versioning**: Semantic versioning (X.Y.Z)

### 3. Keep Types in Sync
When changing schemas:
1. Update `.schema.json` file
2. Update `typescript/types.ts`
3. Update `python/mecs_types.py`
4. Update examples
5. Update documentation

### 4. Test Everything
- Validate JSON against schemas
- Test module imports if applicable
- Check that examples still work
- Verify documentation builds

### 5. Document Changes
- Update `CHANGELOG.md`
- Update relevant docs
- Add examples if new feature
- Cross-reference related files

**Full guidelines**: [AI Guidelines](.claude/11-ai-guidelines.md)

---

## 📋 Content Type Quick Ref

| Type | Purpose | Schema |
|------|---------|--------|
| `mecs:text` | Rich text (markdown/html) | [text.schema.json](schema/v1.0/content-types/text.schema.json) |
| `mecs:video` | Video content | [video.schema.json](schema/v1.0/content-types/video.schema.json) |
| `mecs:document` | PDF, DOCX, etc. | [document.schema.json](schema/v1.0/content-types/document.schema.json) |
| `mecs:module-ref` | Import external module | [module-ref.schema.json](schema/v1.0/content-types/module-ref.schema.json) |

**Custom types**: Use namespaced format like `myapp:quiz` or `org.example:interactive`

---

## 🔍 Find More Info

- **Question about schemas?** → [Schema Management](.claude/06-schemas.md)
- **Need to add content type?** → [Common Tasks](.claude/10-tasks.md#task-1-add-a-new-content-type)
- **Module system questions?** → `/docs/module-imports.md`
- **Version/release questions?** → [Version Control](.claude/09-versioning.md)
- **Git workflow questions?** → [Workflows](.claude/04-workflows.md)

---

## 📞 Getting Help

1. **Search modules**: `grep -r "keyword" .claude/`
2. **Check examples**: `/examples/` directory
3. **Read the spec**: `/docs/specification.md`
4. **Ask the user**: When uncertain, ask!

---

## 🎓 Learning Path

### Beginner (30 min)
1. [Overview](.claude/01-overview.md) - Understand the project
2. [Core Concepts](.claude/03-concepts.md) - Learn the terminology
3. [AI Guidelines](.claude/11-ai-guidelines.md) - Best practices

### Intermediate (1 hour)
4. [Structure](.claude/02-structure.md) - Navigate the codebase
5. [Workflows](.claude/04-workflows.md) - Development process
6. [Common Tasks](.claude/10-tasks.md) - Practical guides

### Advanced (2 hours)
7. [Schemas](.claude/06-schemas.md) - Deep dive into validation
8. [Testing](.claude/08-testing.md) - Quality assurance
9. Read `/docs/specification.md` - Complete technical spec

---

**Ready to contribute?** Start with [AI Guidelines](.claude/11-ai-guidelines.md) then pick a task from [Common Tasks](.claude/10-tasks.md)!

*This guide is modular by design. Each section in `.claude/` is <200 lines for faster loading. Load only what you need.*
