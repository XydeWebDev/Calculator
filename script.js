let mainString = document.getElementById('main')
let historyString1 = document.getElementById('history-1')
let historyString2 = document.getElementById('history-2')
let historyString3 = document.getElementById('history-3')

let buttons = document.querySelectorAll(".calc__col")

const symbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']

const deleteText = text => {
    if (text == 'AC') {
        historyString1.textContent = '';
        historyString2.textContent = '';
        historyString3.textContent = '';
        mainString.textContent = '0';
    } else if (text == '←') {
        mainString.textContent = mainString.textContent[1] ? mainString.textContent.slice(0, -1) : '0';
    }
}

const enterText = (text, enterButton) => {
    if (mainString.textContent == '0' && text != '.') {
        mainString.textContent = '';
    }

    if (text != '.' || !mainString.textContent.includes('.')) {
        mainString.textContent += enterButton.textContent;
    }
}

const changingHistory = operationButton => {
    historyString3.textContent = historyString2.textContent;
    historyString2.textContent = historyString1.textContent;
    historyString1.textContent = mainString.textContent + operationButton.textContent;
    mainString.textContent = '0';
}

const change = () => { mainString.textContent = -+mainString.textContent; }
const sum = (num1, num2) => num1 + num2
const dif = (num1, num2) => num1 - num2
const prod = (num1, num2) => num1 * num2
const quot = (num1, num2) => num1 / num2

const standartCalculation = () => {
    const operand1 = +historyString1.textContent.slice(0, -1);
    const operand2 = +mainString.textContent;
    const operation = historyString1.textContent.slice(-1);
    let result;

    if(['+', '-', '×', '÷'].includes(operation)) {
        if (operation == '+') {
            result = sum(operand1, operand2);
        } else if (operation == '-') {
            result = dif(operand1, operand2);
        } else if (operation == '×') {
            result = prod(operand1, operand2);
        } else if (operation == '÷') {
            result = quot(operand1, operand2);
        }

        historyString1.textContent += operand2 + '=' + result;
        mainString.textContent = result;
    }
}

const percentCalculation = () => {
    const operand1 = +historyString1.textContent.slice(0, -1);
    const operand2 = +mainString.textContent;
    const operation = historyString1.textContent.slice(-1);

    if (historyString1.textContent == '' || historyString1.textContent.includes('=')) {
        mainString.textContent = operand2 * 0.01;
    } else if (operation == '+' || operation == '-') {
        mainString.textContent = operand2 * operand1 * 0.01;
    } else if (operation == '×' || operation == '÷') {
        mainString.textContent = operand2 * 0.01;
    }
}

buttons.forEach(button =>
    button.addEventListener("click", () => {
        let buttonText = button.textContent;

        if (buttonText == 'AC' || buttonText == '←') {
            deleteText(buttonText);
        } else if (symbols.includes(buttonText)) {
            enterText(buttonText, button);
        } else if (['+', '-', '×', '÷'].includes(buttonText)) {
            changingHistory(button);
        }  else if (buttonText == '+/-') {
            change();
        } else if (buttonText == '%') {
            percentCalculation();
        } else if (buttonText == '=') {
            standartCalculation();
        }
    })
)