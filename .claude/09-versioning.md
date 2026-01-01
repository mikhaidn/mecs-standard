# Version Control

> **MECS Standard Documentation Module**  
> Part 09 of 12 | [← Back to Index](README.md)

---

   - All example files (`/examples/*.json`)
   - TypeScript types (`/schema/typescript/types.ts`)
   - Documentation files

2. **Update CHANGELOG.md**
   - Add new version section
   - Document all changes
   - Add comparison link

3. **Update README.md**
   - Update version badge
   - Update quick example if needed

4. **Git Tag**
   ```bash
   git tag -a v0.3.0 -m "Release v0.3.0"
   git push origin v0.3.0
   ```

### Task 5: Fix Schema Issues

1. **Identify Issue**
   - Review error reports
   - Test validation

2. **Update Schema**
   - Edit `/schema/v1.0/{type}.schema.json`
   - Fix validation rules

3. **Update Type Definitions**
   - Sync TypeScript types
   - Sync Python types

4. **Test Examples**
   - Re-validate all examples
   - Fix broken examples

5. **Document**
   - Add to CHANGELOG.md
   - Update docs if behavior changed

---

## AI Assistant Guidelines

### When Working with This Repository

#### 1. Always Read Before Writing

- **NEVER propose changes to schemas without reading them first**
- Check existing examples before creating new ones
- Review documentation before updating

#### 2. Maintain Consistency

- **JSON Formatting**: Always use 2-space indentation
- **Naming**: Follow kebab-case for files and IDs
- **Versioning**: Use semantic versioning (X.Y.Z)
- **Namespacing**: Respect `mecs:*` namespace for core types
