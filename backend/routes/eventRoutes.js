const express = require('express');
const Event = require('../models/Event');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/events (Public - View all events)
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   POST /api/events (Protected - Admin only theoretically)
router.post('/', async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   DELETE /api/events/:id (Protected)
router.delete('/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// @route   POST /api/events/:id/apply (Protected - Student applies)
router.post('/:id/apply', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        // Check if user already applied
        if (event.appliedUsers.includes(req.user.id)) {
            return res.status(400).json({ message: 'You have already applied' });
        }

        // Add user ID to event
        event.appliedUsers.push(req.user.id);
        await event.save();

        res.json({ message: 'Successfully applied to event', event });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;