"""CRUD operations for database models."""
from sqlalchemy.orm import Session
from . import models
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class OCRHistoryCRUD:
    """CRUD operations for OCR history records."""
    
    @staticmethod
    def create(db: Session, file_name: str, original_text: str, 
               recognized_text: str, confidence_score: float, file_path: str):
        """Create a new OCR history record."""
        db_record = models.OCRHistory(
            file_name=file_name,
            original_text=original_text,
            recognized_text=recognized_text,
            confidence_score=confidence_score,
            file_path=file_path,
            created_at=datetime.utcnow()
        )
        db.add(db_record)
        db.commit()
        db.refresh(db_record)
        return db_record
    
    @staticmethod
    def get_by_id(db: Session, record_id: int):
        """Get a record by ID."""
        return db.query(models.OCRHistory).filter(
            models.OCRHistory.id == record_id
        ).first()
    
    @staticmethod
    def get_all(db: Session, skip: int = 0, limit: int = 100):
        """Get all records with pagination."""
        return db.query(models.OCRHistory).offset(skip).limit(limit).all()
    
    @staticmethod
    def delete(db: Session, record_id: int):
        """Delete a record by ID."""
        db_record = OCRHistoryCRUD.get_by_id(db, record_id)
        if db_record:
            db.delete(db_record)
            db.commit()
            return True
        return False
    
    @staticmethod
    def update(db: Session, record_id: int, **kwargs):
        """Update a record."""
        db_record = OCRHistoryCRUD.get_by_id(db, record_id)
        if db_record:
            for key, value in kwargs.items():
                if hasattr(db_record, key):
                    setattr(db_record, key, value)
            db.commit()
            db.refresh(db_record)
            return db_record
        return None
