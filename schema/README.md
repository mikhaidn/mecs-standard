# MECS Schemas

This directory contains schema definitions for the Modular Educational Content Standard (MECS) in multiple formats.

## Directory Structure

```
schema/
├── v1.0/                    # JSON Schema (source of truth)
│   ├── course.schema.json
│   ├── module.schema.json
│   ├── section.schema.json
│   └── content-types/
│       ├── text.schema.json
│       ├── video.schema.json
│       ├── document.schema.json
│       └── module-ref.schema.json
├── typescript/              # TypeScript type definitions
│   └── types.ts
├── python/                  # Python dataclasses
│   └── mecs_types.py
└── protobuf/               # Protocol Buffer definitions
    └── mecs.proto
```

## Schema Formats

### JSON Schema (Primary)

**Location:** `v1.0/*.schema.json`

**Purpose:**
- Single source of truth
- Validation
- Documentation generation
- Type generation

**Usage:**
```javascript
// JavaScript/Node.js
const Ajv = require('ajv');
const ajv = new Ajv();
const validate = ajv.compile(require('./v1.0/course.schema.json'));
const valid = validate(courseData);
```

```python
# Python
import jsonschema
import json

with open('v1.0/course.schema.json') as f:
    schema = json.load(f)

jsonschema.validate(course_data, schema)
```

### TypeScript Types

**Location:** `typescript/types.ts`

**Purpose:**
- Type safety in TypeScript/JavaScript
- IDE autocomplete
- Compile-time validation

**Usage:**
```typescript
import { Course, Module, Section } from '@mecs/types';

const course: Course = {
  mecsVersion: "0.2.0",
  type: "mecs:course",
  id: "my-course",
  title: "My Course",
  sections: []
};
```

**Installation:**
```bash
npm install @mecs/types
# Or copy types.ts to your project
```

### Python Dataclasses

**Location:** `python/mecs_types.py`

**Purpose:**
- Type hints for Python
- Runtime validation
- IDE support

**Usage:**
```python
from mecs_types import Course, CourseBuilder, TextContent

# Using builder pattern
course = (
    CourseBuilder("my-course", "My Course")
    .with_description("A great course")
    .add_section(...)
    .build()
)

# Or directly
course = Course(
    mecs_version="0.2.0",
    type="mecs:course",
    id="my-course",
    title="My Course",
    sections=[]
)
```

**Installation:**
```bash
pip install mecs-types
# Or copy mecs_types.py to your project
```

### Protocol Buffers

**Location:** `protobuf/mecs.proto`

**Purpose:**
- Binary serialization (smaller, faster)
- gRPC service definitions
- Multi-language support (Go, Java, C++, etc.)

**Usage:**

Generate code:
```bash
# Python
protoc --python_out=. mecs.proto

# Go
protoc --go_out=. mecs.proto

# Java
protoc --java_out=. mecs.proto
```

Use generated code:
```python
from mecs_pb2 import Course, Section

course = Course()
course.mecs_version = "0.2.0"
course.type = "mecs:course"
course.id = "my-course"
course.title = "My Course"

# Serialize to binary
binary = course.SerializeToString()

# Much smaller than JSON!
```

## Which Format Should I Use?

### Use JSON Schema if:
- ✅ You need validation
- ✅ You want human-readable format
- ✅ You're building web applications
- ✅ You need maximum compatibility

### Use TypeScript if:
- ✅ You're building with TypeScript/JavaScript
- ✅ You want compile-time type checking
- ✅ You need IDE autocomplete

### Use Python Dataclasses if:
- ✅ You're building with Python
- ✅ You want type hints
- ✅ You're using FastAPI, Pydantic, or similar

### Use Protocol Buffers if:
- ✅ You need high performance
- ✅ You're building microservices
- ✅ You're using gRPC
- ✅ You need binary serialization

**You can mix and match!** All formats represent the same data model.

## Converting Between Formats

### JSON → TypeScript (Runtime)
```typescript
const course: Course = JSON.parse(jsonString);
```

### JSON → Python (Runtime)
```python
course = Course(**json.loads(json_string))
```

