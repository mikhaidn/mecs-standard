# Schema Management

> **MECS Standard Documentation Module**  
> Part 06 of 12 | [← Back to Index](README.md)

---

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

