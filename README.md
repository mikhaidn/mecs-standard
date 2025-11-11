# MECS: Modular Educational Content Standard

![Version](https://img.shields.io/badge/version-0.1.0-blue) ![Status](https://img.shields.io/badge/status-draft-orange) ![License](https://img.shields.io/badge/license-CC0-green)

An open JSON format for educational content that works across platforms.

## What is MECS?

MECS is a simple standard for structuring courses, lessons, and educational content in JSON. Think of it like a universal format for educational materials.

**Goal:** Make educational content portable - create once, use anywhere.

## Quick Example

```json
{
  "mecsVersion": "0.1.0",
  "type": "mecs:course",
  "title": "Introduction to Programming",
  "sections": [
    {
      "title": "Welcome",
      "contentType": "mecs:text",
      "content": {
        "format": "markdown",
        "text": "# Hello World\n\nLet's learn programming!"
      }
    },
    {
      "title": "First Video",
      "contentType": "mecs:video",
      "content": {
        "url": "https://youtube.com/watch?v=..."
      }
    }
  ]
}
```

## Why MECS?

- ✅ **Simple:** Just JSON - easy to read and write
- ✅ **Portable:** Move courses between platforms
- ✅ **Extensible:** Add custom content types
- ✅ **Open:** Free to use, no vendor lock-in

## Content Types (v0.1.0)

- **`mecs:text`** - Markdown, HTML, or plain text
- **`mecs:video`** - YouTube, Vimeo, or video URLs
- **`mecs:document`** - PDFs, slides, worksheets

**Coming soon:** Quizzes, assignments, discussions

## Using MECS

### For Content Creators
1. Use a MECS-compatible tool like [Course Builder](https://github.com/mikhaidn/course-builder)
2. Export your course as JSON
3. Share it anywhere

### For Developers
1. Read the [JSON Schema](schema/v1.0/)
2. Check [examples](examples/)
3. Import/export MECS in your app

See [Implementation Guide](docs/implementation.md) for details.

## Files

```
mecs-standard/
├── schema/v1.0/           # JSON schemas
├── examples/              # Sample courses
└── docs/                  # Documentation
```

## Documentation

- **[Specification](docs/specification.md)** - Complete standard reference
- **[Implementation Guide](docs/implementation.md)** - How to add MECS to your app
- **[Content Type Guide](docs/content-types.md)** - Available types
- **[Related Standards](docs/related-standards.md)** - How MECS compares

## Implementations

**Reference:**
- [Course Builder](https://github.com/mikhaidn/course-builder) - Web app (JavaScript)

**Add yours!** Create a PR to list your MECS implementation.

## Contributing

We welcome:
- Bug reports
- Feature suggestions
- New content type proposals
- Implementation examples

Open an issue or PR on GitHub.

## Roadmap

- **v0.1.0** (current) - Basic course structure
- **v0.2.0** (next) - Quizzes and assignments
- **v1.0.0** (future) - Stable release

See [full roadmap](docs/roadmap.md)

## License

CC0 1.0 Universal (Public Domain) - Free to use for any purpose.

## Links

- **GitHub:** [github.com/mikhaidn/mecs-standard](https://github.com/mikhaidn/mecs-standard)
- **Issues:** Report bugs or suggest features
- **Discussions:** Ask questions

---

**Making educational content interoperable, one JSON file at a time.**
