"""PDF export functionality."""
import os
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.units import inch
import logging

logger = logging.getLogger(__name__)


class PDFExporter:
    """Export OCR results to PDF format."""
    
    def __init__(self, output_dir: str = "outputs/pdf"):
        """
        Initialize PDF exporter.
        
        Args:
            output_dir (str): Output directory for PDF files
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
        Export OCR result to PDF file.
        
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
        pdf_filename = os.path.splitext(filename)[0] + ".pdf"
        output_path = os.path.join(self.output_dir, pdf_filename)
        
        try:
            doc = SimpleDocTemplate(output_path, pagesize=letter)
            story = []
            styles = getSampleStyleSheet()
            
            # Title
            title_style = ParagraphStyle(
                'CustomTitle',
                parent=styles['Heading1'],
                fontSize=16,
                textColor='#333333',
                spaceAfter=12
            )
            story.append(Paragraph("OCR Result Document", title_style))
            story.append(Spacer(1, 0.2 * inch))
            
            # Metadata
            metadata_text = f"""
            <b>Original File:</b> {filename}<br/>
            <b>OCR Engine:</b> {engine}<br/>
            <b>Language:</b> {language}<br/>
            <b>Confidence:</b> {confidence:.2%}<br/>
            <b>Processed:</b> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}<br/>
            """
            story.append(Paragraph(metadata_text, styles['Normal']))
            story.append(Spacer(1, 0.3 * inch))
            
            # Separator
            story.append(Paragraph("_" * 80, styles['Normal']))
            story.append(Spacer(1, 0.2 * inch))
            
            # Recognized Text
            story.append(Paragraph("<b>Recognized Text:</b>", styles['Heading2']))
            story.append(Spacer(1, 0.1 * inch))
            story.append(Paragraph(extracted_text, styles['Normal']))
            
            # Build PDF
            doc.build(story)
            logger.info(f"PDF exported to {output_path}")
            return output_path
            
        except Exception as e:
            logger.error(f"Error exporting PDF: {e}")
            raise
