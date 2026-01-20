# MECS Portability & Refactoring Guide

> **TL;DR**: Your MECS implementation is **highly portable** and **easy to refactor**. JSON Schema serves as a single source of truth that can generate types for any language.

## Why You Won't Get Lost

### 1. **JSON Schema is Your Foundation**

Your current JSON Schema files are language-agnostic specifications:
- `course.schema.json`
- `module.schema.json`
- `section.schema.json`
- Content type schemas

These schemas serve as the **single source of truth** that can:
✅ Generate TypeScript interfaces
✅ Generate Python dataclasses
✅ Generate Protocol Buffers
✅ Generate Java classes
✅ Generate Go structs
✅ Generate C# classes

**You only maintain the schemas once, everything else is generated.**

### 2. **The Data Structure is Simple**

MECS has a clean hierarchy:
```
Course/Module
  └─ Sections[]
      └─ Content (Text, Video, Document, ModuleRef)
```

This is easy to map to ANY language's type system because:
- No circular dependencies
- Clear parent-child relationships
- Well-defined data types
- Optional vs required is explicit

### 3. **We've Already Proven It**

I've created three formats from your existing schemas:

#### Protocol Buffers (`schema/protobuf/mecs.proto`)
- Works with: Go, Java, C++, Python, Ruby, C#, etc.
- Binary serialization (smaller, faster)
- Strong typing
- gRPC service definitions included

#### TypeScript (`schema/typescript/types.ts`)
- Full type safety
- Type guards for runtime checks
- Builder pattern included
- Works with JavaScript/Node.js

#### Python (`schema/python/mecs_types.py`)
- Uses dataclasses (Python 3.7+)
- Type hints for IDE support
- Enums for constrained values
- Builder pattern included
- Works with Pydantic, FastAPI, Django

## Refactoring Strategy

### Phase 1: Keep JSON as Primary Format

**Current:**
```
JSON Schemas (source of truth)
     ↓
JSON Files (human-readable, widely supported)
```

**Advantages:**
- Human-readable
- Works everywhere (browsers, servers, mobile)
- Easy debugging
- Great tooling (validators, formatters)
- GitHub displays it nicely

### Phase 2: Add Generated Types (No Breaking Changes)

```
JSON Schemas
     ↓
  ┌──┴──────────┬─────────────┬──────────┐
  ↓             ↓             ↓          ↓
JSON      TypeScript      Python     Protobuf
(primary)   (web/node)   (backend)   (services)
```

**Each language can:**
1. Parse JSON into typed objects
2. Validate against schemas
3. Serialize back to JSON
4. Optionally use binary formats (protobuf)

### Phase 3: Multi-Format Support (Future)

```
MECS Content
     ↓
  ┌──┴──────────┬─────────────┬──────────┐
  ↓             ↓             ↓          ↓
JSON       Protobuf       YAML       TOML
```

All formats represent the same data model.

## Language-Specific Type Mapping

### From JSON Schema → Language Types

| JSON Schema Type | TypeScript | Python | Protocol Buffer | Java | Go |
|-----------------|------------|--------|-----------------|------|-----|
| `string` | `string` | `str` | `string` | `String` | `string` |
| `number` | `number` | `float` | `double` | `Double` | `float64` |
| `integer` | `number` | `int` | `int32/int64` | `Integer` | `int` |
| `boolean` | `boolean` | `bool` | `bool` | `Boolean` | `bool` |
| `array` | `Array<T>` | `List[T]` | `repeated T` | `List<T>` | `[]T` |
| `object` | `{ [key: string]: T }` | `Dict[str, T]` | `map<string, T>` | `Map<String, T>` | `map[string]T` |
| `enum` | `type` union | `Enum` | `enum` | `enum` | custom type |
| `null` | `null` | `None` | - | `null` | `nil` |

**Key Insight:** These mappings are mechanical and can be automated with codegen tools.

## Codegen Tools Available

### JSON Schema → TypeScript
```bash
npm install -g json-schema-to-typescript
json2ts -i schema/v1.0/course.schema.json -o types/course.ts
```

### JSON Schema → Python
```bash
pip install datamodel-code-generator
datamodel-codegen --input schema/v1.0/course.schema.json --output mecs_types.py
```

