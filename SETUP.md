# Quick Setup Guide

Follow these steps to run the app on localhost:

## Step 1: Start MySQL Database

### Option A: Using Docker (Easiest)
```bash
cd task-app
docker-compose up -d
```
This will start MySQL on port 3306 with:
- Username: `root`
- Password: `rootpassword`
- Database: `taskapp`

### Option B: Using Local MySQL
1. Make sure MySQL is installed and running
2. Create the database:
```bash
mysql -u root -p
CREATE DATABASE taskapp;
exit;
```
3. Run the schema:
```bash
mysql -u root -p taskapp < backend/sql/schema.sql
```

## Step 2: Setup Backend

```bash
cd task-app/backend
npm install
```

Create a `.env` file:
```bash
cp env.example.txt .env
```

Edit `.env` and set your database credentials:
```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=taskapp
JWT_SECRET=my-super-secret-jwt-key-12345
```

Start the backend server:
```bash
npm run dev
```

You should see: `Server is running on port 5000`

## Step 3: Setup Frontend

Open a **new terminal window**:

```bash
cd task-app/frontend
npm install
npm run dev
```

You should see: `Local: http://localhost:3000`

## Step 4: Access the App

Open your browser and go to: **http://localhost:3000**

1. Click "Sign Up" to create an account
2. Or click "Login" if you already have an account
3. Start managing your tasks!

## Troubleshooting

### Backend won't start
- Check if MySQL is running: `docker ps` (if using Docker)
- Verify `.env` file has correct database credentials
- Make sure port 5000 is not in use

### Frontend won't connect to backend
- Make sure backend is running on port 5000
- Check browser console for errors
- Verify CORS is enabled (it should be by default)

### Database connection errors
- Verify MySQL is running
- Check database credentials in `.env`
- Make sure the `taskapp` database exists

