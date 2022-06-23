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

let mainButtons = [addButton, subtractButton, multiplyButton, divideButton];

for(let i = 0; i < mainButtons.length; i++){
    mainButtons[i].addEventListener('click', addOnDisplay)
};

clearButton.addEventListener('click', () => {
    display.textContent = '';
});

for(let i = 0; i < numbers.length; i++){
    numbers[i].addEventListener('click', addOnDisplay);
};

function addOnDisplay() {
    display.textContent += this.textContent;
}