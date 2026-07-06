"""Validation helpers placeholder."""
import os
import re

from backend.utils.constants import (
    SUPPORTED_EXTENSIONS,
    SUPPORTED_LANGUAGES,
    MAX_IMAGE_SIZE,
    EASYOCR,
    TROCR,
    PADDLEOCR,
    TESSERACT
)


class Validator:

    # -----------------------------------------
    # Validate File Extension
    # -----------------------------------------

    @staticmethod
    def validate_extension(filename):

        extension = os.path.splitext(
            filename
        )[1].lower()

        if extension not in SUPPORTED_EXTENSIONS:

            raise ValueError(
                f"Unsupported file type: {extension}"
            )

        return True

    # -----------------------------------------
    # Validate File Size
    # -----------------------------------------

    @staticmethod
    def validate_size(size):

        if size > MAX_IMAGE_SIZE:

            raise ValueError(
                f"Maximum allowed size is "
                f"{MAX_IMAGE_SIZE // (1024 * 1024)} MB"
            )

        return True

    # -----------------------------------------
    # Validate File Exists
    # -----------------------------------------

    @staticmethod
    def validate_file(path):

        if not os.path.exists(path):

            raise FileNotFoundError(path)

        return True

    # -----------------------------------------
    # Validate OCR Engine
    # -----------------------------------------

    @staticmethod
    def validate_engine(engine):

        engines = {
            EASYOCR,
            TROCR,
            PADDLEOCR,
            TESSERACT,
            "easyocr",
            "trocr",
            "paddleocr",
            "paddle",
            "tesseract",
        }

        if engine.lower() not in engines:

            raise ValueError(
                f"Unsupported OCR Engine: {engine}"
            )

        return True

    # -----------------------------------------
    # Validate Language
    # -----------------------------------------

    @staticmethod
    def validate_language(language):

        normalized = language.strip().lower()
        aliases = {
            "english": "en",
            "hindi": "hi",
            "french": "fr",
            "german": "de",
            "spanish": "es",
        }
        code = aliases.get(normalized, normalized)

        if code not in SUPPORTED_LANGUAGES:

            raise ValueError(
                f"Unsupported language: {language}"
            )

        return True

    # -----------------------------------------
    # Validate Filename
    # -----------------------------------------

    @staticmethod
    def validate_filename(filename):

        pattern = r"^[a-zA-Z0-9_. -]+$"

        if not re.match(pattern, filename):

            raise ValueError(
                "Invalid filename."
            )

        return True

    # -----------------------------------------
    # Validate Image Dimensions
    # -----------------------------------------

    @staticmethod
    def validate_dimensions(image):

        h, w = image.shape[:2]

        if h <= 0 or w <= 0:

            raise ValueError(
                "Invalid image dimensions."
            )

        return True

    # -----------------------------------------
    # Validate OCR Text
    # -----------------------------------------

    @staticmethod
    def validate_text(text):

        if text is None:

            raise ValueError(
                "OCR text cannot be None."
            )

        if not isinstance(text, str):

            raise TypeError(
                "OCR text must be a string."
            )

        return True

    # -----------------------------------------
    # Validate Confidence
    # -----------------------------------------

    @staticmethod
    def validate_confidence(score):

        if not isinstance(
            score,
            (int, float)
        ):

            raise TypeError(
                "Confidence must be numeric."
            )

        if score < 0 or score > 100:

            raise ValueError(
                "Confidence must be between 0 and 100."
            )

        return True

    # -----------------------------------------
    # Validate Export Format
    # -----------------------------------------

    @staticmethod
    def validate_export(fmt):

        formats = [

            "pdf",

            "docx",

            "txt",

            "json"

        ]

        fmt = fmt.lower()

        if fmt not in formats:

            raise ValueError(
                f"Unsupported export format: {fmt}"
            )

        return True