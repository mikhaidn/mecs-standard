# MECS Implementation Guide

How to add MECS support to your educational platform.

## Overview

Implementing MECS means your app can:
- Import courses from other MECS platforms
- Export courses that work elsewhere
- Join the MECS ecosystem

## Basic Implementation

### 1. Parse MECS JSON

```javascript
const course = JSON.parse(courseJson);

// Validate
if (course.mecsVersion && course.type === 'mecs:course') {
  // It's a MECS course!
}
```

### 2. Map Content Types

```javascript
const typeMapping = {
  'mecs:text': 'your-text-component',
  'mecs:video': 'your-video-component',
  'mecs:document': 'your-doc-component'
};

function renderSection(section) {
  const component = typeMapping[section.contentType];
  return component.render(section.content);
}
```

### 3. Export to MECS

```javascript
function exportToMECS(internalCourse) {
  return {
    mecsVersion: '0.1.0',
    type: 'mecs:course',
    id: internalCourse.id,
    title: internalCourse.title,
    sections: internalCourse.sections.map(s => ({
      id: s.id,
      title: s.title,
      contentType: mapToMECSType(s.type),
      content: s.data
    }))
  };
}
```

## Adapter Pattern

We recommend using an adapter to convert between formats:

```javascript
class MECSAdapter {
  toMECS(internal) { /* ... */ }
  fromMECS(mecs) { /* ... */ }
}
```

See [Course Builder's implementation](https://github.com/mikhaidn/course-builder/blob/main/services/mecsAdapter.js) as an example.

## Validation

Use JSON Schema to validate:

```javascript
import Ajv from 'ajv';

const ajv = new Ajv();
const schema = await fetch('https://github.com/mikhaidn/mecs-standard/schema/v1.0/course.schema.json');
const validate = ajv.compile(schema);

if (validate(courseData)) {
  // Valid!
} else {
  console.error(validate.errors);
}
```

## Custom Content Types

Use namespaced types for custom content:

```javascript
{
  "contentType": "myapp:interactive-quiz",
  "content": {
    // Your custom structure
  }
}
```

## Tips

1. **Support both directions** - Import and export
2. **Handle unknown types** - Gracefully skip or warn
3. **Validate on import** - Check structure before processing
4. **Test with examples** - Use example courses from this repo

## Reference Implementation

See [Course Builder](https://github.com/mikhaidn/course-builder) for a complete working example in JavaScript.

## Questions?

Open an issue on the [mecs-standard repo](https://github.com/mikhaidn/mecs-standard/issues).
