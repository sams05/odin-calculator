
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

/**
 * Takes two numbers and an operator then calls one of the calculation functions on the numbers
 * @param {number} num1 First number
 * @param {number} num2 Second number
 * @param {String} operator A string character for one of +, -, *, or /
 */
function operate(num1, num2, operator) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return 'Error';
    }
}

/**
 * Put text onto the calculator display
 * @param {String} text The text to display
 */
function displayText(text) {
    const display = document.querySelector('.display');
    display.textContent = text;
}

/**
 * Event handler to update the display when the user clicked a number button
 */
function registerNumberClick() {
    const display = document.querySelector('.display');
    let num = display.textContent;
    num += this.textContent;
    displayText(num);
}

function clearDisplay() {
    const display = document.querySelector('.display');
    display.textContent = '';
}

function main() {
    const numberButtons = document.querySelectorAll('.number-btn');
    for(const btn of numberButtons) {
        btn.addEventListener('click', registerNumberClick);
    }

    const clearButton = document.querySelector('#clear');
    clearButton.addEventListener('click', clearDisplay);
}

main();