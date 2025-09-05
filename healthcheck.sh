#!/bin/sh

# Health check script for EcoTrend Vite React app
# Checks if the Vite preview server is running and responding

# Check if the Vite preview process is running
if ! pgrep -f "vite preview" > /dev/null; then
    echo "Vite preview server is not running"
    exit 1
fi

# Use curl to check if the server is responding on port 3000
if command -v curl > /dev/null 2>&1; then
    # Check if the main page is accessible
    if ! curl -f --connect-timeout 5 --max-time 10 http://localhost:3000/ > /dev/null 2>&1; then
        echo "Main page not accessible on port 3000"
        exit 1
    fi
else
    # Fallback: just check if port 3000 is open
    if ! nc -z localhost 3000; then
        echo "Port 3000 not accessible"
        exit 1
    fi
fi

echo "All health checks passed"
exit 0
