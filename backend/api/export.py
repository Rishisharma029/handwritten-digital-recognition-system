"""Export API using proper export classes."""
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os

from backend.exports.pdf_export import PDFExporter
from backend.exports.docx_export import DocxExporter
from backend.exports.txt_export import TxtExporter
from backend.exports.json_export import JSONExporter
from backend.utils.constants import PDF_OUTPUT, DOCX_OUTPUT, TXT_OUTPUT, JSON_OUTPUT

router = APIRouter(
    prefix="/export",
    tags=["Export"]
)


class ExportRequest(BaseModel):
    filename: str
    text: str
    confidence: float = 0.0
    engine: str = "TrOCR"
    language: str = "English"


# Create output directories
for directory in [PDF_OUTPUT, DOCX_OUTPUT, TXT_OUTPUT, JSON_OUTPUT]:
    os.makedirs(directory, exist_ok=True)


# -------------------------
# Export TXT
# -------------------------
@router.post("/txt")
async def export_txt(data: ExportRequest):
    try:
        exporter = TxtExporter(output_dir=TXT_OUTPUT)
        output_path = exporter.export(
            filename=data.filename,
            extracted_text=data.text,
            confidence=data.confidence / 100 if data.confidence > 1 else data.confidence,
            engine=data.engine,
            language=data.language
        )
        
        return FileResponse(
            output_path,
            filename=os.path.basename(output_path),
            media_type="text/plain"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -------------------------
# Export JSON
# -------------------------
@router.post("/json")
async def export_json(data: ExportRequest):
    try:
        exporter = JSONExporter(output_dir=JSON_OUTPUT)
        output_path = exporter.export(
            filename=data.filename,
            extracted_text=data.text,
            confidence=data.confidence / 100 if data.confidence > 1 else data.confidence,
            engine=data.engine,
            language=data.language
        )
        
        return FileResponse(
            output_path,
            filename=os.path.basename(output_path),
            media_type="application/json"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -------------------------
# Export PDF
# -------------------------
@router.post("/pdf")
async def export_pdf(data: ExportRequest):
    try:
        exporter = PDFExporter(output_dir=PDF_OUTPUT)
        output_path = exporter.export(
            filename=data.filename,
            extracted_text=data.text,
            confidence=data.confidence / 100 if data.confidence > 1 else data.confidence,
            engine=data.engine,
            language=data.language
        )
        
        return FileResponse(
            output_path,
            filename=os.path.basename(output_path),
            media_type="application/pdf"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -------------------------
# Export DOCX
# -------------------------
@router.post("/docx")
async def export_docx(data: ExportRequest):
    try:
        exporter = DocxExporter(output_dir=DOCX_OUTPUT)
        output_path = exporter.export(
            filename=data.filename,
            extracted_text=data.text,
            confidence=data.confidence / 100 if data.confidence > 1 else data.confidence,
            engine=data.engine,
            language=data.language
        )
        
        return FileResponse(
            output_path,
            filename=os.path.basename(output_path),
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))