# MECS Content Types

## Core Types (v0.1.0)

### mecs:text

Rich text content in multiple formats.

**Required fields:**
- `format`: "markdown", "html", or "plain"
- `text`: The actual text content

**Example:**
```json
{
  "contentType": "mecs:text",
  "content": {
    "format": "markdown",
    "text": "# Hello\n\nThis is **markdown**!"
  }
}
```

**Schema:** [text.schema.json](../schema/v1.0/content-types/text.schema.json)

---

### mecs:video

Video content from various sources.

**Required fields:**
- `url`: Video URL

**Optional fields:**
- `provider`: "youtube", "vimeo", "direct", "other"
- `title`: Video title
- `description`: Video description

**Example:**
```json
{
  "contentType": "mecs:video",
  "content": {
    "url": "https://youtube.com/watch?v=abc123",
    "provider": "youtube",
    "title": "Introduction Video"
  }
}
```

**Schema:** [video.schema.json](../schema/v1.0/content-types/video.schema.json)

---

### mecs:document

External document references.

**Required fields:**
- `url`: Document URL
- `title`: Document title

**Optional fields:**
- `docType`: "pdf", "presentation", "word", etc.
- `description`: Document description

**Example:**
```json
{
  "contentType": "mecs:document",
  "content": {
    "url": "https://example.com/syllabus.pdf",
    "title": "Course Syllabus",
    "docType": "pdf"
  }
}
```

**Schema:** [document.schema.json](../schema/v1.0/content-types/document.schema.json)

---

## Custom Content Types

Create your own types using namespaces:

```json
{
  "contentType": "myapp:interactive",
  "content": {
    // Your custom structure
  }
}
```

**Namespace patterns:**
- `mecs:*` - Reserved for standard
- `custom:*` - Experimental types
- `org.domain:*` - Organization-specific

## Planned Types (Future)

- `mecs:quiz` - Interactive quizzes
- `mecs:assignment` - Homework/projects
- `mecs:discussion` - Discussion threads
- `mecs:interactive` - Simulations/labs

## See Also

- [Full specification](specification.md)
- [JSON Schemas](../schema/v1.0/)
