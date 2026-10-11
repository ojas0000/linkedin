// Import built-in modules
const fs = require('fs');
const http = require('http');
const path = require('path');
const os = require('os');
const EventEmitter = require('events');

// 1. File System (fs) Module
const studentData = 'Name: Phani Kumar\nRoll No: 23331A0550\nCourse: CSE';

// Create and write student information into a file
fs.writeFileSync('student.txt', studentData);

console.log('1. File System Module');
console.log('Student information written to student.txt');

// Read and display the file contents
const data = fs.readFileSync('student.txt', 'utf8');
console.log('Student Details:\n' + data);

// 2. HTTP Module
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to Node.js HTTP Server!');
});

server.listen(3000, () => {
    console.log('\n2. HTTP Module');
    console.log('Server running at http://localhost:3000');
});

// 3. Path Module
const filePath = '/home/student/documents/report.txt';

console.log('\n3. Path Module');
console.log('File Name:', path.basename(filePath));
console.log('File Extension:', path.extname(filePath));

// 4. OS Module
console.log('\n4. OS Module');
console.log('Operating System:', os.platform());
console.log('CPU Architecture:', os.arch());
console.log('Total Memory:', (os.totalmem() / (1024 ** 3)).toFixed(2), 'GB');

// 5. Events Module
const eventEmitter = new EventEmitter();

// Register a listener for the custom event
eventEmitter.on('welcome', () => {
    console.log('\n5. Events Module');
    console.log('Welcome event triggered successfully!');
});

// Trigger the custom event
eventEmitter.emit('welcome');