"""Logging utilities placeholder."""
import os
import logging

from logging.handlers import RotatingFileHandler

from backend.utils.constants import (
    LOG_DIR,
    LOG_FILE,
    LOG_LEVEL
)


# ==========================================
# Create Log Directory
# ==========================================

os.makedirs(
    LOG_DIR,
    exist_ok=True
)

LOG_PATH = os.path.join(
    LOG_DIR,
    LOG_FILE
)


# ==========================================
# Logger
# ==========================================

logger = logging.getLogger(
    "HandwrittenOCR"
)

logger.setLevel(LOG_LEVEL)


# Avoid duplicate handlers
if not logger.handlers:

    formatter = logging.Formatter(

        "%(asctime)s | "
        "%(levelname)-8s | "
        "%(name)s | "
        "%(filename)s:%(lineno)d | "
        "%(message)s"

    )

    # --------------------------------------
    # Console Handler
    # --------------------------------------

    console_handler = logging.StreamHandler()

    console_handler.setFormatter(
        formatter
    )

    # --------------------------------------
    # File Handler
    # --------------------------------------

    file_handler = RotatingFileHandler(

        LOG_PATH,

        maxBytes=5 * 1024 * 1024,

        backupCount=5,

        encoding="utf-8"

    )

    file_handler.setFormatter(
        formatter
    )

    logger.addHandler(console_handler)

    logger.addHandler(file_handler)


# ==========================================
# Helper Functions
# ==========================================

def debug(message):

    logger.debug(message)


def info(message):

    logger.info(message)


def warning(message):

    logger.warning(message)


def error(message):

    logger.error(message)


def critical(message):

    logger.critical(message)


def exception(message):

    logger.exception(message)