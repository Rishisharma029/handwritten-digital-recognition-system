# API Documentation

Placeholder documentation for the OCR backend API.

# Handwritten Digital Recognition System API Documentation

Version: 1.0.0

Base URL

```
http://localhost:8000/api/v1
```

Swagger Documentation

```
http://localhost:8000/docs
```

ReDoc Documentation

```
http://localhost:8000/redoc
```

---

# Authentication

Currently authentication is not required.

Future versions will support JWT Authentication.

---

# Response Format

Successful Response

```json
{
    "success": true,
    "message": "Operation completed successfully",
    "data": {}
}
```

Error Response

```json
{
    "success": false,
    "message": "Error description"
}
```

---

# Upload API

Upload an image or PDF.

Endpoint

```
POST /upload
```

Request

```
multipart/form-data
```

Field

| Name | Type | Required |
|------|------|----------|
| file | File | Yes |

Supported Formats

- JPG
- JPEG
- PNG
- BMP
- TIFF
- WEBP
- PDF

Example Response

```json
{
    "message": "File uploaded successfully",
    "saved_filename": "c91ab2f7d.jpg",
    "file_path": "data/uploads/c91ab2f7d.jpg"
}
```

---

# OCR Recognition API

Recognize handwritten text.

Endpoint

```
POST /recognize
```

Request

```
multipart/form-data
```

Field

| Name | Type |
|------|------|
| file | File |

Example Response

```json
{
    "engine": "EasyOCR",
    "text": "Hello World",
    "confidence": 98.76,
    "detections": 5
}
```

Supported OCR Engines

- EasyOCR
- TrOCR
- PaddleOCR
- Tesseract OCR

---

# Export API

Export OCR output.

## Export TXT

```
POST /export/txt
```

## Export PDF

```
POST /export/pdf
```

## Export DOCX

```
POST /export/docx
```

## Export JSON

```
POST /export/json
```

Request Body

```json
{
    "filename": "notes",
    "text": "Hello World"
}
```

---

# History API

Save OCR History

```
POST /history/save
```

Request

```json
{
    "filename":"notes.jpg",
    "extracted_text":"Hello World",
    "confidence":98.45
}
```

---

Get All History

```
GET /history
```

---

Get One Record

```
GET /history/{id}
```

---

Delete Record

```
DELETE /history/{id}
```

---

Delete All

```
DELETE /history
```

---

# Health API

Health Check

```
GET /health
```

Example

```json
{
    "status":"healthy"
}
```

---

# Root Endpoint

```
GET /
```

Example

```json
{
    "message":"Handwritten Digital Recognition API",
    "version":"1.0.0"
}
```

---

# Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 413 | Payload Too Large |
| 422 | Validation Error |
| 500 | Internal Server Error |

---

# Processing Pipeline

```
Upload
    │
    ▼
Image Validation
    │
    ▼
Image Preprocessing
    │
    ├── Resize
    ├── Grayscale
    ├── Denoise
    ├── Deskew
    ├── Threshold
    ├── Enhancement
    └── Segmentation
    │
    ▼
OCR Engine
    │
    ├── EasyOCR
    ├── TrOCR
    ├── PaddleOCR
    └── Tesseract
    │
    ▼
Post Processing
    │
    ├── Spell Checker
    ├── Grammar Correction
    ├── Paragraph Builder
    ├── Formatter
    └── Confidence Analyzer
    │
    ▼
Export
    │
    ├── PDF
    ├── DOCX
    ├── TXT
    └── JSON
```

---

# Project Structure

```
backend/
│
├── api/
├── database/
├── export/
├── ocr/
├── postprocessing/
├── preprocessing/
├── tests/
├── utils/
│
├── app.py
├── routes.py
└── config.py
```

---

# Future Improvements

- JWT Authentication
- User Accounts
- Batch OCR
- Cloud Storage Integration
- Multiple Language Recognition
- Layout Preservation
- OCR Model Selection
- OCR Confidence Visualization
- Background Processing
- WebSocket Progress Updates

---

# Technologies Used

- FastAPI
- Python 3.11
- SQLAlchemy
- OpenCV
- EasyOCR
- TrOCR
- PaddleOCR
- Tesseract OCR
- PyTorch
- Transformers
- ReportLab
- python-docx
- SQLite / PostgreSQL
- Docker

---

© 2026 Handwritten Digital Recognition System

AI-Powered OCR Backend Documentation