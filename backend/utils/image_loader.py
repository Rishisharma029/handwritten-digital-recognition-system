"""Load images from file paths, including PDF first page."""
import os
from pathlib import Path

import cv2
import numpy as np

from backend.utils.constants import SUPPORTED_DOCUMENT_FORMATS, SUPPORTED_IMAGE_FORMATS


def _load_pdf_first_page(file_path: str) -> np.ndarray:
    try:
        import fitz  # pymupdf
    except ImportError as exc:
        raise ValueError(
            "PDF support requires pymupdf. Install with: pip install pymupdf"
        ) from exc

    doc = fitz.open(file_path)
    if doc.page_count == 0:
        doc.close()
        raise ValueError("PDF has no pages.")

    page = doc.load_page(0)
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
    doc.close()

    if img.shape[2] == 4:
        img = cv2.cvtColor(img, cv2.COLOR_RGBA2BGR)
    elif img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

    return img


def load_image_from_path(file_path: str) -> np.ndarray:
    """Load an image array from a supported image or PDF file path."""
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    extension = path.suffix.lower()
    if extension in SUPPORTED_DOCUMENT_FORMATS:
        return _load_pdf_first_page(str(path))

    if extension not in SUPPORTED_IMAGE_FORMATS:
        raise ValueError(f"Unsupported file type: {extension}")

    image = cv2.imread(str(path))
    if image is None:
        raise ValueError(f"Unable to load image: {path.name}")

    return image


def get_file_type(filename: str) -> str:
    extension = os.path.splitext(filename)[1].lower()
    if extension in SUPPORTED_DOCUMENT_FORMATS:
        return "pdf"
    return "image"
