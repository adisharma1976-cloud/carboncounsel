#!/bin/bash
# CarbonCounsel — Start both backend API and frontend dev server

set -e

echo "🌿 Starting CarbonCounsel Platform..."
echo ""

# Start Backend API server on port 3001
echo "📡 Starting API backend on http://localhost:8080"
cd "$(dirname "$0")/backend"
node server.js &
BACKEND_PID=$!

# Wait for backend to be ready
sleep 2

# Start Frontend Vite dev server on port 5173
echo "🖥️  Starting frontend on http://localhost:5173"
cd "$(dirname "$0")"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ CarbonCounsel is running!"
echo ""
echo "   Frontend: http://localhost:5173"
echo "   API:      http://localhost:8080"
echo "   API Docs: http://localhost:8080/api/health"
echo ""
echo "   Press Ctrl+C to stop both servers."
echo ""

# Wait and catch interrupt
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Stopped.'; exit 0" INT TERM
wait
