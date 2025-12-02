# Microservices Architecture & Deployment Guide

This document outlines the architecture, design patterns, and deployment instructions for the Task App, now migrated to a microservices architecture using Docker and Kubernetes.

## Architecture Overview

The application is decomposed into three main microservices:

1.  **Frontend Service**: A React application served via Nginx. It handles the user interface and communicates with the backend API.
2.  **Backend Service**: A Node.js/Express application that provides RESTful APIs for task management. It contains the business logic.
3.  **Database Service**: A MySQL database that stores persistent data.

Traffic is managed by an **Ingress Controller**, which routes external requests to the appropriate services based on the URL path.

### Architecture Diagram

```mermaid
graph TD
    User[User/Browser] -->|HTTP/HTTPS| Ingress[Ingress Controller]
    
    subgraph Kubernetes Cluster
        Ingress -->|/| Frontend[Frontend Service (Nginx + React)]
        Ingress -->|/api| Backend[Backend Service (Node.js)]
        
        Backend -->|TCP 3306| DB[MySQL Database]
        
        subgraph Persistence
            DB -->|Mounts| PVC[PersistentVolumeClaim]
        end
        
        subgraph Configuration
            Secret[Secrets (Passwords/Keys)] -.->|Injects| Backend
            Secret -.->|Injects| DB
        end
    end
```

## Design Patterns

### 1. Microservices Architecture
The monolithic (or tightly coupled) application has been split into distinct, independently deployable services. This allows for:
- **Scalability**: Each component can be scaled independently (e.g., more frontend replicas during high traffic).
- **Technology Diversity**: Different services can use different stacks (though here we use JS/TS).
- **Isolation**: A failure in one service (like the frontend) doesn't necessarily crash the database.

### 2. Containerization (Docker)
Each service is packaged into a Docker container. This ensures consistency across environments (dev, staging, prod) by bundling the code with its dependencies and runtime.

### 3. Declarative Deployment (Kubernetes)
The infrastructure is defined as code (YAML manifests). We describe the *desired state* (e.g., "I want 2 replicas of the backend"), and Kubernetes ensures the actual state matches it.

### 4. Ingress / API Gateway
An Ingress resource acts as the entry point for the cluster. It handles routing (Layer 7 load balancing), SSL termination, and path rewriting, shielding the internal services from direct external access.

### 5. Externalized Configuration
Configuration (DB host, passwords) is decoupled from the code using Kubernetes **ConfigMaps** (for non-sensitive data) and **Secrets** (for sensitive data). This follows the 12-Factor App methodology.

## Deployment Instructions

### Prerequisites
- Docker
- Kubernetes Cluster (Minikube, Kind, or Cloud)
- `kubectl` CLI
- Nginx Ingress Controller enabled on the cluster

### Step 1: Build Images
Build the Docker images for the frontend and backend.

```bash
docker build -t taskapp-backend:latest ./backend
docker build -t taskapp-frontend:latest ./frontend
```

*Note: If using Minikube/Kind, ensure you load these images into the cluster nodes.*

### Step 2: Deploy to Kubernetes
Apply the Kubernetes manifests located in the `k8s/` directory.

```bash
kubectl apply -f k8s/
```

### Step 3: Verify Status
Check that all pods are running:

```bash
kubectl get pods
```

### Step 4: Access the App
The application will be available at the Ingress address (usually `localhost` or the cluster IP).

- **Frontend**: `http://<ingress-ip>/`
- **Backend API**: `http://<ingress-ip>/api/`

## Directory Structure

- `backend/`: Node.js source code and Dockerfile.
- `frontend/`: React source code, Nginx config, and Dockerfile.
- `k8s/`: Kubernetes manifests (Deployments, Services, Ingress, Secrets).
