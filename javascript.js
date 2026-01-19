let a = "";
let b = "";
let operator = "";
let numberRegister = "";
const result = document.getElementById('result');

// calculates x + y and returns result
function add (x, y) {
    return x + y;
}

// calculates x - y and returns result
function substract (x, y) {
    return x - y;
}

// calculates x * y and returns result
function mulitply (x, y) {
    return x * y;
}

// calculates x / y and returns result
function divide (x, y) {
    if (y !== 0) {
        return x / y;
    } else {
        return NaN;
    }    
}

// performs <x op y> and returns result
function operate(x, y, op) {
    numA = parseFloat(x);
    numB = parseFloat(y);
    switch (op) {
    case "add":
        return add(numA, numB);
    case "subtract":
        return substract(numA, numB);
    case "multiply":
        return mulitply(numA, numB);
    case "divide":
        return divide(numA, numB);
    }
}

// resets calculator
function reset() {
    a = "";
    b = "";
    operator = "";
    numberRegister = "";
    result.innerText = "";
    toggleDecimalPoint(true);
}

// populates the calculator "window"
function setResultText(value) {
    let val = parseFloat(value);
    if (val > 10e16) {
        result.innerText = val.toExponential(1);
    }
    else {
        if(value.length > 18) {
            value = value.slice(0,20);
        }
        result.innerText = value;
    }
}

// event handler for when an operator (+-*/=) key is entered
function processOp(op) {
    if (numberRegister === "") {
        if (op === "equals") {
            return;
        }
        operator = op;
        return;
    }
    // set a
    if (a === "") {
        a = numberRegister;
        numberRegister = "";
        operator = op;
        return;
    }
    // set b and calculate
    let value;
    b = numberRegister;
    if (operator === "") {
        operator = op;
    }
    if (operator === "divide" && b == 0)
    {
        processDivByZero();
        return;
    } else {
        value = operate(a, b, operator);
        reset();
        setResultText(value);
        if (op !== "equals") {
            a = value;
            operator = op;
        }
    }       
}

// processDivByZero displays a dialog for 5 seconds and resets the calculator
function processDivByZero() {
    const dialog = document.querySelector("dialog");
    dialog.showModal();
    setTimeout(() => dialog.close(), 5000);
    reset();
}

// enables decimal point key if isEnabled = true, otherwise disables it
function toggleDecimalPoint(isEnabled) {
    document.getElementById("decimal").disabled = !isEnabled;
}

// event handler for when decimal point key is selected that inserts a zero if there is
// not a value to left of decimal and does not allow multiple decimal points.
function handleDecimal() {
    if (numberRegister === "") {
        numberRegister = "0"
    }
    toggleDecimalPoint(false);
}

// addEventListeners adds event listeners for each number key on the calculator.
function addEventListeners() {
    // numbers and decimal point
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(num => {
        num.addEventListener('click', function(e) {
            let val = e.target.id;
            if(val === "decimal") {
                handleDecimal();
                val = ".";
            } else {
                val = val.slice(1);
            }
            numberRegister += val;
            setResultText(numberRegister);
        });
    });

    // operators
    const ops = document.querySelectorAll('.operator');
    ops.forEach(op => {
        op.addEventListener('click', function(e) {
            processOp(e.target.id)
            toggleDecimalPoint(true);
        })
    })
    
    // clear button
    const clear = document.getElementById('clear');
    clear.addEventListener('click', function(e) {
        reset();
    })

    // backspace button
    const backspace = document.getElementById('backspace');
    backspace.addEventListener('click', function(e) {
        if (numberRegister.length >= 1) {
            numberRegister = numberRegister.slice(0, -1);
            result.innerText = numberRegister;
        }
    })
}

addEventListeners();
