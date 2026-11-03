
require('dotenv').config();

const mongoose = require('mongoose');
const Student = require('./models/Student');

async function insertData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('MongoDB connected');

      const students = [
    {
        rollNo: 101,
        name: 'Rahul',
        branch: 'CSE',
        marks: 85,
        year: 2
    },
    {
        rollNo: 102,
        name: 'Priya',
        branch: 'IT',
        marks: 92,
        year: 3
    },
    {
        rollNo: 103,
        name: 'Arun',
        branch: 'ECE',
        marks: 65,
        year: 1
    },
    {
        rollNo: 104,
        name: 'Sneha',
        branch: 'CSE',
        marks: 78,
        year: 2
    },
    {
        rollNo: 105,
        name: 'Kiran',
        branch: 'IT',
        marks: 55,
        year: 4
    }
];

        await Student.insertMany(students);

        console.log('Dummy data inserted successfully');

    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.connection.close();
    }
}

insertData();
