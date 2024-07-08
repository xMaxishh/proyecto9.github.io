"use strict";

document.addEventListener('DOMContentLoaded', function () {
    const themeSelectors = document.querySelectorAll('input[name="theme"]');
    const savedTheme = localStorage.getItem('selectedTheme');

    if (savedTheme) {
        document.body.className = '';
        document.body.classList.add(`theme${savedTheme}`);
        document.querySelector(`input[name="theme"][value="${savedTheme}"]`).checked = true;
    } else {
      
        document.body.className = '';
        document.body.classList.add('theme1');
        document.querySelector('input[name="theme"][value="1"]').checked = true;
    }

    themeSelectors.forEach(selector => {
        selector.addEventListener('change', function () {
            document.body.className = '';
            document.body.classList.add(`theme${this.value}`);
            localStorage.setItem('selectedTheme', this.value);
        });
    });
});

const numButtons = document.querySelectorAll('.buttons');

const operationDisplay = document.querySelector('.operation');
const sumaBtn = document.querySelector('.suma');
const restaBtn = document.querySelector('.resta');
const divisionBtn = document.querySelector('.divido');
const multBtn = document.querySelector('.mult');
const delet = document.querySelector('.delete');
const igual = document.querySelector('.igual');
const reset = document.querySelector('.reset');

let currentInput = '';
let previousInput = '';
let currentOperation = null;

delet.addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    operationDisplay.textContent = currentInput;
    updateOperationDisplay();
});

reset.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    currentOperation = null;
    operationDisplay.textContent = '';
    operationDisplay.textContent = '';
    console.log("Reinicio completo.");
});


numButtons.forEach(button => {
    button.addEventListener('click', function () {
        if (!isNaN(this.textContent) || this.textContent === '.') {
            currentInput += this.textContent;
            operationDisplay.textContent = currentInput;
            updateOperationDisplay();
        }
    });
});

function calculate() {
    let num1 = parseFloat(previousInput);
    let num2 = parseFloat(currentInput);
    if (isNaN(num1) || isNaN(num2)) return;

    let result;
    switch (currentOperation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
    currentOperation = null;
    operationDisplay.textContent = currentInput;
    updateOperationDisplay();
}

igual.addEventListener('click', function () {
    if (currentOperation !== null) {
        calculate();
    }
});

function setOperation(operation) {
    if (currentInput === '') return;

    if (previousInput !== '') {
        calculate();
    }

    previousInput = currentInput;
    currentInput = '';
    currentOperation = operation;
    updateOperationDisplay();
}

sumaBtn.addEventListener('click', function () {
    setOperation('+');
});

restaBtn.addEventListener('click', function () {
    setOperation('-');
});

multBtn.addEventListener('click', function () {
    setOperation('*');
});

divisionBtn.addEventListener('click', function () {
    setOperation('/');
});

document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key >= '0' && key <= '9' || key === '.') {
        currentInput += key;
        operationDisplay.textContent = currentInput;
        updateOperationDisplay();
    } else if (key === '+') {
        setOperation('+');
    } else if (key === '-') {
        setOperation('-');
    } else if (key === '*') {
        setOperation('*');
    } else if (key === '/') {
        setOperation('/');
    } else if (key === 'Enter') {
        if (currentOperation !== null) {
            calculate();
        }
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        operationDisplay.textContent = currentInput;
        updateOperationDisplay();
    } else if (key === 'Escape') {
        currentInput = '';
        previousInput = '';
        currentOperation = null;
        operationDisplay.textContent = '';
        operationDisplay.textContent = '';
    }
});

function updateOperationDisplay() {
    if (currentOperation !== null) {
        operationDisplay.textContent = `${previousInput} ${currentOperation} ${currentInput}`;
    } else {
        operationDisplay.textContent = currentInput;
    }
}