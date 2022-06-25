const addButton = document.querySelector(".add");
const subtractButton = document.querySelector(".subtract");
const multiplyButton = document.querySelector(".multiply");
const divideButton = document.querySelector(".divide");

const equalButton = document.querySelector(".equal");
const decimalButton = document.querySelector(".decimal");
const invertButton = document.querySelector(".invert");

const clearButton = document.querySelector(".clear");
const bracketButton = document.querySelector(".bracket");
const percentButton = document.querySelector(".percent");

const numbers = [...document.querySelectorAll(".number")]

const display = document.querySelector(".display");

let expression = '';

let mainButtons = [addButton, subtractButton, multiplyButton, divideButton];



for(let i = 0; i < mainButtons.length; i++){
    mainButtons[i].addEventListener('click', addOnDisplay)
};

clearButton.addEventListener('click', () => {
    clearScreen();
    expression = '';
});

equalButton.addEventListener('click', evaluateExp);

for(let i = 0; i < numbers.length; i++){
    numbers[i].addEventListener('click', addOnDisplay);
};




function addOnDisplay() {
    display.textContent += this.textContent.trim();
    addToExpression(this);
};

function clearScreen() {
    display.textContent = '';
};

function addToExpression(element) {
    if([...element.classList].includes('multiply')){
        expression += '*';
    }else if([...element.classList].includes('divide')){
        expression += '/';
    }else{
        expression += element.textContent.trim();
    };
};


function evaluateExp() {
    let expArray = Array.from(expression);
    let firstNum = '';
    let secNum = '';
    let action = '';
    let actionReached = false;
    let result = '';

    for(let i = 0; i < expArray.length; i++){
        
        if (isNaN(+expArray[i])){
            action = expArray[i];
            actionReached = true;
        }else if(actionReached == false){
            firstNum += expArray[i];
        }else{
            secNum += expArray[i];
        };

    };

    if(action == '' || firstNum == '' || secNum == ''){
        result = 'Error';
    }else if(action == '+'){
        result = add(firstNum, secNum);
    }else if(action == '-'){
        result = subtract(firstNum, secNum);
    }else if(action == '*'){
        result = multiply(firstNum, secNum);
    }else if(action == '/'){
        result = divide(firstNum, secNum);
    };

    displayResult(result);
};

function add(a, b) {
    return +a + +b;
};

function multiply(a, b){
    return +a * +b;
};

function divide(a, b) {
    if(b==0){
        return 'Error';
    }
    return +a/+b;
};

function subtract(a, b) {
    return +a - +b;
};

function displayResult(res) {
    clearScreen();
    display.textContent = res;
};