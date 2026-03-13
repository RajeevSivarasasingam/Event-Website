const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    
    appliedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array of user IDs who applied to this event
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

