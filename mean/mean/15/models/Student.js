const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollNo: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    branch: {
        type: String,
        required: true,
        enum: ['CSE', 'IT', 'ECE', 'EEE', 'MECH']
    },
    year: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    },
    marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});

// Create the Student model
module.exports = mongoose.model('Student', studentSchema);


