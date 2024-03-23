// Import required packages
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Initialize the Express application and use CORS middleware
const app = express();
app.use(cors());

// Create HTTP server and WebSocket server
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Define a route to serve dummy data
app.get('/api/data', (req, res) => {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];
  res.json(data);
});

// Handle socket events
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('chat', (data) => {
    console.log('Message received:', data);
    io.emit('chat', data);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Define a default route
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
