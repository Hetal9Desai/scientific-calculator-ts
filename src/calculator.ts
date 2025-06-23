import { Operations } from "./operations.js";
import { CalcHistory } from "./history.js";

export class Calculator extends Operations {
  currentValue: string;
  previousValue: string;
  operation: string;
  displayValue: string;
  isExponent: boolean;
  openParenthesesCount: number;
  memoryValue: number;
  isDegreeMode: boolean;
  isScientificNotation: boolean;
  isSecondFunction: boolean;

  constructor() {
    super();
    this.currentValue = "0";
    this.previousValue = "";
    this.operation = "";
    this.displayValue = "";
    this.isExponent = false;
    this.openParenthesesCount = 0;
    this.memoryValue = 0;
    this.isDegreeMode = false;
    this.isScientificNotation = false;
    this.isSecondFunction = false;
  }

  updateScreen(): void {
    const screen = document.querySelector(".screen") as HTMLElement;
    if (screen) {
      screen.textContent = this.displayValue || "0";
    }
  }

  toggleScientificNotation(): void {
    this.isScientificNotation = !this.isScientificNotation;
    const num = parseFloat(this.currentValue) || 0;
    this.currentValue = this.isScientificNotation
      ? num.toExponential(3)
      : num.toString();
    this.displayValue = this.currentValue;
    this.updateScreen();
  }

  // Advanced trig functions (normal)
  sin(): void {
    if (!this.displayValue.includes("sin(")) {
      this.displayValue += "sin(";
      this.openParenthesesCount++;
    }
    this.updateScreen();
  }

  cos(): void {
    if (!this.displayValue.includes("cos(")) {
      this.displayValue += "cos(";
      this.openParenthesesCount++;
    }
    this.updateScreen();
  }

  tan(): void {
    if (!this.displayValue.includes("tan(")) {
      this.displayValue += "tan(";
      this.openParenthesesCount++;
    }
    this.updateScreen();
  }

  // Inverse trig functions
  asin(): void {
    if (!this.displayValue.includes("asin(")) {
      this.displayValue += "asin(";
      this.openParenthesesCount++;
    }
    this.updateScreen();
  }

  acos(): void {
    if (!this.displayValue.includes("acos(")) {
      this.displayValue += "acos(";
      this.openParenthesesCount++;
    }
    this.updateScreen();
  }

  atan(): void {
    if (!this.displayValue.includes("atan(")) {
      this.displayValue += "atan(";
      this.openParenthesesCount++;
    }
    this.updateScreen();
  }

  // "2nd" toggle for inverse functions
  toggleSecondFunction(): void {
    this.isSecondFunction = !this.isSecondFunction;
    const normal = document.querySelectorAll(
      '[data-action="sin"], [data-action="cos"], [data-action="tan"]'
    ) as NodeListOf<HTMLElement>;
    const inverse = document.querySelectorAll(
      '[data-action="sin^-1"], [data-action="cos^-1"], [data-action="tan^-1"]'
    ) as NodeListOf<HTMLElement>;
    if (this.isSecondFunction) {
      normal.forEach((el) => (el.style.display = "none"));
      inverse.forEach((el) => (el.style.display = "block"));
    } else {
      normal.forEach((el) => (el.style.display = "block"));
      inverse.forEach((el) => (el.style.display = "none"));
    }
  }

  appendNumber(number: string): void {
    if (this.currentValue === "0" || this.isExponent) {
      this.currentValue = number;
      this.isExponent = false;
    } else {
      this.currentValue += number;
    }
    this.displayValue += number;
    this.updateScreen();
  }

  clear(): void {
    this.currentValue = "0";
    this.previousValue = "";
    this.operation = "";
    this.displayValue = "";
    this.isExponent = false;
    this.openParenthesesCount = 0;
    this.updateScreen();
  }

  backspace(): void {
    this.currentValue = this.currentValue.slice(0, -1) || "0";
    this.displayValue = this.displayValue.slice(0, -1);
    this.updateScreen();
  }

  operate(): void {
    if (!this.operation) return;
    const num1 = parseFloat(this.previousValue);
    const num2 = parseFloat(this.currentValue);
    let result: number | string;
    try {
      switch (this.operation) {
        case "+":
          result = this.add(num1, num2);
          break;
        case "-":
          result = this.subtract(num1, num2);
          break;
        case "*":
          result = this.multiply(num1, num2);
          break;
        case "/":
          result = this.divide(num1, num2);
          break;
        case "%":
          result = this.modulo(num1, num2);
          break;
        case "^":
          result = this.power(num1, num2);
          break;
        default:
          return;
      }
    } catch (err) {
      result = "Error";
    }
    const entry = `${this.previousValue} ${this.operation} ${this.currentValue} = ${result}`;
    this.currentValue = result.toString();
    this.displayValue = this.currentValue;
    this.previousValue = "";
    this.operation = "";
    this.isExponent = false;
    this.updateScreen();
    CalcHistory.save(entry);
  }

