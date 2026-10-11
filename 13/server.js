const http = require('http');

// Student information
const students = [
    { id: 1, name: 'Phani Kumar', department: 'CSE', marks: 85 },
    { id: 2, name: 'Ravi Kumar', department: 'ECE', marks: 90 },
    { id: 3, name: 'Suresh', department: 'IT', marks: 80 }
];

// Create HTTP server
const server = http.createServer((req, res) => {

    // Home page
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to Student Information Server!');
    }

    // Display all students
    else if (req.url === '/students') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        let output = '<h1>Student List</h1><ul>';

        students.forEach((student) => {
            output += `<li>${student.id} - ${student.name}</li>`;  
        });

        output += '</ul>';
        res.end(output);
    }

    // Display one student's details
    else if (req.url === '/students/1') {
        const student = students.find(s => s.id === 1);

        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.end(`
            <h1>Student Details</h1>
            <p>ID: ${student.id}</p>
            <p>Name: ${student.name}</p>
            <p>Department: ${student.department}</p>
            <p>Marks: ${student.marks}</p>
        `);
    }

    // Send student information as JSON
    else if (req.url === '/api/students') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(students));
    }

    // Handle invalid URLs
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Page Not Found');
    }
});

// Start server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});