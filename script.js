let mainString = document.getElementById('main');
let historyString1 = document.getElementById('history-1');
let historyString2 = document.getElementById('history-2');
let historyString3 = document.getElementById('history-3');
const buttons = document.querySelectorAll(".calc__button");

const symbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const options = ['+', '-', '×', '÷'];

const deleteAll = () => {
    historyString1.textContent = '';
    historyString2.textContent = '';
    historyString3.textContent = '';
    mainString.textContent = '0';
}

const deleteText = () => {
    mainString.textContent = mainString.textContent[1] ? mainString.textContent.slice(0, -1) : '0';
};

const enterText = text => {
    if (mainString.textContent == '0' && text != '.') {
        mainString.textContent = '';
    };

    if ((text != '.' || !mainString.textContent.includes('.')) && mainString.textContent.length < 15) {
        mainString.textContent += text;
    };
};

const changingHistory = operationButton => {
    if (!options.includes(historyString1.textContent.slice(-1))) {
        historyString3.textContent = historyString2.textContent;
        historyString2.textContent = historyString1.textContent;
        historyString1.textContent = mainString.textContent + operationButton.textContent;
        mainString.textContent = '0';
    };
};

const changeSign = () => {
    mainString.textContent = mainString.textContent > 0 ? '-' + mainString.textContent : mainString.textContent.slice(1);
};

const format = (expression, answer) => {
    if (answer.toString().length > 15) {
        answer = answer.toExponential(4);
    }

    if ((expression + '=' + answer).length > 23) {
        expression = '...'
    }

    historyString1.textContent = expression + '=' + answer;
    mainString.textContent = answer;
}

const standartCalculation = () => {
    const string = historyString1.textContent;
    const operand1 = new Decimal(string ? string.slice(0, -1) : NaN);
    const operand2 = new Decimal(mainString.textContent);
    const operation = historyString1.textContent.slice(-1);
    let result;

    if (options.includes(operation)) {
        switch (operation) {
            case '+': result = operand1.plus(operand2); break;
            case '-': result = operand1.minus(operand2); break;
            case '×': result = operand1.times(operand2); break;
            case '÷': result = operand1.dividedBy(operand2); break;
        };

        format(operand1 + operation + operand2, result);
    };
};

const percentCalculation = () => {
    const string = historyString1.textContent;
    const operand1 = new Decimal(string && !string.includes('=') ? string.slice(0, -1) : NaN);
    const operand2 = new Decimal(mainString.textContent);
    const percent = new Decimal('0.01');
    const operation = historyString1.textContent.slice(-1);

    console.log(operand1);
    console.log(operand2);

    if (historyString1.textContent == '' || historyString1.textContent.includes('=')) {
        mainString.textContent = operand2.times(percent);
    } else if (operation == '+' || operation == '-') {
        mainString.textContent = operand2.times(operand1).times(percent);
    } else if (operation == '×' || operation == '÷') {
        mainString.textContent = operand2.times(percent);
    };
};

buttons.forEach(button =>
    button.addEventListener("click", () => {
        let buttonText = button.textContent;

        if (buttonText == 'AC') {
            deleteAll();
        } else if (buttonText == '←') {
            deleteText();
        } else if (symbols.includes(buttonText)) {
            enterText(buttonText);
        } else if (options.includes(buttonText)) {
            changingHistory(button);
        } else if (buttonText == '+/-') {
            changeSign();
        } else if (buttonText == '%') {
            percentCalculation();
        } else if (buttonText == '=') {
            standartCalculation();
        };
    })
);
