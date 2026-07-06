"""EasyOCR engine placeholder."""
import os
import cv2
import easyocr
import numpy as np


class EasyOCREngine:

    def __init__(
        self,
        languages=None,
        gpu=False
    ):

        if languages is None:
            languages = ["en"]

        self.reader = easyocr.Reader(
            languages,
            gpu=gpu
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

    def recognize_image(
        self,
        image_path
    ):

        if not os.path.exists(image_path):
            raise FileNotFoundError(image_path)

        image = cv2.imread(image_path)

        if image is None:
            raise ValueError("Unable to load image.")

        processed = self.preprocess(image)

        results = self.reader.readtext(processed)

        return self.parse_results(results)

    # -------------------------------------
    # OCR from NumPy Image
    # -------------------------------------

    def recognize_array(
        self,
        image
    ):

        processed = self.preprocess(image)

        results = self.reader.readtext(processed)

        return self.parse_results(results)

    # -------------------------------------
    # Parse OCR Output
    # -------------------------------------

    def parse_results(
        self,
        results
    ):

        text = []

        confidence_scores = []

        bounding_boxes = []

        for detection in results:

            bbox = detection[0]
            detected_text = detection[1]
            confidence = detection[2]

            text.append(detected_text)

            confidence_scores.append(confidence)

            bounding_boxes.append(bbox)

        average_confidence = (
            sum(confidence_scores) / len(confidence_scores)
            if confidence_scores
            else 0
        )

        return {

            "engine": "EasyOCR",

            "text": "\n".join(text),

            "confidence": round(
                average_confidence * 100,
                2
            ),

            "boxes": bounding_boxes,

            "detections": len(text)
        }