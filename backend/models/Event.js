const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    
<<<<<<< HEAD
    appliedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Array of user IDs who applied to this event
=======
    appliedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]  
>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

<<<<<<< HEAD
=======

>>>>>>> 98bd92cac385a2787232ed18c1405bdf942d8cb0
