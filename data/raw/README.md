Raw data directory placeholder.
# Raw Data

This directory stores the original input files uploaded by users before any preprocessing or OCR operations are performed.

The files in this directory remain unchanged and serve as the source data for the entire OCR pipeline.

---

## Purpose

The raw dataset is used to:

- Preserve original user uploads
- Enable reprocessing with different OCR engines
- Compare preprocessing results with the original image
- Debug OCR accuracy
- Train and evaluate OCR models

---

## Supported File Types

The system accepts the following input formats:

### Images

- JPG
- JPEG
- PNG
- BMP
- TIFF
- TIF
- WEBP

### Documents

- PDF

---

## Directory Structure

```text
raw/
│
├── images/
│   ├── notes.jpg
│   ├── assignment.png
│   └── receipt.tiff
│
├── pdf/
│   ├── exam.pdf
│   └── report.pdf
│
└── README.md
```

---

## Processing Workflow

```text
User Upload
      │
      ▼
Store Original File
      │
      ▼
data/raw/
      │
      ▼
Preprocessing
      │
      ▼
Processed Image
      │
      ▼
OCR Engine
      │
      ▼
Extracted Text
```

---

## Example

```text
raw/

├── images/
│   ├── handwritten_notes.jpg
│   ├── lecture_notes.png
│   └── assignment.jpeg
│
└── pdf/
    ├── answer_sheet.pdf
    └── research_notes.pdf
```

---

## Why Keep Raw Files?

Keeping the original files allows the system to:

- Re-run OCR with improved preprocessing
- Test different OCR engines
- Compare recognition accuracy
- Audit OCR results
- Recover from preprocessing errors

---

## Generated Automatically

Files are placed here automatically after upload through the API or web application.

Example:

```
POST /api/v1/upload
```

↓

```
data/raw/images/abc123.jpg
```

---

## Safe to Delete?

Only delete files that are no longer required.

Deleting a raw file means it cannot be processed again unless it is uploaded again.

---

## Version Control

Raw datasets can become very large.

It is recommended to exclude uploaded files from version control.

Example `.gitignore`:

```gitignore
raw/images/*
raw/pdf/*
!raw/README.md
```

---

## Security Notes

Since uploaded files may contain sensitive information:

- Restrict directory access.
- Validate uploaded file types.
- Scan files before processing if required.
- Never expose this directory directly through the web server.

---

## Notes

- Contains untouched user uploads.
- Serves as the input source for preprocessing.
- Used for debugging, testing, and OCR model evaluation.
- Files should remain unchanged after upload.