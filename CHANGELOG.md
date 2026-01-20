# Changelog

All notable changes to the MECS standard will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-01-15

### Added

- **Module Imports**: New `mecs:module` type for standalone, reusable educational modules
- **Module References**: New `mecs:module-ref` content type to import external modules via URL
- Module schema (`schema/v1.0/module.schema.json`)
- Module reference content type schema (`schema/v1.0/content-types/module-ref.schema.json`)
- Comprehensive module imports documentation (`docs/module-imports.md`)
- Example standalone module (`examples/modules/python-functions.json`)
- Example course with module import (`examples/course-with-module-import.json`)
- Example course with local module for testing (`examples/course-with-local-module.json`)
- Module hosting guide (`examples/modules/README.md`)

### Changed

- Updated `mecsVersion` to `0.2.0` in schemas and examples
- Updated README.md with module import examples and documentation
- Updated roadmap: v0.2.0 is now current, v0.3.0 will focus on quizzes/assessments

### Features in Detail

#### Module System

Modules are self-contained collections of sections that can be:
- Hosted anywhere as static JSON files (GitHub, CDN, web server)
- Imported into multiple courses via URL
- Cached with configurable strategies
- Customized with overrides (exclude sections, reorder, override metadata)
- "Unfurled" into courses (like how video URLs unfurl into players)

#### Use Cases

- Share curriculum across multiple courses
- Import third-party educational content
- Update content in one place, reflected everywhere
- Enable multi-institution collaboration
- Create modular, composable learning experiences

## [0.1.0] - 2025-01-01

### Added

- Initial MECS specification
- Course schema (`schema/v1.0/course.schema.json`)
- Section schema (`schema/v1.0/section.schema.json`)
- Content type schemas:
  - Text (`mecs:text`)
  - Video (`mecs:video`)
  - Document (`mecs:document`)
- Example course (`examples/intro-to-programming.json`)
- Core documentation:
  - Specification (`docs/specification.md`)
  - Implementation guide (`docs/implementation.md`)
  - Content types guide (`docs/content-types.md`)
  - Related standards comparison (`docs/related-standards.md`)
- README with quick start guide
- CC0 license

### Core Concepts

- JSON-based format for educational content
- Modular, portable, extensible structure
- Platform-agnostic design
- Open standard with no vendor lock-in

---

## Versioning Policy

MECS follows semantic versioning:

- **Major version (X.0.0)**: Breaking changes to schema or core concepts
- **Minor version (0.X.0)**: New features, backward compatible
- **Patch version (0.0.X)**: Bug fixes, clarifications, backward compatible

### Backward Compatibility

- v0.2.0 is fully backward compatible with v0.1.0
- All v0.1.0 courses are valid v0.2.0 courses
- Platforms that don't support modules can ignore `mecs:module-ref` sections

[0.2.0]: https://github.com/mikhaidn/mecs-standard/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/mikhaidn/mecs-standard/releases/tag/v0.1.0
