// Function to calculate total marks
function calculateTotal(m1, m2, m3) {
    return m1 + m2 + m3;
}

// Function to calculate percentage
function calculatePercentage(total) {
    return (total / 300) * 100;
}

// Export the functions
module.exports = {
    calculateTotal,
    calculatePercentage
};