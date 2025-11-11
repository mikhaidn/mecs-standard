# Testing MECS Module Imports

This directory contains examples demonstrating the module import feature added in MECS v0.2.0.

## Quick Start

### 1. Start Local Server

From the `examples` directory, run a local HTTP server:

```bash
# Python 3
python3 -m http.server 8000

# OR Node.js (requires http-server package)
npx http-server -p 8000 --cors
```

### 2. Open Demo

Open your browser to:
```
http://localhost:8000/demo.html
```

### 3. Test Module Import

Click the "Load Course & Unfurl Modules" button to see:
- Original course structure (with module-ref)
- Fetched module content
- Unfurled course (module sections expanded inline)

## Example Files

### Standalone Module
- **`modules/python-functions.json`** - A complete module with 5 sections about Python functions
  - Can be hosted anywhere (GitHub, CDN, web server)
  - Can be imported into multiple courses
  - URL: `http://localhost:8000/modules/python-functions.json`

### Courses Using Modules

1. **`course-with-local-module.json`** - Simple test course
   - Uses relative path: `./modules/python-functions.json`
   - Good for local testing

2. **`course-with-module-import.json`** - Complete production example
   - Uses remote URL (update with your actual URL)
   - Shows caching options
   - Demonstrates full course structure

### Interactive Demo
- **`demo.html`** - Live demo showing module unfurling
  - Visual representation of before/after
  - Shows the unfurling process
  - Highlights imported sections

## Testing Scenarios

### Test 1: Local Module Import

```bash
# 1. Start server
python3 -m http.server 8000

# 2. Fetch course
curl http://localhost:8000/course-with-local-module.json

# 3. Fetch module it references
curl http://localhost:8000/modules/python-functions.json

# 4. Verify both are valid JSON
```

### Test 2: Module Validation

Validate the module against the schema:

```bash
# Install a JSON schema validator (if not already installed)
npm install -g ajv-cli

# Validate module
ajv validate -s ../schema/v1.0/module.schema.json -d modules/python-functions.json
```

### Test 3: Course Validation

Validate the course against the schema:

```bash
ajv validate -s ../schema/v1.0/course.schema.json -d course-with-local-module.json
```

### Test 4: CORS Testing

Test cross-origin requests (important for remote modules):

```bash
# Start server with CORS enabled
npx http-server -p 8000 --cors

# Test from browser console on a different origin
fetch('http://localhost:8000/modules/python-functions.json')
  .then(r => r.json())
  .then(console.log)
```

## Unfurling Logic Example

Here's how a MECS platform should process module imports:

```javascript
async function unfurlCourse(course) {
  for (let i = 0; i < course.sections.length; i++) {
    const section = course.sections[i];

    if (section.contentType === 'mecs:module-ref') {
      // 1. Fetch module
      const response = await fetch(section.content.url);
      const module = await response.json();

      // 2. Validate type
      if (module.type !== 'mecs:module') {
        throw new Error('Invalid module type');
      }

      // 3. Apply overrides (if any)
      let sections = module.sections;
      if (section.content.overrides?.excludeSections) {
        sections = sections.filter(s =>
          !section.content.overrides.excludeSections.includes(s.id)
        );
      }

      // 4. Replace module-ref with module sections
      course.sections.splice(i, 1, ...sections);

      // 5. Adjust index (we just replaced 1 section with N sections)
      i += sections.length - 1;
    }
  }

  return course;
}
```

## Expected Results

### Before Unfurling
```
Course: "Python Course (Local Module Test)"
  1. Introduction (mecs:text)
  2. Python Functions Module (mecs:module-ref)
     → References: ./modules/python-functions.json
```

### After Unfurling
```
Course: "Python Course (Local Module Test)"
  1. Introduction (mecs:text)
  2. Introduction to Functions (mecs:text) [imported]
  3. Function Parameters (mecs:video) [imported]
  4. Return Values (mecs:text) [imported]
  5. Function Scope (mecs:text) [imported]
  6. Practice Exercises (mecs:document) [imported]
```

