"""OCR pipeline combining preprocessing, recognition, and postprocessing."""
import logging
from typing import Dict, Any
from .trocr import TrOCREngine
from .preprocessing import preprocess_image
from .postprocessing import (
    clean_text,
    normalize_whitespace,
    fix_common_ocr_errors,
    merge_hyphenated_words
)
from .confidence import ConfidenceScorer

logger = logging.getLogger(__name__)


class OCRPipeline:
    """Complete OCR pipeline for handwritten text recognition."""
    
    def __init__(self, model_name: str = "microsoft/trocr-base-handwritten"):
        """
        Initialize OCR pipeline.
        
        Args:
            model_name (str): TrOCR model identifier
        """
        self.engine = TrOCREngine(model_name)
        self.confidence_scorer = ConfidenceScorer(threshold=0.5)
        logger.info("OCR Pipeline initialized")
    
    def process_image(self, image_path: str) -> Dict[str, Any]:
        """
        Process image through complete OCR pipeline.
        
        Args:
            image_path (str): Path to image file
            
        Returns:
            dict: OCR result with text, confidence, and metadata
        """
        try:
            logger.info(f"Processing image: {image_path}")
            
            # Step 1: Recognition
            result = self.engine.recognize_image(image_path)
            
            # Step 2: Postprocessing
            processed_text = self._postprocess_text(result.get("text", ""))
            
            # Step 3: Confidence scoring
            confidence = self.confidence_scorer.calculate_confidence(
                processed_text,
                result.get("confidence", 0.95)
            )
            
            result.update({
                "text": processed_text,
                "confidence": confidence,
                "confidence_label": self.confidence_scorer.get_confidence_label(confidence),
                "is_confident": self.confidence_scorer.is_confident(confidence)
            })
            
            logger.info(f"Image processed successfully. Confidence: {confidence:.2%}")
            return result
            
        except Exception as e:
            logger.error(f"Error processing image: {e}")
            return {
                "engine": "TrOCR",
                "text": "",
                "confidence": 0.0,
                "error": str(e),
                "success": False
            }
    
    def process_array(self, image_array) -> Dict[str, Any]:
        """
        Process numpy array image through OCR pipeline.
        
        Args:
            image_array: Numpy array representation of image
            
        Returns:
            dict: OCR result
        """
        try:
            logger.info("Processing image array")
            
            # Step 1: Recognition
            result = self.engine.recognize_array(image_array)
            
            # Step 2: Postprocessing
            processed_text = self._postprocess_text(result.get("text", ""))
            
            # Step 3: Confidence scoring
            confidence = self.confidence_scorer.calculate_confidence(
                processed_text,
                result.get("confidence", 0.95)
            )
            
            result.update({
                "text": processed_text,
                "confidence": confidence,
                "confidence_label": self.confidence_scorer.get_confidence_label(confidence),
                "is_confident": self.confidence_scorer.is_confident(confidence)
            })
            
            return result
            
        except Exception as e:
            logger.error(f"Error processing image array: {e}")
            return {
                "engine": "TrOCR",
                "text": "",
                "confidence": 0.0,
                "error": str(e),
                "success": False
            }
    
    def _postprocess_text(self, text: str) -> str:
        """
        Apply postprocessing steps to OCR text.
        
        Args:
            text (str): Raw OCR output
            
        Returns:
            str: Postprocessed text
        """
        # Apply postprocessing steps in sequence
        text = clean_text(text)
        text = normalize_whitespace(text)
        text = fix_common_ocr_errors(text)
        text = merge_hyphenated_words(text)
        
        return text
