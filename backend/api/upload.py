"""Upload API for saving images before OCR processing."""
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile
from pydantic import BaseModel

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_FOLDER = Path("data/uploads")
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)


class UploadResponse(BaseModel):
    filename: str
    file_path: str
    content_type: str | None = None
    size: int


@router.post("/", response_model=UploadResponse)
async def upload_file(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file selected")

    safe_name = Path(file.filename).name
    destination = UPLOAD_FOLDER / safe_name
    content = await file.read()

    if not content:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    destination.write_bytes(content)

    return UploadResponse(
        filename=safe_name,
        file_path=str(destination),
        content_type=file.content_type,
        size=len(content),
    )