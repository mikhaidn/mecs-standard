# Learning Course Builder: Indexing & Classification System

## Overview

This document outlines the infrastructure for building courses and guides that teach canonical concepts (e.g., Wikipedia articles) across different learning contexts, academic levels, and proficiency targets.

**Core Concept:** Enable content creators to build targeted learning experiences for the same canonical concept, adapted to different learner needs and contexts.

**Example:** "Arithmetic" can have multiple courses:
- Kindergarten-level skill development for basic proficiency
- 3rd-grade conceptual understanding for discussion-level mastery
- College-level for teaching/lecturing capability
- PhD-level for novel research applications

---

## Classification Taxonomy

### 1. Learning Type

Defines what kind of knowledge is being taught:

| Type | Description | Example |
|------|-------------|---------|
| **Skill** | Practical ability to perform actions | Playing piano, writing code, solving equations |
| **Concept** | Theoretical understanding of ideas | Democracy, gravity, market economics |
| **Event** | Historical or specific occurrences | World War II, the Big Bang, company founding |

**Implementation:** Single-select from predefined values.

---

### 2. Academic Level

Defines the educational stage of the target learner:

| Level ID | Label | Age Range | Description |
|----------|-------|-----------|-------------|
| `pre-k` | Pre-Kindergarten | 0-5 | Early childhood education |
| `k-2` | K-2nd Grade | 5-7 | Foundation literacy and numeracy |
| `3-6` | 3rd-6th Grade | 8-11 | Elementary education |
| `7-8` | 7th-8th Grade | 12-13 | Middle school |
| `9-10` | 9th-10th Grade | 14-15 | Early high school |
| `11-12` | 11th-12th Grade | 16-17 | Late high school |
| `undergrad-lower` | College Underclassman | 18-19 | Introductory college |
| `undergrad-upper` | College Upperclassman | 20-21 | Advanced undergraduate |
| `grad-breadth` | Graduate Breadth | 22+ | Master's level, broad knowledge |
| `phd-depth` | PhD/Novel Depth | 24+ | Research-level, deep specialization |

**Implementation:** Single-select from predefined values.

---

### 3. Applied Proficiency Level

Defines the target mastery level:

| Level ID | Label | Description | Example Capability |
|----------|-------|-------------|-------------------|
| `understand` | Understand | Can comprehend discussions and ask meaningful questions | Attend a lecture on quantum mechanics and ask clarifying questions |
| `discuss` | Discuss | Can hold conversations and pass entry-level interviews | Explain machine learning in a job interview |
| `teach` | Teach/Create | Can lecture, write articles, or lead independent projects | Give a university lecture on calculus |
| `research` | Research | Can conduct novel research and create new canonical concepts | Publish original papers, use as foundation for new theories |

**Implementation:** Single-select from predefined values.

**Note:** Not all combinations are valid. For example:
- Pre-K + Research level doesn't make sense
- PhD-level learners might skip "Understand" and start at "Discuss" or "Teach"

---

## Indexing System

### Canonical Concept Registry

A **canonical concept** is a well-defined topic (e.g., Wikipedia article, academic subject) that can have multiple learning paths.

```json
{
  "conceptId": "arithmetic",
  "canonicalSource": "https://en.wikipedia.org/wiki/Arithmetic",
  "title": "Arithmetic",
  "description": "Basic mathematical operations",
  "courses": [
    {
      "courseId": "arithmetic-k2-skill-discuss",
      "learningType": "skill",
      "academicLevel": "k-2",
      "proficiencyLevel": "discuss",
      "mecsUrl": "https://example.com/courses/arithmetic-k2.json"
    },
    {
      "courseId": "arithmetic-undergrad-concept-teach",
      "learningType": "concept",
      "academicLevel": "undergrad-upper",
      "proficiencyLevel": "teach",
      "mecsUrl": "https://example.com/courses/arithmetic-theory.json"
    }
  ]
}
```

### Course Metadata Extensions

Extend existing `CourseMetadata` in MECS to include classification:

