# Task App - Docker Setup

This is a fully containerized version of the Task Management App that can be started with a single Docker Compose command.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

1. **Navigate to the project directory:**
   ```bash
   cd task-app-docker
   ```

2. **Build and start all services:**
   ```bash
   docker-compose up -d --build
   ```

3. **Access the application:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:5000/api
   - **MySQL Database:** localhost:3306

4. **View logs:**
   ```bash
   docker-compose logs -f
   ```

## What's Included

This Docker setup includes three services:

### 1. MySQL Database
- **Container:** `taskapp-mysql`
- **Port:** 3306
- **Database:** `taskapp`
- **Credentials:**
  - Username: `root`
  - Password: `rootpassword`
- The database schema is automatically initialized when the backend starts

### 2. Backend API
- **Container:** `taskapp-backend`
- **Port:** 5000
- **Framework:** Node.js with Express
- **Features:**
  - Automatically waits for MySQL to be ready
  - Initializes database schema on startup
  - Health check endpoint at `/api/health`

### 3. Frontend
- **Container:** `taskapp-frontend`
- **Port:** 3000 (mapped from container port 80)
- **Framework:** React with Vite
- **Server:** Nginx
- **Features:**
  - Proxies `/api/*` requests to the backend
  - Serves the React app
  - Optimized production build

## Docker Compose Commands

### Start all services
```bash
docker-compose up -d
```

### Stop all services
```bash
docker-compose down
```

### Stop and remove volumes (⚠️ deletes database data)
```bash
docker-compose down -v
```

### Rebuild and restart
```bash
docker-compose up -d --build
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### View running containers
```bash
docker-compose ps
```

### Execute commands in containers
```bash
# Access backend container
docker-compose exec backend sh

# Access MySQL
docker-compose exec mysql mysql -u root -prootpassword taskapp

# Access frontend container
docker-compose exec frontend sh
```

## Project Structure

```
task-app-docker/
├── backend/
│   ├── Dockerfile
│   ├── docker-entrypoint.sh
│   ├── .dockerignore
│   ├── package.json
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   └── sql/
│       └── schema.sql
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .dockerignore
│   ├── package.json
│   ├── vite.config.js
│   └── src/
├── docker-compose.yml
└── README-DOCKER.md
```

## How It Works

1. **MySQL** starts first and waits until it's healthy
2. **Backend** waits for MySQL to be healthy, then:
   - Initializes the database schema
   - Starts the Express server
3. **Frontend** waits for the backend to be healthy, then:
   - Serves the built React app via Nginx
   - Proxies API requests to the backend

## Database Management

### Access MySQL directly
```bash
docker-compose exec mysql mysql -u root -prootpassword taskapp
```

### View tables
```bash
docker-compose exec mysql mysql -u root -prootpassword taskapp -e "SHOW TABLES;"
```

### Backup database
```bash
docker-compose exec mysql mysqldump -u root -prootpassword taskapp > backup.sql
```

### Restore database
```bash
docker-compose exec -i mysql mysql -u root -prootpassword taskapp < backup.sql
```

## Troubleshooting

### Services won't start
- Check if ports 3000, 5000, or 3306 are in use
- View logs: `docker-compose logs`
- Ensure Docker has enough resources allocated

### Database connection errors
- Wait for MySQL to be fully ready (health checks ensure this)
- Check backend logs: `docker-compose logs backend`

### Frontend can't reach backend
- Ensure both containers are on the same network
- Check nginx proxy configuration
- Verify backend health: `curl http://localhost:5000/api/health`

### Reset everything
```bash
docker-compose down -v
docker-compose up -d --build
```

## Environment Variables

You can customize environment variables in `docker-compose.yml`:
- `DB_PASSWORD`: MySQL root password
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Backend port (default: 5000)

## Network

All services communicate via the `taskapp-network` bridge network:
- Frontend → Backend: `http://backend:5000`
- Backend → MySQL: `mysql:3306`

External access:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api`
- MySQL: `localhost:3306`

## Production Notes

For production deployment:
1. Change `JWT_SECRET` to a strong, random value
2. Use strong database passwords
3. Enable HTTPS (add reverse proxy)
4. Set up proper environment variable management
5. Configure production MySQL settings
6. Add monitoring and logging
7. Use Docker secrets for sensitive data

## Comparison with Original

The original `task-app` folder runs services locally:
- Requires Node.js and MySQL installed
- Manual setup steps
- Development mode

This `task-app-docker` version:
- Everything containerized
- Single command to start
- Production-ready build
- Isolated environment
- Easy to deploy

