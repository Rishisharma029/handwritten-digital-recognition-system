"""Tesseract engine placeholder."""
import os
import cv2
import pytesseract


class TesseractEngine:

    def __init__(
        self,
        language="eng"
    ):

        self.language = language

        # Uncomment and edit if Tesseract isn't in your PATH
        # pytesseract.pytesseract.tesseract_cmd = (
        #     r"C:\Program Files\Tesseract-OCR\tesseract.exe"
        # )

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

        return self.extract_text(processed)

    # -------------------------------------
    # OCR from OpenCV Image
    # -------------------------------------

    def recognize_array(
        self,
        image
    ):

        processed = self.preprocess(image)

        return self.extract_text(processed)

    # -------------------------------------
    # Extract OCR
    # -------------------------------------

    def extract_text(
        self,
        image
    ):

        data = pytesseract.image_to_data(
            image,
            lang=self.language,
            output_type=pytesseract.Output.DICT
        )

        text = []

        confidence_scores = []

        boxes = []

        n = len(data["text"])

        for i in range(n):

            word = data["text"][i].strip()

            if word == "":
                continue

            confidence = float(data["conf"][i])

            if confidence < 0:
                continue

            x = data["left"][i]
            y = data["top"][i]
            w = data["width"][i]
            h = data["height"][i]

            boxes.append({
                "x": x,
                "y": y,
                "width": w,
                "height": h
            })

            text.append(word)

            confidence_scores.append(confidence)

        avg_confidence = (
            sum(confidence_scores) / len(confidence_scores)
            if confidence_scores else 0
        )

        return {

            "engine": "Tesseract",

            "text": " ".join(text),

            "confidence": round(avg_confidence, 2),

            "boxes": boxes,

            "detections": len(text)
        }