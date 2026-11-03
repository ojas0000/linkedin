const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Middleware
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Student data
let students = [
    { id: 1, name: 'Shekar', department: 'CSE' },
    { id: 2, name: 'Ravi', department: 'ECE' }
];

// Home page
app.get('/', (req, res) => {
    res.render('home');
});

// Students page - GET
app.get('/students', (req, res) => {
    res.render('students', { students });
});

// Students page - POST
app.post('/students', (req, res) => {
    students.push({
        id: students.length + 1,
        name: req.body.name,
        department: req.body.department
    });

    res.redirect('/students');
});

// About page
app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});


