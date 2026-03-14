const express = require('express');
const Event = require('../models/Event');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

<<<<<<< HEAD
// @route   GET /api/events (Public - View all events)
=======
>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
router.get('/', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

<<<<<<< HEAD
// @route   POST /api/events (Protected - Admin only theoretically)
=======

>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
router.post('/', async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

<<<<<<< HEAD
// @route   DELETE /api/events/:id (Protected)
=======
>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
router.delete('/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

<<<<<<< HEAD
// @route   POST /api/events/:id/apply (Protected - Student applies)
=======
>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
router.post('/:id/apply', protect, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
<<<<<<< HEAD
        // Check if user already applied
=======
        
>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
        if (event.appliedUsers.includes(req.user.id)) {
            return res.status(400).json({ message: 'You have already applied' });
        }

<<<<<<< HEAD
        // Add user ID to event
=======
       
>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
        event.appliedUsers.push(req.user.id);
        await event.save();

        res.json({ message: 'Successfully applied to event', event });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;