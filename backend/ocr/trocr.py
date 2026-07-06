"""TrOCR main OCR engine for handwritten text recognition."""
import os
import cv2
import torch
import numpy as np
from PIL import Image
from transformers import (
    TrOCRProcessor,
    VisionEncoderDecoderModel
)
import logging

from .preprocessing import preprocess_image
from .postprocessing import enhance_text_quality
from .confidence import ConfidenceScorer

logger = logging.getLogger(__name__)


class TrOCREngine:
    """Main TrOCR engine for handwritten text recognition with line-level segmentation."""
    
    def __init__(self, model_name: str = "microsoft/trocr-base-handwritten"):
        """
        Initialize TrOCR engine.
        
        Args:
            model_name (str): Model identifier from Hugging Face
                             Default: trocr-base-handwritten (better accuracy)
        """
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model_name = model_name
        self.confidence_scorer = ConfidenceScorer(threshold=0.5)
        logger.info(f"Using device: {self.device}")
        logger.info(f"Loading TrOCR model from {model_name}...")
        
        try:
            self.processor = TrOCRProcessor.from_pretrained(model_name)
            logger.info("TrOCR processor loaded")
            
            self.model = VisionEncoderDecoderModel.from_pretrained(model_name)
            logger.info("TrOCR model loaded")
            
            self.model.to(self.device)
            logger.info(f"TrOCR model moved to {self.device}")
            
            # Load EasyOCR reader for text line detection (using GPU if CUDA is available)
            import easyocr
            logger.info("Loading EasyOCR reader for text detection...")
            use_gpu = (self.device == "cuda")
            self.detector = easyocr.Reader(['en'], gpu=use_gpu)
            logger.info("EasyOCR reader for text detection loaded successfully")
            
            logger.info(f"TrOCR model loaded successfully from {model_name}")
        except Exception as e:
            logger.error(f"Failed to load TrOCR model: {e}")
            raise
    
    def recognize_image(self, image_path: str) -> dict:
        """
        Recognize text from image file.
        
        Args:
            image_path (str): Path to image file
            
        Returns:
            dict: OCR result with text and metadata
        """
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image file not found: {image_path}")
        
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Unable to load image: {image_path}")
        
        return self.recognize_array(image)
    
    def recognize_array(self, image) -> dict:
        """
        Recognize text from numpy array image using line-level segmentation.
        
        Args:
            image: Numpy array representation of image
            
        Returns:
            dict: OCR result with text and metadata
        """
        try:
            logger.info("Starting TrOCR recognition with line segmentation")
            
            # Normalize image height to 1000px for text detection scale normalization
            h, w = image.shape[:2]
            height_target = 1000
            scale = height_target / h
            resized = cv2.resize(image, (int(w * scale), height_target), interpolation=cv2.INTER_AREA)
            
            # Step 1: Detect raw words using EasyOCR
            logger.info("Running EasyOCR word detection...")
            raw_detections = self.detector.readtext(resized)
            logger.info(f"Raw word count detected: {len(raw_detections)}")
            
            # Filter out very low-confidence detections (spurious noise/flourishes)
            detections = [d for d in raw_detections if d[2] >= 0.11]
            logger.info(f"Filtered word count: {len(detections)}")
            
            if not detections:
                logger.info("No text detected in image.")
                return {
                    "engine": "TrOCR",
                    "text": "",
                    "confidence": 0.0,
                    "boxes": [],
                    "detections": 0
                }
                
            # Step 2: Group boxes into text lines using vertical center-density valleys
            logger.info("Grouping word boxes into text lines...")
            lines = self._group_boxes_density(detections, height_target=height_target)
            logger.info(f"Clustered into {len(lines)} lines")
            
            recognized_lines = []
            confidence_scores = []
            all_boxes = []
            
            # Step 3: Crop, preprocess, and run TrOCR on each text line
            for idx, item in enumerate(lines):
                bbox = item['bbox']
                
                # Scale bounding box back to original image coordinates
                orig_bbox = [[int(p[0] / scale), int(p[1] / scale)] for p in bbox]
                
                # Keep bounding boxes in standard format for metadata returning
                # Format: {"x": x, "y": y, "width": w, "height": h}
                xs = [p[0] for p in orig_bbox]
                ys = [p[1] for p in orig_bbox]
                x_min, x_max = min(xs), max(xs)
                y_min, y_max = min(ys), max(ys)
                all_boxes.append({
                    "x": x_min,
                    "y": y_min,
                    "width": x_max - x_min,
                    "height": y_max - y_min
                })
                
                # Crop and preprocess line
                crop = self._crop_box(image, orig_bbox)
                if crop.size == 0:
                    continue
                    
                preprocessed = self._preprocess_line(crop)
                
                # TrOCR Inference
                result = self._extract_text(preprocessed)
                recognized_text = result.get("text", "").strip()
                
                # Enhance text quality with spelling correction
                enhanced_text = enhance_text_quality(recognized_text)
                
                if enhanced_text:
                    recognized_lines.append(enhanced_text)
                    
                # Calculate line confidence
                line_confidence = self.confidence_scorer.calculate_confidence(
                    enhanced_text,
                    model_confidence=0.95
                )
                confidence_scores.append(line_confidence)
                
                logger.info(f"Line {idx+1:02d} | Raw: '{recognized_text}' | Enhanced: '{enhanced_text}'")
                
            # Compute average confidence score
            avg_confidence = sum(confidence_scores) / len(confidence_scores) if confidence_scores else 0.0
            
            final_text = "\n".join(recognized_lines)
            logger.info(f"Recognition complete. Average confidence: {avg_confidence * 100:.2f}%")
            
            return {
                "engine": "TrOCR",
                "text": final_text,
                "confidence": avg_confidence * 100,  # Convert to percentage
                "boxes": all_boxes,
                "detections": len(recognized_lines)
            }
            
        except Exception as e:
            logger.error(f"Error during TrOCR recognition: {e}")
            raise
            
    def _group_boxes_density(self, detections, height_target: int = 1000) -> list:
        """Group word detections into lines using vertical center-density profile valleys."""
        word_boxes = []
        for bbox, text, conf in detections:
            xs = [p[0] for p in bbox]
            ys = [p[1] for p in bbox]
            x_min, x_max = min(xs), max(xs)
            y_min, y_max = min(ys), max(ys)
            
            word_boxes.append({
                'x_min': x_min, 'x_max': x_max,
                'y_min': y_min, 'y_max': y_max,
                'cy': int((y_min + y_max) / 2.0),
                'h': y_max - y_min,
                'text': text
            })
            
        # Create 1D density array representing word vertical centers
        density = np.zeros(height_target)
        for box in word_boxes:
            cy = min(max(0, box['cy']), height_target - 1)
            density[cy] += 1.0
            
        # Smooth density with 1D Gaussian filter
        sigma = 12
        kernel_size = int(sigma * 4) + 1
        if kernel_size % 2 == 0:
            kernel_size += 1
        kernel = cv2.getGaussianKernel(kernel_size, sigma)
        smoothed = np.convolve(density, kernel.ravel(), mode='same')
        
        # Detect valleys (local minima) to partition lines
        valleys = [0]
        for y in range(1, height_target - 1):
            if smoothed[y] < smoothed[y-1] and smoothed[y] <= smoothed[y+1]:
                valleys.append(y)
        valleys.append(height_target)
        
        lines = []
        for idx in range(len(valleys) - 1):
            y_start = valleys[idx]
            y_end = valleys[idx+1]
            line_boxes = [b for b in word_boxes if y_start <= b['cy'] < y_end]
            if line_boxes:
                lines.append(line_boxes)
                
        # Merge bounding boxes within each horizontal line group
        merged_lines = []
        for line in lines:
            # Sort left-to-right to preserve reading order
            line.sort(key=lambda b: (b['x_min'] + b['x_max']) / 2.0)
            
            x_min = min(b['x_min'] for b in line)
            x_max = max(b['x_max'] for b in line)
            y_min = min(b['y_min'] for b in line)
            y_max = max(b['y_max'] for b in line)
            merged_text = " ".join([b['text'] for b in line])
            
            merged_lines.append({
                'bbox': [
                    [x_min, y_min],
                    [x_max, y_min],
                    [x_max, y_max],
                    [x_min, y_max]
                ],
                'easyocr_text': merged_text
            })
            
        merged_lines.sort(key=lambda x: x['bbox'][0][1])
        return merged_lines
        
    def _crop_box(self, image, bbox) -> np.ndarray:
        """Crop bounding box region from image with padding."""
        xs = [int(p[0]) for p in bbox]
        ys = [int(p[1]) for p in bbox]
        x_min, x_max = max(0, min(xs)), min(image.shape[1], max(xs))
        y_min, y_max = max(0, min(ys)), min(image.shape[0], max(ys))
        
        # Add 6px padding for better boundary context
        pad = 6
        x_min = max(0, x_min - pad)
        x_max = min(image.shape[1], x_max + pad)
        y_min = max(0, y_min - pad)
        y_max = min(image.shape[0], y_max + pad)
        
        return image[y_min:y_max, x_min:x_max]
        
    def _preprocess_line(self, line_image) -> np.ndarray:
        """Convert BGR line crop to normalized grayscale then back to RGB for TrOCR."""
        if len(line_image.shape) == 3:
            gray = cv2.cvtColor(line_image, cv2.COLOR_BGR2GRAY)
        else:
            gray = line_image
            
        # Mild Denoise to preserve thin handwriting strokes
        denoised = cv2.fastNlMeansDenoising(gray, None, 3, 7, 21)
        
        # CLAHE Contrast Enhancement
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced = clahe.apply(denoised)
        
        return cv2.cvtColor(enhanced, cv2.COLOR_GRAY2RGB)
        
    def _extract_text(self, image) -> dict:
        """
        Extract text from preprocessed image using TrOCR model.
        
        Args:
            image: Preprocessed image
            
        Returns:
            dict: OCR result
        """
        logger.info("Converting image to PIL format...")
        pil_image = Image.fromarray(image)
        
        logger.info("Processing image with TrOCR processor...")
        pixel_values = self.processor(
            images=pil_image,
            return_tensors="pt"
        ).pixel_values
        
        logger.info(f"Moving pixel values to {self.device}...")
        pixel_values = pixel_values.to(self.device)
        
        logger.info("Generating text with TrOCR model...")
        with torch.no_grad():
            generated_ids = self.model.generate(
                pixel_values,
                max_length=128,  # Reduced from 512 for faster inference
                early_stopping=True,
                num_beams=1  # Use greedy decoding for speed
            )
        
        logger.info("Decoding generated tokens...")
        text = self.processor.batch_decode(
            generated_ids,
            skip_special_tokens=True
        )[0]
        
        logger.info(f"Raw text extracted: '{text}'")
        
        return {
            "engine": "TrOCR",
            "text": text,
            "confidence": 0.95,
            "boxes": [],
            "detections": 1
        }
