PaddleOCR model directory placeholder.
# EasyOCR Model Documentation

## Handwritten Digital Recognition System

Version: 1.0.0

---

# Overview

EasyOCR is one of the OCR engines integrated into this project for recognizing printed and handwritten text from images.

It provides multilingual OCR support using deep learning and can recognize text without requiring manual character segmentation.

EasyOCR is used as one of the selectable OCR engines in the system.

---

# Framework

- PyTorch
- EasyOCR

Official Python Package

```
easyocr
```

---

# Model Architecture

EasyOCR consists of two major stages:

```text
Input Image
      │
      ▼
Text Detection
      │
      ▼
CRAFT Detector
      │
      ▼
Detected Text Regions
      │
      ▼
Text Recognition
      │
      ▼
CRNN Network
      │
      ▼
CTC Decoder
      │
      ▼
Recognized Text
```

---

# Recognition Pipeline

```text
Upload Image
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
EasyOCR Reader
      │
      ▼
Bounding Boxes
      │
      ▼
Confidence Scores
      │
      ▼
Extracted Text
```

---

# Supported Languages

EasyOCR supports more than 80 languages.

Examples:

- English
- Hindi
- German
- French
- Spanish
- Italian
- Chinese
- Japanese
- Korean
- Arabic

Example:

```python
reader = easyocr.Reader(["en"])
```

Multiple languages

```python
reader = easyocr.Reader(["en", "hi"])
```

---

# Model Location

Example

```text
trained_models/

└── easyocr/

    ├── detector.pth

    ├── recognizer.pth

    └── README.md
```

---

# Loading the Model

Example

```python
import easyocr

reader = easyocr.Reader(
    ["en"],
    gpu=False
)
```

---

# Running OCR

Example

```python
result = reader.readtext(
    "sample.jpg"
)
```

Example Output

```python
[
    (
        [[10,20],[150,20],[150,50],[10,50]],
        "Hello World",
        0.9845
    )
]
```

---

# Output Format

Each detection contains

- Bounding Box
- Recognized Text
- Confidence Score

Example

```json
[
    {
        "text": "Hello World",
        "confidence": 98.45
    }
]
```

---

# Configuration

Example settings

```python
reader = easyocr.Reader(
    lang_list=["en"],
    gpu=False,
    verbose=False
)
```

---

# Strengths

EasyOCR performs well for:

- Printed text
- Handwritten text
- Multi-language OCR
- Natural scene text
- Documents
- Receipts
- Forms

---

# Limitations

Performance may decrease with:

- Very low-resolution images
- Heavy image noise
- Severe motion blur
- Complex document layouts
- Extremely cursive handwriting

---

# Performance Tips

For better accuracy:

- Resize images before OCR.
- Remove background noise.
- Correct image rotation.
- Increase image contrast.
- Use grayscale conversion.
- Apply adaptive thresholding.

---

# Integration

EasyOCR is integrated into:

```text
backend/

└── ocr/

    ├── easyocr_engine.py

    ├── inference.py

    └── confidence.py
```

Workflow

```text
Image

↓

Preprocessing

↓

EasyOCR

↓

Post Processing

↓

Export
```

---

# Advantages

- Fast inference
- Easy integration
- GPU support
- CPU support
- Multi-language recognition
- High-quality text detection
- No additional training required

---

# Disadvantages

- Slower than Tesseract on very small images
- Less accurate on highly stylized handwriting
- Large model download on first use
- Memory usage increases with multiple languages

---

# Recommended Use Cases

EasyOCR is recommended for:

- Notes
- Assignments
- Forms
- Printed documents
- Receipts
- Mixed handwritten/printed documents
- Multi-language OCR

---

# Dependencies

```text
easyocr

torch

torchvision

opencv-python

numpy

Pillow
```

---

# Future Improvements

Possible enhancements include:

- Fine-tune EasyOCR for custom handwriting datasets.
- Add automatic language detection.
- Improve preprocessing for noisy documents.
- Optimize GPU inference.
- Support batch document recognition.

---

# Summary

EasyOCR provides a reliable and easy-to-integrate OCR solution for both handwritten and printed text. Within the Handwritten Digital Recognition System, it serves as one of the primary recognition engines, offering multilingual support, confidence scoring, and compatibility with the project's preprocessing and post-processing pipelines.