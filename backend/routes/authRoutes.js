const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

<<<<<<< HEAD
// @route   POST /api/auth/register
=======

>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

<<<<<<< HEAD
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
=======
         
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });
 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
        user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

<<<<<<< HEAD
// @route   POST /api/auth/login
=======
>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

<<<<<<< HEAD
        // Check for user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT Token
=======
       
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      
>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
        const payload = { id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

