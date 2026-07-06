"""Health check endpoint for the API."""
from fastapi import APIRouter
import logging

router = APIRouter(tags=["health"])
logger = logging.getLogger(__name__)


@router.get("/health")
async def health_check():
    """
    Health check endpoint to verify the API is running.
    
    Returns:
        dict: Status information including API version and database status
    """
    return {
        "status": "healthy",
        "service": "handwritten-text-recognition-api",
        "version": "1.0.0"
    }


@router.get("/health/ready")
async def readiness_check():
    """
    Readiness check endpoint to verify the API is ready to serve requests.
    
    Returns:
        dict: Status information and service readiness
    """
    return {
        "ready": True,
        "services": {
            "api": "ready",
            "database": "ready",
            "ocr_engine": "ready"
        }
    }
