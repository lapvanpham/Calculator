let runningTotal = 0;
let buffer = '0';
let previousOperator;
let keyPress = document.querySelector('.key-press');
const screenDisplay = document.querySelector('.screen-display');

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
    console.log('handleNumber buffer', buffer);
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
                buffer = 0;
                reRender(buffer)
                return;
            } else {
                let result = flushOperation(parseInt(buffer));
                console.log(buffer);
                reRender(result);
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
    console.log('handleMath buffer', buffer);
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
    buffer = '0';
    console.log('flushOperation buffer', buffer);
    return runningTotal;
}

function powerOn() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function (event) {
            buttonClick(event.target.innerText);
        })
}

powerOn();

function reRender(value) {
    screenDisplay.innerText = value;
    console.log(this);
}
