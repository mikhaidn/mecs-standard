# Learning Course Builder: Key Decisions

**Last Updated:** 2025-11-16
**Status:** Proposal / Discussion Draft

---

## Question 1: What changes should be added to the indexing capability?

### Recommended Changes

#### ✅ INCLUDE in MECS Standard (This Project)

**1. Type Definitions (HIGH PRIORITY)**

Add to `schema/typescript/types.ts`:

```typescript
// New enums
export type LearningType = "skill" | "concept" | "event";
export type AcademicLevel = "pre-k" | "k-2" | "3-6" | "7-8" | "9-10" |
                            "11-12" | "undergrad-lower" | "undergrad-upper" |
                            "grad-breadth" | "phd-depth";
export type ProficiencyLevel = "understand" | "discuss" | "teach" | "research";

// Extend CourseMetadata
export interface CourseMetadata {
  // ... existing fields ...
  canonicalConcept?: CanonicalConceptRef;
  learningType?: LearningType;
  academicLevel?: AcademicLevel;
  proficiencyLevel?: ProficiencyLevel;
  relatedCourses?: RelatedCourse[];
}
```

**Why:** Core data structure that enables classification and discovery.

---

**2. JSON Schema Updates (HIGH PRIORITY)**

Update `schema/v1.0/course-schema.json` to include:
- New enum definitions
- Validation rules
- Optional fields (backward compatible)

**Why:** Ensures data integrity and enables validation tools.

---

**3. Canonical Concept Reference (MEDIUM PRIORITY)**

```typescript
export interface CanonicalConceptRef {
  conceptId: string;           // Unique ID (e.g., "arithmetic")
  title: string;               // Display name
  sourceUrl?: string;          // Wikipedia URL, etc.
  sourceType?: string;         // "wikipedia" | "academic" | "custom"
}
```

**Why:** Links courses to authoritative sources, enables grouping.

---

**4. Validation Rules (MEDIUM PRIORITY)**

Create `schema/compatibility-matrix.json`:
- Define valid classification combinations
- Provide warnings for uncommon combinations
- Document best practices

Example:
```json
{
  "rules": [
    {
      "academicLevel": "pre-k",
      "recommendedProficiency": ["understand"],
      "warning": "Pre-K typically only targets understanding"
    },
    {
      "academicLevel": "phd-depth",
      "recommendedProficiency": ["teach", "research"],
      "warning": "PhD level should target higher proficiency"
    }
  ]
}
```

**Why:** Guides content creators to make sensible choices.

---

**5. Documentation (HIGH PRIORITY)**

New documents:
- ✅ `docs/learning-course-builder.md` - Full specification
- ✅ `docs/learning-course-builder-quick-reference.md` - Quick guide
- ⬜ `docs/classification-guide.md` - How to classify courses
- ⬜ `docs/discovery-spec.md` - How platforms should implement search

**Why:** Adoption requires clear documentation.

---

**6. Example Courses (MEDIUM PRIORITY)**

Create `examples/classified-courses/`:
- `arithmetic-k2-skill-discuss.json`
- `arithmetic-36-concept-teach.json`
- `photosynthesis-78-concept-understand.json`
- `french-revolution-1112-event-discuss.json`
- `quantum-mechanics-phd-concept-research.json`

At least 10-15 examples showing:
- Multiple courses for same concept
- All learning types represented
- Range of academic levels
- Different proficiency targets

**Why:** Examples are the best documentation.

---

**7. Related Courses Field (LOW PRIORITY)**

```typescript
export interface RelatedCourse {
  courseId: string;
  title: string;
  mecsUrl?: string;
  relationship: "prerequisite" | "next-level" | "alternative" | "supplement";
  learningType?: LearningType;
  academicLevel?: AcademicLevel;
  proficiencyLevel?: ProficiencyLevel;
}
```

**Why:** Helps learners discover learning paths, but not essential for v1.

---

#### ❌ EXCLUDE from MECS Standard

**1. Search/Discovery API**
- **What:** REST API for querying courses by classification
- **Why exclude:** MECS is a data format, not a service
- **Where:** Separate `mecs-concept-registry` project

**2. Concept Database**
- **What:** Storage for canonical concepts and course mappings
- **Why exclude:** Infrastructure, not a standard
- **Where:** Separate registry service

**3. Recommendation Engine**
- **What:** ML-based course suggestions
- **Why exclude:** Advanced feature, platform-specific
- **Where:** Separate project or platform implementations

**4. User Profiling**
- **What:** Tracking learner level, preferences, progress
- **Why exclude:** Privacy concerns, platform-specific
- **Where:** Platform implementations (LMS, etc.)

---

### Indexing Strategy (Conceptual Specification Only)

MECS should **specify** how courses should be indexed, but not **implement** the index.

**Recommended Index Structure (for documentation):**

