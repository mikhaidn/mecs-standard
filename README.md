# MECS: Modular Educational Content Standard

**Version:** 1.0.0
**Status:** Draft
**License:** CC0 1.0 Universal (Public Domain)

## Overview

MECS (Modular Educational Content Standard) is an open, JSON-based specification for creating, sharing, and managing educational content in a platform-agnostic way.

### Goals

- 🔌 **Interoperable**: Content works across different learning platforms
- 📦 **Modular**: Reusable sections with well-defined content types
- 🎯 **Extensible**: Easy to add new content types and metadata
- 🌐 **Open**: Community-driven, vendor-neutral standard
- 🚀 **Modern**: Built for web-first, mobile-friendly experiences

## Quick Example

```json
{
  "mecsVersion": "1.0.0",
  "type": "mecs:course",
  "id": "intro-to-programming",
  "title": "Introduction to Programming",
  "metadata": {
    "author": "Jane Smith",
    "level": "beginner",
    "language": "en",
    "license": "CC-BY-4.0"
  },
  "sections": [
    {
      "id": "sec-001",
      "title": "What is Programming?",
      "contentType": "mecs:text",
      "content": {
        "format": "markdown",
        "text": "# Programming\n\nProgramming is..."
      }
    },
    {
      "id": "sec-002",
      "title": "First Steps Video",
      "contentType": "mecs:video",
      "content": {
        "url": "https://youtube.com/watch?v=...",
        "provider": "youtube"
      }
    }
  ]
}
```

## Features

### Core Content Types (v1.0)
- **mecs:text** - Rich text content (Markdown, HTML)
- **mecs:video** - Video content (YouTube, Vimeo, direct links)
- **mecs:document** - Document references (PDFs, slides, etc.)

### Planned Content Types (Future)
- **mecs:quiz** - Interactive quizzes and assessments
- **mecs:assignment** - Homework and projects
- **mecs:discussion** - Threaded discussions
- **mecs:interactive** - Simulations and interactive content
- **mecs:assessment** - Formal assessments with rubrics

### Key Features
- **Namespaced Types**: Avoid conflicts with `namespace:type` pattern
- **Rich Metadata**: Learning objectives, difficulty, duration, prerequisites
- **Version Control**: Built-in versioning and migration paths
- **Extensions**: Custom fields and content types supported
- **Validation**: JSON Schema for all types

## Documentation

- [📖 Specification](docs/specification.md) - Complete standard reference
- [🔧 Implementation Guide](docs/implementation-guide.md) - How to implement MECS
- [🎨 Extension Guide](docs/extension-guide.md) - Creating custom content types
- [📊 Examples](examples/) - Sample courses and content

## Implementations

