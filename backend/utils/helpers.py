"""Helper utilities placeholder."""
import os
import uuid
import shutil
from datetime import datetime
from pathlib import Path


# ==========================================
# Generate Unique Filename
# ==========================================

def generate_filename(filename: str):

    extension = Path(filename).suffix

    unique_name = (
        f"{uuid.uuid4().hex}"
        f"{extension}"
    )

    return unique_name


# ==========================================
# Get File Extension
# ==========================================

def get_extension(filename: str):

    return Path(filename).suffix.lower()


# ==========================================
# Remove File
# ==========================================

def delete_file(path: str):

    if os.path.exists(path):

        os.remove(path)

        return True

    return False


# ==========================================
# Create Directory
# ==========================================

def create_directory(path: str):

    os.makedirs(
        path,
        exist_ok=True
    )


# ==========================================
# Clear Directory
# ==========================================

def clear_directory(path: str):

    if not os.path.exists(path):
        return

    for item in os.listdir(path):

        item_path = os.path.join(
            path,
            item
        )

        if os.path.isfile(item_path):

            os.remove(item_path)

        else:

            shutil.rmtree(item_path)


# ==========================================
# Current Timestamp
# ==========================================

def timestamp():

    return datetime.now().strftime(
        "%Y-%m-%d %H:%M:%S"
    )


# ==========================================
# File Size
# ==========================================

def file_size(path: str):

    if not os.path.exists(path):

        return 0

    return os.path.getsize(path)


# ==========================================
# Human Readable Size
# ==========================================

def readable_size(size):

    units = [
        "B",
        "KB",
        "MB",
        "GB",
        "TB"
    ]

    value = float(size)

    for unit in units:

        if value < 1024:

            return f"{value:.2f} {unit}"

        value /= 1024

    return f"{value:.2f} PB"


# ==========================================
# File Information
# ==========================================

def file_info(path: str):

    if not os.path.exists(path):

        return None

    return {

        "filename":
            os.path.basename(path),

        "extension":
            get_extension(path),

        "size":
            file_size(path),

        "size_readable":
            readable_size(file_size(path)),

        "created":
            timestamp()
    }


# ==========================================
# Save Uploaded File
# ==========================================

def save_upload(upload_file, destination):

    with open(destination, "wb") as buffer:

        shutil.copyfileobj(
            upload_file.file,
            buffer
        )

    return destination


# ==========================================
# Success Response
# ==========================================

def success(message, data=None):

    return {

        "success": True,

        "message": message,

        "data": data
    }


# ==========================================
# Error Response
# ==========================================

def error(message):

    return {

        "success": False,

        "message": message
    }