let buffer = "0";
let total = 0;
let operator = null;
let previousResult = null;
let previousOperand = document.querySelector(".previous-operand");
let currentOperand = document.querySelector(".current-operand");

let buttons = document.querySelectorAll(".calculator-button");
buttons.forEach(button => button.addEventListener("click", function (e){
    clickButton(e.target.innerHTML);
}))

function clickButton(value) {
    if(isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    updateDisplay();

}

function handleSymbol(value) {

    let bufferFloat = parseFloat(buffer);

    switch(value) {
        case 'AC':
            buffer = "0";
            previousResult = null;
            total = 0;
            break;
        case 'DEL':
            if (buffer.length === 1) {
                buffer = "0";
            }
            else {
                buffer = buffer.slice(0, buffer.length - 1);
            }
            break;
        case ".":
            if (!buffer.includes(".")) {
                buffer += ".";
            }
            break;
        case "=":
            if (previousResult.includes('=')) {
                return;
            } else {
                operate(operator, bufferFloat, total);
                buffer = total.toString();
                previousResult += " " + bufferFloat.toString() + " = " + total.toString();
            }
            break;
        default:
            handleMath(value);
            break;

    }
}

function handleMath(value) {
    total = 0;
    operator = value;
    previousResult = buffer + ' ' + value;
    total += parseFloat(buffer);
    buffer = '0';
}


function operate(operator, firstNumber, secondNumber) {
    switch(operator) {
        case '+':
            total = add(firstNumber, secondNumber);
            break;
        case '-':
            total = subtract(firstNumber, secondNumber);
            break;
        case '*':
            total = multiply(firstNumber, secondNumber);
            break;
        case '÷':
            total = divide(firstNumber, secondNumber);
            break;
    }
}



function add(firstNumber, secondNumber) {
    return parseFloat((firstNumber + secondNumber).toFixed(3));
}

function subtract(firstNumber, secondNumber) {
    return parseFloat((secondNumber - firstNumber).toFixed(3));
}

function multiply(firstNumber, secondNumber) {
    return parseFloat((firstNumber * secondNumber).toFixed(3));
}

function divide(firstNumber, secondNumber) {
    if (firstNumber === 0) {
        alert("Division by 0!");
    }
    return parseFloat((secondNumber / firstNumber).toFixed(3));

}


function handleNumber(value) {
    if (buffer.length < 9) {
        if (buffer === "0" || buffer === null) {
            buffer = value;
        } else {
            buffer += value;
        }
    } else {
        return;
    }
}

function updateDisplay() {

    currentOperand.innerHTML = buffer;
    previousOperand.innerHTML = previousResult;

}