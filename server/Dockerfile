FROM python:3.11


WORKDIR /code


# Install system dependencies required for Playwright (Chromium)
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    gnupg \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    fonts-liberation \
    libappindicator1 \
    xdg-utils \
    libgbm-dev \
    && rm -rf /var/lib/apt/lists/*


COPY ./requirements.txt /code/requirements.txt


RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt


# Install Playwright and required browsers (e.g., Chromium)
RUN pip install playwright \
    && playwright install chromium \
    && playwright install-deps


COPY . /code


# Expose port 80 to the outside world
EXPOSE 80


CMD ["fastapi", "run", "main.py", "--port", "80"]