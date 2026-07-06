"""History storage placeholder."""
from sqlalchemy.orm import Session

from .models import OCRHistory


# ==========================
# Create
# ==========================

def create_history(
    db: Session,
    filename: str,
    extracted_text: str,
    confidence: float
):

    history = OCRHistory(
        filename=filename,
        extracted_text=extracted_text,
        confidence=confidence
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    return history


# ==========================
# Get All
# ==========================

def get_all_history(
    db: Session
):

    return (
        db.query(OCRHistory)
        .order_by(OCRHistory.id.desc())
        .all()
    )


# ==========================
# Get One
# ==========================

def get_history_by_id(
    db: Session,
    history_id: int
):

    return (
        db.query(OCRHistory)
        .filter(OCRHistory.id == history_id)
        .first()
    )


# ==========================
# Update
# ==========================

def update_history(
    db: Session,
    history_id: int,
    extracted_text: str,
    confidence: float
):

    history = (
        db.query(OCRHistory)
        .filter(OCRHistory.id == history_id)
        .first()
    )

    if history is None:
        return None

    history.extracted_text = extracted_text
    history.confidence = confidence

    db.commit()
    db.refresh(history)

    return history


# ==========================
# Delete One
# ==========================

def delete_history(
    db: Session,
    history_id: int
):

    history = (
        db.query(OCRHistory)
        .filter(OCRHistory.id == history_id)
        .first()
    )

    if history is None:
        return False

    db.delete(history)
    db.commit()

    return True


# ==========================
# Delete All
# ==========================

def delete_all_history(
    db: Session
):

    db.query(OCRHistory).delete()

    db.commit()


# ==========================
# Count Records
# ==========================

def count_history(
    db: Session
):

    return db.query(OCRHistory).count()