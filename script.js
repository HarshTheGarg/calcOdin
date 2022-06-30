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
    }else if(display.textContent == "Error"){
        clearScreen();  
        display.textContent += this.textContent.trim();
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
};


function evaluateExp() {
    if (isNaN(+expression[expression.length - 1])){
        result = "Error";

    }else{

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
            
        };
    
        
        // addition
        while(expression.length > 1){
            let ind = expression.indexOf('+');
            
            if (ind == -1){
                break;
            };
            result = add(expression[ind - 1], expression[ind + 1]);
            expression.splice(ind - 1, 3, result);
        }
    };

    displayResult(result);
};

function add(a, b) {
    return Math.round((+a + +b)*100)/100;
};

function multiply(a, b){
    return Math.round((+a * +b) * 100)/100;
};

function divide(a, b) {
    if(b==0){
        return 'Error';
    }
    return Math.round((+a/+b) * 100)/100;
};

function subtract(a, b) {
    return Math.round((+a - +b) * 100)/100;
};

function displayResult(res) {
    clearScreen();
    display.textContent = res;
    expression = [];
    if(res != "Error"){
        expression.push(res);
    };
};