### JSON Schema → Go
```bash
go install github.com/atombender/go-jsonschema@latest
go-jsonschema -p mecs schema/v1.0/course.schema.json
```

### JSON Schema → Java
```bash
jsonschema2pojo -s schema/v1.0 -t src/main/java -p org.mecs
```

### Protobuf → Many Languages
```bash
# Generate Go
protoc --go_out=. mecs.proto

# Generate Python
protoc --python_out=. mecs.proto

# Generate Java
protoc --java_out=. mecs.proto

# Generate TypeScript
protoc --plugin=protoc-gen-ts --ts_out=. mecs.proto
```

## Example: Converting Between Formats

### JSON → TypeScript (Runtime)

```typescript
import { Course } from './types';

// Parse JSON
const jsonString = '{"mecsVersion": "0.2.0", ...}';
const course: Course = JSON.parse(jsonString);

// Type-safe access
course.sections.forEach(section => {
  console.log(section.title); // TypeScript knows this exists
});

// Serialize back to JSON
const json = JSON.stringify(course);
```

### JSON → Python (Runtime)

```python
from mecs_types import Course, Section, TextContent
import json

# Parse JSON
with open('course.json') as f:
    data = json.load(f)

# Convert to typed object
course = Course(**data)

# Type-safe access
for section in course.sections:
    print(section.title)

# Serialize back to JSON
json_str = json.dumps(course.__dict__)
```

### JSON → Protocol Buffers

```python
import json
from mecs_pb2 import Course

# Parse JSON
with open('course.json') as f:
    data = json.load(f)

# Convert to protobuf
course = Course()
# Map JSON fields to protobuf fields
course.mecs_version = data['mecsVersion']
course.id = data['id']
# ... etc

# Serialize to binary
binary_data = course.SerializeToString()

# Much smaller than JSON!
# Can send over gRPC
```

## What If You Need to Change the Schema?

### Scenario: Add a new field to Course

**Step 1:** Update JSON Schema
```json
{
  "properties": {
    "estimatedHours": {
      "type": "number",
      "description": "Estimated hours to complete"
    }
  }
}
```

**Step 2:** Regenerate types (automated)
```bash
# Run codegen
npm run generate-types
```

**Step 3:** All types updated automatically
- TypeScript: `estimatedHours?: number`
- Python: `estimated_hours: Optional[float]`
- Protobuf: `double estimated_hours = 15;`

**Step 4:** Old data still works (backward compatible)
Since it's optional, existing courses don't break.

### Scenario: Rename a field

**Use the migration approach:**

1. Add new field (optional)
2. Support both old and new for 1-2 versions
3. Mark old field as deprecated
4. Remove old field in next major version

**Example:**
```json
{
  "properties": {
    "contentType": {
      "type": "string",
      "description": "Type of content",
      "deprecated": true
    },
    "type": {
      "type": "string",
      "description": "Type of content (replaces contentType)"
    }
  }
}
```

Migration code:
```typescript
// Support both old and new
const type = section.type || section.contentType;
```

## Benefits of This Approach

### ✅ Single Source of Truth
- JSON Schema is the spec
- Everything else is generated
- No drift between languages

### ✅ Type Safety Everywhere
- TypeScript: Compile-time errors
- Python: Runtime type hints + mypy
- Protobuf: Strongly typed binary

### ✅ Easy Refactoring
- Change schema once
- Regenerate all types
- Compiler/linter catches issues

### ✅ Multi-Language Support
- Each platform uses native types
- No "stringly typed" code
- IDE autocomplete works

### ✅ Performance Options
- JSON for human-readable
- Protobuf for performance
- Both represent same data

### ✅ Validation Built-In
- JSON Schema validators
- Protobuf validators
- Language-specific validators

## Real-World Example: Adding a Quiz Content Type

### Step 1: Define in JSON Schema

```json
{
  "$id": "https://mecs-standard.org/schema/v1.0/content-types/quiz.schema.json",
  "title": "MECS Quiz Content Type",
  "type": "object",
  "required": ["questions"],
  "properties": {
    "questions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "question": { "type": "string" },
          "options": { "type": "array", "items": { "type": "string" } },
          "correctAnswer": { "type": "integer" }
        }
      }
    },
    "passingScore": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    }
  }
}
```

