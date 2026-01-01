# Development Workflows

> **MECS Standard Documentation Module**  
> Part 04 of 12 | [← Back to Index](README.md)

---


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
