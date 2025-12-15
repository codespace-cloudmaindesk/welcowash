#!/bin/bash

echo "Starting project scaffolding..."

# ---------------------------
# Backend structure
# ---------------------------
echo "Creating backend structure..."

# Gateway
mkdir -p backend/gateway/src/{routes,middlewares,services}

# Services
services=(client employee wash payment notification analytics)
for service in "${services[@]}"; do
    mkdir -p "backend/services/${service}-service/src/"{controllers,services,entities,dtos,interfaces,validators}
done

# Shared and misc
mkdir -p backend/shared/{types,utils,decorators}
mkdir -p backend/misc
touch backend/misc/docker-compose.yml backend/misc/.env backend/misc/requirements.txt

echo "Backend structure created successfully!"

# ---------------------------
# Frontend structure
# ---------------------------
echo "Creating frontend structure..."

# Web frontend
mkdir -p frontend/web/src/{components,pages,services,hooks,types,context,utils}

# Mobile frontend
mkdir -p frontend/mobile/src/{screens,components,services,hooks,types,context,utils}

echo "Frontend structure created successfully!"

echo "Project scaffolding complete!"
echo "Backend, web, and mobile directories are ready."
