Sample data directory placeholder.
# Sample Data

This directory contains sample documents and images used for testing, development, demonstrations, and benchmarking the Handwritten Digital Recognition System.

Unlike the `raw/` directory, these files are intentionally included with the project to allow developers to test the application immediately after installation.

---

## Purpose

The sample dataset is used for:

- Testing OCR functionality
- Demonstrating application features
- Benchmarking OCR engines
- Validating preprocessing steps
- Running automated tests
- Debugging OCR output

---

## Directory Structure

```text
samples/
│
├── images/
│   ├── handwriting_01.jpg
│   ├── handwriting_02.png
│   ├── printed_text.jpg
│   └── receipt.png
│
├── pdf/
│   ├── handwritten_notes.pdf
│   └── assignment.pdf
│
├── expected_output/
│   ├── handwriting_01.txt
│   ├── handwriting_02.txt
│   └── receipt.txt
│
└── README.md
```

---

## Sample Categories

### Handwritten Notes

Examples of handwritten documents for testing handwriting recognition.

Examples:

- Notebook pages
- Class notes
- Letters
- Forms

---

### Printed Documents

Examples of printed text used for comparison.

Examples:

- Books
- Articles
- Reports
- Receipts

---

### PDF Documents

Multi-page documents used to test PDF processing.

Examples:

- Assignments
- Notes
- Reports

---

### Expected Output

Ground truth text files corresponding to sample inputs.

These files are used to compare OCR output with the expected text.

Example:

```
handwriting_01.jpg
```

↓

```
handwriting_01.txt
```

---

## Usage

Example API request:

```
POST /api/v1/recognize
```

Upload one of the sample images to verify the OCR pipeline.

---

## Automated Testing

These files are used by the project's test suite.

Example:

```text
backend/tests/

├── test_api.py
├── test_ocr.py
├── test_preprocessing.py
└── test_data/
```

The expected output files can be used to evaluate OCR accuracy.

---

## Recommended Naming Convention

```text
handwriting_001.jpg

handwriting_002.jpg

printed_001.png

receipt_001.jpg

document_001.pdf
```

---

## Dataset Guidelines

Sample files should:

- Be small in size
- Cover multiple handwriting styles
- Include different lighting conditions
- Include skewed images
- Include noisy images
- Include clean scans
- Represent real-world OCR scenarios

---

## Do Not Store

Avoid placing the following in this directory:

- User-uploaded files
- Sensitive documents
- Personal information
- Production data
- Large datasets

These belong in the `raw/` directory instead.

---

## Version Control

Sample files are intended to be committed to the repository.

Unlike runtime-generated files, they help contributors test the project without collecting their own data.

---

## Example Workflow

```text
Sample Image
      │
      ▼
Image Loader
      │
      ▼
Preprocessing
      │
      ▼
OCR Engine
      │
      ▼
Post Processing
      │
      ▼
Export
      │
      ▼
Compare with Expected Output
```

---

## Notes

- Included with the project.
- Used for testing and demonstrations.
- Safe to commit to Git.
- Should not contain confidential or copyrighted material without permission.