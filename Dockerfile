# ==========================
# Base Image
# ==========================
FROM python:3.11-slim

# ==========================
# Environment Variables
# ==========================
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1

# ==========================
# Working Directory
# ==========================
WORKDIR /app

# ==========================
# Install System Dependencies
# ==========================
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    git \
    curl \
    tesseract-ocr \
    libtesseract-dev \
    poppler-utils \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# ==========================
# Copy Requirements
# ==========================
COPY requirements.txt .

# ==========================
# Upgrade Pip
# ==========================
RUN pip install --upgrade pip setuptools wheel

# ==========================
# Install Python Packages
# ==========================
RUN pip install -r requirements.txt

# ==========================
# Copy Project
# ==========================
COPY . .

# ==========================
# Create Required Folders
# ==========================
RUN mkdir -p \
    data/uploads \
    data/processed \
    outputs \
    trained_models

# ==========================
# Expose FastAPI Port
# ==========================
EXPOSE 8000

# ==========================
# Start FastAPI
# ==========================
CMD ["uvicorn", "backend.app:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]