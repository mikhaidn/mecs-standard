"""
MECS Python Type Definitions
Generated from MECS JSON Schema v0.2.0

Usage:
    from mecs_types import Course, Module, Section, TextContent

    course = Course(
        mecs_version="0.2.0",
        type="mecs:course",
        id="my-course",
        title="My Course",
        sections=[...]
    )
"""

from dataclasses import dataclass, field
from typing import Optional, List, Dict, Any, Union, Literal
from datetime import datetime
from enum import Enum


# ============================================================================
# Enums
# ============================================================================

class DifficultyLevel(str, Enum):
    """Course/module difficulty level"""
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"


class SectionDifficulty(str, Enum):
    """Section difficulty level"""
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


class ContentFormat(str, Enum):
    """Text content format"""
    MARKDOWN = "markdown"
    HTML = "html"
    PLAIN = "plain"


class VideoProvider(str, Enum):
    """Video hosting provider"""
    YOUTUBE = "youtube"
    VIMEO = "vimeo"
    CUSTOM = "custom"


class TimeUnit(str, Enum):
    """Duration time unit"""
    SECONDS = "seconds"
    MINUTES = "minutes"
    HOURS = "hours"
    DAYS = "days"
    WEEKS = "weeks"
    MONTHS = "months"


class CacheStrategyType(str, Enum):
    """Module caching strategy"""
    ALWAYS_FETCH = "always-fetch"
    CACHE_FIRST = "cache-first"
    NETWORK_FIRST = "network-first"


# ============================================================================
# Common Data Classes
# ============================================================================

@dataclass
class Duration:
    """Time duration specification"""
    value: float
    unit: TimeUnit


@dataclass
class CacheStrategy:
    """Caching strategy for module imports"""
    strategy: CacheStrategyType = CacheStrategyType.NETWORK_FIRST
    ttl: Optional[int] = None  # Time to live in seconds


@dataclass
class ModuleOverrides:
    """Overrides for imported modules"""
    metadata: Optional[Dict[str, Any]] = None
    section_order: Optional[List[str]] = None
    exclude_sections: Optional[List[str]] = None


# ============================================================================
# Metadata Classes
# ============================================================================

@dataclass
class CourseMetadata:
    """Course metadata"""
    author: Optional[str] = None
    institution: Optional[str] = None
    subject: Optional[str] = None
    level: Optional[DifficultyLevel] = None
    language: Optional[str] = None  # ISO 639-1 code
    duration: Optional[Duration] = None
    prerequisites: List[str] = field(default_factory=list)
    learning_objectives: List[str] = field(default_factory=list)
    tags: List[str] = field(default_factory=list)
    license: Optional[str] = None
    version: Optional[str] = None


@dataclass
class ModuleMetadata:
    """Module metadata"""
    author: Optional[str] = None
    institution: Optional[str] = None
    subject: Optional[str] = None
    level: Optional[DifficultyLevel] = None
    language: Optional[str] = None
    duration: Optional[Duration] = None
    prerequisites: List[str] = field(default_factory=list)
    learning_objectives: List[str] = field(default_factory=list)
    tags: List[str] = field(default_factory=list)
    license: Optional[str] = None
    version: Optional[str] = None


@dataclass
class SectionMetadata:
    """Section metadata"""
    duration: Optional[Duration] = None
    difficulty: Optional[SectionDifficulty] = None
    learning_objectives: List[str] = field(default_factory=list)
    keywords: List[str] = field(default_factory=list)
    is_optional: bool = False
    prerequisites: List[str] = field(default_factory=list)


# ============================================================================
# Content Type Classes
# ============================================================================

@dataclass
class TextContent:
    """Text content (markdown, HTML, plain text)"""
    format: ContentFormat
    text: str


@dataclass
class VideoContent:
    """Video content"""
    url: str
    provider: Optional[VideoProvider] = None
    title: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[int] = None  # Duration in seconds
    transcript: Optional[str] = None
    thumbnail_url: Optional[str] = None
    custom_fields: Dict[str, Any] = field(default_factory=dict)


