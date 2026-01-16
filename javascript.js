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

function operate() {
    numA = parseFloat(a);
    numB = parseFloat(b);
    switch (operator) {
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

function reset(clearScreen = false) {
    a = "";
    b = "";
    operator = "";
    if (clearScreen) {
        result.innerText = "";
    }
    toggleDecimalPoint(true);
    enableOperators();
}

function processOp() {
    let value;
    if (a === "") {
        a = numberRegister;
        disableOperators();
    } else if (numberRegister === "") {
        disableOperators();
        return;
    } else {
        b = numberRegister;
        if (operator === "divide" && b === "0")
        {
            processDivByZero();
            return;
        } else {
            value = operate();
        }
        result.innerText = value;
        a = value.toString();
        enableOperators();
    }
    numberRegister = "";
}

function processDivByZero() {
    const dialog = document.querySelector("dialog");
    dialog.showModal();
    setTimeout(() => dialog.close(), 5000);
    reset(true);
    numberRegister = ""
}

function processEquals() {
    if (a === "") {
        return;
    }
    b = numberRegister;
    if (operator === "divide" && b === "0") {
        processDivByZero();
        return;
    } else {
        value = operate();
    }
    result.innerText = value;
    reset();
    a = value.toString();
    numberRegister = ""
    enableOperators();
}


function toggleDecimalPoint(isEnabled) {
    document.getElementById("decimal").disabled = !isEnabled;
}

function disableOperators() {
    let ops =  document.querySelectorAll('.operator');
    // ops.forEach(op => op.id === "equals" ? op.disable = false : op.disabled = true);
    ops.forEach(op => op.disabled = true);
}

function enableOperators() {
    let ops =  document.querySelectorAll('.operator');
    ops.forEach(op => op.disabled = false);
}

// addEventListeners adds event listeners for each number key on the calculator.
function addEventListeners() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(num => {
        num.addEventListener('click', function(e) {
            if (numberRegister.length < 20) {
                let val = e.target.id;
                if(val === "decimal") {
                    val = ".";
                    toggleDecimalPoint(false);
                } else {
                    val = val.slice(1);
                }
                numberRegister += val;
                result.innerText = numberRegister;
                enableOperators();
            }
        });
    });

    const ops = document.querySelectorAll('.operator');
    ops.forEach(op => {
        op.addEventListener('click', function(e) {
            if (e.target.id != "equals") {
                processOp();
                operator = e.target.id;
                disableOperators()

            } else {
                processEquals();
            }
            toggleDecimalPoint(true);
        })
    })

    const clear = document.getElementById('clear');
    clear.addEventListener('click', function(e) {
        reset(true);
        numberRegister = "";
    })

    const backspace = document.getElementById('backspace');
    backspace.addEventListener('click', function(e) {
        numberRegister = numberRegister.slice(0, -1);
        result.innerText = numberRegister;
    })

}

addEventListeners();

/* TODO
Calculator works - I think?!
Add +/- button??
all that is left is to not allow sums/products to exceed 20 char
*/