```typescript
export interface CourseMetadata {
  // ... existing fields ...

  // Learning Course Builder extensions
  canonicalConcept?: CanonicalConceptRef;
  learningType?: "skill" | "concept" | "event";
  academicLevel?: AcademicLevel;
  proficiencyLevel?: ProficiencyLevel;

  // Compatibility matrix
  validCombinations?: boolean; // Validation flag
}

export interface CanonicalConceptRef {
  conceptId: string;
  title: string;
  sourceUrl?: string; // Wikipedia, textbook, etc.
  sourceType?: "wikipedia" | "academic" | "custom";
}

export type AcademicLevel =
  | "pre-k"
  | "k-2"
  | "3-6"
  | "7-8"
  | "9-10"
  | "11-12"
  | "undergrad-lower"
  | "undergrad-upper"
  | "grad-breadth"
  | "phd-depth";

export type ProficiencyLevel =
  | "understand"
  | "discuss"
  | "teach"
  | "research";
```

### Search and Discovery

**Query Example:**
```
Find courses for "quantum mechanics" where:
  - Learning Type: Concept
  - Academic Level: undergrad-upper
  - Proficiency: discuss OR teach
```

**Index Structure:**
```json
{
  "concepts": {
    "quantum-mechanics": {
      "skill": {
        "undergrad-upper": {
          "discuss": ["course-123"],
          "teach": ["course-456"]
        }
      },
      "concept": {
        "undergrad-upper": {
          "discuss": ["course-789"],
          "teach": ["course-012"]
        }
      }
    }
  }
}
```

---

## Project Scope: What Belongs Here vs. Separate Projects

### ✅ IN SCOPE: MECS Standard Extensions

**What belongs in this project:**

1. **Type Definitions & Schema**
   - Add classification fields to MECS TypeScript types
   - Update JSON Schema to validate new metadata
   - Define enums for learning types, levels, proficiency

2. **Documentation**
   - Specification for new metadata fields
   - Best practices for using classifications
   - Examples of well-classified courses

3. **Validation Rules**
   - Schema validation for new fields
   - Compatibility matrix (which combinations make sense)
   - Warning system for questionable combinations

4. **Example Courses**
   - Reference implementations showing classification
   - Multiple courses for same concept at different levels
   - Demonstrate best practices

5. **Discovery Specification**
   - Define how platforms should index/search courses
   - Recommend query patterns
   - Multi-dimensional filtering guidelines

---

### ❌ OUT OF SCOPE: Separate Projects

**What should be separate projects/repositories:**

1. **Canonical Concept Registry Service**
   - **Why separate:** This is a live API/database service
   - **What it does:**
     - Hosts the registry of canonical concepts
     - Provides search/discovery API
     - Manages concept relationships
     - Handles course submissions
   - **Suggested name:** `mecs-concept-registry`
   - **Technology:** Node.js/Express API, PostgreSQL, ElasticSearch

2. **Course Builder Application**
   - **Why separate:** This is a user-facing application
   - **What it does:**
     - UI for creating/editing MECS courses
     - Classification wizard for metadata
     - Preview and validation
     - Export to MECS JSON
   - **Already exists:** `course-builder` repository
   - **Extension needed:** Add classification UI

3. **Platform Implementations**
   - **Why separate:** These are consuming applications
   - **What they do:**
     - LMS that reads MECS files
     - Course marketplace with search
     - Learning path generators
     - Analytics dashboards
   - **Examples:** Moodle plugin, Canvas integration, standalone app

4. **Content Recommendation Engine**
   - **Why separate:** Advanced ML/AI feature
   - **What it does:**
     - Suggests courses based on learner profile
     - Creates personalized learning paths
     - Predicts difficulty/time to completion
   - **Suggested name:** `mecs-recommender`

5. **Assessment & Certification System**
   - **Why separate:** Distinct educational function
   - **What it does:**
     - Quizzes and exams
     - Progress tracking
     - Certificate generation
     - Competency validation
   - **Note:** Basic assessment types (quiz structure) stay in MECS

