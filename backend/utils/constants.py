"""Application constants placeholder."""
"""
===========================================
Handwritten Digital Recognition System
Constants
===========================================
"""

import os

# ==========================================
# Project Paths
# ==========================================

BASE_DIR = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "..",
        ".."
    )
)

DATA_DIR = os.path.join(BASE_DIR, "data")

UPLOAD_DIR = os.path.join(DATA_DIR, "uploads")

PROCESSED_DIR = os.path.join(DATA_DIR, "processed")

OUTPUT_DIR = os.path.join(BASE_DIR, "outputs")

MODEL_DIR = os.path.join(BASE_DIR, "trained_models")

LOG_DIR = os.path.join(OUTPUT_DIR, "logs")


# ==========================================
# Export Directories
# ==========================================

PDF_OUTPUT = os.path.join(OUTPUT_DIR, "pdf")

DOCX_OUTPUT = os.path.join(OUTPUT_DIR, "docx")

TXT_OUTPUT = os.path.join(OUTPUT_DIR, "txt")

JSON_OUTPUT = os.path.join(OUTPUT_DIR, "json")


# ==========================================
# Supported File Types
# ==========================================

SUPPORTED_IMAGE_FORMATS = (
    ".jpg",
    ".jpeg",
    ".png",
    ".bmp",
    ".tif",
    ".tiff",
    ".webp"
)

SUPPORTED_DOCUMENT_FORMATS = (
    ".pdf",
)

SUPPORTED_EXTENSIONS = (
    SUPPORTED_IMAGE_FORMATS +
    SUPPORTED_DOCUMENT_FORMATS
)


# ==========================================
# OCR Engines
# ==========================================

EASYOCR = "easyocr"

TROCR = "trocr"

PADDLEOCR = "paddle"

TESSERACT = "tesseract"

DEFAULT_ENGINE = TROCR


# ==========================================
# OCR Languages
# ==========================================

DEFAULT_LANGUAGE = "en"

SUPPORTED_LANGUAGES = [
    "en",
    "hi",
    "fr",
    "de",
    "es"
]


# ==========================================
# Image Settings
# ==========================================

DEFAULT_WIDTH = 1280

DEFAULT_HEIGHT = 720

MAX_IMAGE_SIZE = 20 * 1024 * 1024

JPEG_QUALITY = 95


# ==========================================
# Threshold Settings
# ==========================================

THRESHOLD_BLOCK_SIZE = 11

THRESHOLD_CONSTANT = 2


# ==========================================
# CLAHE Settings
# ==========================================

CLAHE_CLIP_LIMIT = 2.0

CLAHE_GRID_SIZE = (8, 8)


# ==========================================
# API
# ==========================================

API_TITLE = "Handwritten Digital Recognition API"

API_VERSION = "1.0.0"

API_DESCRIPTION = (
    "AI-powered handwritten text recognition system."
)


# ==========================================
# Database
# ==========================================

DATABASE_NAME = "ocr_history.db"


# ==========================================
# Logging
# ==========================================

LOG_FILE = "ocr.log"

LOG_LEVEL = "INFO"


# ==========================================
# Export Formats
# ==========================================

EXPORT_FORMATS = [
    "pdf",
    "docx",
    "txt",
    "json"
]


# ==========================================
# Create Required Folders
# ==========================================

DIRECTORIES = [

    DATA_DIR,

    UPLOAD_DIR,

    PROCESSED_DIR,

    OUTPUT_DIR,

    PDF_OUTPUT,

    DOCX_OUTPUT,

    TXT_OUTPUT,

    JSON_OUTPUT,

    MODEL_DIR,

    LOG_DIR
]