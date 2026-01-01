# Documentation Guidelines

> **MECS Standard Documentation Module**  
> Part 07 of 12 | [← Back to Index](README.md)

---


```markdown
## [0.2.0] - 2025-01-15

### Added
- New feature X
- New schema Y

### Changed
- Updated Z

### Deprecated
- Old feature W

### Removed
- Legacy feature V

### Fixed
- Bug fix U
```

### Backward Compatibility

**Policy** (from CHANGELOG.md):
- v0.2.0 is fully backward compatible with v0.1.0
- All v0.1.0 courses are valid v0.2.0 courses
- Platforms that don't support new features can ignore them gracefully

### Commit Message Convention

Use conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, test, chore

**Examples**:
```
feat(modules): add module import support
fix(schema): correct video duration type
docs(implementation): update integration guide
```

---

## Common Tasks

### Task 1: Add a New Content Type