### Step 2: Regenerate Types

**TypeScript (auto-generated):**
```typescript
interface QuizContent {
  questions: Question[];
  passingScore?: number;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}
```

**Python (auto-generated):**
```python
@dataclass
class Question:
    question: str
    options: List[str]
    correct_answer: int

@dataclass
class QuizContent:
    questions: List[Question]
    passing_score: Optional[float] = None
```

**Protobuf (manually add once):**
```protobuf
message QuizContent {
  repeated Question questions = 1;
  optional double passing_score = 2;
}

message Question {
  string question = 1;
  repeated string options = 2;
  int32 correct_answer = 3;
}
```

### Step 3: Use in Your Code

**TypeScript:**
```typescript
const section: Section = {
  id: "quiz-001",
  title: "Python Basics Quiz",
  contentType: "mecs:quiz",
  content: {
    questions: [
      {
        question: "What is Python?",
        options: ["A snake", "A language", "A framework"],
        correctAnswer: 1
      }
    ],
    passingScore: 70
  }
};
```

**Python:**
```python
section = Section(
    id="quiz-001",
    title="Python Basics Quiz",
    content_type="mecs:quiz",
    content=QuizContent(
        questions=[
            Question(
                question="What is Python?",
                options=["A snake", "A language", "A framework"],
                correct_answer=1
            )
        ],
        passing_score=70
    )
)
```

**Both serialize to the same JSON!**

## Migration Path for Existing Code

If you have existing code parsing JSON manually:

### Before (Untyped)
```typescript
const course = JSON.parse(jsonString);
console.log(course.title); // No type safety
console.log(course.titel); // Typo, no error!
```

### After (Typed)
```typescript
import { Course } from './types';

const course: Course = JSON.parse(jsonString);
console.log(course.title); // Type-safe
console.log(course.titel); // Compile error! ✅
```

**The JSON format didn't change, you just added types on top.**

## Tooling Ecosystem

### Validators
- **JSON Schema**: Ajv, json-schema, jsonschema
- **TypeScript**: Built-in compiler
- **Python**: Pydantic, marshmallow
- **Protobuf**: Built-in validation

### Editors/IDEs
- **VS Code**: JSON Schema validation, autocomplete
- **IntelliJ**: JSON Schema support
- **PyCharm**: Type hints support
- **All**: Protocol Buffer plugin support

### Build Tools
- **JavaScript**: Can automate codegen in package.json scripts
- **Python**: Can use setup.py or poetry scripts
- **Make**: Can create Makefile for codegen
- **GitHub Actions**: Can auto-generate on commit

## Recommended Workflow

```bash
# 1. Edit JSON Schema (single source of truth)
vim schema/v1.0/course.schema.json

# 2. Regenerate all types
make generate-types

# This runs:
# - json2ts for TypeScript
# - datamodel-codegen for Python
# - protoc for Protocol Buffers
# - Any other language you support

# 3. Commit both schema and generated types
git add schema/ types/
git commit -m "Add estimatedHours field"

# 4. All implementations get updated types
npm install @mecs/types@latest  # TypeScript
pip install mecs-types==0.3.0   # Python
```

## Summary: You're Safe!

### Why You Won't Get Lost

1. **JSON Schema is portable** - works everywhere
2. **Structure is simple** - easy to understand and map
3. **Codegen is automated** - not manual work
4. **Types are optional** - JSON still works
5. **We've proven it works** - 3 languages already implemented

### The Refactoring Process

```
Current:
  JSON files → Manual parsing → Hope for the best

Better:
  JSON files → Typed objects → Compile-time safety

Best:
  JSON Schema → Generate types → Parse → Type-safe → Validate
```

### You Can Always Fall Back to JSON

If a language doesn't have good tooling:
- Parse JSON manually
- Still follows the schema
- Still validates
- Just no type safety (which is fine!)

**Your MECS standard is well-architected and highly portable. Don't worry about getting lost – the JSON Schema foundation gives you flexibility to adapt to any platform or language in the future.**
