// Import modules
const fs = require('fs');
const EventEmitter = require('events');

// Create EventEmitter object
const eventEmitter = new EventEmitter();

// Register custom event listener
eventEmitter.on('studentAdded', (student) => {
    console.log('Student Added:', student);
});

// Generate custom event
eventEmitter.emit('studentAdded', {
    id: 109,
    name: 'Kumar',
    department: 'CSE'
});

// Create readable stream
const readStream = fs.createReadStream('student.txt', {
    encoding: 'utf8',
    highWaterMark: 30
});

// Read and display data in chunks
readStream.on('data', (chunk) => {
    console.log('\nStudent Data Chunk:');
    console.log(chunk);
});

// Handle stream completion
readStream.on('end', () => {
    console.log('\nFinished reading student data.');
});

// Handle errors
readStream.on('error', (err) => {
    console.error('Error:', err.message);
});