let a = "";
let b = "";
let operator = "";
let numberRegister = "";
const result = document.getElementById('result');

function add (x, y) {
    return x + y;
}

function substract (x, y) {
    return x - y;
}

function mulitply (x, y) {
    return x * y;
}

function divide (x, y) {
    if (y !== 0) {
        return x / y;
    } else {
        return NaN;
    }    
}

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

function reset() {
    a = "";
    b = "";
    operator = "";
    numberRegister = "";
    result.innerText = "";
    toggleDecimalPoint(true);
    enableOperators();
}

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

function processOp(op) {
    if (a === "") {
        if (numberRegister === "" || op === "equals") {
            return;
        }
        a = numberRegister;
        numberRegister = "";
        setResultText(a);
        operator = op;
        disableOperators();
    } else if (operator === "") {
        if (op === "equals") {
            return
        }
        operator = op;
        disableOperators();
    } else {
        b = numberRegister;
        let value;
        if (operator === "divide" && b == 0)
        {
            processDivByZero();
            return;
        } else {
            value = operate(a, b, operator);
            reset();
            setResultText(value);
            a = value;
            if (op === "equals") {
                operator = "";
            } else {
                operator = op;
            }
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

function toggleDecimalPoint(isEnabled) {
    document.getElementById("decimal").disabled = !isEnabled;
}

function disableOperators() {
    let ops =  document.querySelectorAll('.operator');
    ops.forEach(op => op.disabled = true);
}

function enableOperators() {
    let ops =  document.querySelectorAll('.operator');
    ops.forEach(op => op.disabled = false);
}

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
            enableOperators();
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
            if (numberRegister === "") {
                numberRegister = 0;
            }
            result.innerText = numberRegister;
        }
    })

}

addEventListeners();

// TODO
// 1. shouldn't need to disable operators
