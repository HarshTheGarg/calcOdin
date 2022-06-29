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
    // console.log(expArray);
    let expArrayComp = [];
    let firstNum = '';
    let secNum = '';
    
    let action = '';
    let actionReached = false;
    
    let result;

    // const actions = ["+", "-", "*", "/"];

    for(let i = 0; i < expArray.length; i++){

        if (!(isNaN(+expArrayComp[expArrayComp.length - 1])) &&
            !(isNaN(+expArray[i]))) {
                expArrayComp[expArrayComp.length - 1] += expArray[i];
        }else{
            expArrayComp.push(expArray[i]);
        };

    };

    // division
    while(expArrayComp.length > 1){
        let ind = expArrayComp.indexOf('/');
        
        if (ind == -1){
            break;
        };

        result = divide(expArrayComp[ind - 1], expArrayComp[ind + 1]);
        expArrayComp.splice(ind - 1, 3, result);
    };

    // multiply
    while(expArrayComp.length > 1){
        let ind = expArrayComp.indexOf('*');
        
        if (ind == -1){
            break;
        };
        
        result = multiply(expArrayComp[ind - 1], expArrayComp[ind + 1]);
        expArrayComp.splice(ind - 1, 3, result);
    };

    // subtract
    while(expArrayComp.length > 1){
        let ind = expArrayComp.indexOf('-');
        
        if (ind == -1){
            break;
        };

        result = subtract(expArrayComp[ind - 1], expArrayComp[ind + 1]);
        expArrayComp.splice(ind - 1, 3, result);
        // console.log({result});
    };

    
    // addition
    while(expArrayComp.length > 1){
        let ind = expArrayComp.indexOf('+');
        
        if (ind == -1){
            break;
        };

        result = add(expArrayComp[ind - 1], expArrayComp[ind + 1]);
        expArrayComp.splice(ind - 1, 3, result);
    };
    console.log({result});
    

    /* for(let i = 0; i < expArray.length; i++){
        
        if (actions.includes(expArray[i])){
            action = expArray[i];
            actionReached = true;
        }else if(actionReached == false){
            firstNum += expArray[i];
        }else{
            secNum += expArray[i];
        };

    }; */

    /* if(action == '' || firstNum == '' || secNum == ''){
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
    expression = result; */
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
    return Math.round((+a/+b) * 100)/100;
};

function subtract(a, b) {
    return +a - +b;
};

function displayResult(res) {
    clearScreen();
    display.textContent = res;
};