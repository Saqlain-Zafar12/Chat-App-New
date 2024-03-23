// // Import required packages
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the CORS middleware

// // Initialize the Express application
const app = express();
// app.use(cors()); // Use the CORS middleware to allow all origins

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Set CORS origin to allow all origins
    methods: ["GET", "POST"]
  }
});
const port = 3000; // You can use any port number

// // Define a route to serve dummy data
app.get('/api/data', (req, res) => {
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    // Add more dummy data as needed
  ];
  res.json(data);
});

// // Handle socket events
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

// // Start the Express server


app.get("/", (req, res) => { res.send("Express on Vercel"); }); const PORT = process.env.PORT || 5000; app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });