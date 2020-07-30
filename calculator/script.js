/////////////////////////////////////
const displayValElement = document.getElementById("display__numbers");
const btnNumbers = document.getElementsByClassName("btn--number");
const btnOperators = document.getElementsByClassName("btn--operator");
const decimal = document.getElementById("decimal");
const clear = document.getElementById("clear");

//////////////////////////////
const DollarsShekels = document.getElementById("Dollars-Shekels");
const ShekelsDollars = document.getElementById("Shekels-Dollars");
const EurosShekels = document.getElementById("Euros-Shekels");
const ShekelsEuro = document.getElementById("Shekels-Euros");

/////////////////////////////////////
let displayVal = '0';
let pendingVal;
let evalStringArray = [];
let equalVal;

/////////////////////////////////////
updateDisplayVal = (e) => {
  let btnText = e.target.innerText;
  if (displayVal === "0") {
    displayVal = "";
  }

  if (displayVal.length < 15) {
    displayVal += btnText;
    displayValElement.innerText = displayVal;
  }
 
}

for (let i = 0; i < btnNumbers.length; i++) {
  btnNumbers[i].addEventListener('click', updateDisplayVal)
}

/////////////////////////////////////
performOperation = (e) => {
  let operator = e.target.innerText;

  switch (operator) {
    case '+':
      pendingVal = displayVal;
      if (pendingVal === '') {
        evalStringArray.pop();
        evalStringArray.push('+');
        displayVal = '';
      } else {
        displayValElement.innerText = displayVal;
        evalStringArray.push(pendingVal);
        evalStringArray.push('+');
        displayVal = '';
      }
      break;
    case '-':
      pendingVal = displayVal;
      if (pendingVal === '') {
        evalStringArray.pop();
        evalStringArray.push('-');
        displayVal = '';
      } else {
        displayValElement.innerText = displayVal;
        evalStringArray.push(pendingVal);
        evalStringArray.push('-');
        displayVal = '';
      }
      break;
    case '×':
      pendingVal = displayVal;
      if (pendingVal === '') {
        evalStringArray.pop();
        evalStringArray.push('*');
        displayVal = '';
      } else {
        displayValElement.innerText = displayVal;
        evalStringArray.push(pendingVal);
        evalStringArray.push('*');
        displayVal = '';
      }
      break;
    case '÷':
      pendingVal = displayVal;
      if (pendingVal === '') {
        evalStringArray.pop();
        evalStringArray.push('/');
        displayVal = '';
      } else {
        displayValElement.innerText = displayVal;
        evalStringArray.push(pendingVal);
        evalStringArray.push('/');
        displayVal = '';
      }
      break;
    case '=':
      if (evalStringArray.length > 1) {
        evalStringArray.push(displayVal);
        if (displayVal.slice(-1) !== "") {
          displayValElement.innerText = Equal(evalStringArray.join(''));
          equalVal = displayValElement.innerText;
          evalStringArray = [];
          displayVal = equalVal;
        }
      }
      break;

  }
}


for (let i = 0; i < btnOperators.length; i++) {
  btnOperators[i].addEventListener('click', performOperation);
}

DollarsShekels.onclick = () => {
  displayValElement.innerHTML *= 3.41;
  equalVal = displayValElement.innerText;
  evalStringArray = [];
  displayVal = '';
  evalStringArray.push(equalVal);
}

ShekelsDollars.onclick = () => {
  displayValElement.innerHTML /= 3.41;
  equalVal = displayValElement.innerText;
  evalStringArray = [];
  displayVal = '';
  evalStringArray.push(equalVal);
}

EurosShekels.onclick = () => {
  displayValElement.innerHTML *= 3.99;
  equalVal = displayValElement.innerText;
  evalStringArray = [];
  displayVal = '';
  evalStringArray.push(equalVal);
}

ShekelsEuro.onclick = () => {
  displayValElement.innerHTML /= 3.99;
  equalVal = displayValElement.innerText;
  evalStringArray = [];
  displayVal = '';
  evalStringArray.push(equalVal);
}


/////////////////////////////////////
clear.onclick = () => {
  displayVal = '0';
  pendingVal = undefined;
  evalStringArray = [];
  displayValElement.innerHTML = displayVal;
}

/////////////////////////////////////
decimal.onclick = () => {
  if (!displayVal.includes('.')) {
    displayVal += '.';
  }
  displayValElement.innerText = displayVal;
}

/////////////////////////////////////
function Equal(str) {

  const operators = str.replace(/[\d.,]/g, '').split('');
  const operands = str.replace(/[+/*-]/g, ' ').replace(/\,/g, '.').split(' ').map(parseFloat);

  while (operators.includes('*')) {
    let opIndex = operators.indexOf('*');
    operands.splice(opIndex, 2, operands[opIndex] * operands[opIndex + 1]);
    operators.splice(opIndex, 1);
  };
  while (operators.includes('/')) {
    let opIndex = operators.indexOf('/');
    operands.splice(opIndex, 2, operands[opIndex] / operands[opIndex + 1]);
    operators.splice(opIndex, 1);
  };

  let result = operands[0];
  for (let i = 0; i < operators.length; i++) {
    operators[i] === '+' ? (result += operands[i + 1]) : (result -= operands[i + 1])
  }
  return roundoff_2(result);
}

function roundoff_2(num) {
  return Math.round(num * 100) / 100;
}