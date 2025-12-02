# Task Management App - Microservices Edition

A full-stack task management application migrated to a **Microservices Architecture** using **Docker** and **Kubernetes**.

![Microservices Architecture](file:///home/f97aizan/.gemini/antigravity/brain/a0997e9d-f8aa-4fc5-bab9-204c4f22c325/microservices_architecture_diagram_1764697664465.png)

## Architecture Overview

The application is split into three main services:

1.  **Frontend**: React + Vite (served via Nginx)
2.  **Backend**: Node.js + Express
3.  **Database**: MySQL 8.0

Traffic is managed by an **Ingress Controller**, which routes requests to the appropriate service.

### Key Features
- **Scalable**: Independent scaling of frontend and backend.
- **Resilient**: Self-healing pods managed by Kubernetes.
- **Secure**: Secrets management for sensitive data.
- **Modern**: React frontend with a robust Node.js API.

## Tech Stack

- **Frontend**: React, Vite, Nginx
- **Backend**: Node.js, Express, MySQL Client
- **Database**: MySQL 8.0
- **Infrastructure**: Docker, Kubernetes (Minikube/Kind/Cloud)

## Getting Started

You can run this application in two ways:

1.  **Kubernetes (Recommended)**: For a production-like microservices experience.
2.  **Docker Compose**: For quick local development.

See [SETUP.md](SETUP.md) for detailed instructions.

## Project Structure

```
task-app/
├── backend/                 # Backend microservice
├── frontend/                # Frontend microservice
├── k8s/                     # Kubernetes manifests
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── mysql-deployment.yaml
│   └── ingress.yaml
├── docker-compose.yml       # Legacy Docker Compose setup
├── README.md                # This file
└── SETUP.md                 # Setup guide
```

## API Endpoints

- `POST /api/auth/signup` - Create Account
- `POST /api/auth/login` - Login
- `GET /api/tasks` - List Tasks
- `POST /api/tasks` - Create Task
- `PUT /api/tasks/:id` - Update Task
- `DELETE /api/tasks/:id` - Delete Task

## License

MIT
