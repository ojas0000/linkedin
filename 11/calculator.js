// Addition
function add(a, b) {
    return a + b;
}

// Subtraction
function subtract(a, b) {
    return a - b;
}

// Multiplication
function multiply(a, b) {
    return a * b;
}

// Division
function divide(a, b) {
    if (b === 0) {
        return 'Division by zero is not possible';
    }
    return a / b;
}

// Export all functions
module.exports = {
    add,
    subtract,
    multiply,
    divide
};