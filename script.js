/* preKey indicates the previous class of key that was clicked and includes, 
"number1," "number2," "operator," and "equal."
"number1" refers to when the number keys are pressed to enter in the first number in the calculation.
"number2" refers to subsequent numbers in the calculation.
*/
let prevKey = null;
let accumulator = 0;
let operatorInUse = null;
const DIGIT_LIMIT = 11; // Limit to amount of digits that can be displayed

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

function displayNumber(num) {
    if(typeof num === 'string') {
        displayText(num);
        return;
    }

    const [whole, decimal] = num.toString().split('.');

    if(whole.length > DIGIT_LIMIT) {
        displayText('Error: Overflow');
        return;
    }
    if(!decimal || whole.length === DIGIT_LIMIT || whole.length + 1 === DIGIT_LIMIT) {
        // No decimals or not enough space to display decimals
        displayText(whole);
    } else {
        // At least one decimal to display
        if(whole.length + 1 + decimal.length <= DIGIT_LIMIT) {
            displayText(num);
        } else {
            availableSpace = DIGIT_LIMIT - whole.length - 1;
            displayText(num.toFixed(availableSpace));
        }
    }
}

function handleDivByZero(num2, operator) {
    if(num2 === 0 && operator === '÷') {
        handleClearClick();
        displayText('🚨Div by 0🚨');
        return true;
    }
    return false;
}

function getDisplayText() {
    const display = document.querySelector('.display');
    return display.textContent;
}

// Return operator buttons to normal appearance
function clearOperatorButton() {
    const operatorButtons = [...document.querySelectorAll('.operator')];
    for(const btn of operatorButtons) {
        btn.classList.remove('operating');
    }
}

function lightOperatorButton(btn) {
    btn.classList.add('operating');
}

function handleClearClick() {
    // Clear display
    displayText('');

    // Clear memory
    prevKey = null;
    accumulator = 0;
    operatorInUse = null;

    // Clear any operator button lighting
    clearOperatorButton();
}

/**
 * Event handler to update the display when the user clicked a number button
 */
function handleNumberClick() {
    clearOperatorButton();
    const newDigit = this.textContent;

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
        if(newDigit === '.' && num.includes('.')) {
            return;
        }
        if(num.length === DIGIT_LIMIT) {
            return;
        }
        num += newDigit;
        displayText(num);
        // prevKey remains number1 or number2
    }
}

/**
 * Do nothing if there is no previous key.
 * If the previous key is a number, update the accumulator then store the operator.
 * If the previous key is an operator, change the operator.
 */
function handleOperatorClick() {
    if(prevKey === null) {
        return;
    }
    if(prevKey === 'number1' || prevKey === 'number2' || prevKey === 'equal') {
        // Update and store accumulator
        if(prevKey === 'number1' || prevKey === 'equal') {
            accumulator = +getDisplayText();
        } else {
            number2 = +getDisplayText();
            if(handleDivByZero(number2, operatorInUse)) {
                return;
            }
            accumulator = operate(accumulator, number2, operatorInUse);
            displayNumber(accumulator);
        }
    }
    // Update operator to the one that is just clicked
    operatorInUse = this.textContent;
    clearOperatorButton(); // Clear lighting for any previous operator button
    lightOperatorButton(this);

    prevKey = 'operator';
}

/**
 * Operate on the accumulator and the last entered number then display the result
 */
function handleEqualClick() {
    if(prevKey === null || prevKey === 'number1' || prevKey === 'operator') {
        return;
    }
    if(prevKey === 'number2') {
        number2 = +getDisplayText();
        if(handleDivByZero(number2, operatorInUse)) {
            return;
        }
        accumulator = operate(accumulator, number2, operatorInUse);
        displayNumber(accumulator);
    }
    prevKey = 'equal';
}

function handleTyping(e) {
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if(!key) {
        return;
    }
    key.click();
}

const numberButtons = document.querySelectorAll('.number-btn');
for(const btn of numberButtons) {
    btn.addEventListener('click', handleNumberClick);
}

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', handleClearClick);

const operatorButtons = document.querySelectorAll('.operator');
for(const btn of operatorButtons) {
    btn.addEventListener('click', handleOperatorClick);
}

const equalButton = document.querySelector('#equal');
equalButton.addEventListener('click', handleEqualClick);

window.addEventListener('keypress', handleTyping);