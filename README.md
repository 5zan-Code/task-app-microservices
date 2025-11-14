# Task Management App

A full-stack task management application built with Node.js, React, and MySQL, featuring JWT authentication.

## Features

- User authentication (Signup/Login) with JWT
- Task CRUD operations (Create, Read, Update, Delete)
- Mark tasks as complete/incomplete
- Modern, responsive UI
- Secure password hashing with bcrypt

## Tech Stack

### Backend
- Node.js with Express
- MySQL database
- JWT for authentication
- bcrypt for password hashing

### Frontend
- React with React Router
- Vite for build tooling
- Axios for API calls
- Modern CSS styling

## Prerequisites

- Node.js (v18 or higher)
- MySQL (or use Docker Compose)
- npm or yarn

## Setup Instructions

### 1. Database Setup

#### Option A: Using Docker Compose (Recommended)
```bash
cd task-app
docker-compose up -d
```

#### Option B: Manual MySQL Setup
1. Install and start MySQL
2. Create a database named `taskapp`
3. Run the schema file:
```bash
mysql -u root -p taskapp < backend/sql/schema.sql
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` file with your database credentials:
```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=taskapp
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
task-app/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js          # Signup/Login routes
│   │   └── tasks.js         # Task CRUD routes
│   ├── sql/
│   │   └── schema.sql       # Database schema
│   ├── db.js                # MySQL connection pool
│   ├── server.js            # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js       # API client functions
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Auth context provider
│   │   ├── pages/
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Tasks.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
├── docker-compose.yml       # MySQL container setup
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user
- `POST /api/auth/login` - Login user

### Tasks (Requires Authentication)
- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Usage

1. Start the MySQL database (if using Docker: `docker-compose up -d`)
2. Start the backend server (`cd backend && npm run dev`)
3. Start the frontend server (`cd frontend && npm run dev`)
4. Open `http://localhost:3000` in your browser
5. Sign up for a new account or login
6. Start managing your tasks!

## Environment Variables

### Backend (.env)
- `PORT` - Backend server port (default: 5000)
- `DB_HOST` - MySQL host
- `DB_PORT` - MySQL port (default: 3306)
- `DB_USER` - MySQL username
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name
- `JWT_SECRET` - Secret key for JWT tokens

## Security Notes

- Change the `JWT_SECRET` in production
- Use strong database passwords
- Consider adding rate limiting for production
- Enable HTTPS in production
- Add input validation and sanitization

## License

MIT

