"""TrOCR engine placeholder."""
import os
import cv2
import torch

from PIL import Image
from transformers import (
    TrOCRProcessor,
    VisionEncoderDecoderModel
)


class TrOCREngine:

    def __init__(
        self,
        model_name="microsoft/trocr-base-handwritten"
    ):

        self.device = (
            "cuda"
            if torch.cuda.is_available()
            else "cpu"
        )

        self.processor = TrOCRProcessor.from_pretrained(
            model_name
        )

        self.model = VisionEncoderDecoderModel.from_pretrained(
            model_name
        )

        self.model.to(self.device)

    # -----------------------------------------
    # Image Preprocessing
    # -----------------------------------------

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

        gray = cv2.adaptiveThreshold(
            gray,
            255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY,
            11,
            2
        )

        rgb = cv2.cvtColor(
            gray,
            cv2.COLOR_GRAY2RGB
        )

        return rgb

    # -----------------------------------------
    # OCR from Image Path
    # -----------------------------------------

    def recognize_image(
        self,
        image_path
    ):

        if not os.path.exists(image_path):
            raise FileNotFoundError(image_path)

        image = cv2.imread(image_path)

        if image is None:
            raise ValueError(
                "Unable to load image."
            )

        processed = self.preprocess(image)

        return self.extract_text(processed)

    # -----------------------------------------
    # OCR from NumPy Image
    # -----------------------------------------

    def recognize_array(
        self,
        image
    ):

        processed = self.preprocess(image)

        return self.extract_text(processed)

    # -----------------------------------------
    # OCR Inference
    # -----------------------------------------

    def extract_text(
        self,
        image
    ):

        pil_image = Image.fromarray(image)

        pixel_values = self.processor(
            images=pil_image,
            return_tensors="pt"
        ).pixel_values

        pixel_values = pixel_values.to(
            self.device
        )

        generated_ids = self.model.generate(
            pixel_values
        )

        text = self.processor.batch_decode(
            generated_ids,
            skip_special_tokens=True
        )[0]

        return {

            "engine": "TrOCR",

            "text": text,

            "confidence": 100.0,

            "boxes": [],

            "detections": 1
        }