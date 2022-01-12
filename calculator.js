const screen = document.querySelector('#screen');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll(".operator");
const result = document.querySelector('#operate');
const reset = document.querySelector('#reset');
const decimal = document.querySelector('.decimal');
const backspace = document.querySelector('#backspace');

let ans;
let operatorFunc;
let displayValue;
let storedValue;
let stop = false;


function add(a, b) {
    return a+b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b){
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(operator, a, b) {
    return operator(a, b);
}

function appendNum(string, num){
    string += num
    
}

function populateScreen(number) {
    if (!displayValue) {
        screen.textContent = ""
    } else {
    if (displayValue.indexOf('.') > 0 && number === '.') {
        return 
    }}
    if (screen.textContent.length > 10) return;
    screen.textContent += number;
    displayValue = screen.textContent;
}

function applyOperation(operation){
    stop = false
    if (storedValue && displayValue && operatorFunc) {
        storedValue = operate(operatorFunc(), parseFloat(storedValue), parseFloat(displayValue));
        if (storedValue === Infinity || storedValue === NaN){
            screen.textContent = 'Math Error';
            displayValue = "";
            storedValue = "";
            return 
        }
        screen.textContent = (Math.round(parseFloat(storedValue) * 100) / 100);
    } else {
        storedValue = screen.textContent
    }
    operatorFunc = Function(`return ${operation}`);
    displayValue = ""
}

function implementOperation() {
    if (!operatorFunc || !storedValue || !displayValue){
        return
    }
    if (stop) return;
    storedValue = operate(operatorFunc(), parseFloat(storedValue), parseFloat(screen.textContent))
    if (storedValue === Infinity || storedValue === NaN){
        screen.textContent = 'Math Error';
        displayValue = "";
        storedValue = "";
        return
    }
    screen.textContent = (Math.round(parseFloat(storedValue) * 100) / 100);
    displayValue = "";
    operatorFunc = "";
    stop = true
}
function deleteLastChar() {
    if (screen.textContent.length > 1){
        screen.textContent.toString();
        screen.textContent = screen.textContent.substring(0, screen.textContent.length -1);
        screen.textContent = parseFloat(screen.textContent);
        displayValue = screen.textContent;
    } else {
        screen.textContent = ""
    }
}
function resetAll(){
    storedValue = undefined
    screen.textContent = "";
    displayValue = "";
    operatorFunc = "";
    stop = false
}

numbers.forEach(number => number.addEventListener('click', () => populateScreen(number.textContent)));
operators.forEach(opt => opt.addEventListener('click', () => applyOperation(opt.id)));
result.addEventListener('click', () => implementOperation());
backspace.addEventListener('click', () => deleteLastChar());
reset.addEventListener('click', () => resetAll());

window.addEventListener('keydown', (e) => {
    if ((parseInt(e.key) >= 0 && parseInt(e.key) <= 9) || (e.key === '.')){
        populateScreen(e.key)
    }
    else if (e.key === '*'){
        applyOperation('multiply')
    }
    else if (e.key === '/'){
        applyOperation('divide')
    }
    else if (e.key === '+'){
        applyOperation('add')
    }
    else if (e.key === '-'){
        applyOperation('subtract')
    }
    else if (e.key === '=' || e.key === 'Enter') {
        implementOperation()
    }
    else if (e.key === "Clear" || e.key === 'Escape') {
        resetAll()
    }
    else if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteLastChar()
    }
})
