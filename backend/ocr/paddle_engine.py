"""PaddleOCR engine placeholder."""
import os
import cv2
import numpy as np

from paddleocr import PaddleOCR


class PaddleOCREngine:

    def __init__(
        self,
        language="en",
        use_gpu=False
    ):

        self.ocr = PaddleOCR(
            use_angle_cls=True,
            lang=language,
            use_gpu=use_gpu
        )

    # -------------------------------------
    # Image Preprocessing
    # -------------------------------------

    def preprocess(self, image):

        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        gray = cv2.GaussianBlur(
            gray,
            (3, 3),
            0
        )

        thresh = cv2.adaptiveThreshold(
            gray,
            255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY,
            11,
            2
        )

        return thresh

    # -------------------------------------
    # OCR from Image Path
    # -------------------------------------

    def recognize_image(self, image_path):

        if not os.path.exists(image_path):
            raise FileNotFoundError(image_path)

        image = cv2.imread(image_path)

        if image is None:
            raise ValueError("Unable to load image.")

        processed = self.preprocess(image)

        results = self.ocr.ocr(
            processed,
            cls=True
        )

        return self.parse_results(results)

    # -------------------------------------
    # OCR from OpenCV Image
    # -------------------------------------

    def recognize_array(self, image):

        processed = self.preprocess(image)

        results = self.ocr.ocr(
            processed,
            cls=True
        )

        return self.parse_results(results)

    # -------------------------------------
    # Parse PaddleOCR Output
    # -------------------------------------

    def parse_results(self, results):

        text = []
        confidence_scores = []
        boxes = []

        if results and results[0]:

            for line in results[0]:

                bbox = line[0]
                detected_text = line[1][0]
                confidence = line[1][1]

                boxes.append(bbox)
                text.append(detected_text)
                confidence_scores.append(confidence)

        avg_confidence = (
            sum(confidence_scores) / len(confidence_scores)
            if confidence_scores else 0
        )

        return {
            "engine": "PaddleOCR",
            "text": "\n".join(text),
            "confidence": round(avg_confidence * 100, 2),
            "boxes": boxes,
            "detections": len(text)
        }