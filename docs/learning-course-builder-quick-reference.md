# Learning Course Builder: Quick Reference

## TL;DR

**Goal:** Enable multiple learning paths for the same topic, tailored to different learners.

**Example:** "Linear Algebra" can have 10+ different courses:
- High school students learning basics
- College freshmen for engineering
- PhD students for advanced research
- Each at different proficiency levels (understand, discuss, teach, research)

---

## The Three Dimensions

```
┌─────────────────┐
│ WHAT to teach   │  → Learning Type: Skill | Concept | Event
├─────────────────┤
│ WHO to teach    │  → Academic Level: Pre-K → PhD (10 levels)
├─────────────────┤
│ HOW WELL        │  → Proficiency: Understand → Research (4 levels)
└─────────────────┘
```

---

## Real-World Example

**Canonical Concept:** "Photosynthesis"

| Course | Learning Type | Academic Level | Proficiency | Description |
|--------|---------------|----------------|-------------|-------------|
| 1 | Concept | 3-6 | Understand | Elementary overview, can answer basic questions |
| 2 | Concept | 7-8 | Discuss | Middle school biology, can explain to peers |
| 3 | Concept | undergrad-lower | Teach | College intro bio, can tutor others |
| 4 | Concept | grad-breadth | Research | Graduate level, can design experiments |
| 5 | Event | undergrad-upper | Discuss | History of photosynthesis discovery |

---

## Quick Decision Tree

### 1️⃣ What's the learning type?

```
Is it a SKILL (doing something)?          → skill
  Examples: Programming, drawing, solving equations

Is it a CONCEPT (understanding something)? → concept
  Examples: Democracy, gravity, algorithms

Is it an EVENT (specific occurrence)?      → event
  Examples: The French Revolution, moon landing
```

### 2️⃣ Who's the target learner?

```
Age 0-5        → pre-k
Age 5-7        → k-2
Age 8-11       → 3-6
Age 12-13      → 7-8
Age 14-15      → 9-10
Age 16-17      → 11-12
Age 18-19      → undergrad-lower
Age 20-21      → undergrad-upper
Age 22+        → grad-breadth
Research level → phd-depth
```

### 3️⃣ What's the target proficiency?

```
Can understand talks and ask questions        → understand
Can discuss and interview about it            → discuss
Can lecture, write articles, lead projects    → teach
Can do novel research and create new concepts → research
```

---

## JSON Example

```json
{
  "mecsVersion": "0.3.0",
  "type": "mecs:course",
  "id": "arithmetic-k2-skill",
  "title": "Basic Arithmetic for Kindergarten",
  "metadata": {
    "canonicalConcept": {
      "conceptId": "arithmetic",
      "title": "Arithmetic",
      "sourceUrl": "https://en.wikipedia.org/wiki/Arithmetic",
      "sourceType": "wikipedia"
    },
    "learningType": "skill",
    "academicLevel": "k-2",
    "proficiencyLevel": "discuss",
    "author": "Jane Teacher",
    "duration": {
      "value": 12,
      "unit": "weeks"
    }
  },
  "sections": [...]
}
```

---

## Project Boundaries: What Goes Where?

### ✅ MECS Standard (THIS PROJECT)
- Type definitions and schemas
- Documentation and examples
- Validation rules
- Standard specification

### 📦 Course Builder App (SEPARATE)
- UI for creating courses
- Classification wizard
- MECS JSON export

### 🔍 Concept Registry (SEPARATE)
- Database of canonical concepts
- Search/discovery API
- Course indexing

### 🎓 Platform Implementations (SEPARATE)
- LMS integrations
- Course marketplaces
- Learning apps

---

## Key Design Decisions

### ✅ DO

- Keep MECS as a data format standard
- Make classification optional (backward compatible)
- Support extensibility via metadata
- Provide clear examples
- Document recommended practices

### ❌ DON'T

- Build hosting/serving infrastructure here
- Create user interfaces in this repo
- Implement search/recommendation engines
- Lock into specific educational frameworks
- Over-complicate the taxonomy

---

## Next Steps

1. **Review this proposal** - Does the taxonomy make sense?
2. **Define boundaries** - Clear on what's in/out of scope?
3. **Implement Phase 1** - Update types and schemas
4. **Create examples** - Build reference courses
5. **Get feedback** - Test with real content creators

---

## FAQ

**Q: Why not use Bloom's Taxonomy?**
A: Bloom's is pedagogically rigorous but complex. We want something simpler that non-educators can use.

**Q: Can one course target multiple levels?**
A: No. Create separate courses. Use `mecs:module-ref` to share common content modules.

**Q: What if my course doesn't fit these categories?**
A: Classification is optional! Traditional MECS courses work fine without it.

**Q: Can I add custom levels?**
A: Not in v1. We're standardizing. Use `metadata.tags` for platform-specific categorization.

**Q: How do I handle prerequisites?**
A: Use existing `metadata.prerequisites` array. It's independent of classification.

---

## Visual: Classification Matrix

```
                        PROFICIENCY LEVEL
                   understand  discuss  teach  research
                   ─────────────────────────────────────
pre-k              │    ✓    │       │      │         │
k-2                │    ✓    │   ✓   │      │         │
3-6                │    ✓    │   ✓   │  ✓   │         │
7-8                │    ✓    │   ✓   │  ✓   │         │
9-10               │    ✓    │   ✓   │  ✓   │         │
11-12              │    ✓    │   ✓   │  ✓   │    ?    │
undergrad-lower    │    ✓    │   ✓   │  ✓   │    ?    │
undergrad-upper    │    ?    │   ✓   │  ✓   │    ✓    │
grad-breadth       │    ?    │   ✓   │  ✓   │    ✓    │
phd-depth          │         │   ?   │  ✓   │    ✓    │

Legend: ✓ = Common, ? = Possible but uncommon
```

---

**For detailed information, see:** [learning-course-builder.md](learning-course-builder.md)