@dataclass
class DocumentContent:
    """Document content (PDF, Word, etc.)"""
    url: str
    title: Optional[str] = None
    doc_type: Optional[str] = None  # pdf, docx, pptx, etc.
    description: Optional[str] = None
    file_size: Optional[int] = None  # Size in bytes
    pages: Optional[int] = None
    downloadable: bool = True
    custom_fields: Dict[str, Any] = field(default_factory=dict)


@dataclass
class ModuleRefContent:
    """Module reference (import external module)"""
    url: str
    title: Optional[str] = None
    description: Optional[str] = None
    cache: Optional[CacheStrategy] = None
    overrides: Optional[ModuleOverrides] = None


# Union type for all content types
ContentType = Union[TextContent, VideoContent, DocumentContent, ModuleRefContent, Dict[str, Any]]


# ============================================================================
# Core Classes
# ============================================================================

@dataclass
class Section:
    """Course/module section"""
    id: str
    title: str
    content_type: str  # e.g., "mecs:text", "mecs:video", "mecs:module-ref"
    content: ContentType
    order: Optional[int] = None
    metadata: Optional[SectionMetadata] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    def is_text(self) -> bool:
        """Check if content is text"""
        return isinstance(self.content, TextContent)

    def is_video(self) -> bool:
        """Check if content is video"""
        return isinstance(self.content, VideoContent)

    def is_document(self) -> bool:
        """Check if content is document"""
        return isinstance(self.content, DocumentContent)

    def is_module_ref(self) -> bool:
        """Check if content is module reference"""
        return isinstance(self.content, ModuleRefContent)


@dataclass
class Course:
    """MECS Course"""
    mecs_version: str  # e.g., "0.2.0"
    type: Literal["mecs:course"]
    id: str
    title: str
    sections: List[Section]
    description: Optional[str] = None
    metadata: Optional[CourseMetadata] = None
    assessments: Optional[Dict[str, Any]] = None  # Future: typed assessments
    extensions: Dict[str, Any] = field(default_factory=dict)
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    def __post_init__(self):
        """Validate course after initialization"""
        if self.type != "mecs:course":
            raise ValueError(f"Invalid type: {self.type}, expected 'mecs:course'")
        if not self.sections:
            raise ValueError("Course must have at least one section")

    def get_section(self, section_id: str) -> Optional[Section]:
        """Get section by ID"""
        return next((s for s in self.sections if s.id == section_id), None)

    def add_section(self, section: Section) -> None:
        """Add a section to the course"""
        self.sections.append(section)

    def remove_section(self, section_id: str) -> bool:
        """Remove a section by ID"""
        original_len = len(self.sections)
        self.sections = [s for s in self.sections if s.id != section_id]
        return len(self.sections) < original_len


@dataclass
class Module:
    """MECS Module (standalone, reusable)"""
    mecs_version: str
    type: Literal["mecs:module"]
    id: str
    title: str
    sections: List[Section]
    description: Optional[str] = None
    metadata: Optional[ModuleMetadata] = None
    extensions: Dict[str, Any] = field(default_factory=dict)
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    def __post_init__(self):
        """Validate module after initialization"""
        if self.type != "mecs:module":
            raise ValueError(f"Invalid type: {self.type}, expected 'mecs:module'")
        if not self.sections:
            raise ValueError("Module must have at least one section")

    def get_section(self, section_id: str) -> Optional[Section]:
        """Get section by ID"""
        return next((s for s in self.sections if s.id == section_id), None)

    def add_section(self, section: Section) -> None:
        """Add a section to the module"""
        self.sections.append(section)


# ============================================================================
# Assessment Classes (Placeholders for future)
# ============================================================================

@dataclass
class Quiz:
    """Quiz assessment (future implementation)"""
    pass


