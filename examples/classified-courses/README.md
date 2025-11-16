# Classified Courses Examples

This directory contains example MECS courses demonstrating the **Learning Course Builder** classification system.

## Overview

The Learning Course Builder extends MECS with metadata fields to classify courses by:

1. **Learning Type**: `skill` | `concept` | `event`
2. **Academic Level**: `pre-k` | `k-2` | `3-6` | `7-8` | `9-10` | `11-12` | `undergrad-lower` | `undergrad-upper` | `grad-breadth` | `phd-depth`
3. **Proficiency Level**: `understand` | `discuss` | `teach` | `research`

This enables creating **multiple courses for the same canonical concept**, each tailored to different learners.

---

## Examples in This Directory

### 1. Arithmetic (Kindergarten - Skill - Discuss)

**File**: `arithmetic-k2-skill-discuss.json`

**Target Learner**: Kindergarten through 2nd grade students
**Goal**: Develop practical arithmetic skills at a discussion level

**Key Features**:
- Simple, friendly language
- Visual examples with emojis
- Video content for engagement
- Practice activities
- Story problems for application

**Proficiency Target**: Can explain addition/subtraction to peers

---

### 2. Arithmetic (PhD - Concept - Research)

**File**: `arithmetic-phd-concept-research.json`

**Target Learner**: PhD students in mathematical logic
**Goal**: Research-level understanding of arithmetic foundations

**Key Features**:
- Axiomatic approaches (Peano, Dedekind)
- Gödel's incompleteness theorems
- Reverse mathematics
- Original research project
- Conference presentation preparation

**Proficiency Target**: Can publish novel research on arithmetic foundations

---

## Comparison: Same Topic, Different Audiences

| Aspect | K-2 Version | PhD Version |
|--------|-------------|-------------|
| **Learning Type** | Skill (doing arithmetic) | Concept (understanding foundations) |
| **Language** | "Let's add apples!" | "Analyze Peano axioms" |
| **Content** | Videos, emoji, simple text | Academic papers, proofs, seminars |
| **Activities** | Count toys, solve word problems | Original research, conference talks |
| **Duration** | 12 weeks | 16 weeks (graduate seminar) |
| **Prerequisites** | Can count to 5 | Graduate-level logic, set theory |
| **Assessment** | Worksheets | Research paper + presentation |
| **Proficiency** | Discuss (explain to peers) | Research (publish papers) |

---

## Using These Examples

### For Content Creators

1. **Study the structure**: See how the same topic is adapted for different levels
2. **Copy the pattern**: Use these as templates for your own courses
3. **Adjust metadata**: Change classification to match your target audience
4. **Customize content**: Adapt sections to your teaching style

### For Developers

1. **Test your parser**: Use these to validate MECS implementations
2. **Build search features**: Practice filtering by classification
3. **Create UI components**: Display courses with appropriate styling based on level
4. **Validate schemas**: Ensure your system handles the extended metadata

---

## Classification Field Reference

### canonicalConcept

Links this course to a canonical concept (e.g., Wikipedia article):

```json
"canonicalConcept": {
  "conceptId": "arithmetic",
  "title": "Arithmetic",
  "sourceUrl": "https://en.wikipedia.org/wiki/Arithmetic",
  "sourceType": "wikipedia"
}
```

### learningType

What kind of knowledge is taught:

- **`skill`**: Practical ability (e.g., solving equations, programming)
- **`concept`**: Theoretical understanding (e.g., democracy, gravity)
- **`event`**: Historical occurrence (e.g., World War II, Big Bang)

### academicLevel

Educational stage of target learner:

```
pre-k → k-2 → 3-6 → 7-8 → 9-10 → 11-12 →
undergrad-lower → undergrad-upper → grad-breadth → phd-depth
```

### proficiencyLevel

Target mastery level:

```
understand → discuss → teach → research
```

### relatedCourses

Links to other courses for the same concept:

```json
"relatedCourses": [
  {
    "courseId": "arithmetic-36-skill-teach",
    "title": "Arithmetic Mastery for 3rd-6th Grade",
    "relationship": "next-level",
    "learningType": "skill",
    "academicLevel": "3-6",
    "proficiencyLevel": "teach"
  }
]
```

**Relationships**:
- `prerequisite`: Must complete before this course
- `next-level`: Recommended progression
- `alternative`: Different approach to same concept
- `supplement`: Complementary content

---

## More Examples Needed

We're looking for examples covering:

- **Different subjects**: Science, history, arts, programming
- **Middle levels**: 3-6, 7-8, 9-10, undergrad
- **Event learning type**: Historical events, scientific discoveries
- **Different proficiencies**: Especially "teach" level

**Contribute**: Submit a PR with new examples!

---

## Validation

All examples in this directory should:

- ✅ Validate against MECS v0.3.0 schema
- ✅ Include all classification metadata fields
- ✅ Have reasonable classification combinations
- ✅ Link to a canonical concept
- ✅ Include learning objectives appropriate for the level

Use the validation tool:
```bash
npm run validate examples/classified-courses/
```

---

## Documentation

For complete information:

- **Full Specification**: [docs/learning-course-builder.md](../../docs/learning-course-builder.md)
- **Quick Reference**: [docs/learning-course-builder-quick-reference.md](../../docs/learning-course-builder-quick-reference.md)
- **Decisions & Scope**: [docs/LEARNING_BUILDER_DECISIONS.md](../../docs/LEARNING_BUILDER_DECISIONS.md)
- **Type Definitions**: [schema/typescript/learning-extensions.ts](../../schema/typescript/learning-extensions.ts)

---

## License

All examples are released under **CC0 1.0 Universal** (Public Domain).
Use freely for any purpose.
