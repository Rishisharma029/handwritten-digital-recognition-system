"""Database models placeholder."""
from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    Text,
    ForeignKey,
)

from sqlalchemy.orm import relationship

from .database import Base


# ===========================================
# Uploaded Documents Table
# ===========================================

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String(255), nullable=False)

    original_filename = Column(String(255), nullable=False)

    file_path = Column(String(500), nullable=False)

    file_type = Column(String(50), nullable=False)

    file_size = Column(Integer)

    uploaded_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    history = relationship(
        "OCRHistory",
        back_populates="document",
        cascade="all, delete"
    )


# ===========================================
# OCR History Table
# ===========================================

class OCRHistory(Base):
    __tablename__ = "ocr_history"

    id = Column(Integer, primary_key=True, index=True)

    document_id = Column(
        Integer,
        ForeignKey("documents.id")
    )

    extracted_text = Column(
        Text,
        nullable=False
    )

    confidence = Column(Float)

    processing_time = Column(Float)

    engine = Column(
        String(50),
        default="EasyOCR"
    )

    language = Column(
        String(50),
        default="English"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    document = relationship(
        "Document",
        back_populates="history"
    )