
let prevKey = null;

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
 * @param {String} operator A string character for one of +, -, ×, or ÷
 */
function operate(num1, num2, operator) {
    switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '×':
            return multiply(num1, num2);
        case '÷':
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

function getDisplayText() {
    const display = document.querySelector('.display');
    return display.textContent;
}

/**
 * Event handler to update the display when the user clicked a number button
 */
function handleNumberClick() {
    clearOperatorButton();
    const newDigit = this.textContent;

    // Entering first digit
    if(prevKey === null || prevKey === 'equal' || prevKey === 'operator') {
        // Entering first digit
        displayText(newDigit);
        if(prevKey === null || prevKey === 'equal') {
            prevKey = 'number1';
        } else {
            prevKey = 'number2';
        }
    } else {
        // Entering subsequent digits
        let num = getDisplayText();
        num += newDigit;
        displayText(num);
        // prevKey remains number1 or number2
    }
}

// Return operator buttons to normal appearance
function clearOperatorButton() {
    const operatorButtons = [...document.querySelectorAll('.operator')];
    for(const btn of operatorButtons) {
        btn.classList.remove('operating');
    }
}

function clearCalc() {
    // Clear display
    displayText('');

    // Clear memory


    // Clear operation in progress display
    clearOperatorButton();
}

function handleOperatorClick() {

    prevKey = 'operator';
}


function handleEqualClick() {

    prevKey = 'equal';
}

const numberButtons = document.querySelectorAll('.number-btn');
for(const btn of numberButtons) {
    btn.addEventListener('click', handleNumberClick);
}

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearCalc);

const operatorButtons = document.querySelectorAll('.operator');
for(const btn of operatorButtons) {
    btn.addEventListener('click', handleOperatorClick);
}

const equalButton = document.querySelector('#equal');
equalButton.addEventListener('click', handleEqualClick);