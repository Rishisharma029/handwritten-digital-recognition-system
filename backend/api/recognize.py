"""Recognition API for OCR processing and history persistence."""
import time
import logging
from pathlib import Path

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from pydantic import BaseModel

from backend.database.database import SessionLocal
from backend.database.models import Document, OCRHistory
from backend.ocr.engine_manager import engine_manager
from backend.utils.constants import UPLOAD_DIR
from backend.utils.image_loader import get_file_type, load_image_from_path
from backend.utils.validators import Validator

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/recognize", tags=["Recognition"])

UPLOAD_FOLDER = Path(UPLOAD_DIR)
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)


class OCRResponse(BaseModel):
    filename: str
    extracted_text: str
    confidence: float
    engine: str = "EasyOCR"
    processing_time: float = 0.0
    language: str = "English"


def _persist_history(
    filename: str,
    text: str,
    confidence: float,
    processing_time: float,
    engine: str,
    language: str,
    file_path: Path,
    file_type: str,
    file_size: int,
):
    db = SessionLocal()
    try:
        document = Document(
            filename=filename,
            original_filename=filename,
            file_path=str(file_path),
            file_type=file_type,
            file_size=file_size,
        )
        db.add(document)
        db.commit()
        db.refresh(document)

        history_entry = OCRHistory(
            document_id=document.id,
            extracted_text=text,
            confidence=confidence,
            processing_time=processing_time,
            engine=engine,
            language=language,
        )
        db.add(history_entry)
        db.commit()
    finally:
        db.close()


@router.post("/", response_model=OCRResponse)
async def recognize(
    file: UploadFile = File(...),
    engine: str = Form("TrOCR"),
    language: str = Form("English"),
    gpu: bool = Form(False),
    auto_save: bool = Form(True),
):
    logger.info(f"Recognition request received. Engine: {engine}, File: {file.filename}")
    
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file selected")

    start_time = time.time()

    try:
        safe_name = Path(file.filename).name
        logger.info(f"Processing file: {safe_name}")
        
        Validator.validate_filename(safe_name)
        Validator.validate_extension(safe_name)
        Validator.validate_engine(engine)
        Validator.validate_language(language)

        content = await file.read()
        logger.info(f"File read. Size: {len(content)} bytes")
        Validator.validate_size(len(content))

        destination = UPLOAD_FOLDER / safe_name
        destination.write_bytes(content)
        logger.info(f"File saved to: {destination}")

        image = load_image_from_path(str(destination))
        logger.info(f"Image loaded. Shape: {image.shape}")
        Validator.validate_dimensions(image)

        logger.info(f"Starting OCR with engine: {engine}")
        ocr_result = engine_manager.recognize(
            image,
            engine=engine,
            language=language,
            gpu=gpu,
        )
        logger.info(f"OCR completed. Result: {ocr_result}")

        extracted_text = ocr_result.get("text", "")
        confidence = float(ocr_result.get("confidence") or 0.0)
        engine_name = ocr_result.get("engine", engine)
        language_name = ocr_result.get("language", language)
        processing_time = round(time.time() - start_time, 3)

        logger.info(f"Processing time: {processing_time}s, Confidence: {confidence}%")

        if auto_save:
            _persist_history(
                safe_name,
                extracted_text,
                confidence,
                processing_time,
                engine_name,
                language_name,
                destination,
                get_file_type(safe_name),
                len(content),
            )

        return OCRResponse(
            filename=safe_name,
            extracted_text=extracted_text,
            confidence=confidence,
            engine=engine_name,
            processing_time=processing_time,
            language=language_name,
        )
    except HTTPException:
        raise
    except ValueError as exc:
        logger.error(f"Validation error: {exc}")
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        logger.error(f"Recognition error: {exc}")
        raise HTTPException(status_code=500, detail=str(exc)) from exc
