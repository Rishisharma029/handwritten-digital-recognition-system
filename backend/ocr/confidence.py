"""Confidence scoring for OCR results."""
import logging

logger = logging.getLogger(__name__)


class ConfidenceScorer:
    """Calculate confidence scores for OCR results."""
    
    def __init__(self, threshold: float = 0.5):
        """
        Initialize confidence scorer.
        
        Args:
            threshold (float): Minimum confidence threshold (0-1)
        """
        self.threshold = threshold
    
    def calculate_confidence(self, text: str, model_confidence: float = 0.95) -> float:
        """
        Calculate overall confidence score for OCR result.
        
        Args:
            text (str): Recognized text
            model_confidence (float): Model's confidence score
            
        Returns:
            float: Confidence score (0-1)
        """
        if not text:
            return 0.0
        
        # Combine model confidence with text quality metrics
        text_quality = self._assess_text_quality(text)
        
        # Weighted average
        confidence = 0.7 * model_confidence + 0.3 * text_quality
        
        return min(confidence, 1.0)
    
    def _assess_text_quality(self, text: str) -> float:
        """
        Assess quality of recognized text.
        
        Args:
            text (str): Text to assess
            
        Returns:
            float: Quality score (0-1)
        """
        if not text:
            return 0.0
        
        score = 0.5  # Base score
        
        # Longer text is generally better (up to a point)
        if len(text) > 5:
            score += 0.15
        if len(text) > 20:
            score += 0.15
        
        # Check for common characters
        alpha_ratio = sum(1 for c in text if c.isalpha()) / len(text)
        if 0.7 < alpha_ratio < 1.0:
            score += 0.15
        
        # Penalize excessive punctuation
        punct_ratio = sum(1 for c in text if c in '.,!?;:') / len(text)
        if punct_ratio > 0.3:
            score -= 0.1
        
        return max(0.0, min(score, 1.0))
    
    def is_confident(self, confidence: float) -> bool:
        """
        Check if confidence score meets threshold.
        
        Args:
            confidence (float): Confidence score
            
        Returns:
            bool: True if confidence >= threshold
        """
        return confidence >= self.threshold
    
    def get_confidence_label(self, confidence: float) -> str:
        """
        Get human-readable confidence label.
        
        Args:
            confidence (float): Confidence score (0-1)
            
        Returns:
            str: Confidence label
        """
        if confidence >= 0.9:
            return "Very High"
        elif confidence >= 0.75:
            return "High"
        elif confidence >= 0.5:
            return "Medium"
        elif confidence >= 0.25:
            return "Low"
        else:
            return "Very Low"
