let accumulator = 0;
let newNumber = true;
let firstCalc = true;
let equalPressed = false;
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

    // If starting a new number, display just the new digit, otherwise concatenate new digit 
    // to the end
    const newDigit = this.textContent;
    if(newNumber) {
        displayText(newDigit);
        // If previous key pressed is the equals key, flag to reset the accumulator
        if(equalPressed) {
            firstCalc = true;
        }
        newNumber = false;
    } else {
        let num = getDisplayText();
        num += newDigit
        displayText(num);
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
    accumulator = 0;
    newNumber = true;
    firstCalc = true;
    equalPressed = false;
    operatorInUse = null;

    // Clear operation in progress display
    clearOperatorButton();
}

function registerOperatorClick() {
    equalPressed = false;

    if(firstCalc) {
        accumulator = +getDisplayText();
        firstCalc = false;
    } else {
        // Update the accumulator
        processNewCalculation();
    }

    // Get the operator and light up the operator button to indicate it has been hit
    operatorInUse = btnTextToOperator(this.textContent);
    this.classList.add('operating');

    // Prepare calculator to enter next number
    newNumber = true;
}

/**
 * Update and display the accumulator according to the operatorInUse
 * // TODO handle case when operatorInUse is null
 */
function processNewCalculation() {
    const num = +getDisplayText();
    accumulator = operate(accumulator, num, operatorInUse);
    operatorInUse = null;
    displayText(accumulator);
}

function registerEqualClick() {
    processNewCalculation();
    newNumber = true;
    equalPressed = true;
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