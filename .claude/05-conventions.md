# File Conventions

> **MECS Standard Documentation Module**  
> Part 05 of 12 | [← Back to Index](README.md)

---

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
