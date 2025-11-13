/**
 * MECS TypeScript Type Definitions
 * Generated from MECS JSON Schema v0.2.0
 */

// ============================================================================
// Core Types
// ============================================================================

export type MECSVersion = string; // Pattern: ^\d+\.\d+\.\d+$
export type ISO8601DateTime = string;
export type LanguageCode = string; // ISO 639-1
export type ContentTypeIdentifier = string; // Pattern: ^[a-z0-9-]+:[a-z0-9-]+$

// ============================================================================
// Course
// ============================================================================

export interface Course {
  mecsVersion: MECSVersion;
  type: "mecs:course";
  id: string;
  title: string;
  description?: string;
  metadata?: CourseMetadata;
  sections: Section[];
  assessments?: Assessments;
  extensions?: Record<string, unknown>;
  createdAt?: ISO8601DateTime;
  updatedAt?: ISO8601DateTime;
}

export interface CourseMetadata {
  author?: string;
  institution?: string;
  subject?: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  language?: LanguageCode;
  duration?: Duration;
  prerequisites?: string[];
  learningObjectives?: string[];
  tags?: string[];
  license?: string;
  version?: string;
}

// ============================================================================
// Module
// ============================================================================

export interface Module {
  mecsVersion: MECSVersion;
  type: "mecs:module";
  id: string;
  title: string;
  description?: string;
  metadata?: ModuleMetadata;
  sections: Section[];
  extensions?: Record<string, unknown>;
  createdAt?: ISO8601DateTime;
  updatedAt?: ISO8601DateTime;
}

export interface ModuleMetadata {
  author?: string;
  institution?: string;
  subject?: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  language?: LanguageCode;
  duration?: Duration;
  prerequisites?: string[];
  learningObjectives?: string[];
  tags?: string[];
  license?: string;
  version?: string;
}

// ============================================================================
// Section
// ============================================================================

export interface Section {
  id: string;
  title: string;
  order?: number;
  contentType: ContentTypeIdentifier;
  content: SectionContent;
  metadata?: SectionMetadata;
  createdAt?: ISO8601DateTime;
  updatedAt?: ISO8601DateTime;
}

export interface SectionMetadata {
  duration?: Duration;
  difficulty?: "easy" | "medium" | "hard";
  learningObjectives?: string[];
  keywords?: string[];
  isOptional?: boolean;
  prerequisites?: string[];
}

export type SectionContent =
  | TextContent
  | VideoContent
  | DocumentContent
  | ModuleRefContent
  | Record<string, unknown>; // For custom content types

// ============================================================================
// Content Types
// ============================================================================

export interface TextContent {
  format: "markdown" | "html" | "plain";
  text: string;
}

export interface VideoContent {
  url: string;
  provider?: "youtube" | "vimeo" | "custom";
  title?: string;
  description?: string;
  duration?: number; // in seconds
  transcript?: string;
  thumbnailUrl?: string;
  [key: string]: unknown; // Allow custom fields
}

export interface DocumentContent {
  url: string;
  title?: string;
  docType?: "pdf" | "docx" | "pptx" | "xlsx" | "txt" | string;
  description?: string;
  fileSize?: number; // in bytes
  pages?: number;
  downloadable?: boolean;
  [key: string]: unknown; // Allow custom fields
}

export interface ModuleRefContent {
  url: string;
  title?: string;
  description?: string;
  cache?: CacheStrategy;
  overrides?: ModuleOverrides;
}

export interface CacheStrategy {
  strategy: "always-fetch" | "cache-first" | "network-first";
  ttl?: number; // Time to live in seconds
}

export interface ModuleOverrides {
  metadata?: Record<string, unknown>;
  sectionOrder?: string[];
  excludeSections?: string[];
}

// ============================================================================
// Common Types
// ============================================================================

export interface Duration {
  value: number;
  unit: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months";
}

export interface Assessments {
  quizzes?: Quiz[];
  assignments?: Assignment[];
  exams?: Exam[];
}

