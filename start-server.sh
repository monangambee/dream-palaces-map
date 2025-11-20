#!/bin/bash

# Simple server starter for Dream Palaces Map
# This script starts a basic HTTP server for iframe embedding

PORT=${1:-3001}
echo "🗺️  Starting Dream Palaces Map Server on port $PORT"
echo "📱 Configured for iframe embedding in Next.js applications"
echo ""
echo "📍 Access URLs:"
echo "   Local: http://localhost:$PORT"
echo "   Network: http://$(hostname):$PORT"
echo ""
echo "⚡ Ready for iframe embedding!"
echo "   Use: <iframe src=\"http://localhost:$PORT\" width=\"100%\" height=\"600px\"></iframe>"
echo ""

# Start server based on available tools
if command -v python3 &> /dev/null; then
    echo "🐍 Using Python 3 HTTP server"
    python3 -m http.server $PORT
elif command -v python &> /dev/null; then
    echo "🐍 Using Python HTTP server"
    python -m SimpleHTTPServer $PORT
elif command -v node &> /dev/null; then
    echo "🟢 Using Node.js http-server"
    npx http-server -p $PORT -c-1 --cors
else
    echo "❌ No suitable HTTP server found. Please install Python or Node.js"
    exit 1
fi