  saveHistory(entry: string): void {
    CalcHistory.save(entry);
  }

  setOperation(op: string): void {
    const operationsMap: { [key: string]: string } = {
      add: "+",
      minus: "-",
      multiply: "*",
      divide: "/",
      mod: "%",
    };
    if (this.previousValue !== "" && this.operation) {
      this.operation = operationsMap[op] || "";
      this.displayValue += ` ${this.operation} `;
    } else {
      if (this.displayValue.length > 0 && !this.displayValue.endsWith(" ")) {
        this.operation = operationsMap[op] || "";
        this.previousValue = this.currentValue;
        this.currentValue = "0";
        this.displayValue += ` ${this.operation} `;
      }
    }
    this.updateScreen();
  }

  decimal(): void {
    if (!this.currentValue.includes(".")) {
      this.currentValue += ".";
      this.displayValue += ".";
      this.updateScreen();
    }
  }

  plusMinus(): void {
    this.currentValue = (parseFloat(this.currentValue) * -1).toString();
    this.displayValue = this.displayValue.replace(
      /-?[\d.]+$/,
      this.currentValue
    );
    this.updateScreen();
  }

  // Advanced operations
  square(): void {
    const original = this.currentValue;
    const val = parseFloat(original);
    this.currentValue = (val * val).toString();
    this.displayValue = this.currentValue;
    this.updateScreen();
    this.saveHistory(`${original}² = ${this.currentValue}`);
  }

  squareRoot(): void {
    const original = this.currentValue;
    const val = parseFloat(original);
    this.currentValue = val < 0 ? "Error" : Math.sqrt(val).toString();
    this.displayValue = this.currentValue;
    this.updateScreen();
    if (this.currentValue !== "Error") {
      this.saveHistory(`√(${original}) = ${this.currentValue}`);
    }
  }

  inverse(): void {
    const original = this.currentValue;
    const val = parseFloat(original);
    this.currentValue = val === 0 ? "Error" : (1 / val).toString();
    this.displayValue = this.currentValue;
    this.updateScreen();
    if (this.currentValue !== "Error") {
      this.saveHistory(`1/(${original}) = ${this.currentValue}`);
    }
  }

  absolute(): void {
    const original = this.currentValue;
    const val = parseFloat(original);
    this.currentValue = Math.abs(val).toString();
    this.displayValue = this.currentValue;
    this.updateScreen();
    this.saveHistory(`|${original}| = ${this.currentValue}`);
  }

  // Memory functions
  memoryClear(): void {
    this.memoryValue = 0;
    this.displayValue = "0";
    this.updateScreen();
  }

  memoryRecall(): void {
    if (this.memoryValue !== 0) {
      this.currentValue = this.memoryValue.toString();
      this.displayValue = this.currentValue;
      this.updateScreen();
    } else {
      this.displayValue = "0";
      this.updateScreen();
    }
  }

  memoryAdd(): void {
    const val = parseFloat(this.currentValue) || 0;
    this.memoryValue += val;
    this.displayValue = `${this.memoryValue}`;
    this.updateScreen();
  }

  memorySubtract(): void {
    const val = parseFloat(this.currentValue) || 0;
    this.memoryValue -= val;
    this.displayValue = `${this.memoryValue}`;
    this.updateScreen();
  }

  memoryStore(): void {
    this.memoryValue = parseFloat(this.currentValue) || 0;
    this.displayValue = `${this.memoryValue}`;
    this.updateScreen();
  }

  // Constants
  pi(): void {
    this.currentValue = Math.PI.toString();
    this.displayValue += Math.PI;
    this.updateScreen();
  }

  e(): void {
    this.currentValue = Math.E.toString();
    this.displayValue += Math.E;
    this.updateScreen();
  }

  // Logs
  log(): void {
    const original = this.currentValue;
    const val = parseFloat(original);
    this.currentValue = val > 0 ? Math.log10(val).toString() : "Error";
    this.displayValue = this.currentValue;
    this.updateScreen();
    if (this.currentValue !== "Error") {
      this.saveHistory(`log(${original}) = ${this.currentValue}`);
    }
  }

  factorial(): void {
    const original = this.currentValue;
    const n = parseInt(original, 10);
    if (n < 0) {
      this.currentValue = "Error";
      this.displayValue = "Error";
      this.updateScreen();
      return;
    }
    this.currentValue = this._calcFactorial(n).toString();
    this.displayValue = this.currentValue;
    this.updateScreen();
    this.saveHistory(`${original}! = ${this.currentValue}`);
  }

  private _calcFactorial(n: number): number {
    return n <= 1 ? 1 : n * this._calcFactorial(n - 1);
  }

