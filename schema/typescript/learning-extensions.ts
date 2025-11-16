/**
 * MECS Learning Course Builder Extensions
 * Proposed additions to MECS v0.3.0 for classification and discovery
 */

// ============================================================================
// Learning Classification Types
// ============================================================================

/**
 * Type of learning content being taught
 */
export type LearningType =
  | "skill"      // Practical ability to perform actions
  | "concept"    // Theoretical understanding of ideas
  | "event";     // Historical or specific occurrences

/**
 * Academic level of the target learner
 */
export type AcademicLevel =
  | "pre-k"              // Pre-Kindergarten (ages 0-5)
  | "k-2"                // Kindergarten to 2nd grade (ages 5-7)
  | "3-6"                // 3rd to 6th grade (ages 8-11)
  | "7-8"                // 7th to 8th grade (ages 12-13)
  | "9-10"               // 9th to 10th grade (ages 14-15)
  | "11-12"              // 11th to 12th grade (ages 16-17)
  | "undergrad-lower"    // College underclassman (ages 18-19)
  | "undergrad-upper"    // College upperclassman (ages 20-21)
  | "grad-breadth"       // Graduate breadth (ages 22+)
  | "phd-depth";         // PhD/novel depth (research level)

/**
 * Target proficiency level the learner should achieve
 */
export type ProficiencyLevel =
  | "understand"   // Can comprehend discussions and ask meaningful questions
  | "discuss"      // Can hold conversations and explain to others
  | "teach"        // Can lecture, write articles, or lead independent projects
  | "research";    // Can conduct novel research and create new concepts

// ============================================================================
// Canonical Concept Reference
// ============================================================================

/**
 * Reference to a canonical concept (e.g., Wikipedia article)
 */
export interface CanonicalConceptRef {
  /**
   * Unique identifier for the canonical concept
   * Example: "arithmetic", "photosynthesis", "french-revolution"
   */
  conceptId: string;

  /**
   * Display title of the concept
   */
  title: string;

  /**
   * URL to the canonical source (Wikipedia, textbook, etc.)
   */
  sourceUrl?: string;

  /**
   * Type of canonical source
   */
  sourceType?: "wikipedia" | "academic" | "textbook" | "custom";

  /**
   * Additional metadata about the concept
   */
  metadata?: {
    subject?: string;          // e.g., "Mathematics", "Biology"
    domain?: string;           // e.g., "STEM", "Humanities"
    wikiPageId?: string;       // Wikipedia page ID
    lastVerified?: string;     // ISO 8601 timestamp
    [key: string]: unknown;
  };
}

// ============================================================================
// Extended Metadata Interfaces
// ============================================================================

/**
 * Extended CourseMetadata with learning classification
 */
export interface ExtendedCourseMetadata {
  // Existing MECS fields
  author?: string;
  institution?: string;
  subject?: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert"; // Legacy, prefer academicLevel
  language?: string;
  duration?: {
    value: number;
    unit: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months";
  };
  prerequisites?: string[];
  learningObjectives?: string[];
  tags?: string[];
  license?: string;
  version?: string;

  // NEW: Learning Course Builder extensions

  /**
   * Reference to the canonical concept this course teaches
   */
  canonicalConcept?: CanonicalConceptRef;

  /**
   * Type of learning content
   */
  learningType?: LearningType;

  /**
   * Academic level of target learner
   */
  academicLevel?: AcademicLevel;

  /**
   * Target proficiency level
   */
  proficiencyLevel?: ProficiencyLevel;

  /**
   * Alternative courses for the same concept
   */
  relatedCourses?: RelatedCourse[];
}

/**
 * Reference to related courses (same concept, different classification)
 */
export interface RelatedCourse {
  courseId: string;
  title: string;
  mecsUrl?: string;
  relationship: "prerequisite" | "next-level" | "alternative" | "supplement";
  learningType?: LearningType;
  academicLevel?: AcademicLevel;
  proficiencyLevel?: ProficiencyLevel;
}

// ============================================================================
// Concept Registry Types
// ============================================================================

/**
 * Registry entry for a canonical concept
 * (This is for concept registry service, not part of MECS standard)
 */
export interface ConceptRegistryEntry {
  conceptId: string;
  canonicalSource: string;
  title: string;
  description?: string;
  subjects?: string[];

  /**
   * Available courses for this concept
   */
  courses: ConceptCourseRef[];

  /**
   * Metadata
   */
  createdAt: string;
  updatedAt: string;
  courseCount: number;
}

/**
 * Reference to a course in the concept registry
 */
export interface ConceptCourseRef {
  courseId: string;
  title: string;
  mecsUrl: string;
  learningType: LearningType;
  academicLevel: AcademicLevel;
  proficiencyLevel: ProficiencyLevel;
  author?: string;
  rating?: number;
  enrollmentCount?: number;
}

// ============================================================================
// Search and Query Types
// ============================================================================

/**
 * Query parameters for searching courses
 */
export interface CourseSearchQuery {
  conceptId?: string;
  learningType?: LearningType | LearningType[];
  academicLevel?: AcademicLevel | AcademicLevel[];
  proficiencyLevel?: ProficiencyLevel | ProficiencyLevel[];
  subject?: string;
  language?: string;
  tags?: string[];
  author?: string;

  // Pagination
  limit?: number;
  offset?: number;

  // Sorting
  sortBy?: "relevance" | "rating" | "recent" | "popular";
}

/**
 * Search result
 */
export interface CourseSearchResult {
  courses: ConceptCourseRef[];
  total: number;
  query: CourseSearchQuery;
  facets?: SearchFacets;
}

/**
 * Search facets for filtering
 */
