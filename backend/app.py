"""Backend entrypoint for the handwritten digital recognition system."""
import os
import sys
import logging
from pathlib import Path

# Add project root to Python path
project_root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(project_root))

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.export import router as export_router
from backend.api.history import router as history_router
from backend.api.recognize import router as recognize_router
from backend.api.upload import router as upload_router
from backend.database.database import engine
from backend.database.models import Base
from backend.utils.constants import API_DESCRIPTION, API_TITLE, API_VERSION, DIRECTORIES

# ==========================================
# Create Required Directories
# ==========================================

for directory in DIRECTORIES:
    os.makedirs(directory, exist_ok=True)

# ==========================================
# Create Database Tables
# ==========================================

Base.metadata.create_all(bind=engine)

# ==========================================
# FastAPI Application
# ==========================================

app = FastAPI(
    title=API_TITLE,
    version=API_VERSION,
    description=API_DESCRIPTION,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# Health Check
# ==========================================

@app.get("/", tags=["Root"])
async def root():
    return {
        "success": True,
        "message": "Handwritten Digital Recognition API is running.",
        "version": API_VERSION,
    }


@app.get("/health", tags=["Health"])
async def health():
    return {
        "status": "healthy",
        "database": "connected",
        "api": "online",
    }


@app.get("/api/v1/health", tags=["Health"])
async def health_v1():
    return {
        "status": "healthy",
        "database": "connected",
        "api": "online",
    }


# ==========================================
# Register Routers
# ==========================================

app.include_router(upload_router, prefix="/api/v1")
app.include_router(recognize_router, prefix="/api/v1")
app.include_router(export_router, prefix="/api/v1")
app.include_router(history_router, prefix="/api/v1")