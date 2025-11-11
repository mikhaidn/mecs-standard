# Module Imports Guide

> New in MECS v0.2.0

## Overview

Module imports allow you to create reusable educational content that can be shared across multiple courses. Think of modules as standalone learning units that can be hosted anywhere and imported via URL.

## Key Concepts

### Module vs Course vs Section

- **Section**: A single piece of content (text, video, document, etc.)
- **Module**: A collection of sections that form a cohesive learning unit
- **Course**: A complete learning experience that can include sections AND imported modules

### The Unfurling Process

When a platform encounters a `mecs:module-ref` section, it should:

1. **Fetch** the module JSON from the URL
2. **Validate** against the module schema
3. **Unfurl** by inserting the module's sections into the course
4. **Apply** any overrides specified in the module-ref
5. **Cache** according to the caching strategy (optional)

## Creating a Standalone Module

A module is a JSON file with the `mecs:module` type:

```json
{
  "mecsVersion": "0.2.0",
  "type": "mecs:module",
  "id": "unique-module-id",
  "title": "Module Title",
  "description": "What this module covers",
  "metadata": {
    "author": "Content Creator",
    "level": "beginner",
    "duration": {
      "value": 2,
      "unit": "hours"
    },
    "learningObjectives": [
      "Objective 1",
      "Objective 2"
    ],
    "tags": ["topic1", "topic2"],
    "license": "CC-BY-4.0"
  },
  "sections": [
    {
      "id": "sec-001",
      "title": "First Section",
      "contentType": "mecs:text",
      "content": { ... }
    },
    {
      "id": "sec-002",
      "title": "Second Section",
      "contentType": "mecs:video",
      "content": { ... }
    }
  ]
}
```

## Hosting a Module

Modules can be hosted anywhere as static JSON files:

### Option 1: GitHub Raw Content

```
https://raw.githubusercontent.com/username/repo/main/modules/my-module.json
```

### Option 2: GitHub Pages

```
https://username.github.io/repo/modules/my-module.json
```

### Option 3: CDN or Static Hosting

- Netlify: `https://site.netlify.app/modules/my-module.json`
- Vercel: `https://site.vercel.app/modules/my-module.json`
- AWS S3: `https://bucket.s3.region.amazonaws.com/my-module.json`
- Any web server: `https://example.com/path/to/module.json`

### CORS Considerations

If hosting on a different domain, ensure CORS headers are configured:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
```

## Importing a Module

Add a section with `contentType: "mecs:module-ref"` to your course:

```json
{
  "id": "imported-module",
  "title": "Module Title",
  "order": 2,
  "contentType": "mecs:module-ref",
  "content": {
    "url": "https://example.com/modules/my-module.json"
  },
  "metadata": {
    "duration": {
      "value": 2,
      "unit": "hours"
    }
  }
}
```

### Basic Import

Minimal import with just the URL:

```json
{
  "contentType": "mecs:module-ref",
  "content": {
    "url": "https://example.com/modules/python-basics.json"
  }
}
```

### Import with Caching

Control how the module is fetched and cached:

```json
{
  "contentType": "mecs:module-ref",
  "content": {
    "url": "https://example.com/modules/python-basics.json",
    "cache": {
      "strategy": "network-first",
      "ttl": 3600
    }
  }
}
```

**Cache Strategies:**
- `always-fetch`: Always fetch fresh content (use for frequently updated modules)
- `cache-first`: Use cached version if available (use for stable content)
- `network-first`: Try network, fall back to cache (recommended default)

**TTL (Time To Live):**
- Specified in seconds
- How long to keep cached content before refetching

### Import with Overrides

Customize the imported module:

```json
{
  "contentType": "mecs:module-ref",
  "content": {
    "url": "https://example.com/modules/python-basics.json",
    "title": "Custom Title Override",
    "description": "Custom description",
    "overrides": {
      "metadata": {
        "level": "intermediate"
      },
      "excludeSections": ["sec-001", "sec-005"],
      "sectionOrder": ["sec-003", "sec-002", "sec-004"]
    }
  }
}
```

**Override Options:**
- `title`: Override module title
- `description`: Override module description
- `metadata`: Merge/override metadata fields
- `excludeSections`: Array of section IDs to skip
- `sectionOrder`: Custom ordering of sections (by ID)

## Implementation Guide for Platforms

### 1. Detection

When processing a course, check for sections with `contentType: "mecs:module-ref"`:

```javascript
if (section.contentType === 'mecs:module-ref') {
  await unfurlModule(section);
}
```

### 2. Fetching

Fetch the module JSON from the URL:

```javascript
async function fetchModule(url, cacheStrategy = 'network-first') {
  // Check cache first if strategy allows
  if (cacheStrategy === 'cache-first') {
    const cached = await getFromCache(url);
    if (cached) return cached;
  }

  // Fetch from network
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const module = await response.json();

    // Cache the result
    await saveToCache(url, module);
    return module;
  } catch (error) {
    // Fall back to cache if network fails
    if (cacheStrategy === 'network-first') {
      const cached = await getFromCache(url);
      if (cached) return cached;
    }
    throw error;
  }
}
```

### 3. Validation

Validate the fetched module against the schema:

```javascript
import Ajv from 'ajv';
import moduleSchema from 'mecs-standard/schema/v1.0/module.schema.json';

const ajv = new Ajv();
const validate = ajv.compile(moduleSchema);

