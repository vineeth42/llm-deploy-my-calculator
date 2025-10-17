# Black & White Calculator

A minimal, accessible calculator built with vanilla HTML, CSS, and JavaScript. The interface uses a pure black and white color scheme and supports both mouse/touch and keyboard input.

## Summary
- Color scheme: black and white only
- Features: add, subtract, multiply, divide, percent, sign toggle, decimal, clear, delete (via Backspace), repeated equals
- Keyboard support: 0–9, ., +, -, *, /, Enter (=), Backspace (⌫), Esc (AC), %
- Self-contained: no external dependencies or frameworks

## Setup
1. Download or clone the repository.
2. No build steps are required.
3. Open `index.html` in any modern web browser.

Optional: Serve the folder with a simple static server for best results.
- Python 3: `python -m http.server`
- Node (npx): `npx serve` (if you have serve installed)

## Usage
- Click or tap the on-screen buttons to enter numbers and operations.
- Use your keyboard for faster input:
  - Digits: `0–9`
  - Decimal: `.`
  - Operators: `+`, `-`, `*`, `/`
  - Equals: `Enter` or `=`
  - Clear all: `Esc` or `Delete`
  - Delete one digit: `Backspace`
  - Percent: `%` (divides current entry by 100)
  - Toggle sign: click the `±` button

Notes:
- Division by zero is prevented and will momentarily show "Error".
- Repeated equals is supported (press `=` multiple times to repeat the last operation).

## Project Structure
- `index.html` – Markup for the calculator UI
- `style.css` – Pure black & white styling, responsive layout
- `script.js` – Calculator logic, state handling, and keyboard support

## License
This project is licensed under the MIT License.

Copyright (c) 2025 Calculator App Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