export interface SearchFacets {
  learningTypes: { type: LearningType; count: number }[];
  academicLevels: { level: AcademicLevel; count: number }[];
  proficiencyLevels: { level: ProficiencyLevel; count: number }[];
  subjects: { subject: string; count: number }[];
}

// ============================================================================
// Validation Types
// ============================================================================

/**
 * Compatibility rule for classification combinations
 */
export interface CompatibilityRule {
  academicLevel: AcademicLevel;
  validProficiencyLevels: ProficiencyLevel[];
  recommendedLearningTypes?: LearningType[];
  note?: string;
}

/**
 * Validation result for classification
 */
export interface ClassificationValidation {
  valid: boolean;
  warnings: string[];
  errors: string[];
  suggestions?: string[];
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Validate if a classification combination is reasonable
 */
export function validateClassification(
  learningType: LearningType,
  academicLevel: AcademicLevel,
  proficiencyLevel: ProficiencyLevel
): ClassificationValidation {
  const warnings: string[] = [];
  const errors: string[] = [];
  const suggestions: string[] = [];

  // Pre-K should typically only target "understand"
  if (academicLevel === "pre-k" && proficiencyLevel !== "understand") {
    warnings.push("Pre-K courses typically target 'understand' proficiency level");
  }

  // PhD should typically target higher proficiency
  if (academicLevel === "phd-depth" && proficiencyLevel === "understand") {
    warnings.push("PhD-level courses typically target 'teach' or 'research' proficiency");
  }

  // Research proficiency uncommon for lower levels
  if (
    proficiencyLevel === "research" &&
    ["pre-k", "k-2", "3-6", "7-8"].includes(academicLevel)
  ) {
    errors.push("Research proficiency is not appropriate for elementary/middle school levels");
  }

  // Events are typically taught as concepts at lower levels
  if (learningType === "event" && ["pre-k", "k-2"].includes(academicLevel)) {
    suggestions.push("Consider teaching historical events as simplified concepts for young learners");
  }

  return {
    valid: errors.length === 0,
    warnings,
    errors,
    suggestions,
  };
}

/**
 * Get academic level display name
 */
export function getAcademicLevelLabel(level: AcademicLevel): string {
  const labels: Record<AcademicLevel, string> = {
    "pre-k": "Pre-Kindergarten",
    "k-2": "K-2nd Grade",
    "3-6": "3rd-6th Grade",
    "7-8": "7th-8th Grade",
    "9-10": "9th-10th Grade",
    "11-12": "11th-12th Grade",
    "undergrad-lower": "College Underclassman",
    "undergrad-upper": "College Upperclassman",
    "grad-breadth": "Graduate Breadth",
    "phd-depth": "PhD/Research Level",
  };
  return labels[level];
}

/**
 * Get proficiency level description
 */
export function getProficiencyDescription(level: ProficiencyLevel): string {
  const descriptions: Record<ProficiencyLevel, string> = {
    understand: "Can comprehend discussions and ask meaningful questions",
    discuss: "Can hold conversations and explain to others",
    teach: "Can lecture, write articles, or lead independent projects",
    research: "Can conduct novel research and create new concepts",
  };
  return descriptions[level];
}

/**
 * Generate a course ID from classification
 */
export function generateCourseId(
  conceptId: string,
  learningType: LearningType,
  academicLevel: AcademicLevel,
  proficiencyLevel: ProficiencyLevel
): string {
  return `${conceptId}-${academicLevel}-${learningType}-${proficiencyLevel}`;
}

// ============================================================================
// Example Usage
// ============================================================================

/**
 * Example: Creating a classified course
 */
export const exampleClassifiedCourse = {
  mecsVersion: "0.3.0",
  type: "mecs:course" as const,
  id: "arithmetic-k2-skill-discuss",
  title: "Basic Arithmetic for Kindergarten",
  description: "Learn to add and subtract numbers 1-10",

  metadata: {
    canonicalConcept: {
      conceptId: "arithmetic",
      title: "Arithmetic",
      sourceUrl: "https://en.wikipedia.org/wiki/Arithmetic",
      sourceType: "wikipedia" as const,
    },
    learningType: "skill" as LearningType,
    academicLevel: "k-2" as AcademicLevel,
    proficiencyLevel: "discuss" as ProficiencyLevel,

    author: "Jane Teacher",
    subject: "Mathematics",
    language: "en",
    duration: {
      value: 12,
      unit: "weeks" as const,
    },
    learningObjectives: [
      "Count from 1 to 10",
      "Add single-digit numbers",
      "Subtract single-digit numbers",
      "Explain addition to peers",
    ],
    tags: ["math", "arithmetic", "kindergarten", "elementary"],

    relatedCourses: [
      {
        courseId: "arithmetic-36-skill-teach",
        title: "Arithmetic Mastery for 3rd-6th Grade",
        relationship: "next-level" as const,
        learningType: "skill" as LearningType,
        academicLevel: "3-6" as AcademicLevel,
        proficiencyLevel: "teach" as ProficiencyLevel,
      },
    ],
  } as ExtendedCourseMetadata,

  sections: [
    {
      id: "intro",
      title: "Introduction to Numbers",
      order: 1,
      contentType: "mecs:text",
      content: {
        format: "markdown",
        text: "# Welcome to Arithmetic!\n\nLet's learn about numbers!",
      },
    },
  ],
};

// ============================================================================
// Type Exports
// ============================================================================

export type {
  LearningType,
  AcademicLevel,
  ProficiencyLevel,
  CanonicalConceptRef,
  ExtendedCourseMetadata,
  RelatedCourse,
  ConceptRegistryEntry,
  ConceptCourseRef,
  CourseSearchQuery,
  CourseSearchResult,
  SearchFacets,
  CompatibilityRule,
  ClassificationValidation,
};
