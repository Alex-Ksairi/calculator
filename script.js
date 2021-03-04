// let's code here

// DOM Elements

let hour = document.querySelector('.hour');
let minutes = document.querySelector('.mins');
let displayEl = document.querySelector('.display');

let acEl = document.querySelector('.ac');
let pmEl = document.querySelector('.pm');
let percentEl = document.querySelector('.percent');

let additionEl = document.querySelector('.addition');
let subtractionEl = document.querySelector('.subtraction');
let multiplicationEl = document.querySelector('.multiplication');
let divisionEl = document.querySelector('.division');
let equalEl = document.querySelector('.equal');

let decimalEl = document.querySelector('.decimal');
let number0El = document.querySelector('.number-0');
let number1El = document.querySelector('.number-1');
let number2El = document.querySelector('.number-2');
let number3El = document.querySelector('.number-3');
let number4El = document.querySelector('.number-4');
let number5El = document.querySelector('.number-5');
let number6El = document.querySelector('.number-6');
let number7El = document.querySelector('.number-7');
let number8El = document.querySelector('.number-8');
let number9El = document.querySelector('.number-9');

let numberArray = [
    number0El, number1El, number2El, number3El, number4El, number5El,
    number6El, number7El, number8El, number9El
];


// set up the time and date
var updateTime = () => {
    let currentTime = new Date();

    let currentHour = currentTime.getHours();
    let currentMinutes = currentTime.getMinutes();
    

    hour.textContent = currentHour.toString();
    minutes.textContent = currentMinutes.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime();


function date() {

    let date = new Date().toLocaleDateString();
    document.querySelector('.date').textContent = date;
 }
 date();



// variables
let valueInMemory = null;
let operatorInMemory = null;


// functions 
let getValueAsString = () => displayEl.textContent.split(',').join('');

let getValueAsNum = () => {
    return parseFloat(getValueAsString());
};

let setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === '.') {
        displayEl.textContent += '.';
        return;
    }

    let [wholeNum, decimalStr] = valueStr.split('.');
    // console.log(wholeNum, decimalStr);
    if (decimalStr) {
        displayEl.textContent = parseFloat(wholeNum).toLocaleString() + '.' + decimalStr;
    }
    else {
        displayEl.textContent = parseFloat(wholeNum).toLocaleString();
    }
};


const handleNumbersClick = (numString) => {
    // console.log(numString);
    const currentValueStr = getValueAsString();

    if (currentValueStr === '0'){
        setStrAsValue(numString);
    }
    else {
        setStrAsValue(currentValueStr + numString);
    }
};

let getResultOfOperationAsStr = () => {
    let currentValueNum = getValueAsNum();
    let memory = parseFloat(valueInMemory);
    let newValueNum;

    if (operatorInMemory === 'addition') {
        newValueNum = memory + currentValueNum;
    }
    else if (operatorInMemory === 'subtraction') {
        newValueNum = memory - currentValueNum;
    }
    else if (operatorInMemory === 'multiplication') {
        newValueNum = memory * currentValueNum;
    }
    else if (operatorInMemory === 'division') {
        newValueNum = memory / currentValueNum;
    }

    return newValueNum.toString();
};


let handleOperatorClick = (operation) => {
    let currentValueStr = getValueAsString();

    if (!valueInMemory) {
        valueInMemory = currentValueStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return;
    }
    valueInMemory = getResultOfOperationAsStr();
    operatorInMemory = operation;
    setStrAsValue('0')
};;

// adding addEventListener to functions
acEl.addEventListener('click', () => {
    setStrAsValue('0');
    valueInMemory = null;
    operatorInMemory = null;
});

// pmEl.addEventListener('click', () => {
//     let currentValueNum = getValueAsNum();
//     let currentValueStr = getValueAsString();
//     // console.log(currentValueStr);
//     if (currentValueStr === '-0') {
//         setStrAsValue('0');
//         return;
//     }

//     if (currentValueNum >= 0) {
//         // console.log('-' + currentValueStr);
//         setStrAsValue('-' + currentValueStr);
//     }
//     else {
//         setStrAsValue(currentValueStr.substring(1));
//     }
// });

percentEl.addEventListener('click', () => {
    let currentValueNum = getValueAsNum();
    let newValue = currentValueNum / 100;
    setStrAsValue(newValue.toString());
    valueInMemory = null;
    operatorInMemory = null;
});

// adding addEventListener to operators
additionEl.addEventListener('click', () => {
    handleOperatorClick('addition');
});

subtractionEl.addEventListener('click', () => {
    handleOperatorClick('subtraction');
});

multiplicationEl.addEventListener('click', () => {
    handleOperatorClick('multiplication');
});

divisionEl.addEventListener('click', () => {
    handleOperatorClick('division');
});

equalEl.addEventListener('click', () => {
    if (valueInMemory) {
        setStrAsValue(getResultOfOperationAsStr());
        valueInMemory = null;
        operatorInMemory = null;
    }
});


// adding addEventListener to numbers and buttons (decimal)
for (let i = 0; i < numberArray.length; i++) {
    let numberEl = numberArray[i];
    numberEl.addEventListener('click', () => {
        handleNumbersClick(i.toString());
    });
};

decimalEl.addEventListener('click', () => {
    let currentValueStr = getValueAsString();
    if (!currentValueStr.includes('.')) {
        setStrAsValue(currentValueStr + '.');
    }
});