// Placeholder types for future assessment features
export interface Quiz {
  [key: string]: unknown;
}

export interface Assignment {
  [key: string]: unknown;
}

export interface Exam {
  [key: string]: unknown;
}

// ============================================================================
// Union Types for Convenience
// ============================================================================

export type MECSDocument = Course | Module;

export type MECSType = "mecs:course" | "mecs:module";

export type ContentType =
  | "mecs:text"
  | "mecs:video"
  | "mecs:document"
  | "mecs:module-ref"
  | "mecs:quiz"
  | "mecs:assignment"
  | string; // Allow custom content types

// ============================================================================
// Type Guards
// ============================================================================

export function isCourse(doc: MECSDocument): doc is Course {
  return doc.type === "mecs:course";
}

export function isModule(doc: MECSDocument): doc is Module {
  return doc.type === "mecs:module";
}

export function isTextContent(content: SectionContent): content is TextContent {
  return (
    typeof content === "object" &&
    "format" in content &&
    "text" in content
  );
}

export function isVideoContent(content: SectionContent): content is VideoContent {
  return (
    typeof content === "object" &&
    "url" in content &&
    (!("format" in content) || !("text" in content))
  );
}

export function isDocumentContent(content: SectionContent): content is DocumentContent {
  return (
    typeof content === "object" &&
    "url" in content &&
    "docType" in content
  );
}

export function isModuleRefContent(content: SectionContent): content is ModuleRefContent {
  return (
    typeof content === "object" &&
    "url" in content &&
    !("docType" in content) &&
    !("provider" in content)
  );
}

// ============================================================================
// Validation Types
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

// ============================================================================
// Utility Types
// ============================================================================

export type PartialCourse = Partial<Course> & Pick<Course, "mecsVersion" | "type" | "id" | "title">;
export type PartialModule = Partial<Module> & Pick<Module, "mecsVersion" | "type" | "id" | "title">;

export type RequiredMetadata<T> = T & Required<Pick<T extends { metadata?: infer M } ? M : never, "author" | "level">>;

// ============================================================================
// Builder Types (for easier construction)
// ============================================================================

export class CourseBuilder {
  private course: PartialCourse;

  constructor(id: string, title: string) {
    this.course = {
      mecsVersion: "0.2.0",
      type: "mecs:course",
      id,
      title,
      sections: [],
    };
  }

  withDescription(description: string): this {
    this.course.description = description;
    return this;
  }

  withMetadata(metadata: CourseMetadata): this {
    this.course.metadata = metadata;
    return this;
  }

  addSection(section: Section): this {
    this.course.sections.push(section);
    return this;
  }

  build(): Course {
    if (!this.course.sections || this.course.sections.length === 0) {
      throw new Error("Course must have at least one section");
    }
    return this.course as Course;
  }
}

export class ModuleBuilder {
  private module: PartialModule;

  constructor(id: string, title: string) {
    this.module = {
      mecsVersion: "0.2.0",
      type: "mecs:module",
      id,
      title,
      sections: [],
    };
  }

  withDescription(description: string): this {
    this.module.description = description;
    return this;
  }

  withMetadata(metadata: ModuleMetadata): this {
    this.module.metadata = metadata;
    return this;
  }

  addSection(section: Section): this {
    this.module.sections.push(section);
    return this;
  }

  build(): Module {
    if (!this.module.sections || this.module.sections.length === 0) {
      throw new Error("Module must have at least one section");
    }
    return this.module as Module;
  }
}

// ============================================================================
// Export all types
// ============================================================================

export type {
  Course,
  Module,
  Section,
  TextContent,
  VideoContent,
  DocumentContent,
  ModuleRefContent,
  CourseMetadata,
  ModuleMetadata,
  SectionMetadata,
  CacheStrategy,
  ModuleOverrides,
  Duration,
  Assessments,
  Quiz,
  Assignment,
  Exam,
};
