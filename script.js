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

const display = document.querySelector(".display span");

let expression = [];

let mainButtons = [addButton, subtractButton, multiplyButton, divideButton, decimalButton];



for(let i = 0; i < mainButtons.length; i++){
    mainButtons[i].addEventListener('click', addOnDisplay)
};

clearButton.addEventListener('click', () => {
    clearScreen();
    expression = [];
});

equalButton.addEventListener('click', evaluateExp);

for(let i = 0; i < numbers.length; i++){
    numbers[i].addEventListener('click', addOnDisplay);
};




function addOnDisplay() {
    if(this.textContent.trim() == "." && 
        (expression[expression.length - 1].includes('.') ||
        isNaN(expression[expression.length - 1]))){
                // nothing
    }else{
        display.textContent += this.textContent.trim();
    };

    addToExpression(this);
};

function clearScreen() {
    display.textContent = '';
};

function addToExpression(element) {

    let eleCont = element.textContent.trim();

    if([...element.classList].includes('multiply')){
        
        expression.push('*');

    }else if([...element.classList].includes('divide')){
        
        expression.push('/');
    
    }else if(!(isNaN(+eleCont)) &&
            !isNaN(expression[expression.length - 1])){
        
        expression[expression.length - 1] += eleCont;
    
    }else if(eleCont == '.'){
        
        if(expression[expression.length - 1].includes('.') ||
            isNaN(expression[expression.length - 1])){
            // nothing
        }else{
            expression[expression.length - 1] += ".";
        };

    }else{
        expression.push(eleCont);
    };

    // let expArray = Array.from(expression);
    /* let expArrayComp = [];
    let result;

    for(let i = 0; i < expression.length; i++){

        if (!(isNaN(+expArrayComp[expArrayComp.length - 1])) &&
            !(isNaN(+expression[i]))) {
                expArrayComp[expArrayComp.length - 1] += expression[i];
        }else{
            expArrayComp.push(expression[i]);
        };

    }; */


};


function evaluateExp() {
    // let expArray = Array.from(expression);
    // let expArrayComp = [];
    
    /* let firstNum = '';
    let secNum = '';
    
    let action = '';
    let actionReached = false; */
    
    // let result;

    // const actions = ["+", "-", "*", "/"];

    /* for(let i = 0; i < expArray.length; i++){

        if (!(isNaN(+expArrayComp[expArrayComp.length - 1])) &&
            !(isNaN(+expArray[i]))) {
                expArrayComp[expArrayComp.length - 1] += expArray[i];
        }else{
            expArrayComp.push(expArray[i]);
        };

    }; */

    // division
    while(expression.length > 1){
        let ind = expression.indexOf('/');
        
        if (ind == -1){
            break;
        };

        result = divide(expression[ind - 1], expression[ind + 1]);
        expression.splice(ind - 1, 3, result);
    };

    // multiply
    while(expression.length > 1){
        let ind = expression.indexOf('*');
        
        if (ind == -1){
            break;
        };
        
        result = multiply(expression[ind - 1], expression[ind + 1]);
        expression.splice(ind - 1, 3, result);
    };

    // subtract
    while(expression.length > 1){
        let ind = expression.indexOf('-');
        
        if (ind == -1){
            break;
        };

        result = subtract(expression[ind - 1], expression[ind + 1]);
        expression.splice(ind - 1, 3, result);
        // console.log({result});
    };

    
    // addition
    while(expression.length > 1){
        let ind = expression.indexOf('+');
        
        if (ind == -1){
            break;
        };

        result = add(expression[ind - 1], expression[ind + 1]);
        expression.splice(ind - 1, 3, result);
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
    return Math.round((+a/+b) * 100)/100;
};

function subtract(a, b) {
    return +a - +b;
};

function displayResult(res) {
    clearScreen();
    display.textContent = res;
    expression = [];
    expression.push(res);
};