## GitHub Pages Testing

To test with real hosted modules:

1. Fork the mecs-standard repo
2. Enable GitHub Pages in Settings
3. Update `course-with-module-import.json` URL to:
   ```
   https://YOUR_USERNAME.github.io/mecs-standard/examples/modules/python-functions.json
   ```
4. Load the course in your MECS-compatible platform

## Common Issues

### CORS Errors
**Problem:** Module fetch fails with CORS error
**Solution:** Ensure your server has CORS headers enabled:
```
Access-Control-Allow-Origin: *
```

### Module Not Found (404)
**Problem:** Module URL returns 404
**Solution:** Check the URL path is correct, verify file exists

### Invalid Module Schema
**Problem:** Module doesn't validate
**Solution:** Ensure module has:
- `type: "mecs:module"`
- `mecsVersion: "0.2.0"`
- All required fields (id, title, sections)

### Sections Not Unfurling
**Problem:** Module-ref section stays as-is
**Solution:** Verify your platform implements unfurling logic

## Integration Testing

For platforms implementing MECS v0.2.0:

### Test Cases

✅ **TC1**: Load course with module-ref, verify it fetches module
✅ **TC2**: Verify module sections replace module-ref section
✅ **TC3**: Test with excludeSections override
✅ **TC4**: Test with sectionOrder override
✅ **TC5**: Test with metadata override
✅ **TC6**: Test caching strategy: always-fetch
✅ **TC7**: Test caching strategy: cache-first
✅ **TC8**: Test caching strategy: network-first
✅ **TC9**: Handle 404 error gracefully
✅ **TC10**: Handle invalid JSON gracefully
✅ **TC11**: Handle invalid schema gracefully
✅ **TC12**: Handle CORS error gracefully
✅ **TC13**: Handle network timeout gracefully

### Example Test Suite (JavaScript)

```javascript
describe('MECS Module Import', () => {
  test('should fetch and unfurl module', async () => {
    const course = await loadCourse('./course-with-local-module.json');
    expect(course.sections).toHaveLength(2); // Before unfurl

    const unfurled = await unfurlModules(course);
    expect(unfurled.sections).toHaveLength(6); // After unfurl
  });

  test('should exclude sections when specified', async () => {
    const moduleRef = {
      contentType: 'mecs:module-ref',
      content: {
        url: './modules/python-functions.json',
        overrides: {
          excludeSections: ['func-001', 'func-005']
        }
      }
    };

    const module = await fetchModule(moduleRef.content.url);
    expect(module.sections).toHaveLength(5);

    const filtered = applyOverrides(module, moduleRef.content.overrides);
    expect(filtered.sections).toHaveLength(3);
  });
});
```

## Performance Considerations

### Caching Strategy

- **always-fetch**: Good for frequently updated content, but slower
- **cache-first**: Fast but might show stale content
- **network-first**: Balanced approach (recommended)

### Example with TTL

```json
{
  "contentType": "mecs:module-ref",
  "content": {
    "url": "https://example.com/module.json",
    "cache": {
      "strategy": "network-first",
      "ttl": 3600
    }
  }
}
```

This will:
1. Try to fetch from network
2. If network fails, use cache
3. Cache for 1 hour (3600 seconds)

## Next Steps

1. **Try the demo**: Open `demo.html` in your browser
2. **Inspect the code**: See how unfurling works
3. **Create your own module**: Copy `python-functions.json` as template
4. **Test import**: Reference your module in a course
5. **Deploy**: Host your module on GitHub Pages or a CDN

## Resources

- [Module Import Documentation](../docs/module-imports.md)
- [Module Schema](../schema/v1.0/module.schema.json)
- [Module-Ref Schema](../schema/v1.0/content-types/module-ref.schema.json)
- [MECS Specification](../docs/specification.md)

## Questions?

Open an issue on GitHub: https://github.com/mikhaidn/mecs-standard/issues
