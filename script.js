let buffer = '0';
let pervOperator = null;
let total = 0;
let screen = null;

function buttonClick(value){
    if (!isNaN(parseInt(value)))
        handleNumbers(value);
    else
        handleSymbols(value);
    console.log(value);
    rerender();
}

function doOperation(buffer){
    if (pervOperator === '+')
        total += buffer;
    else if (pervOperator === '-')
        total -= buffer;
    else if (pervOperator === '×')
        total *= buffer;
    else{
        total /= buffer;
    }
}


function handleMath(value){
    if(buffer === '0')
        return;
    const intBuffer = parseInt(buffer);
    if (total === 0)
        total = intBuffer;
    else
        doOperation(intBuffer);
    pervOperator = value;
    buffer = '0';
}

function handleSymbols(symbol){
    switch (symbol){
        case 'c':
            buffer = '0';
            break;
        case '←':
            if (buffer.length === 1)
                buffer = '0';
            else
                buffer = buffer.substring(0, buffer.length - 1);
            break;
        case '=':
            if (pervOperator === null)
                return;
            doOperation(parseInt(buffer));
            pervOperator = null;
            buffer = "" + total;
            total = 0;
            break;
        case '÷':
        case '+':
        case '×':
        case '-':
            handleMath(symbol);
            break;

    }    
}

function handleNumbers(number){
    if (buffer === '0')
        buffer = number;
    else
        buffer += number;
}

function start(){
    screen = document.querySelector('.screen');
    const calcButtons = document.querySelector('.calc-buttons');
    
    calcButtons.addEventListener('click', function(event) {
        if (event.target === calcButtons)
            return;
        if (event.target.matches('button')) {
            buttonClick(event.target.innerText);
        }
        event.stopPropagation();
    });
}

function rerender(){
    screen.innerText = buffer;
}

start();