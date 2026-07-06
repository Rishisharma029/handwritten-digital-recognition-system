"""Text file export functionality."""
import os
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class TxtExporter:
    """Export OCR results to plain text format."""
    
    def __init__(self, output_dir: str = "outputs/txt"):
        """
        Initialize TXT exporter.
        
        Args:
            output_dir (str): Output directory for text files
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
        metadata: dict = None,
        include_metadata: bool = True
    ) -> str:
        """
        Export OCR result to text file.
        
        Args:
            filename (str): Original filename
            extracted_text (str): Recognized text
            confidence (float): Confidence score
            engine (str): OCR engine used
            language (str): Language detected
            metadata (dict): Additional metadata
            include_metadata (bool): Whether to include metadata in output
            
        Returns:
            str: Path to exported file
        """
        txt_filename = os.path.splitext(filename)[0] + ".txt"
        output_path = os.path.join(self.output_dir, txt_filename)
        
        try:
            with open(output_path, "w", encoding="utf-8") as file:
                if include_metadata:
                    # Write metadata header
                    file.write("=" * 60 + "\n")
                    file.write("OCR RESULT DOCUMENT\n")
                    file.write("=" * 60 + "\n\n")
                    
                    file.write(f"Original File: {filename}\n")
                    file.write(f"OCR Engine: {engine}\n")
                    file.write(f"Language: {language}\n")
                    file.write(f"Confidence: {confidence:.2%}\n")
                    file.write(f"Processed: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
                    
                    if metadata:
                        for key, value in metadata.items():
                            file.write(f"{key}: {value}\n")
                    
                    file.write("\n" + "-" * 60 + "\n\n")
                    file.write("RECOGNIZED TEXT:\n\n")
                
                # Write text content
                file.write(extracted_text)
                
                if include_metadata:
                    file.write("\n\n" + "=" * 60 + "\n")
                    file.write("END OF DOCUMENT\n")
                    file.write("=" * 60 + "\n")
            
            logger.info(f"TXT exported to {output_path}")
            return output_path
            
        except Exception as e:
            logger.error(f"Error exporting TXT: {e}")
            raise
