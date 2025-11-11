# MECS Specification v0.1.0

Complete technical specification for the Modular Educational Content Standard.

## Overview

MECS defines a JSON-based format for educational content with:
- Course-level metadata
- Modular sections
- Namespaced content types
- Extensibility points

## Course Structure

### Required Fields
- `mecsVersion` (string) - Standard version (e.g., "0.1.0")
- `type` (string) - Must be "mecs:course"
- `id` (string) - Unique identifier
- `title` (string) - Course title
- `sections` (array) - Course sections

### Optional Fields
- `description` (string) - Course description
- `metadata` (object) - Course metadata
- `createdAt` (string) - ISO 8601 timestamp
- `updatedAt` (string) - ISO 8601 timestamp

## Section Structure

### Required Fields
- `id` (string) - Unique identifier
- `title` (string) - Section title
- `contentType` (string) - Namespaced type (e.g., "mecs:text")
- `content` (object) - Content data (structure varies by type)

### Optional Fields
- `order` (number) - Display order
- `metadata` (object) - Section metadata
- `createdAt` (string) - ISO 8601 timestamp
- `updatedAt` (string) - ISO 8601 timestamp

## Content Types

### mecs:text
Rich text content in various formats.

```json
{
  "format": "markdown" | "html" | "plain",
  "text": "string"
}
```

### mecs:video
Video content from various sources.

```json
{
  "url": "string (required)",
  "provider": "youtube" | "vimeo" | "direct" | "other",
  "title": "string",
  "description": "string"
}
```

### mecs:document
External document references.

```json
{
  "url": "string (required)",
  "title": "string (required)",
  "docType": "pdf" | "presentation" | "spreadsheet" | "word" | "other",
  "description": "string"
}
```

## Metadata

### Course Metadata
- `author` - Creator name
- `institution` - Educational institution
- `subject` - Subject area
- `level` - "beginner" | "intermediate" | "advanced" | "expert"
- `language` - ISO 639-1 code (e.g., "en", "es")
- `duration` - Estimated completion time
- `prerequisites` - Array of prerequisite courses/topics
- `learningObjectives` - Array of learning goals
- `tags` - Array of searchable tags
- `license` - Content license (e.g., "CC-BY-4.0")

## Namespacing

Content types use namespaces to avoid conflicts:
- `mecs:*` - Core standard types
- `custom:*` - Custom/experimental types
- `org.example:*` - Organization-specific types

## Validation

All MECS documents should validate against the JSON Schema in `/schema/v1.0/`.

## Version Compatibility

- **0.x.x** - Pre-release, may have breaking changes
- **1.0.0+** - Stable, follows semantic versioning

## Extensions

Future extensions planned:
- Assessment types
- Discussion forums
- Analytics metadata
- Accessibility requirements

See [JSON Schema](../schema/v1.0/) for complete validation rules.