if (!validate(module)) {
  throw new Error('Invalid module: ' + JSON.stringify(validate.errors));
}
```

### 4. Unfurling

Replace the module-ref section with the module's sections:

```javascript
function unfurlModule(course, moduleRefSection, fetchedModule) {
  const { overrides } = moduleRefSection.content;

  // Apply overrides
  let sections = [...fetchedModule.sections];

  // Exclude sections
  if (overrides?.excludeSections) {
    sections = sections.filter(s =>
      !overrides.excludeSections.includes(s.id)
    );
  }

  // Reorder sections
  if (overrides?.sectionOrder) {
    const ordered = [];
    for (const id of overrides.sectionOrder) {
      const section = sections.find(s => s.id === id);
      if (section) ordered.push(section);
    }
    sections = ordered;
  }

  // Insert sections into course
  const insertIndex = course.sections.indexOf(moduleRefSection);
  course.sections.splice(insertIndex, 1, ...sections);

  return course;
}
```

### 5. Error Handling

Handle common errors gracefully:

```javascript
try {
  const module = await fetchModule(url);
  unfurlModule(course, section, module);
} catch (error) {
  // Option 1: Show error state to user
  section.error = {
    message: 'Failed to load module',
    details: error.message
  };

  // Option 2: Use fallback content
  section.contentType = 'mecs:text';
  section.content = {
    format: 'markdown',
    text: '⚠️ This module could not be loaded.'
  };

  // Option 3: Skip the section entirely
  course.sections = course.sections.filter(s => s.id !== section.id);
}
```

## Use Cases

### 1. Shared Curriculum

Multiple courses can import the same foundational modules:

```
Course A (Python for Data Science)
  → Import: Python Basics module
  → Import: Python Functions module
  → Custom: Data Science sections

Course B (Python for Web Development)
  → Import: Python Basics module
  → Import: Python Functions module
  → Custom: Web Development sections
```

### 2. Third-Party Content

Import modules created by other educators:

```
Your Course
  → Your sections
  → Import: "MIT OpenCourseWare - Linear Algebra Basics"
  → Your sections
```

### 3. Modular Updates

Update content in one place, reflected everywhere:

```
python-basics.json (updated once)
  ↓
  Used in 10 different courses
  ↓
  All courses get the update
```

### 4. Multi-Institution Collaboration

Universities can share standard modules:

```
University A hosts: calculus-101.json
University B imports it in their engineering course
University C imports it in their physics course
```

## Best Practices

### For Module Creators

1. **Keep modules focused** - One topic per module
2. **Version your modules** - Use semantic versioning in metadata
3. **Use stable URLs** - Don't change URLs once published
4. **Include metadata** - Helps users discover and understand your module
5. **License clearly** - Specify license in metadata
6. **Test independently** - Ensure module works standalone

### For Course Creators

1. **Cache wisely** - Use appropriate cache strategy
2. **Handle failures** - Plan for when modules can't be loaded
3. **Respect licenses** - Check module licenses before importing
4. **Document imports** - Note which sections are imported
5. **Test offline** - Ensure course works if module URLs fail
6. **Version lock** - Consider saving a local copy for stability

### For Platform Developers

1. **Validate schemas** - Check both course and module schemas
2. **Cache intelligently** - Respect TTL and cache strategies
3. **Handle CORS** - Support cross-origin module loading
4. **Show origin** - Indicate when content is imported
5. **Enable overrides** - Support all override options
6. **Provide fallbacks** - Graceful degradation when imports fail

## Security Considerations

### Content Trust

- **Verify sources** - Only import from trusted URLs
- **Check licenses** - Ensure you have rights to use the content
- **Sandbox execution** - If modules support interactive content, sandbox it

### XSS Prevention

- **Sanitize content** - Even from imported modules
- **Validate schemas** - Don't trust external data blindly
- **CSP headers** - Use Content Security Policy

### Privacy

- **Third-party tracking** - Be aware modules might include tracking
- **Data collection** - Modules might collect user data
- **Inform users** - Let them know content is imported

## Examples

See the [examples/modules/](../examples/modules/) directory for:
- `python-functions.json` - Complete module example
- `course-with-module-import.json` - Course importing a remote module
- `course-with-local-module.json` - Course with local module for testing

## Schema Reference

- [module.schema.json](../schema/v1.0/module.schema.json) - Module schema
- [module-ref.schema.json](../schema/v1.0/content-types/module-ref.schema.json) - Module reference content type

## Migration from v0.1.0

If you have existing v0.1.0 courses:

1. Update `mecsVersion` to `"0.2.0"`
2. No breaking changes - all v0.1.0 content still works
3. Optionally refactor repeated content into importable modules

## Testing

### Local Testing

Run a local HTTP server to test module imports:

```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server package)
npx http-server -p 8000 --cors
```

Then use `http://localhost:8000/examples/modules/python-functions.json` as your module URL.

### Integration Testing

Test your implementation with these scenarios:

1. ✅ Valid module import
2. ✅ Module with overrides
3. ✅ Module with excluded sections
4. ✅ Module with custom ordering
5. ❌ Invalid URL (404)
6. ❌ Invalid JSON
7. ❌ Invalid schema
8. ❌ CORS error
9. ❌ Network timeout

## Questions?

- Open an issue on GitHub
- Check the [Implementation Guide](implementation.md)
- Review [examples](../examples/)
