# Scientific Calculator Web Application

This is a **scientific calculator web application** built using **HTML, CSS, and Typescript**. The calculator provides a range of mathematical functions, including basic arithmetic, advanced operations, trigonometric functions (and their inverses), logarithms, exponentiation, and memory features. It also supports keyboard input and includes a dark theme toggle.

## Features

### **Basic Arithmetic:**

- Addition (+)
- Subtraction (-)
- Multiplication (\*)
- Division (/)
- Modulo (%)
- Exponentiation (x^y)

### **Advanced Functions:**

- Square (x²)
- Square root (√x)
- Inverse (1/x)
- Absolute value (|x|)
- Logarithm (log(x))
- Natural Logarithm (ln(x))
- Exponential functions (e^x)
- Factorial (x!)
- Power functions (x^y)

### **Trigonometry:**

- Sine (sin(x)), Cosine (cos(x)), Tangent (tan(x))
- Inverse Trigonometric Functions (sin⁻¹(x), cos⁻¹(x), tan⁻¹(x))
- **DEG/RAD Toggle** for switching between degrees and radians

### **Memory Functions:**

- Memory Clear (MC)
- Memory Recall (MR)
- Memory Add (M+)
- Memory Subtract (M-)
- Memory Store (MS)

### **Additional Features:**

- **Scientific Notation:** Toggle (F-E) mode for displaying numbers in scientific notation.
- **Calculation History:** Stores history using `localStorage` (accessible via a history page if implemented).
- **Theme Toggle:** Switch between **light and dark modes**.
- **Keyboard Support:** Allows input via keyboard for faster calculations.
- **Responsive UI:** Built using **Bootstrap** and custom CSS for a sleek and modern design.

## Unicode Usage:

This calculator makes use of **Unicode characters** for certain operations to enhance the user interface and provide a modern look. For example:

- `×` (multiplication) for `×` (Unicode U+00D7)
- `÷` (division) for `÷` (Unicode U+00F7)
- `−` (minus) for `−` (Unicode U+2212)
- `π` (pi) for `π` (Unicode U+03C0)
- `e` for the mathematical constant _e_ (Unicode U+0065)
- `⌫` for the backspace (Unicode U+232B)

By using these Unicode characters, the calculator provides a more visually appealing and intuitive experience for users.

Link : "https://symbl.cc/en/unicode-table/"

## Usage Instructions

- Click the buttons on the UI or use the keyboard for input.
- Toggle **DEG/RAD** mode for trigonometric calculations.
- Use **Memory Functions** to store and retrieve values.
- View **Calculation History** if enabled.
- Toggle **Light/Dark Mode** for better visibility.

## Installation and Running the Project

1. Clone the Repository:
   Open your terminal and run:
   git clone https://github.com/Hetal9Desai/scientific-calculator-ts

2. Navigate into the Project Directory:
   cd scientific-calculator-ts

3. Install Dependencies:
   If your project uses npm for package management, install the dependencies by running:
   npm install

4. Compile the TypeScript Files:
   Your package.json includes the following scripts:
   npm run build
   This runs the TypeScript compiler (tsc) and outputs the compiled JavaScript files (usually into a dist folder as specified in your tsconfig.json).

5. Watch Mode:
   npm run watch This command starts the TypeScript compiler in watch mode, so it automatically recompiles your TypeScript files whenever changes are made.

6. Serve the Project: You have two options to view the project in your browser:
   a. Open Directly: Open the index.html file directly in your browser.

   b. Using a Local Server: It’s recommended to run the project on a local server to avoid potential issues with modules and CORS. For example, you can use VSCode’s Live Server extension:

   Right-click on index.html and choose "Open with Live Server".

Link:https://aquamarine-marigold-43e1e3.netlify.app/index.html
