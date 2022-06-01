let accumulator = 0;
let operatorInUse = null;

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

function getDisplayText() {
    const display = document.querySelector('.display');
    return display.textContent;
}

function btnTextToOperator(btnText) {
    switch(btnText) {
        case '+':
            return '+';  
        case '-':
            return '-';
        case '×':
            return '*';
        case '÷':
            return '/';        
    }
}

/**
 * Event handler to update the display when the user clicked a number button
 */
function registerNumberClick() {
    clearOperatorButton();

    let num = getDisplayText();
    num += this.textContent;
    displayText(num);
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
    accumulator = 0;
    operatorInUse = 0;

    // Clear operation in progress display
    clearOperatorButton();
}

function registerOperatorClick() {
    // Get calculation done so far
    const display = document.querySelector('.display');
    accumulator = +display.textContent;

    // Clear display
    displayText('');

    // Get the operator and light up the operator button to indicate it has been hit
    operatorInUse = btnTextToOperator(this.textContent);
    this.classList.add('operating');
}

// TODO handle case when operatorInUse is null
function registerEqualClick() {
    const num = +getDisplayText();
    const finalNum = operate(accumulator, num, operatorInUse);
    displayText(finalNum);
}

const numberButtons = document.querySelectorAll('.number-btn');
for(const btn of numberButtons) {
    btn.addEventListener('click', registerNumberClick);
}

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearCalc);

const operatorButtons = document.querySelectorAll('.operator');
for(const btn of operatorButtons) {
    btn.addEventListener('click', registerOperatorClick);
}

const equalButton = document.querySelector('#equal');
equalButton.addEventListener('click', registerEqualClick);