6. **Wikipedia/Content Scraping Tools**
   - **Why separate:** Specific integration/ETL pipeline
   - **What it does:**
     - Extracts content from Wikipedia
     - Converts to MECS format
     - Maintains canonical concept mappings
   - **Suggested name:** `mecs-wikipedia-importer`

---

## Proposed Changes to MECS Standard

### 1. Schema Updates

**Priority: HIGH**

Add to `schema/typescript/types.ts`:
- New enums for learning types, academic levels, proficiency
- Extend `CourseMetadata` interface
- Add `CanonicalConceptRef` interface

### 2. Validation Rules

**Priority: MEDIUM**

Create compatibility matrix in `schema/compatibility-matrix.json`:
```json
{
  "validCombinations": [
    {
      "academicLevel": "pre-k",
      "proficiencyLevels": ["understand"],
      "note": "Pre-K typically only targets understanding"
    },
    {
      "academicLevel": "phd-depth",
      "proficiencyLevels": ["teach", "research"],
      "note": "PhD level should target higher proficiency"
    }
  ]
}
```

### 3. Documentation

**Priority: HIGH**

New documents needed:
- `docs/classification-guide.md` - How to classify courses
- `docs/discovery-api-spec.md` - How platforms should implement search
- `examples/classified-courses/` - Reference examples

### 4. Example Data

**Priority: MEDIUM**

Create sample courses for same concept at different classifications:
- `examples/classified-courses/arithmetic-k2-skill.json`
- `examples/classified-courses/arithmetic-college-concept.json`
- `examples/classified-courses/arithmetic-phd-research.json`

---

## Implementation Recommendations

### Phase 1: Foundation (Week 1-2)
1. ✅ Document the classification system (this document)
2. ⬜ Update TypeScript types
3. ⬜ Create JSON Schema with new fields
4. ⬜ Add validation rules

### Phase 2: Examples (Week 3)
1. ⬜ Create 5-10 example courses with classifications
2. ⬜ Document best practices
3. ⬜ Create classification guide

### Phase 3: Tooling (Week 4+)
1. ⬜ Update course-builder with classification UI
2. ⬜ Create validation tool
3. ⬜ Build simple search/filter demo

### Phase 4: Registry (Future)
1. ⬜ Design concept registry API
2. ⬜ Build registry service (separate project)
3. ⬜ Create submission/discovery interface

---

## Open Questions

### Question 1: Granularity
**Q:** Should we support sub-levels? (e.g., "early 3rd grade" vs "late 3rd grade")
**Recommendation:** No. Keep it simple. Use `metadata.prerequisites` for fine-grained sequencing.

### Question 2: Multiple Classifications
**Q:** Can a single course target multiple academic levels?
**Recommendation:** No. Create separate course variants. Use `mecs:module-ref` to share common content.

### Question 3: Custom Levels
**Q:** Should platforms be able to define custom academic levels?
**Recommendation:** Not in v1. Standardization is the goal. Consider in v2.0 if needed.

### Question 4: Skill vs Concept Overlap
**Q:** What if a course teaches both skill AND concept?
**Recommendation:** Choose the primary focus. Use `metadata.learningObjectives` to describe both aspects.

---

## Success Metrics

**How do we know this is successful?**

1. **Adoption:** 5+ platforms implement MECS with classification
2. **Content:** 100+ courses across 10+ canonical concepts
3. **Coverage:** Each popular concept has courses at 3+ academic levels
4. **Usability:** Content creators can classify courses in <2 minutes
5. **Discovery:** Learners can find appropriate courses in <30 seconds

---

## References

- [MECS Specification](specification.md)
- [Course Builder](https://github.com/mikhaidn/course-builder)
- [Bloom's Taxonomy](https://en.wikipedia.org/wiki/Bloom%27s_taxonomy) - Related educational framework
- [Common Education Data Standards](https://ceds.ed.gov/) - Related standards

---

## Feedback & Iteration

This is a living document. Please provide feedback on:
- Classification taxonomy - are these the right categories?
- Project boundaries - what else should be separate?
- Implementation priorities - what should we build first?

Open an issue: [github.com/mikhaidn/mecs-standard/issues](https://github.com/mikhaidn/mecs-standard/issues)