```json
{
  "concepts": {
    "arithmetic": {
      "title": "Arithmetic",
      "sourceUrl": "https://en.wikipedia.org/wiki/Arithmetic",
      "courses": {
        "skill": {
          "k-2": {
            "discuss": ["course-123", "course-456"],
            "teach": ["course-789"]
          },
          "3-6": {
            "discuss": ["course-abc"],
            "teach": ["course-def"]
          }
        },
        "concept": {
          "undergrad-upper": {
            "teach": ["course-xyz"]
          }
        }
      }
    }
  }
}
```

**Include in MECS:**
- ✅ Document the recommended index structure
- ✅ Provide pseudocode for querying
- ✅ Explain indexing best practices

**Don't include:**
- ❌ Actual database implementation
- ❌ API endpoints
- ❌ Performance optimization

---

## Question 2: Where does the line stop for this project?

### The Boundary Principle

**MECS Standard = Data Format**
**Everything Else = Separate Projects**

```
┌─────────────────────────────────────────┐
│         MECS STANDARD (This Repo)       │
│  • JSON Schema                          │
│  • TypeScript types                     │
│  • Documentation                        │
│  • Example files                        │
│  • Validation rules (schema-level)      │
│  • Best practices (docs)                │
└─────────────────────────────────────────┘
              │ Defines
              ▼
┌─────────────────────────────────────────┐
│        IMPLEMENTATIONS (Other Repos)    │
│  • Course builder UI                    │
│  • Concept registry API                 │
│  • LMS integrations                     │
│  • Search engines                       │
│  • Recommendation systems               │
│  • Analytics platforms                  │
└─────────────────────────────────────────┘
```

---

### Specific Scope Boundaries

#### ✅ IN SCOPE: MECS Standard Project

**Data Format Definition**
- JSON schemas for all MECS types
- TypeScript type definitions
- Field specifications and constraints
- Validation rules (schema-based)

**Documentation**
- Complete specification
- Implementation guides
- Classification guides
- API specification (conceptual, not implemented)
- Best practices

**Reference Examples**
- Sample MECS files
- Classified courses
- Module examples
- Test fixtures

**Validation Tools (Minimal)**
- JSON Schema validators
- TypeScript type checking
- Basic compatibility checker (simple script)

**Standards Documentation**
- How platforms should implement indexing
- Recommended query patterns
- Interoperability guidelines

---

#### ❌ OUT OF SCOPE: Separate Projects

**1. Course Builder Application** (`course-builder` repo)
- User interface for creating courses
- Visual editors
- Preview functionality
- MECS export/import UI
- Classification wizard
- Drag-and-drop section builder

**Where it lives:** https://github.com/mikhaidn/course-builder

---

**2. Concept Registry Service** (NEW: `mecs-concept-registry`)
- REST API for querying courses
- Database (PostgreSQL, etc.)
- Search engine (ElasticSearch, Algolia)
- Course submission system
- Indexing pipeline
- API authentication

**Tech stack suggestion:**
- Node.js/Express or Python/FastAPI
- PostgreSQL for relational data
- ElasticSearch for full-text search
- Redis for caching

---

**3. Platform Implementations** (Various repos)
- Learning Management Systems (Moodle, Canvas)
- Course marketplaces
- Mobile learning apps
- Video platforms
- Analytics dashboards

**Examples:**
- `mecs-moodle-plugin`
- `mecs-canvas-integration`
- `mecs-mobile-app`

---

**4. Content Tools** (NEW repos as needed)
- Wikipedia to MECS converter
- PDF to MECS extractor
- Video platform scrapers
- Auto-classification tools (ML-based)

**Examples:**
- `mecs-wikipedia-importer`
- `mecs-youtube-converter`

---

**5. Advanced Features** (Future separate repos)
- Recommendation engine (ML-based)
- Learning path generator
- Progress tracking
- Certification system
- Peer review platform
- Content marketplace

---

### Decision Framework: "Does this belong in MECS?"

Ask these questions:

**1. Is it a data structure?**
- YES → Probably in MECS
- NO → Probably separate

**2. Does it require runtime computation?**
- YES → Separate project
- NO → Might be in MECS

**3. Does it require a database or API?**
- YES → Separate project
- NO → Might be in MECS

**4. Is it user-facing?**
- YES → Separate project
- NO → Might be in MECS

**5. Is it platform-specific?**
- YES → Separate project
- NO → Might be in MECS

**6. Does it define HOW to structure data?**
- YES → MECS
- NO → Separate

**7. Does it define HOW to process data?**
- YES → Separate
- NO → Might be in MECS

---

### Examples Applying the Framework

**Example 1: "Should we add a course rating field?"**
- Is it a data structure? YES
- Can it be static in JSON? YES
- Is it universally useful? YES
- **Decision:** ✅ Add to MECS schema as optional field