### Reference Implementations
- [Course Builder](https://github.com/yourusername/course-builder) - Web-based course creation tool (JavaScript)

### Community Implementations
*Your implementation here! Create a PR to add it.*

## Related & Alternative Standards

MECS learns from and complements existing educational standards:

### Learning Content Standards

#### IMS Global Standards
- **[IMS Common Cartridge](https://www.imsglobal.org/cc/)** - Packaging and distribution of digital learning materials
  - *Relationship*: MECS courses could be packaged as Common Cartridge for LMS import
  - *Difference*: MECS is lighter-weight, JSON-based, web-first

- **[IMS Learning Tools Interoperability (LTI)](https://www.imsglobal.org/activity/learning-tools-interoperability)** - Integration protocol for learning tools
  - *Relationship*: MECS content could be delivered via LTI tools
  - *Difference*: LTI is about tool integration, MECS is about content structure

- **[IMS Question & Test Interoperability (QTI)](https://www.imsglobal.org/question/)** - Assessment and test content
  - *Relationship*: `mecs:quiz` and `mecs:assessment` inspired by QTI
  - *Difference*: MECS aims for simpler, more developer-friendly JSON format

- **[IMS Caliper Analytics](https://www.imsglobal.org/activity/caliper)** - Learning analytics and measurement
  - *Relationship*: MECS metadata designed to support Caliper events
  - *Difference*: Complementary - Caliper tracks learning, MECS structures content

#### SCORM Family
- **[SCORM (Sharable Content Object Reference Model)](https://scorm.com/scorm-explained/)** - E-learning content packaging
  - *Relationship*: MECS could export to SCORM for legacy LMS compatibility
  - *Difference*: SCORM is XML-based and complex; MECS is JSON and simpler

- **[xAPI (Experience API / Tin Can API)](https://xapi.com/)** - Learning activity tracking
  - *Relationship*: MECS metadata aligns with xAPI statements
  - *Difference*: xAPI tracks "experiences," MECS structures content

#### Schema.org
- **[schema.org/Course](https://schema.org/Course)** - Structured data for courses
  - *Relationship*: MECS metadata maps to Schema.org for SEO
  - *Difference*: Schema.org is for web markup, MECS is full course structure

- **[schema.org/LearningResource](https://schema.org/LearningResource)** - Educational resources
  - *Relationship*: Compatible metadata fields
  - *Difference*: MECS provides deeper content structure

### Open Educational Resources

#### OER Standards
- **[OER Commons](https://www.oercommons.org/)** - Open educational resource repository
  - *Relationship*: MECS courses are OER-friendly with license fields
  - *Difference*: OER Commons is a platform, MECS is a standard

- **[Learning Object Metadata (LOM)](https://en.wikipedia.org/wiki/Learning_object_metadata)** - IEEE standard for learning objects
  - *Relationship*: MECS metadata inspired by LOM concepts
  - *Difference*: MECS is more modern, JSON-based, extensible

### Content Packaging
- **[EPUB](https://www.w3.org/publishing/epub/)** - Digital publication format
  - *Relationship*: MECS courses could be exported as interactive EPUB
  - *Difference*: EPUB for books, MECS for structured learning

- **[Web Package](https://github.com/WICG/webpackage)** - Bundling web content
  - *Relationship*: Future MECS distribution format
  - *Difference*: Complementary technologies

### Other Educational Formats
- **[H5P](https://h5p.org/)** - Interactive content creation
  - *Relationship*: H5P content could be a `mecs:interactive` type
  - *Difference*: H5P focuses on interactives, MECS on course structure

- **[Open edX](https://open.edx.org/)** - MOOC platform
  - *Relationship*: Could import/export MECS format
  - *Difference*: edX is a platform, MECS is a portable standard

- **[Canvas Commons](https://community.canvaslms.com/t5/Canvas-Commons/ct-p/commons)** - Course content sharing
  - *Relationship*: Could use MECS as interchange format
  - *Difference*: Platform-specific vs. platform-agnostic

## Why MECS?

### Problems MECS Solves

1. **Vendor Lock-in**: Content trapped in proprietary formats
2. **Complex Standards**: Existing standards (SCORM, QTI) are XML-heavy and complex
3. **Limited Interoperability**: Courses don't easily move between platforms
4. **Modern Development**: Need for JSON-based, developer-friendly format
5. **Modularity**: Reusing content across courses is difficult

### MECS Approach

- ✅ **Simple**: JSON-based, easy to read and write
- ✅ **Modern**: Built for web APIs and modern development
- ✅ **Extensible**: Custom types via namespaces
- ✅ **Practical**: Solves real problems today
- ✅ **Open**: Community-driven evolution

## Getting Started

### For Content Creators
1. Use a MECS-compatible tool like [Course Builder](https://github.com/yourusername/course-builder)
2. Export your courses in MECS format
3. Share on any platform that supports MECS

### For Developers
1. Read the [Specification](docs/specification.md)
2. Check out [Examples](examples/)
3. Use the [JavaScript validator](validators/javascript/)
4. Implement import/export in your platform

### For Platform Developers
1. Review [Implementation Guide](docs/implementation-guide.md)
2. Add MECS import/export to your LMS/platform
3. Submit your implementation for listing

## Contributing

We welcome contributions!

- **Issues**: Report bugs or suggest features
- **Pull Requests**: Improve schemas, docs, or examples
- **Implementations**: Build MECS-compatible tools
- **Feedback**: Share your experience using MECS

### Governance

MECS is community-driven. Major changes go through:
1. Proposal via GitHub Issue
2. Community discussion
3. Draft implementation
4. Vote by maintainers
5. Version release

## Versioning

MECS uses [Semantic Versioning](https://semver.org/):
- **Major**: Breaking changes (2.0.0)
- **Minor**: New features, backward compatible (1.1.0)
- **Patch**: Bug fixes (1.0.1)

Current version: **1.0.0-draft**

## License

- **Specification**: CC0 1.0 Universal (Public Domain)
- **Code Examples**: MIT License
- **Schemas**: CC0 1.0 Universal

## Roadmap

### v1.0.0 (Current - Draft)
- ✅ Core course structure
- ✅ Basic content types (text, video, document)
- ✅ Metadata schema
- ✅ JSON Schema validation
- 🔄 Reference implementation
- 🔄 Specification document

### v1.1.0 (Planned)
- Assessment types (quiz, assignment)
- Discussion/collaboration types
- Analytics metadata
- Accessibility requirements

### v2.0.0 (Future)
- Learning pathways
- Adaptive content
- Real-time collaboration
- Advanced analytics

## Community

- **GitHub**: [github.com/yourusername/mecs-standard](https://github.com/yourusername/mecs-standard)
- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Report bugs or request features

## Citation

If you use MECS in research or publications:

```bibtex
@misc{mecs2025,
  title={MECS: Modular Educational Content Standard},
  author={MECS Contributors},
  year={2025},
  url={https://github.com/yourusername/mecs-standard},
  version={1.0.0}
}
```

---

**Built with ❤️ by the education technology community**

*MECS is not affiliated with any specific platform or vendor. It's an open standard for everyone.*
