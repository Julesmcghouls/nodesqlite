#!/bin/bash

echo "Starting Pantry Inventory System..."

# Function to handle cleanup on exit
cleanup() {
    echo "Stopping services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Set up trap to cleanup on exit
trap cleanup SIGINT

# Start backend
echo "Starting backend on port 4000..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "Starting frontend on port 5173..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "Both services are starting..."
echo "Backend: http://localhost:4000"
echo "Frontend: http://localhost:5173"
echo "Login credentials: admin/admin"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for both processes
wait