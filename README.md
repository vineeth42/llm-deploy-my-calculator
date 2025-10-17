# Black & White Calculator

A minimal, framework-free calculator web app with a crisp black and white theme. It also supports displaying an external image provided via the `?url=` query parameter.

## Summary
- Clean monochrome UI (black background, white text; white buttons with black text).
- Basic operations: add, subtract, multiply, divide, percent, sign toggle, decimal, backspace, clear, equals.
- Keyboard support for digits, decimal, operators (+ − × ÷ as + - * /), Enter/Equals, Backspace, Escape, and %.
- Displays an image from the `?url=` parameter (http/https or data:image) with simple safety checks.
- Self-contained: vanilla HTML, CSS, and JavaScript. No external dependencies.

## Setup
1. Clone or download this repository.
2. Open `index.html` in any modern web browser.

No build steps or package installations are necessary.

## Usage
- Click buttons or use your keyboard:
  - Digits: 0–9
  - Decimal: `.`
  - Operators: `+`, `-`, `*`, `/`
  - Equals: `Enter` or `=`
  - Backspace: `Backspace`
  - Clear: `Escape` (or click `C`)
  - Percent: `%`
  - Toggle Sign: click `+∕−`

- Display an external image by appending `?url=...` to the page URL. Examples:
  - Local file with remote image: `index.html?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1503023345310-bd7c1de61c7d`
  - Data URI (must start with `data:image/`): `index.html?url=data:image%2Fpng;base64,iVBORw0KGgo...`

Note: For safety, only `http:`, `https:`, and `data:image/...` URLs are allowed. Other schemes are blocked.

## Project Structure
- `index.html` – Markup for the calculator and image panel.
- `style.css` – Monochrome, responsive styles.
- `script.js` – Calculator logic, keyboard support, and image loader.

## License
MIT License. See below for full text.

MIT License

Copyright (c) 2025 Your Name

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
