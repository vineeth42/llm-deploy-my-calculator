'use strict';

/*
  Black & White Calculator Logic
  - Safe image loader from ?url= query parameter (http/https or data:image)
  - Simple 2-operand calculator (no eval)
  - Keyboard support for common keys
*/

// ============= Image loader from ?url= parameter =============
(function setupImageFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const url = params.get('url');
  if (!url) return;

  const isAllowedUrl = (raw) => {
    try {
      const parsed = new URL(raw, window.location.href);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return true;
      if (parsed.protocol === 'data:' && raw.startsWith('data:image/')) return true;
      return false;
    } catch (_) {
      return false;
    }
  };

  const panel = document.getElementById('image-panel');
  const img = document.getElementById('external-image');
  const urlLabel = document.getElementById('image-url');

  panel.hidden = false;

  if (!isAllowedUrl(url)) {
    urlLabel.textContent = '[blocked: invalid or unsafe URL]';
    img.alt = 'Blocked image URL';
    img.style.display = 'none';
    return;
  }

  img.style.display = 'block';
  img.src = url;
  urlLabel.textContent = url;
})();

// ==================== Calculator ====================
(function calculator() {
  const display = document.getElementById('display');
  const history = document.getElementById('history');
  const keys = document.getElementById('keys');

  let current = '0';
  let previous = null; // number
  let operator = null; // '+', '-', '*', '/'
  let justEvaluated = false;

  const MAX_LEN = 16;

  function updateDisplay() {
    display.value = current;
    const hist = (previous !== null && operator) ? `${trimNum(previous)} ${symbol(operator)}` : '';
    history.textContent = hist;
  }

  function symbol(op) {
    switch (op) {
      case '+': return '+';
      case '-': return '−';
      case '*': return '×';
      case '/': return '÷';
      default: return op || '';
    }
  }

  function trimNum(n) {
    // Format number to avoid long floating point tails
    const asNum = typeof n === 'number' ? n : parseFloat(n);
    if (!isFinite(asNum)) return 'Error';

    // Use up to 12 significant digits, then remove trailing zeros
    let s = asNum.toPrecision(12);
    // Convert to normal notation if exponential with small exponent
    if (s.includes('e')) {
      const maybe = Number(asNum.toFixed(12));
      if (Number.isFinite(maybe) && String(maybe).length <= 16) s = String(maybe);
    }
    // Strip trailing zeros and optional dot
    if (s.includes('.')) s = s.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
    return s;
  }

  function setCurrentFromNumber(n) {
    current = trimNum(n);
  }

  function inputDigit(d) {
    if (justEvaluated && !operator) {
      // start fresh after equals
      current = '0';
      justEvaluated = false;
    }
    if (current === '0') current = d; else current += d;
    if (current.length > MAX_LEN) current = current.slice(0, MAX_LEN);
  }

  function inputDecimal() {
    if (justEvaluated && !operator) {
      current = '0';
      justEvaluated = false;
    }
    if (!current.includes('.')) current += '.';
  }

  function clearAll() {
    current = '0';
    previous = null;
    operator = null;
    justEvaluated = false;
  }

  function backspace() {
    if (justEvaluated && !operator) return; // ignore after equals
    if (current.length <= 1 || (current.length === 2 && current.startsWith('-'))) current = '0';
    else current = current.slice(0, -1);
  }

  function negate() {
    if (current === '0') return;
    current = current.startsWith('-') ? current.slice(1) : '-' + current;
  }

  function percent() {
    const num = parseFloat(current);
    if (!isFinite(num)) return;
    // Classic simple percent: divide by 100
    setCurrentFromNumber(num / 100);
  }

  function setOperator(op) {
    if (operator && !justEvaluated) {
      // Chain operations
      evaluate();
    }
    previous = parseFloat(current);
    operator = op;
    justEvaluated = false;
    current = '0';
  }

  function evaluate() {
    if (operator === null || previous === null) return;
    const a = previous;
    const b = parseFloat(current);

    let result;
    switch (operator) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = (b === 0) ? Infinity : a / b; break;
      default: return;
    }

    if (!isFinite(result)) {
      current = 'Error';
      previous = null;
      operator = null;
      justEvaluated = false;
      updateDisplay();
      return;
    }

    setCurrentFromNumber(result);
    previous = null;
    operator = null;
    justEvaluated = true;
  }

  // Click handling via event delegation
  keys.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const action = btn.dataset.action;
    switch (action) {
      case 'digit':
        inputDigit(btn.dataset.digit);
        break;
      case 'decimal':
        inputDecimal();
        break;
      case 'operator':
        setOperator(btn.dataset.op);
        break;
      case 'equals':
        evaluate();
        break;
      case 'clear':
        clearAll();
        break;
      case 'backspace':
        backspace();
        break;
      case 'negate':
        negate();
        break;
      case 'percent':
        percent();
        break;
      default:
        return;
    }
    updateDisplay();
  });

  // Keyboard support
  window.addEventListener('keydown', (e) => {
    const k = e.key;

    if (/^\d$/.test(k)) { inputDigit(k); e.preventDefault(); }
    else if (k === '.') { inputDecimal(); e.preventDefault(); }
    else if (k === '+' || k === '-' || k === '*' || k === '/') { setOperator(k); e.preventDefault(); }
    else if (k === 'Enter' || k === '=') { evaluate(); e.preventDefault(); }
    else if (k === 'Backspace') { backspace(); e.preventDefault(); }
    else if (k === 'Escape' || k.toLowerCase() === 'c') { clearAll(); e.preventDefault(); }
    else if (k === '%') { percent(); e.preventDefault(); }

    updateDisplay();
  });

  // Initialize display
  updateDisplay();
})();
