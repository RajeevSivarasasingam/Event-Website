const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');       // Middleware to enable CORS (Cross-Origin Resource Sharing)
require('dotenv').config();     // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Allows your frontend to talk to your backend
app.use(express.json()); // Allows your server to accept JSON data

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(' Connected to MongoDB'))
.catch((err) => console.error(' MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));

 