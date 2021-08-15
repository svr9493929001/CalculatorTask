// First Row
const allClear = document.createElement('div');
allClear.setAttribute('class', 'button all-clear');
allClear.innerText = 'C';

const lastEntryClear = document.createElement('div');
lastEntryClear.setAttribute('class', 'button last-entity-clear');
lastEntryClear.innerText = 'CE';

const Modules = document.createElement('div');
Modules.setAttribute('class', 'button operation');
Modules.innerText = '%';

const Division = document.createElement('div');
Division.setAttribute('class', 'button operation');
Division.innerText = '/';
// First Row

// Second Row
const Seven = document.createElement('div');
Seven.setAttribute('class', 'button number');
Seven.innerText = '7';

const Eight = document.createElement('div');
Eight.setAttribute('class', 'button number');
Eight.innerText = '8';

const Nine = document.createElement('div');
Nine.setAttribute('class', 'button number');
Nine.innerText = '9';

const Multiplication = document.createElement('div');
Multiplication.setAttribute('class', 'button operation');
Multiplication.innerText = 'X';
// Second Row

// Third Row
const Four = document.createElement('div');
Four.setAttribute('class', 'button number');
Four.innerText = '4';

const Five = document.createElement('div');
Five.setAttribute('class', 'button number');
Five.innerText = '5';

const Six = document.createElement('div');
Six.setAttribute('class', 'button number');
Six.innerText = '6';

const Substraction = document.createElement('div');
Substraction.setAttribute('class', 'button operation');
Substraction.innerText = '-';
// Third Row

// Fourth Row
const One = document.createElement('div');
One.setAttribute('class', 'button number');
One.innerText = '1';

const Two = document.createElement('div');
Two.setAttribute('class', 'button number');
Two.innerText = '2';

const Three = document.createElement('div');
Three.setAttribute('class', 'button number');
Three.innerText = '3';

const Addition = document.createElement('div');
Addition.setAttribute('class', 'button operation');
Addition.innerText = '+';
// Fourt Row

// Fifth Row
const Zero = document.createElement('div');
Zero.setAttribute('class', 'button btn-0 number');
Zero.innerText = '0';

const Dot = document.createElement('div');
Dot.setAttribute('class', 'button number dot');
Dot.innerText = '.';

const Equal = document.createElement('div');
Equal.setAttribute('class', 'button equal');
Equal.innerText = '=';
// Fifth Row

// All Buttons
const AllButtons = document.createElement('div');
AllButtons.setAttribute('class', 'all_button');
AllButtons.append(allClear,lastEntryClear,Modules,Division,Seven,Eight,Nine,Multiplication,Four,Five,Six,Substraction,One,Two,Three,Addition,Zero,Dot,Equal);
// All Buttons

// Display1
const Display1 = document.createElement('div');
Display1.setAttribute('class', 'display-1');
Display1.innerText = '0';
// Display1

// Display2
const Display2 = document.createElement('div');
Display2.setAttribute('class', 'display-2');
Display2.innerText = '0';
// Display2

// Temp-result
const tempresult = document.createElement('div');
tempresult.setAttribute('class', 'temp-result');
// Temp-result

// Display
const display = document.createElement('div');
display.setAttribute('class', 'display');
display.append(Display1, Display2, tempresult);
// Display

// calculator
const calculator = document.createElement('div');
calculator.setAttribute('class', 'calculator')
calculator.append(display, AllButtons);
// calculator

// container
const container = document.createElement('div');
container.setAttribute('class', 'container');
container.append(calculator);
// container

// Section
const section = document.createElement('section');
section.append(container);
document.body.append(section);
// Section

const display1El = document.querySelector(".display-1");
const display2El = document.querySelector(".display-2");
const tempResultEl = document.querySelector(".temp-result");
const numbersEl = document.querySelectorAll(".number");
const operationEl = document.querySelectorAll(".operation");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");
let dis1Num = "";
let dis2Num = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbersEl.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }
    dis2Num += e.target.innerText;
    display2El.innerText = dis2Num;
  });
});

operationEl.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (!dis2Num) return;
    haveDot = false;
    const operationName = e.target.innerText;
    if (dis1Num && dis2Num && lastOperation) {
      mathOperation();
    } else {
      result = parseFloat(dis2Num);
    }
    clearVar(operationName);
    lastOperation = operationName;
    console.log(result);
  });
});
function clearVar(name = "") {
  dis1Num += dis2Num + " " + name + " ";
  display1El.innerText = dis1Num;
  display2El.innerText = "";
  dis2Num = "";
  tempResultEl.innerText = result;
}

function mathOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(dis2Num);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(dis2Num);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(dis2Num);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(dis2Num);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(dis2Num);
  }
}

equalEl.addEventListener("click", () => {
  if (!dis2Num || !dis1Num) return;
  haveDot = false;
  mathOperation();
  clearVar();
  display2El.innerText = result;
  tempResultEl.innerText = "";
  dis2Num = result;
  dis1Num = "";
});

clearAllEl.addEventListener("click", () => {
  dis1Num = "";
  dis2Num = "";
  display1El.innerText = "";
  display2El.innerText = "";
  result = "";
  tempResultEl.innerText = "";
});

clearLastEl.addEventListener("click", () => {
  display2El.innerText = "";
  dis2Num = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
});
function clickButtonEl(key) {
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickOperation(key) {
  operationEl.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}
function clickEqual() {
  equalEl.click();
}

