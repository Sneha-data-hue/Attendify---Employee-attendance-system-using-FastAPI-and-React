FROM python:3.10

WORKDIR /app

# install system dependencies for dlib
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    libopenblas-dev \
    liblapack-dev \
    libx11-dev \
    libgtk-3-dev

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "10000"]