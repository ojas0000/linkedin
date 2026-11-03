
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const app = express();

app.use(express.json());


MONGODB_USERNAME="123magisunny_db_user"
MONGODB_PASSWORD="H0C3i0f9YZea7uaC"
MONGODB_URI="mongodb+srv://123magisunny_db_user:H0C3i0f9YZea7uaC@cluster0.zz8kux9.mongodb.net"



// Connect to MongoDB using .env
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected successfully');

        app.listen(3000, () => {
            console.log('Server running at http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('MongoDB connection failed:', err);
    });


// a) INSERT: Add a student
app.post('/students', async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// b) RETRIEVE: Display all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Retrieve students by branch
app.get('/students/branch/:branch', async (req, res) => {
    try {
        const students = await Student.find({
            branch: req.params.branch.toUpperCase()
        });
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});





// c) UPDATE: Modify marks or branch by Roll Number
app.put('/students/:rollNo', async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { rollNo: Number(req.params.rollNo) },
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// d) DELETE: Delete student by Roll Number
app.delete('/students/:rollNo', async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({
            rollNo: Number(req.params.rollNo)
        });

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json({
            message: 'Student deleted successfully'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// e) FILTER: Students with marks greater than 70
app.get('/filter/marks', async (req, res) => {
    try {
        const students = await Student.find({
            marks: { $gt: 70 }
        });

        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Filter students belonging to CSE or IT
app.get('/filter/branch', async (req, res) => {
    try {
        const students = await Student.find({
            branch: { $in: ['CSE', 'IT'] }
        });

        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// f) AGGREGATION: Average marks
app.get('/aggregate/average', async (req, res) => {
    try {
        const result = await Student.aggregate([
            {
                $group: {
                    _id: null,
                    averageMarks: { $avg: '$marks' }
                }
            }
        ]);

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Highest marks in each branch
app.get('/aggregate/highest', async (req, res) => {
    try {
        const result = await Student.aggregate([
            {
                $group: {
                    _id: '$branch',
                    highestMarks: { $max: '$marks' }
                }
            }
        ]);

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Count students branch-wise
app.get('/aggregate/count', async (req, res) => {
    try {
        const result = await Student.aggregate([
            {
                $group: {
                    _id: '$branch',
                    totalStudents: { $sum: 1 }
                }
            }
        ]);

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



