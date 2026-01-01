# Common Tasks

> **MECS Standard Documentation Module**  
> Part 10 of 12 | [← Back to Index](README.md)

---

#### 3. Validate Changes

- **Schemas**: Must be valid JSON Schema Draft 7
- **Examples**: Must validate against schemas
- **URLs**: Check that referenced URLs are accessible
- **Types**: Keep TypeScript/Python types in sync with schemas

#### 4. Documentation

- **Update All Relevant Docs**: Don't just update one file
- **Examples Required**: Always include practical examples
- **Cross-Reference**: Link related documentation
- **Changelog**: Update CHANGELOG.md for user-facing changes

#### 5. Backward Compatibility

- **Pre-1.0**: Breaking changes allowed but should be minimized
- **Post-1.0**: Strict backward compatibility required
- **Migrations**: Provide migration guides for breaking changes
- **Graceful Degradation**: Unknown types should be ignored, not error

#### 6. Schema Design Principles

- **Start Minimal**: Add fields as needed, don't over-engineer
- **Required vs Optional**: Be conservative with required fields
- **Extensibility**: Use `additionalProperties` or `extensions` object
- **Namespacing**: Always namespace custom types

#### 7. Module System (v0.2.0+)

- **URLs Must Be Stable**: Don't change module URLs once published
- **CORS Awareness**: Document CORS requirements for hosting
- **Caching Strategy**: Default to `network-first`
- **Error Handling**: Modules should fail gracefully
- **Security**: Validate and sanitize imported content

#### 8. Example Creation

- **Complete Examples**: Include all major features
- **Realistic Data**: Use plausible course/module content
- **Metadata**: Include rich metadata in examples
- **Comments**: JSON doesn't support comments, use README files
- **Testing**: Provide testing instructions

#### 9. Git Workflow for AI Assistants

- **Branch**: Always work on designated feature branches
- **Commits**: Use conventional commit format
- **Push**: Use `git push -u origin <branch>` for new branches
- **Retry**: Network operations should retry with backoff

#### 10. Don't Assume

- **Check Current State**: Read files to understand current state
- **Verify URLs**: Don't assume URLs work
- **Test Changes**: Validate against schemas
- **Ask Questions**: When ambiguous, ask the user

### Common Mistakes to Avoid

❌ **DON'T**:
- Change `mecsVersion` without updating ALL files
- Add breaking changes to patch versions
- Create examples that don't validate
- Use 4-space or tab indentation in JSON
- Skip updating type definitions when changing schemas
- Forget to update CHANGELOG.md
- Assume backward compatibility without testing
- Use generic IDs like "1", "2", "3"
- Over-engineer simple features
- Add fields without considering extensions

✅ **DO**:
- Read existing files before proposing changes
- Validate all JSON against schemas
- Keep TypeScript/Python types in sync
- Update documentation comprehensively
- Test module imports locally when possible
- Follow semantic versioning strictly
- Provide migration guides for breaking changes
- Use descriptive, semantic identifiers
- Start simple, extend later
- Consider how features compose together

### Understanding Project Maturity

**Current Status**: v0.2.0 (Pre-release)

**What This Means**:
- Core structure is stable but may evolve
- Breaking changes possible but should be minimized
- Focus on getting foundation right before v1.0
- Community feedback is crucial
- Documentation is high priority

**Next Milestones** (from IMPLEMENTATION_ROADMAP.md):
- **Phase 2**: Content & Documentation (2-3 weeks)
- **Phase 3**: Interactive Tools (weeks 4-5)
- **Phase 4**: Community & Ecosystem (weeks 6-8)
- **Phase 5**: Polish & Launch (weeks 9-10)
- **v0.3.0**: Quizzes and assessments
- **v1.0.0**: Stable release

### Quick Reference Commands

```bash
# Validate JSON against schema (conceptual - tool-dependent)
ajv validate -s schema/v1.0/course.schema.json -d examples/intro-to-programming.json

