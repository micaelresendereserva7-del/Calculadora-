const display = document.getElementById("display");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

function addNumber(number) {
  if (display.value === "0" || waitingForSecondNumber) {
    display.value = number;
    waitingForSecondNumber = false;
  } else {
    display.value += number;
  }
}

function addDecimal() {
  if (waitingForSecondNumber) {
    display.value = "0.";
    waitingForSecondNumber = false;
    return;
  }

  if (!display.value.includes(".")) {
    display.value += ".";
  }
}

function clearDisplay() {
  display.value = "0";
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = false;
}

function toggleSign() {
  if (display.value !== "0") {
    display.value = String(parseFloat(display.value) * -1);
  }
}

function percentage() {
  display.value = String(parseFloat(display.value) / 100);
}

function setOperator(selectedOperator) {
  const currentNumber = parseFloat(display.value);

  if (operator && waitingForSecondNumber) {
    operator = selectedOperator;
    return;
  }

  if (firstNumber === null) {
    firstNumber = currentNumber;
  } else if (operator) {
    firstNumber = operate(firstNumber, currentNumber, operator);
    display.value = String(firstNumber);
  }

  operator = selectedOperator;
  waitingForSecondNumber = true;
}

function calculate() {
  if (operator === null || firstNumber === null) {
    return;
  }

  const secondNumber = parseFloat(display.value);

  const result = operate(
    firstNumber,
    secondNumber,
    operator
  );

  display.value = String(result);

  firstNumber = null;
  operator = null;
  waitingForSecondNumber = true;
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;

    case "-":
      return a - b;

    case "*":
      return a * b;

    case "/":
      if (b === 0) {
        return "Erro";
      }
      return a / b;

    default:
      return b;
  }
}
