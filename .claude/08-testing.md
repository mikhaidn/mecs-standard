# Testing & Validation

> **MECS Standard Documentation Module**  
> Part 08 of 12 | [← Back to Index](README.md)

---

**Steps**:

1. **Create Schema** (`/schema/v1.0/content-types/{type}.schema.json`)
   ```json
   {
     "$schema": "http://json-schema.org/draft-07/schema#",
     "$id": "https://mecs-standard.org/schema/v1.0/content-types/{type}.schema.json",
     "title": "MECS {Type} Content Schema",
     "type": "object",
     "required": [...],
     "properties": {...}
   }
   ```

2. **Update TypeScript Types** (`/schema/typescript/types.ts`)
   - Add interface
   - Add to `SectionContent` union type
   - Add type guard function

3. **Update Python Types** (`/schema/python/mecs_types.py`)

4. **Create Example** (`/examples/course-with-{type}.json`)

5. **Document** (`/docs/content-types.md`)
   - Add section explaining the new type
   - Include usage examples
   - Document all properties

6. **Update Main Docs**
   - Update README.md content types list
   - Update specification.md

7. **Update Changelog** (CHANGELOG.md)

8. **Increment Version** if applicable

### Task 2: Update Documentation

**For Jekyll Site**:

1. Edit markdown file in `/docs`
2. Test locally (if possible): `cd docs && bundle exec jekyll serve`
3. Commit and push (auto-deploys via GitHub Actions)

**For README Updates**:

1. Edit `/README.md`
2. Keep it concise (detailed docs go in `/docs`)
3. Update badges if version changed

### Task 3: Add an Example Course/Module

1. **Create JSON File**
   - `/examples/{descriptive-name}.json`
   - Follow naming conventions
   - Use proper indentation (2 spaces)

2. **Validate**
   - Validate against appropriate schema
   - Check all required fields
   - Verify URLs (if any)

3. **Document**
   - Add description to `/examples/README.md` (if exists)
   - Or create inline comments explaining the example

4. **Test**
   - For modules: Test import functionality
   - Verify all content types render correctly

### Task 4: Bump Version

1. **Update `mecsVersion` in**:
