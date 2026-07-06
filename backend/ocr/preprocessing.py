"""Preprocessing utilities for OCR."""
import cv2
import numpy as np
import logging

logger = logging.getLogger(__name__)


def preprocess_image(image: np.ndarray) -> np.ndarray:
    """
    Complete preprocessing pipeline for OCR.
    
    Steps:
    1. Resize to normalize dimensions
    2. Convert to grayscale
    3. Noise removal
    4. Contrast enhancement
    5. Adaptive thresholding
    6. Deskew
    7. Sharpening
    
    Args:
        image: Numpy array representation of image
        
    Returns:
        np.ndarray: Preprocessed image
    """
    try:
        # Step 1: Resize to normalize dimensions
        resized = resize_image(image, width=1280, height=720)
        
        # Step 2: Convert to grayscale
        if len(resized.shape) == 3:
            gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
        else:
            gray = resized
        
        # Step 3: Noise removal using bilateral filter
        denoised = denoise_image(gray)
        
        # Step 4: Contrast enhancement using CLAHE
        enhanced = enhance_contrast(denoised)
        
        # Step 5: Adaptive thresholding
        thresholded = cv2.adaptiveThreshold(
            enhanced,
            255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY,
            11,
            2
        )
        
        # Step 6: Deskew to straighten tilted pages
        deskewed = deskew_image(thresholded)
        
        # Step 7: Sharpening to make letters clearer
        sharpened = sharpen_image(deskewed)
        
        # Convert back to RGB for model input
        rgb = cv2.cvtColor(sharpened, cv2.COLOR_GRAY2RGB)
        
        return rgb
    except Exception as e:
        logger.error(f"Error preprocessing image: {e}")
        raise


def denoise_image(image: np.ndarray) -> np.ndarray:
    """Remove noise from image using bilateral filtering."""
    return cv2.bilateralFilter(image, 9, 75, 75)


def enhance_contrast(image: np.ndarray) -> np.ndarray:
    """Enhance image contrast using CLAHE."""
    if len(image.shape) == 3:
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    return clahe.apply(image)


def resize_image(image: np.ndarray, width: int = 1280, height: int = 720) -> np.ndarray:
    """Resize image to specified dimensions while maintaining aspect ratio."""
    h, w = image.shape[:2]
    
    # Calculate aspect ratio
    aspect_ratio = w / h
    
    if aspect_ratio > width / height:
        # Width is the limiting factor
        new_width = width
        new_height = int(width / aspect_ratio)
    else:
        # Height is the limiting factor
        new_height = height
        new_width = int(height * aspect_ratio)
    
    return cv2.resize(image, (new_width, new_height), interpolation=cv2.INTER_AREA)


def deskew_image(image: np.ndarray) -> np.ndarray:
    """Deskew image using moments to straighten tilted pages."""
    if len(image.shape) == 3:
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    else:
        gray = image
    
    # Calculate moments
    m = cv2.moments(gray)
    
    if m["mu20"] - m["mu02"] == 0:
        return image
    
    angle = 0.5 * np.arctan(2.0 * m["mu11"] / (m["mu20"] - m["mu02"]))
    angle = np.degrees(angle)
    
    # Rotate image
    h, w = gray.shape
    rotation_matrix = cv2.getRotationMatrix2D((w // 2, h // 2), angle, 1.0)
    rotated = cv2.warpAffine(gray, rotation_matrix, (w, h), flags=cv2.INTER_CUBIC)
    
    return rotated


def sharpen_image(image: np.ndarray) -> np.ndarray:
    """Sharpen image using kernel convolution."""
    kernel = np.array([[-1, -1, -1],
                       [-1,  9, -1],
                       [-1, -1, -1]])
    
    sharpened = cv2.filter2D(image, -1, kernel)
    return sharpened
