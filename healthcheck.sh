#!/bin/sh

# Health check script for EcoTrend
# Checks if nginx is running and responding

# Check if nginx is running
if ! pgrep nginx > /dev/null; then
    echo "Nginx is not running"
    exit 1
fi

# Use wget if available, otherwise use nc to check port
if command -v wget > /dev/null 2>&1; then
    # Check health endpoint
    if ! wget --quiet --tries=1 --timeout=3 --spider http://localhost/health > /dev/null 2>&1; then
        echo "Health check endpoint not responding"
        exit 1
    fi
    
    # Check main page
    if ! wget --quiet --tries=1 --timeout=3 --spider http://localhost/ > /dev/null 2>&1; then
        echo "Main page not accessible"
        exit 1
    fi
else
    # Fallback: just check if port 80 is open
    if ! nc -z localhost 80; then
        echo "Port 80 not accessible"
        exit 1
    fi
fi

echo "All health checks passed"
exit 0