### JSON → Protocol Buffers
```python
from google.protobuf import json_format
course = json_format.Parse(json_string, Course())
```

### Protocol Buffers → JSON
```python
from google.protobuf import json_format
json_string = json_format.MessageToJson(course)
```

## Generating Types from JSON Schema

You don't need to manually maintain types in multiple languages. Use codegen tools:

### TypeScript
```bash
npm install -g json-schema-to-typescript
json2ts -i v1.0/course.schema.json -o typescript/course.ts
```

### Python
```bash
pip install datamodel-code-generator
datamodel-codegen --input v1.0/course.schema.json --output python/mecs_types.py
```

### Go
```bash
go install github.com/atombender/go-jsonschema@latest
go-jsonschema -p mecs v1.0/course.schema.json
```

## Validation

### Validate JSON against Schema

**JavaScript:**
```javascript
const Ajv = require('ajv');
const ajv = new Ajv();
const validate = ajv.compile(courseSchema);

if (!validate(courseData)) {
  console.error(validate.errors);
}
```

**Python:**
```python
import jsonschema

try:
    jsonschema.validate(course_data, course_schema)
except jsonschema.ValidationError as e:
    print(f"Validation error: {e.message}")
```

**Online:**
Visit https://mecs-standard.org/resources/tools/ for online validation.

## Schema Versioning

Schemas are versioned with the standard:
- **v0.1.0** - Initial release
- **v0.2.0** - Module imports (current)
- **v0.3.0** - Future: Quizzes and assessments

Old schemas are kept for backward compatibility:
```
schema/
├── v1.0/  (current: 0.2.0)
├── v0.1/  (archived)
└── v2.0/  (future)
```

## Extending MECS

### Add Custom Content Type

1. **Create schema:**
```json
{
  "$id": "https://yourdomain.com/mecs-extension/interactive.schema.json",
  "type": "object",
  "properties": {
    "simulationUrl": { "type": "string" },
    "interactionType": { "type": "string" }
  }
}
```

2. **Use custom namespace:**
```json
{
  "contentType": "yourcompany:interactive",
  "content": {
    "simulationUrl": "https://...",
    "interactionType": "drag-and-drop"
  }
}
```

3. **Add to TypeScript types:**
```typescript
interface InteractiveContent {
  simulationUrl: string;
  interactionType: string;
}

type CustomContent = SectionContent | InteractiveContent;
```

## Best Practices

### For Library Developers

1. **Start with JSON Schema** - It's the source of truth
2. **Generate types** - Don't maintain them manually
3. **Validate input** - Use schema validators
4. **Support multiple formats** - Let users choose
5. **Version carefully** - Use semantic versioning

### For Platform Developers

1. **Validate on ingest** - Catch errors early
2. **Store as JSON** - Most compatible
3. **Use types internally** - Better DX
4. **Cache parsed objects** - Better performance
5. **Handle extensions gracefully** - Forward compatibility

### For Content Creators

1. **Use JSON** - Most tools support it
2. **Validate before publishing** - Use online tools
3. **Version your content** - Track changes
4. **License clearly** - Specify in metadata
5. **Test imports** - Especially for modules

## Contributing

To add a new language binding:

1. Create directory: `schema/<language>/`
2. Generate types from JSON Schema
3. Add examples and usage docs
4. Submit PR

Languages we'd love to see:
- [ ] Java
- [ ] C#/.NET
- [ ] Go
- [ ] Rust
- [ ] Swift
- [ ] Kotlin
- [ ] Ruby
- [ ] PHP

## Resources

- [JSON Schema Specification](https://json-schema.org/)
- [Protocol Buffers](https://developers.google.com/protocol-buffers)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Python Type Hints](https://docs.python.org/3/library/typing.html)
- [MECS Documentation](https://mecs-standard.org/docs/)

## Support

- **Issues**: [GitHub Issues](https://github.com/mikhaidn/mecs-standard/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mikhaidn/mecs-standard/discussions)
- **Documentation**: [mecs-standard.org](https://mecs-standard.org)

---

**All schemas are released under CC0 1.0 Universal (Public Domain)**
