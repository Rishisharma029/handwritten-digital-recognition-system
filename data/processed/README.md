Processed data directory placeholder.
# Processed Data

This directory contains images that have been processed by the preprocessing pipeline before being passed to the OCR engine.

These files are generated automatically during OCR processing and are intended for debugging, visualization, and improving recognition accuracy.

---

## Purpose

The preprocessing stage enhances input images to improve OCR performance by reducing noise, correcting orientation, and increasing text clarity.

Typical preprocessing operations include:

- Image resizing
- Grayscale conversion
- Noise removal
- Deskewing
- Thresholding
- Image enhancement
- Text segmentation

---

## Directory Structure

```text
processed/
│
├── resized/
│   └── Resized images
│
├── grayscale/
│   └── Grayscale images
│
├── denoised/
│   └── Noise-reduced images
│
├── deskewed/
│   └── Rotation-corrected images
│
├── threshold/
│   └── Binary images
│
├── enhanced/
│   └── Contrast-enhanced images
│
├── segmented/
│   ├── lines/
│   ├── words/
│   └── characters/
│
└── final/
    └── Images sent to the OCR engine
```

---

## Processing Pipeline

```text
Original Image
       │
       ▼
Resize
       │
       ▼
Grayscale
       │
       ▼
Denoise
       │
       ▼
Deskew
       │
       ▼
Threshold
       │
       ▼
Enhancement
       │
       ▼
Segmentation
       │
       ▼
Final OCR Image
```

---

## Why These Files Exist

The processed images help developers:

- Debug preprocessing steps
- Compare OCR performance
- Improve image quality
- Tune preprocessing parameters
- Visualize each transformation stage

---

## Generated Automatically

All files in this directory are created automatically by the preprocessing pipeline.

No manual editing is required.

---

## Safe to Delete?

Yes.

These files are temporary artifacts generated during OCR processing.

Deleting them will **not** affect the application. They will be recreated automatically whenever new images are processed.

---

## Version Control

Large processed images should **not** be committed to Git.

Recommended `.gitignore`:

```gitignore
processed/*
!processed/README.md
```

---

## Example

```text
Input
└── handwritten_notes.jpg

↓

Processed

├── resized/
│   └── handwritten_notes.jpg
│
├── grayscale/
│   └── handwritten_notes.jpg
│
├── denoised/
│   └── handwritten_notes.jpg
│
├── deskewed/
│   └── handwritten_notes.jpg
│
├── threshold/
│   └── handwritten_notes.jpg
│
├── enhanced/
│   └── handwritten_notes.jpg
│
└── final/
    └── handwritten_notes.jpg
```

---

## Notes

- Generated during runtime.
- Used only for OCR preprocessing.
- Can be disabled in production to save disk space.
- Useful for development, debugging, and model evaluation.