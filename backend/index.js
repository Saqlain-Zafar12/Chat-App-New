// Import required packages
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the CORS middleware

// Initialize the Express application
const app = express();
app.use(cors()); // Use the CORS middleware to allow all origins

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://chat-app-new-frontend-w.vercel.app", // Set CORS origin to allow all origins
    methods: ["GET", "POST"]
  }
});
const port = process.env.PORT || 5000; // Use environment port or default to 5000

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define a route to serve dummy data
app.get('/api/data', (req, res) => {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    // Add more dummy data as needed
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

// Start the Express server
server.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
