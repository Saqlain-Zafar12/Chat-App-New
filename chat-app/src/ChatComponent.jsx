import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios'; // Import axios to make HTTP requests

// Replace with your actual ngrok URL (ensure tunnel is active)
const socket = io('https://chat-app-new-api.vercel.app/');

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [username, setUsername] = useState('User' + Math.floor(Math.random() * 1000)); // Generate random username
  const [data, setData] = useState([]); // State to store fetched data or an error message
  const [isLoading, setIsLoading] = useState(false); // Flag for loading state
  const [error, setError] = useState(null); // State to store potential errors

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Clear previous errors

      try {
        const response = await axios.get('https://chat-app-new-api.vercel.app/api/data');
        setData(response.data);
        console.log("response.data :", response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Listener for 'chat' event
    socket.on('chat', (data) => {
      const updatedHistory = [...chatHistory, data];
      setChatHistory(updatedHistory);
      console.log('Updated History:', updatedHistory);
    });
  }, [chatHistory]); // Re-run only when chat history changes

  const sendMessage = () => {
    if (!message) {
      // Handle empty message case (optional)
      console.warn('Please enter a message to send.');
      return;
    }

    socket.emit('chat', { username, message });
    setMessage('');
  };

  return (
    <div>
      <div>
      {isLoading ? (
  <p>Loading data...</p>
) : error ? (
  <p className="error">{error}</p>
) : (
  <>
    {Array.isArray(data) && data.length > 0 ? (
      // Render data using map
      data.map((e, index) => (
        <div key={index}>
          <strong>{e.name}</strong>: {e.email}
        </div>
      ))
    ) : (
      <p>No data available yet.</p>
    )}
  </>
)}


        {chatHistory.map((data, index) => (
          <div key={index}>
            <strong>{data.username}:</strong> {data.message}
          </div>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
