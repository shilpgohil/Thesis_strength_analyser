# Use Python 3.10 slim image for smaller size
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies required for compilation
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# CRITICAL: Install CPU-only PyTorch first to save space (approx 2GB saved)
# This prevents installing the massive CUDA version
RUN pip install --no-cache-dir torch --index-url https://download.pytorch.org/whl/cpu

# Install other dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Download the specific spacy model explicitly setup to avoid runtime downloads
RUN python -m spacy download en_core_web_sm

# Pre-download SentenceTransformer model to avoid runtime timeout
COPY preload_models.py .
RUN python preload_models.py && rm preload_models.py

# Copy the application code
COPY . .

# Expose the port (Render handles this dynamically but good for documentation)
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
