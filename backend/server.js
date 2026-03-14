const express = require('express');
const mongoose = require('mongoose');
<<<<<<< HEAD
const cors = require('cors');       // Middleware to enable CORS (Cross-Origin Resource Sharing)
require('dotenv').config();     // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Allows your frontend to talk to your backend
app.use(express.json()); // Allows your server to accept JSON data

// Connect to MongoDB
=======
const cors = require('cors');       
require('dotenv').config();    

const app = express();

 
app.use(cors());  
app.use(express.json());  

 
>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(' Connected to MongoDB'))
.catch((err) => console.error(' MongoDB connection error:', err));

<<<<<<< HEAD
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

// Start Server
=======
 
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

 
>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));

 