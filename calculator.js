let runningTotal = 0;
let buffer = '0';
let previousOperator;
let keyPress = document.querySelector('.key-press');
const screen = document.querySelector('.screen-display');

function buttonClick(value) {
    keyPress.innerText = value;
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
    reRender(buffer);
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C' :
            buffer = '0';
            runningTotal = 0;
            reRender('0')
            break;
        case '←':
            buffer = buffer.substring(0, buffer.length - 1);
            if (buffer === '') {
                buffer = '0';
            }
            reRender(buffer);
            break;
        case '=':
            if (previousOperator === null) {
                screen.innerText = buffer;
            } else {
                flushOperation(parseInt(buffer))
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        //do nothing
        return;
    }
    let intBuffer = +buffer;
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        reRender(flushOperation(intBuffer))
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    switch (previousOperator) {
        case '+' :
            runningTotal += intBuffer;
            break;
        case '-' :
            runningTotal -= intBuffer;
            break;
        case '×' :
            runningTotal *= intBuffer;
            break;
        case '÷' :
            runningTotal /= intBuffer;
    }
    return runningTotal;
}

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function (event) {
            buttonClick(event.target.innerText);
        })
}

init();

//not important
function reRender(value) {
    screen.innerText = value;
}
