# WelcomWash

Full-stack starter project with:
- FastAPI backend (Python)
- React + TypeScript frontend (port 5000)
- Docker setup for both

## Quick Start

### Docker
docker-compose up --build

- Frontend: http://localhost (Port 80)
- Backend: http://localhost:8000 (Internal, proxied via Frontend)

### Local Development

#### Backend
cd backend
pip install -r requirements.txt
python -m app.main

#### Frontend
cd frontend
npm install
npm run dev