  ln(): void {
    const original = this.currentValue;
    const val = parseFloat(original);
    this.currentValue = val > 0 ? Math.log(val).toString() : "Error";
    this.displayValue = this.currentValue;
    this.updateScreen();
    if (this.currentValue !== "Error") {
      this.saveHistory(`ln(${original}) = ${this.currentValue}`);
    }
  }

  exp(): void {
    const original = this.currentValue;
    const val = parseFloat(original);
    this.currentValue = Math.exp(val).toString();
    this.displayValue = this.currentValue;
    this.updateScreen();
    this.saveHistory(`exp(${original}) = ${this.currentValue}`);
  }

  tenPowerX(): void {
    const original = this.currentValue;
    const val = parseFloat(original);
    this.currentValue = Math.pow(10, val).toString();
    this.displayValue = this.currentValue;
    this.updateScreen();
    this.saveHistory(`10^(${original}) = ${this.currentValue}`);
  }

  twoPowerX(): void {
    const original = this.currentValue;
    const val = parseFloat(original);
    this.currentValue = Math.pow(2, val).toString();
    this.displayValue = this.currentValue;
    this.updateScreen();
    this.saveHistory(`2^(${original}) = ${this.currentValue}`);
  }

  xPowerY(): void {
    if (this.currentValue === "") return;
    this.operation = "^";
    this.previousValue = this.currentValue;
    this.currentValue = "";
    this.displayValue += " ** ";
    this.updateScreen();
  }

  // Parentheses
  appendParenthesis(open: boolean = true): void {
    if (open) {
      if (/(sin|cos|tan|asin|acos|atan)\($/.test(this.displayValue)) {
        return;
      } else {
        this.displayValue += "(";
        this.openParenthesesCount++;
      }
    } else {
      if (this.openParenthesesCount > 0) {
        this.displayValue += ")";
        this.openParenthesesCount--;
      }
    }
    this.updateScreen();
  }

  evaluateExpression(): void {
    try {
      if (this.openParenthesesCount !== 0) {
        throw new Error("Unmatched Parentheses");
      }
      const original = this.displayValue;
      let expr = original
        .replace(/π/g, `(${Math.PI})`)
        .replace(/e/g, `(${Math.E})`);

      // Replace normal trig functions only if not preceded by "a"
      expr = expr.replace(
        /(^|[^a])sin\(([^)]+)\)/g,
        (match, p1, p2) =>
          p1 +
          (this.isDegreeMode
            ? `Math.sin(${this._degToRad(parseFloat(p2))})`
            : `Math.sin(${p2})`)
      );
      expr = expr.replace(
        /(^|[^a])cos\(([^)]+)\)/g,
        (match, p1, p2) =>
          p1 +
          (this.isDegreeMode
            ? `Math.cos(${this._degToRad(parseFloat(p2))})`
            : `Math.cos(${p2})`)
      );
      expr = expr.replace(
        /(^|[^a])tan\(([^)]+)\)/g,
        (match, p1, p2) =>
          p1 +
          (this.isDegreeMode
            ? `Math.tan(${this._degToRad(parseFloat(p2))})`
            : `Math.tan(${p2})`)
      );

      // Replace inverse trig functions
      expr = expr.replace(/asin\(([^)]+)\)/g, (_, p1) => {
        const res = `Math.asin(${p1})`;
        return this.isDegreeMode ? `(${res}*180/Math.PI)` : res;
      });
      expr = expr.replace(/acos\(([^)]+)\)/g, (_, p1) => {
        const res = `Math.acos(${p1})`;
        return this.isDegreeMode ? `(${res}*180/Math.PI)` : res;
      });
      expr = expr.replace(/atan\(([^)]+)\)/g, (_, p1) => {
        const res = `Math.atan(${p1})`;
        return this.isDegreeMode ? `(${res}*180/Math.PI)` : res;
      });

      console.log("Evaluating expression:", expr);
      const result = eval(expr);
      this.currentValue = result.toString();
      this.displayValue = this.currentValue;
      this.updateScreen();
      CalcHistory.save(`${original} = ${result}`);
    } catch (error) {
      console.error(error);
      this.displayValue = "Error";
      this.updateScreen();
    }
  }

  toggleDegreeMode(): void {
    this.isDegreeMode = !this.isDegreeMode;
    const degBtn = document.getElementById("degBtn");
    if (degBtn) {
      degBtn.textContent = this.isDegreeMode ? "RAD" : "DEG";
    }
  }

  private _degToRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  equals(): void {
    this.evaluateExpression();
  }

  mathFunction(fn: (x: number) => number): void {
    const val = parseFloat(this.currentValue);
    if (isNaN(val)) {
      this.currentValue = "Error";
    } else {
      this.currentValue = fn(val).toString();
    }
    this.displayValue = this.currentValue;
    this.updateScreen();
  }
}
