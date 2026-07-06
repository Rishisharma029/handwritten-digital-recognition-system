Uploads directory placeholder.
# Uploads

This directory stores files uploaded by users through the application before they enter the OCR processing pipeline.

The uploaded files are temporary runtime data and act as the starting point for preprocessing and text recognition.

---

## Purpose

The `uploads/` directory is used to:

- Store newly uploaded files
- Validate uploaded documents
- Preserve the original upload during processing
- Pass files to the preprocessing pipeline
- Allow reprocessing if needed

---

## Supported File Formats

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
uploads/
│
├── images/
│   ├── 4f3d91d2.jpg
│   ├── a82bc71f.png
│   └── e9d73af4.jpeg
│
├── pdf/
│   ├── assignment.pdf
│   └── notes.pdf
│
└── README.md
```

---

## Upload Workflow

```text
User
   │
   ▼
Upload File
   │
   ▼
Validation
   │
   ├── File Type
   ├── File Size
   ├── File Name
   └── Security Checks
   │
   ▼
uploads/
   │
   ▼
Preprocessing
   │
   ▼
OCR Engine
   │
   ▼
Export Results
```

---

## File Validation

Before saving, every uploaded file is validated for:

- Supported file extension
- Maximum file size
- File integrity
- Valid filename
- Allowed MIME type

Invalid files are rejected.

---

## Automatic File Naming

To avoid filename collisions, uploaded files are automatically renamed.

Example:

Original

```
My Notes.jpg
```

Stored As

```
c5d8a7b9d43f4d10a0d1fef5.jpg
```

The original filename can be stored in the database if required.

---

## Generated Automatically

Files are created automatically through the Upload API.

Example endpoint:

```
POST /api/v1/upload
```

---

## Cleanup

Uploaded files may be removed:

- After OCR completes
- After export finishes
- By scheduled cleanup jobs
- Manually by an administrator

Depending on application configuration.

---

## Safe to Delete?

Only delete files that are no longer required.

Deleting a file before OCR processing finishes may cause recognition to fail.

---

## Version Control

Do **not** commit uploaded user files.

Recommended `.gitignore`:

```gitignore
uploads/images/*
uploads/pdf/*
!uploads/README.md
```

---

## Security Considerations

Because uploaded files originate from users:

- Validate every upload.
- Restrict allowed file types.
- Limit maximum upload size.
- Generate unique filenames.
- Never execute uploaded files.
- Store uploads outside the public web root when possible.
- Scan uploads for malware in production deployments.

---

## Example

```text
uploads/

├── images/
│   ├── c91ab2f7.jpg
│   ├── d18c7a91.png
│   └── f3ab98de.jpeg
│
├── pdf/
│   ├── notes.pdf
│   └── assignment.pdf
│
└── README.md
```

---

## Notes

- Contains temporary runtime files.
- Files are uploaded by users.
- Used as the input for preprocessing and OCR.
- May be automatically cleaned after processing.
- Should not contain long-term or permanent data.