export class Operations {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  }

  modulo(a: number, b: number): number {
    return a % b;
  }

  power(a: number, b: number): number {
    return Math.pow(a, b);
  }
}
