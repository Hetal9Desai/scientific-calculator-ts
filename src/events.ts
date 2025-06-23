import { Calculator } from "./calculator.js";

// Create a single Calculator instance
const calculator = new Calculator();

document.addEventListener("DOMContentLoaded", () => {
  // --- Dropdown Toggle for Trigonometry ---
  const trigBtn = document.getElementById("trigBtn") as HTMLElement;
  const trigDropdown = document.getElementById("trigDropdown") as HTMLElement;
  trigBtn.addEventListener("click", () => {
    trigDropdown.style.display =
      trigDropdown.style.display === "none" || trigDropdown.style.display === ""
        ? "block"
        : "none";
  });

  // --- Dropdown Toggle for Function Buttons ---
  const funcBtn = document.getElementById("funcBtn") as HTMLElement;
  const funcDropdown = document.getElementById("funcDropdown") as HTMLElement;
  funcBtn.addEventListener("click", () => {
    funcDropdown.style.display =
      funcDropdown.style.display === "none" || funcDropdown.style.display === ""
        ? "block"
        : "none";
  });

  // --- DEG Toggle ---
  const degBtn = document.getElementById("degBtn") as HTMLElement;
  degBtn.addEventListener("click", () => {
    calculator.toggleDegreeMode();
  });

  // --- F-E Toggle ---
  const fEButton = document.getElementById("fEBtn") as HTMLElement;
  fEButton.addEventListener("click", () => {
    calculator.toggleScientificNotation();
  });

  // --- History Button (redirect to history.html) ---
  const historyBtn = document.getElementById("historyBtn") as HTMLElement;
  historyBtn.addEventListener("click", () => {
    window.location.href = "history.html";
  });

  // --- Theme Toggle ---
  const themeToggle = document.getElementById("themeToggle") as HTMLElement;
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  });

  // --- "2nd" Toggle for Inverse Functions ---
  const toggleSecond = document.querySelector(
    '[data-action="toggle-second"]'
  ) as HTMLElement;
  toggleSecond.addEventListener("click", () => {
    calculator.toggleSecondFunction();
  });

  // --- Event Delegation for Calculator Buttons ---
  const calculatorContainer = document.querySelector(
    ".calculator"
  ) as HTMLElement;
  calculatorContainer.addEventListener("click", (event: Event) => {
    const target = event.target as HTMLElement;
    const btn = target.closest(".btn-calc") as HTMLElement | null;
    if (!btn) return;
    const action = btn.getAttribute("data-action") || "";
    if (!isNaN(Number(action))) {
      calculator.appendNumber(action);
    } else {
      const actionsMap: { [key: string]: () => void } = {
        clear: () => calculator.clear(),
        backspace: () => calculator.backspace(),
        equals: () => calculator.evaluateExpression(),
        decimal: () => calculator.decimal(),
        "plus-minus": () => calculator.plusMinus(),
        square: () => calculator.square(),
        sqrt: () => calculator.squareRoot(),
        inverse: () => calculator.inverse(),
        absolute: () => calculator.absolute(),
        sin: () => calculator.sin(),
        cos: () => calculator.cos(),
        tan: () => calculator.tan(),
        "sin^-1": () => calculator.asin(),
        "cos^-1": () => calculator.acos(),
        "tan^-1": () => calculator.atan(),
        pi: () => calculator.pi(),
        e: () => calculator.e(),
        log: () => calculator.log(),
        factorial: () => calculator.factorial(),
        ln: () => calculator.ln(),
        exp: () => calculator.exp(),
        tenPowerX: () => calculator.tenPowerX(),
        twoPowerX: () => calculator.twoPowerX(),
        xPowerY: () => calculator.xPowerY(),
        "open-parenthesis": () => calculator.appendParenthesis(true),
        "close-parenthesis": () => calculator.appendParenthesis(false),
        add: () => calculator.setOperation("add"),
        minus: () => calculator.setOperation("minus"),
        multiply: () => calculator.setOperation("multiply"),
        divide: () => calculator.setOperation("divide"),
        mod: () => calculator.setOperation("mod"),
        floor: () => calculator.mathFunction(Math.floor),
        ceil: () => calculator.mathFunction(Math.ceil),
        mc: () => calculator.memoryClear(),
        mr: () => calculator.memoryRecall(),
        "M+": () => calculator.memoryAdd(),
        "M-": () => calculator.memorySubtract(),
        ms: () => calculator.memoryStore(),
      };
      if (actionsMap[action]) {
        actionsMap[action]();
      }
    }
  });

  // --- Keyboard Support ---
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    const key = e.key;
    if ("0123456789".includes(key)) {
      calculator.appendNumber(key);
    } else if (key === ".") {
      calculator.decimal();
    } else if (key === "Backspace") {
      calculator.backspace();
    } else if (key === "Escape") {
      calculator.clear();
    } else if (key === "Enter" || key === "=") {
      calculator.equals();
    } else if (key === "+") {
      calculator.setOperation("add");
    } else if (key === "-") {
      calculator.setOperation("minus");
    } else if (key === "*" || key === "x") {
      calculator.setOperation("multiply");
    } else if (key === "/") {
      calculator.setOperation("divide");
    } else if (key === "%") {
      calculator.setOperation("mod");
    } else if (key === "(") {
      calculator.appendParenthesis(true);
    } else if (key === ")") {
      calculator.appendParenthesis(false);
    }
  });
});
