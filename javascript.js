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

function operate(aString, bString, operator) {
    a = parseFloat(aString);
    b = parseFloat(bString);
    switch (operator) {
    case "add":
        return add(a, b);
    case "subtract":
        return substract(a, b);
    case "multiply":
        return mulitply(a, b);
    case "divide":
        return divide(a, b);
    }
}

class Manager {
    constructor(result) {
        this.result = result;
        this.reset();
    }

    reset() {
        this.a = "";
        this.b = ""; 
        this.currentlyProcessing = this.a; 
        this.currentOperation = "";
    }

    processOp(op) {
        if (this.currentlyProcessing === this.a) {
            this.a = numberRegister;
            this.currentlyProcessing = this.b;
        } else {
            this.b = numberRegister;
            this.currentlyProcessing = this.a;
        }
        this.currentOperation = op;
        numberRegister = "";
    }

    processEquals() {
        this.b = numberRegister;
        this.currentlyProcessing = this.a;
        this.result.innerText = operate(this.a, this.b, this.currentOperation);
        this.reset();
    }
}

// addEventListeners adds event listeners for each number key on the calculator.
function addEventListeners() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(num => {
        num.addEventListener('click', function(e) {
            let val = (e.target.id).slice(1);
            numberRegister += val;
            result.innerText = numberRegister;
            console.log("Number pressed:", val);
        });
    });
    const ops = document.querySelectorAll('.operator');
    ops.forEach(op => {
        op.addEventListener('click', function(e) {
            operator = e.target.id;
            console.log("Operator pressed:", operator);
            if (operator != "equals") {
                manager.processOp(operator);
            } else {
                manager.processEquals()
            }
        })
    })
}

let operator;
let numberRegister = "";
let manager = new Manager(document.getElementById('result'));
addEventListeners();

/* TODO
Clear Button
Delete Button
Decimal point
"Continous" operations (5 + 7 + 8 * 7, etc)
move numberRegister into Manager
figure out how to reset result after/between ops
*/
