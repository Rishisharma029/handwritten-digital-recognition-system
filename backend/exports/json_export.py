"""JSON export functionality."""
import json
import os
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class JSONExporter:
    """Export OCR results to JSON format."""
    
    def __init__(self, output_dir: str = "outputs/json"):
        """
        Initialize JSON exporter.
        
        Args:
            output_dir (str): Output directory for JSON files
        """
        self.output_dir = output_dir
        os.makedirs(self.output_dir, exist_ok=True)
    
    def export(
        self,
        filename: str,
        extracted_text: str,
        confidence: float,
        engine: str = "TrOCR",
        language: str = "English",
        metadata: dict = None
    ) -> str:
        """
        Export OCR result to JSON file.
        
        Args:
            filename (str): Original filename
            extracted_text (str): Recognized text
            confidence (float): Confidence score
            engine (str): OCR engine used
            language (str): Language detected
            metadata (dict): Additional metadata
            
        Returns:
            str: Path to exported file
        """
        data = {
            "filename": filename,
            "engine": engine,
            "language": language,
            "confidence": confidence,
            "timestamp": datetime.now().isoformat(),
            "text": extracted_text,
            "metadata": metadata or {}
        }
        
        json_filename = os.path.splitext(filename)[0] + ".json"
        output_path = os.path.join(self.output_dir, json_filename)
        
        try:
            with open(output_path, "w", encoding="utf-8") as file:
                json.dump(data, file, indent=4, ensure_ascii=False)
            logger.info(f"JSON exported to {output_path}")
            return output_path
        except Exception as e:
            logger.error(f"Error exporting JSON: {e}")
            raise