@dataclass
class Assignment:
    """Assignment (future implementation)"""
    pass


@dataclass
class Exam:
    """Exam (future implementation)"""
    pass


@dataclass
class Assessments:
    """All assessments for a course"""
    quizzes: List[Quiz] = field(default_factory=list)
    assignments: List[Assignment] = field(default_factory=list)
    exams: List[Exam] = field(default_factory=list)


# ============================================================================
# Validation Classes
# ============================================================================

@dataclass
class ValidationError:
    """Validation error"""
    field: str
    message: str
    code: str


@dataclass
class ValidationResult:
    """Validation result"""
    valid: bool
    errors: List[ValidationError] = field(default_factory=list)


# ============================================================================
# Builder Classes
# ============================================================================

class CourseBuilder:
    """Builder for constructing Course objects"""

    def __init__(self, id: str, title: str, mecs_version: str = "0.2.0"):
        self._course_data = {
            "mecs_version": mecs_version,
            "type": "mecs:course",
            "id": id,
            "title": title,
            "sections": [],
        }

    def with_description(self, description: str) -> 'CourseBuilder':
        """Set course description"""
        self._course_data["description"] = description
        return self

    def with_metadata(self, metadata: CourseMetadata) -> 'CourseBuilder':
        """Set course metadata"""
        self._course_data["metadata"] = metadata
        return self

    def add_section(self, section: Section) -> 'CourseBuilder':
        """Add a section"""
        self._course_data["sections"].append(section)
        return self

    def with_extensions(self, extensions: Dict[str, Any]) -> 'CourseBuilder':
        """Set extensions"""
        self._course_data["extensions"] = extensions
        return self

    def build(self) -> Course:
        """Build the course"""
        return Course(**self._course_data)


class ModuleBuilder:
    """Builder for constructing Module objects"""

    def __init__(self, id: str, title: str, mecs_version: str = "0.2.0"):
        self._module_data = {
            "mecs_version": mecs_version,
            "type": "mecs:module",
            "id": id,
            "title": title,
            "sections": [],
        }

    def with_description(self, description: str) -> 'ModuleBuilder':
        """Set module description"""
        self._module_data["description"] = description
        return self

    def with_metadata(self, metadata: ModuleMetadata) -> 'ModuleBuilder':
        """Set module metadata"""
        self._module_data["metadata"] = metadata
        return self

    def add_section(self, section: Section) -> 'ModuleBuilder':
        """Add a section"""
        self._module_data["sections"].append(section)
        return self

    def build(self) -> Module:
        """Build the module"""
        return Module(**self._module_data)


# ============================================================================
# Type Aliases
# ============================================================================

MECSDocument = Union[Course, Module]
MECSType = Literal["mecs:course", "mecs:module"]


# ============================================================================
# Example Usage
# ============================================================================

if __name__ == "__main__":
    # Example: Creating a course with builder pattern
    course = (
        CourseBuilder("intro-python", "Introduction to Python")
        .with_description("Learn Python from scratch")
        .with_metadata(
            CourseMetadata(
                author="Dr. Jane Doe",
                level=DifficultyLevel.BEGINNER,
                duration=Duration(value=8, unit=TimeUnit.WEEKS),
                tags=["python", "programming", "beginner"],
            )
        )
        .add_section(
            Section(
                id="sec-001",
                title="Welcome",
                content_type="mecs:text",
                content=TextContent(
                    format=ContentFormat.MARKDOWN,
                    text="# Welcome to Python!\n\nLet's start learning.",
                ),
            )
        )
        .add_section(
            Section(
                id="sec-002",
                title="First Video",
                content_type="mecs:video",
                content=VideoContent(
                    url="https://youtube.com/watch?v=...",
                    provider=VideoProvider.YOUTUBE,
                    title="Python Basics",
                ),
            )
        )
        .build()
    )

    print(f"Created course: {course.title}")
    print(f"Number of sections: {len(course.sections)}")