**Example 2: "Should we build a course search API?"**
- Is it a data structure? NO (it's an API)
- Does it require runtime? YES (querying, ranking)
- Does it require a database? YES
- **Decision:** ❌ Separate `mecs-concept-registry` project

**Example 3: "Should we create a classification wizard?"**
- Is it a data structure? NO (it's a UI)
- Is it user-facing? YES
- Is it platform-specific? Somewhat
- **Decision:** ❌ Add to `course-builder` project

**Example 4: "Should we define recommended index structure?"**
- Is it a data structure? YES
- Can it be documented (not implemented)? YES
- Is it universally useful? YES
- **Decision:** ✅ Document in MECS spec, don't implement

**Example 5: "Should we validate classification combinations?"**
- Is it a data structure? Partially (validation rules in JSON)
- Can it be simple schema-based? YES
- Is it universally useful? YES
- **Decision:** ✅ Add validation rules to MECS, ❌ Advanced ML-based validation is separate

---

### Gray Areas (Requires Discussion)

**1. Validation Tools**
- Schema validation: ✅ IN SCOPE (simple)
- ML-based auto-classification: ❌ OUT OF SCOPE (complex)
- Compatibility checker script: 🤔 **BORDERLINE** (lean toward IN)

**Recommendation:** Include a simple Node.js/Python script for validation, but advanced tools are separate.

---

**2. Example Generator**
- Static example files: ✅ IN SCOPE
- Interactive example builder: ❌ OUT OF SCOPE
- CLI tool to generate examples: 🤔 **BORDERLINE** (lean toward OUT)

**Recommendation:** Provide static examples only. CLI tools are separate.

---

**3. Migration Tools**
- Documentation on migration: ✅ IN SCOPE
- Automated migration script: ❌ OUT OF SCOPE
- Schema version converter: 🤔 **BORDERLINE** (lean toward IN if simple)

**Recommendation:** Simple schema converter IN, complex migration tools OUT.

---

## Implementation Priorities

### Phase 1: Foundation (Weeks 1-2)
- [ ] Update TypeScript types
- [ ] Create JSON schemas
- [ ] Write compatibility matrix
- [ ] Complete documentation

**Deliverable:** MECS v0.3.0 with learning classification support

---

### Phase 2: Examples & Validation (Week 3)
- [ ] Create 10-15 classified course examples
- [ ] Write classification guide
- [ ] Build simple validation script
- [ ] Test with real-world content

**Deliverable:** Reference examples and validation tools

---

### Phase 3: Specification (Week 4)
- [ ] Document indexing recommendations
- [ ] Write discovery API spec (conceptual)
- [ ] Create implementation checklist
- [ ] Get community feedback

**Deliverable:** Complete specification for platforms to implement

---

### Phase 4: Ecosystem (Weeks 5+)
- [ ] Extend `course-builder` with classification UI
- [ ] Create `mecs-concept-registry` service (separate repo)
- [ ] Build sample platform integration
- [ ] Onboard content creators

**Deliverable:** Working ecosystem with multiple projects

---

## Summary: Quick Reference

| Feature | MECS Standard | Separate Project |
|---------|---------------|------------------|
| Type definitions | ✅ | |
| JSON schemas | ✅ | |
| Documentation | ✅ | |
| Example files | ✅ | |
| Validation rules (schema) | ✅ | |
| Simple validation script | ✅ | |
| Indexing specification | ✅ | |
| Discovery API spec (docs) | ✅ | |
| Course builder UI | | ✅ |
| Concept registry API | | ✅ |
| Search engine | | ✅ |
| Database | | ✅ |
| Recommendation engine | | ✅ |
| LMS integrations | | ✅ |
| Analytics | | ✅ |
| Content conversion tools | | ✅ |
| Advanced validation (ML) | | ✅ |

---

## Open Questions for Discussion

1. **Should MECS include a simple CLI validation tool?**
   - Pros: Easier for developers to validate
   - Cons: Adds complexity, maintenance burden
   - **Recommendation:** Yes, but keep it minimal

2. **Should compatibility matrix be enforced or advisory?**
   - Enforced: Validation errors
   - Advisory: Warnings only
   - **Recommendation:** Advisory (warnings) for v1

3. **Should we version classifications separately from MECS?**
   - Pros: Can evolve independently
   - Cons: More complexity
   - **Recommendation:** No, keep in main MECS version

4. **How to handle custom academic levels?**
   - Allow custom levels via extensions?
   - Strict enum only?
   - **Recommendation:** Strict enum for v1, revisit in v2

---

## Next Steps

1. **Get feedback on this document**
   - Share with potential implementers
   - Validate taxonomy with educators
   - Test with content creators

2. **Finalize scope decisions**
   - Lock in what's IN vs OUT
   - Create project charters for separate repos
   - Define interfaces between projects

3. **Begin implementation**
   - Start with Phase 1 (types and schemas)
   - Create examples in parallel
   - Document as you build

---

**Feedback welcome!** Open an issue or PR on GitHub.
