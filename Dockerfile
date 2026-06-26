FROM node:20-bookworm-slim

# Install Python, pip, venv, ffmpeg, and other system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-venv \
    ffmpeg \
    curl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Create and use Python virtual environment to avoid PEP 668 restrictions
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install/upgrade yt-dlp in the virtual environment (with curl-cffi for TLS spoofing)
RUN pip3 install --no-cache-dir -U "yt-dlp[default,curl-cffi]"


# Set environment variables
ENV PORT=7860
ENV NODE_ENV=production
ENV PYTHON=/opt/venv/bin/python3

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install npm dependencies (production only)
RUN npm ci --omit=dev

# Copy the rest of the application files
COPY . .

# Expose the server port
EXPOSE 7860

# Run the Node server
CMD ["node", "server.js"]

