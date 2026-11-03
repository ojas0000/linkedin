// Import the user-defined module
const calculator = require('./calculator');



// Import the student module
const student = require('./student');



// Accept two numbers from the command line
const a = Number(process.argv[2]);
const b = Number(process.argv[3]);

// Display results
console.log('First Number:', a);
console.log('Second Number:', b);

console.log('Addition:', calculator.add(a, b));
console.log('Subtraction:', calculator.subtract(a, b));
console.log('Multiplication:', calculator.multiply(a, b));
console.log('Division:', calculator.divide(a, b));



// Student details
const name = 'maheshh Kumar';
const m1 = 85;
const m2 = 90;
const m3 = 80;

// Calculate total and percentage
const total = student.calculateTotal(m1, m2, m3);
const percentage = student.calculatePercentage(total);

// Display results
console.log('Student Name:', name);
console.log('Subject 1 Marks:', m1);
console.log('Subject 2 Marks:', m2);
console.log('Subject 3 Marks:', m3);
console.log('Total Marks:', total, '/ 300');
console.log('Percentage:', percentage.toFixed(2) + '%');