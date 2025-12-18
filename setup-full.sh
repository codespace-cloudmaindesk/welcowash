#!/bin/bash

# ============================
# Nexus Starter Project Script
# ============================
PROJECT_NAME="welcomwash"
echo "🚀 Creating project: $PROJECT_NAME"

# Create project root
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME" || exit

# ----------------------------
# Backend
# ----------------------------
echo "📦 Setting up backend..."
mkdir -p backend/app/routes backend/tests

# main.py
cat > backend/app/main.py << 'EOF'
from fastapi import FastAPI
from app.routes import users

app = FastAPI(title="WelcomWash API")
app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "Backend is running"}
EOF

# users.py
cat > backend/app/routes/users.py << 'EOF'
from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/")
def get_users():
    return [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]
EOF

# requirements.txt
cat > backend/requirements.txt << 'EOF'
fastapi
uvicorn
EOF

# Dockerfile
cat > backend/Dockerfile << 'EOF'
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
EOF

# ----------------------------
# Frontend
# ----------------------------
echo "⚛️  Setting up frontend (React + TypeScript)..."
mkdir -p frontend/src/pages frontend/public

# main.tsx
cat > frontend/src/main.tsx << 'EOF'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# App.tsx
cat > frontend/src/App.tsx << 'EOF'
import React from "react";
import Home from "./pages/Home";

function App(): JSX.Element {
  return <Home />;
}

export default App;
EOF

# Home.tsx
cat > frontend/src/pages/Home.tsx << 'EOF'
import React from "react";

export default function Home(): JSX.Element {
  return <h1>Welcome to WelcomWash (TypeScript)!</h1>;
}
EOF

# package.json
cat > frontend/package.json << 'EOF'
{
  "name": "welcomwash-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
EOF

# vite.config.ts
cat > frontend/vite.config.ts << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
});
EOF

# ----------------------------
# Docker Compose
# ----------------------------
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"

  frontend:
    build: ./frontend
    ports:
      - "5000:5000"
EOF

# ----------------------------
# .gitignore
# ----------------------------
cat > .gitignore << 'EOF'
# Environment
.env
.env.local

# Python
__pycache__/
*.py[cod]
venv/
env/

# Node
node_modules/
dist/
build/

# IDEs
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log
EOF

# ----------------------------
# README.md
# ----------------------------
cat > README.md << 'EOF'
# WelcomWash

Full-stack starter project with:
- FastAPI backend (Python)
- React + TypeScript frontend (port 5000)
- Docker setup for both

## Quick Start

### Docker
docker-compose up --build

- Frontend: http://localhost:5000
- Backend: http://localhost:8000

### Local Development

#### Backend
cd backend
pip install -r requirements.txt
python -m app.main

#### Frontend
cd frontend
npm install
npm run dev
EOF

# ----------------------------
# Done
# ----------------------------
echo ""
echo "✅ Project created successfully!"
echo "📁 Directory: $(pwd)"
echo ""
echo "📌 Frontend runs on port 5000, backend on 8000"
echo "📋 Next steps:"
echo "1. cd frontend && npm install"
echo "2. cd backend && pip install -r requirements.txt"
echo "3. docker-compose up --build"
echo ""
echo "🎉 Happy coding!"
