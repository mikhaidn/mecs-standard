# Related Standards

How MECS relates to other educational technology standards.

## Similar Standards

### SCORM
**Purpose:** E-learning content packaging
**Difference:** SCORM is XML-based and complex; MECS is JSON and simpler
**Relationship:** Could export MECS → SCORM for LMS compatibility

### IMS Common Cartridge
**Purpose:** Packaging digital learning materials
**Difference:** MECS focuses on structure, not packaging
**Relationship:** MECS courses could be packaged as Common Cartridge

### xAPI (Tin Can)
**Purpose:** Tracking learning activities
**Difference:** xAPI tracks experiences; MECS structures content
**Relationship:** Complementary - use both together

### QTI (Question & Test Interoperability)
**Purpose:** Assessment content
**Difference:** QTI is XML-based; MECS aims for simpler JSON
**Relationship:** Future `mecs:quiz` inspired by QTI concepts

## Complementary Standards

### LTI (Learning Tools Interoperability)
- **Use together:** Deliver MECS content via LTI tools

### Schema.org/Course
- **Use together:** Add Schema.org markup to MECS courses for SEO

### Caliper Analytics
- **Use together:** Track MECS course engagement with Caliper

## Why MECS?

Existing standards solve important problems but:
- Often XML-based (verbose, complex)
- Designed for enterprise LMS (heavyweight)
- Difficult for developers to adopt

**MECS aims to be:**
- Simple (JSON, not XML)
- Developer-friendly
- Web-first
- Easy to adopt

## See Also

- [SCORM documentation](https://scorm.com/)
- [IMS Global standards](https://www.imsglobal.org/)
- [xAPI specification](https://xapi.com/)
