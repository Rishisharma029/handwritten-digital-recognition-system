"""History API backed by SQLAlchemy and SQLite."""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.database.database import SessionLocal
from backend.database.models import OCRHistory

router = APIRouter(prefix="/history", tags=["History"])


class HistoryItem(BaseModel):
    filename: str
    extracted_text: str
    confidence: float
    engine: str = "EasyOCR"
    language: str = "English"


@router.post("/save")
async def save_history(item: HistoryItem):
    db = SessionLocal()
    try:
        history_entry = OCRHistory(
            extracted_text=item.extracted_text,
            confidence=item.confidence,
            engine=item.engine,
            language=item.language,
        )
        db.add(history_entry)
        db.commit()
    finally:
        db.close()

    return {"message": "History saved successfully"}


@router.get("/")
async def get_history():
    db = SessionLocal()
    try:
        records = db.query(OCRHistory).order_by(OCRHistory.created_at.desc()).all()
        return [
            {
                "id": record.id,
                "filename": record.document.original_filename if record.document else "unknown",
                "text": record.extracted_text,
                "confidence": record.confidence,
                "engine": record.engine,
                "language": record.language,
                "created_at": record.created_at.isoformat() if record.created_at else None,
            }
            for record in records
        ]
    finally:
        db.close()


@router.get("/{history_id}")
async def get_history_item(history_id: int):
    db = SessionLocal()
    try:
        record = db.query(OCRHistory).filter(OCRHistory.id == history_id).first()
    finally:
        db.close()

    if record is None:
        raise HTTPException(status_code=404, detail="History not found")

    return {
        "id": record.id,
        "filename": record.document.original_filename if record.document else "unknown",
        "text": record.extracted_text,
        "confidence": record.confidence,
        "engine": record.engine,
        "language": record.language,
        "created_at": record.created_at.isoformat() if record.created_at else None,
    }


@router.delete("/{history_id}")
async def delete_history(history_id: int):
    db = SessionLocal()
    try:
        record = db.query(OCRHistory).filter(OCRHistory.id == history_id).first()
        if record is None:
            raise HTTPException(status_code=404, detail="History not found")
        db.delete(record)
        db.commit()
    finally:
        db.close()

    return {"message": "History deleted successfully"}


@router.delete("/")
async def clear_history():
    db = SessionLocal()
    try:
        db.query(OCRHistory).delete()
        db.commit()
    finally:
        db.close()

    return {"message": "All history cleared"}