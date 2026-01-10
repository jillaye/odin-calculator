function add (a, b) {
    return a + b;
}

function substract (a, b) {
    return a - b;
}

function mulitply (a, b) {
    return a * b;
}

function divide (a, b) {
    if (b !== 0) {
        return a / b;
    } else {
        return NaN;
    }    
}

function operate(a, b, operator) {
    switch (operator) {
    case "+":
        return add(a, b);
    case "-":
        return substract(a, b);
    case "x":
        return mulitply(a, b);
    case "/":
        return divide(a, b);
    }
}

let a;
let b;
let operator;
