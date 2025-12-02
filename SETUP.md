# Setup Guide

## Option 1: Kubernetes Deployment (Recommended)

This method deploys the application as a set of microservices.

### Prerequisites
- Docker
- Kubernetes Cluster (Minikube, Kind, or Cloud)
- `kubectl`
- Nginx Ingress Controller (enabled on your cluster)

### Steps

1.  **Build Docker Images**
    ```bash
    # Build Backend
    docker build -t taskapp-backend:latest ./backend

    # Build Frontend
    docker build -t taskapp-frontend:latest ./frontend
    ```
    *Note: If using Minikube/Kind, load the images into the cluster nodes.*

2.  **Deploy to Kubernetes**
    ```bash
    kubectl apply -f k8s/
    ```

3.  **Verify Deployment**
    ```bash
    kubectl get pods
    ```
    Wait for all pods to be `Running`.

4.  **Access the App**
    Go to `http://localhost` (or your Ingress IP).

---

## Option 2: Docker Compose (Quick Start)

This method runs the application using Docker Compose (simpler for local dev).

### Steps

1.  **Start Services**
    ```bash
    docker-compose up -d --build
    ```

2.  **Access the App**
    - Frontend: `http://localhost:3000`
    - Backend: `http://localhost:5000`

---

## Option 3: Local Development (Manual)

See the legacy instructions in `README-OLD.md` (if available) or check `package.json` scripts.

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
