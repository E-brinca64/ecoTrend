#!/bin/sh

# Health check script for EcoTrend
# Checks if nginx is running and responding

# Check if nginx is running
if ! pgrep nginx > /dev/null; then
    echo "Nginx is not running"
    exit 1
fi

# Check if nginx is responding on port 80
if ! curl -f http://localhost/health > /dev/null 2>&1; then
    echo "Health check endpoint not responding"
    exit 1
fi

# Check if the main page is accessible
if ! curl -f http://localhost/ > /dev/null 2>&1; then
    echo "Main page not accessible"
    exit 1
fi

echo "All health checks passed"
exit 0
