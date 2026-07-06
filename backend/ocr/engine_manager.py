"""Lazy-loading OCR engine manager."""
import logging
from typing import Any, Dict, Optional, Tuple

from backend.utils.constants import (
    DEFAULT_ENGINE,
    EASYOCR,
    PADDLEOCR,
    TESSERACT,
    TROCR,
)

logger = logging.getLogger(__name__)

LANGUAGE_MAP = {
    "english": "en",
    "en": "en",
    "hindi": "hi",
    "hi": "hi",
    "french": "fr",
    "fr": "fr",
    "german": "de",
    "de": "de",
    "spanish": "es",
    "es": "es",
}

DISPLAY_LANGUAGE_MAP = {
    "en": "English",
    "hi": "Hindi",
    "fr": "French",
    "de": "German",
    "es": "Spanish",
}

ENGINE_DISPLAY_NAMES = {
    EASYOCR: "EasyOCR",
    TROCR: "TrOCR",
    PADDLEOCR: "PaddleOCR",
    TESSERACT: "Tesseract",
}


def normalize_engine(engine: str) -> str:
    mapping = {
        "easyocr": EASYOCR,
        "trocr": TROCR,
        "paddleocr": PADDLEOCR,
        "paddle": PADDLEOCR,
        "tesseract": TESSERACT,
    }
    return mapping.get(engine.strip().lower(), DEFAULT_ENGINE)


def normalize_language(language: str) -> str:
    return LANGUAGE_MAP.get(language.strip().lower(), "en")


def display_language(code: str) -> str:
    return DISPLAY_LANGUAGE_MAP.get(code, "English")


class EngineManager:
    """Load OCR engines on demand and cache them for reuse."""

    def __init__(self) -> None:
        self._engines: Dict[Tuple[str, str, bool], Any] = {}

    def _cache_key(self, engine: str, language: str, gpu: bool) -> Tuple[str, str, bool]:
        return (engine, language, gpu)

    def _create_engine(self, engine: str, language: str, gpu: bool):
        if engine == EASYOCR:
            from backend.ocr.easyocr_engine import EasyOCREngine

            return EasyOCREngine(languages=[language], gpu=gpu)

        if engine == TROCR:
            from backend.ocr.trocr import TrOCREngine

            return TrOCREngine()

        if engine == PADDLEOCR:
            from backend.ocr.paddle_engine import PaddleOCREngine

            return PaddleOCREngine(language=language, use_gpu=gpu)

        if engine == TESSERACT:
            from backend.ocr.tesseract_engine import TesseractEngine

            tesseract_lang = language if language in {"eng", "hin", "fra"} else language
            if tesseract_lang == "en":
                tesseract_lang = "eng"
            elif tesseract_lang == "hi":
                tesseract_lang = "hin"
            elif tesseract_lang == "fr":
                tesseract_lang = "fra"
            return TesseractEngine(language=tesseract_lang)

        raise ValueError(f"Unsupported OCR engine: {engine}")

    def get_engine(self, engine: str, language: str = "en", gpu: bool = False):
        normalized_engine = normalize_engine(engine)
        normalized_language = normalize_language(language)
        cache_key = self._cache_key(normalized_engine, normalized_language, gpu)

        if cache_key not in self._engines:
            logger.info(
                "Loading OCR engine=%s language=%s gpu=%s",
                normalized_engine,
                normalized_language,
                gpu,
            )
            self._engines[cache_key] = self._create_engine(
                normalized_engine,
                normalized_language,
                gpu,
            )

        return self._engines[cache_key], normalized_engine, normalized_language

    def recognize(
        self,
        image,
        engine: str = DEFAULT_ENGINE,
        language: str = "en",
        gpu: bool = False,
    ) -> Dict[str, Any]:
        ocr_engine, normalized_engine, normalized_language = self.get_engine(
            engine,
            language,
            gpu,
        )

        try:
            result = ocr_engine.recognize_array(image)
        except Exception as exc:
            logger.exception("OCR failed with engine %s", normalized_engine)
            return {
                "engine": ENGINE_DISPLAY_NAMES.get(normalized_engine, normalized_engine),
                "text": f"OCR failed with {ENGINE_DISPLAY_NAMES.get(normalized_engine, normalized_engine)}: {exc}",
                "confidence": 0.0,
                "language": display_language(normalized_language),
            }

        result["engine"] = ENGINE_DISPLAY_NAMES.get(
            normalized_engine,
            result.get("engine", normalized_engine),
        )
        result["language"] = display_language(normalized_language)
        result["text"] = result.get("text") or "No text detected in the uploaded image."
        result["confidence"] = float(result.get("confidence") or 0.0)
        return result


engine_manager = EngineManager()
