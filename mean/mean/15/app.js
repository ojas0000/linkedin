const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const app = express();
app.use(express.json());

// Connect to MongoDB


mongoose.connect(
    'mongodb+srv://mongodb:4N5LTYDgU4i!cMU@cluster0.g47yo7i.mongodb.net/'
)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection failed:', err));





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
    const students = await Student.find();
    res.json(students);
});

// Retrieve students by branch
app.get('/students/branch/:branch', async (req, res) => {
    const students = await Student.find({
        branch: req.params.branch.toUpperCase()
    });
    res.json(students);
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
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// d) DELETE: Delete student by Roll Number
app.delete('/students/:rollNo', async (req, res) => {
    const student = await Student.findOneAndDelete({
        rollNo: Number(req.params.rollNo)
    });

    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
});

// e) FILTER: Students with marks greater than 70
app.get('/filter/marks', async (req, res) => {
    const students = await Student.find({ marks: { $gt: 70 } });
    res.json(students);
});

// Filter students belonging to CSE or IT
app.get('/filter/branch', async (req, res) => {
    const students = await Student.find({
        branch: { $in: ['CSE', 'IT'] }
    });
    res.json(students);
});

// f) AGGREGATION: Average marks
app.get('/aggregate/average', async (req, res) => {
    const result = await Student.aggregate([
        {
            $group: {
                _id: null,
                averageMarks: { $avg: '$marks' }
            }
        }
    ]);

    res.json(result);
});

// Highest marks in each branch
app.get('/aggregate/highest', async (req, res) => {
    const result = await Student.aggregate([
        {
            $group: {
                _id: '$branch',
                highestMarks: { $max: '$marks' }
            }
        }
    ]);

    res.json(result);
});

// Count students branch-wise
app.get('/aggregate/count', async (req, res) => {
    const result = await Student.aggregate([
        {
            $group: {
                _id: '$branch',
                totalStudents: { $sum: 1 }
            }
        }
    ]);

    res.json(result);
});

// Start server after database connection
mongoose.connection.once('open', () => {
    app.listen(3000, () => {
        console.log('Server running at http://localhost:3000');
    });
});