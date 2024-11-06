const add = function(num1, num2){
    return num1 + num2
}
console.log(add(46984, 345))

const subtract = function(num1, num2){
    return num1 - num2
}
console.log(subtract(4,9))

const multiply = function(num1, num2){
    return num1 * num2
}
console.log(multiply(10,10))

const divide = function(num1, num2){
    if( num2 != 0){
        return num1/num2
    }else{
        return "Error division by zero"
    }
}
console.log(divide(1,1))

let number1 = 0
let number2 = 0

const operations = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
}

let operate = function(operator, num1, num2){
    const operation = operations[operator]

    if(operation){
        return operation(num1, num2)
    }else{
        return "Error: Unsupported operator"
    }
}

// Get DOM elements
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
const equalsButton = document.querySelector('.equals');
const ACButton = document.querySelector('.AC');

// Calculator state
let displayValue = '0';
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

// Update display
function updateDisplay() {
    // Round long numbers to fit display
    if (displayValue.length > 10) {
        if (displayValue.includes('.')) {
            displayValue = Number(displayValue).toFixed(8).toString();
        }
        if (displayValue.length > 10) {
            displayValue = Number(displayValue).toExponential(5).toString();
        }
    }
    display.textContent = displayValue;
}

// Handle number input
function inputNumber(number) {
    if (waitingForSecondNumber) {
        displayValue = number;
        waitingForSecondNumber = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    updateDisplay();
}

// Handle operator input
function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstNumber === null && !isNaN(inputValue)) {
        firstNumber = inputValue;
    } else if (operator) {
        const result = operate(operator, firstNumber, inputValue);
        if (typeof result === 'string' && result.includes('Error')) {
            displayValue = result;
            firstNumber = null;
            operator = null;
        } else {
            displayValue = String(result);
            firstNumber = result;
        }
    }

    waitingForSecondNumber = true;
    operator = nextOperator;
    updateDisplay();
}

// Handle decimal input
function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

// Clear calculator
function clearCalculator() {
    displayValue = '0';
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    updateDisplay();
}

// Event listeners
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('btn-0')) inputNumber('0');
        else if (button.classList.contains('btn-1')) inputNumber('1');
        else if (button.classList.contains('btn-2')) inputNumber('2');
        else if (button.classList.contains('btn-3')) inputNumber('3');
        else if (button.classList.contains('btn-4')) inputNumber('4');
        else if (button.classList.contains('btn-5')) inputNumber('5');
        else if (button.classList.contains('btn-6')) inputNumber('6');
        else if (button.classList.contains('btn-7')) inputNumber('7');
        else if (button.classList.contains('btn-8')) inputNumber('8');
        else if (button.classList.contains('btn-9')) inputNumber('9');
        else if (button.classList.contains('decimal')) inputDecimal();
        else if (button.classList.contains('divide')) handleOperator('/');
        else if (button.classList.contains('multiply')) handleOperator('*');
        else if (button.classList.contains('subtract')) handleOperator('-');
        else if (button.classList.contains('add')) handleOperator('+');
    });
});

equalsButton.addEventListener('click', () => {
    if (operator && firstNumber !== null && !waitingForSecondNumber) {
        const secondNumber = parseFloat(displayValue);
        const result = operate(operator, firstNumber, secondNumber);
        
        if (typeof result === 'string' && result.includes('Error')) {
            displayValue = result;
        } else {
            displayValue = String(result);
        }
        
        firstNumber = null;
        operator = null;
        waitingForSecondNumber = true;
        updateDisplay();
    }
});

ACButton.addEventListener('click', clearCalculator);

// Initialize display
updateDisplay();
