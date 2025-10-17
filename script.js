'use strict';

/*
  Black & White Calculator Logic
  - Vanilla JS, no dependencies
  - Keyboard and click/tap support
  - Clean state machine: current, previous, operator
*/

(function () {
  const display = document.getElementById('display');
  const keys = document.querySelector('.keys');

  const state = {
    current: '0',     // current entry as string
    prev: null,       // previous operand as string
    operator: null,   // '+', '-', '*', '/'
    overwrite: true,  // whether next digit should overwrite
    lastOp: null,     // for repeated equals
    lastNum: null,
  };

  function updateDisplay(valueStr = state.current) {
    display.textContent = valueStr;
  }

  function clearAll() {
    state.current = '0';
    state.prev = null;
    state.operator = null;
    state.overwrite = true;
    state.lastOp = null;
    state.lastNum = null;
    updateDisplay();
  }

  function inputDigit(d) {
    if (!/^[0-9]$/.test(d)) return;
    if (state.overwrite || state.current === '0') {
      state.current = d;
      state.overwrite = false;
    } else {
      if (state.current.replace('-', '').length >= 16) return; // prevent overflow
      state.current += d;
    }
    updateDisplay();
  }

  function inputDot() {
    if (state.overwrite) {
      state.current = '0.';
      state.overwrite = false;
    } else if (!state.current.includes('.')) {
      state.current += '.';
    }
    updateDisplay();
  }

  function toggleSign() {
    if (state.current === '0') return; // -0 not needed visually
    state.current = state.current.startsWith('-')
      ? state.current.slice(1)
      : '-' + state.current;
    updateDisplay();
  }

  function percent() {
    // Simple percent: divide current entry by 100
    const n = parseFloat(state.current);
    if (Number.isNaN(n)) return;
    state.current = trimNumber(n / 100);
    updateDisplay();
  }

  function deleteDigit() {
    if (state.overwrite) {
      state.current = '0';
      updateDisplay();
      return;
    }
    const s = state.current;
    if (s.length <= 1 || (s.length === 2 && s.startsWith('-'))) {
      state.current = '0';
      state.overwrite = true;
    } else {
      state.current = s.slice(0, -1);
    }
    updateDisplay();
  }

  function setOperator(op) {
    if (!['+', '-', '*', '/'].includes(op)) return;

    if (state.operator && !state.overwrite) {
      // If chaining operations, compute existing first
      compute();
    }

    state.prev = state.current;
    state.operator = op;
    state.overwrite = true;
  }

  function compute(repeat = false) {
    let a, b, op;

    if (!repeat) {
      if (state.operator == null || state.prev == null) return;
      a = parseFloat(state.prev);
      b = parseFloat(state.current);
      op = state.operator;
      state.lastOp = op;
      state.lastNum = b;
    } else {
      if (state.lastOp == null || state.lastNum == null) return;
      a = parseFloat(state.current);
      b = parseFloat(state.lastNum);
      op = state.lastOp;
    }

    if ([a, b].some(Number.isNaN)) return;

    let result;
    switch (op) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/':
        if (b === 0) {
          // Division by zero -> error state, clear
          flashError('Error');
          clearAll();
          return;
        }
        result = a / b; break;
      default: return;
    }

    const out = trimNumber(result);
    state.current = out;
    state.prev = null;
    state.operator = null;
    state.overwrite = true;
    updateDisplay();
  }

  function equals() {
    if (state.operator != null) {
      compute(false);
    } else {
      compute(true); // repeated equals behavior
    }
  }

  function trimNumber(n) {
    // Keep precision reasonable and strip trailing zeros
    const str = Number(n).toFixed(12); // 12 dp rounding
    // Remove trailing zeros and dot
    return str.replace(/\.0+$/, '').replace(/(\.\d*?)0+$/, '$1');
  }

  function flashError(msg) {
    updateDisplay(msg);
    // brief visual cue without leaving error on display
    setTimeout(() => updateDisplay(), 600);
  }

  // Click handling
  keys.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const action = btn.dataset.action;

    switch (action) {
      case 'digit':
        inputDigit(btn.dataset.digit);
        break;
      case 'dot':
        inputDot();
        break;
      case 'operator':
        setOperator(btn.dataset.operator);
        break;
      case 'equals':
        equals();
        break;
      case 'clear':
        clearAll();
        break;
      case 'sign':
        toggleSign();
        break;
      case 'percent':
        percent();
        break;
    }
  });

  // Keyboard support
  window.addEventListener('keydown', (e) => {
    const { key } = e;

    if (/[0-9]/.test(key)) {
      e.preventDefault();
      inputDigit(key);
      return;
    }

    switch (key) {
      case '.':
        e.preventDefault();
        inputDot();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        e.preventDefault();
        setOperator(key);
        break;
      case 'Enter':
      case '=':
        e.preventDefault();
        equals();
        break;
      case 'Backspace':
        e.preventDefault();
        deleteDigit();
        break;
      case 'Escape':
      case 'Delete':
        e.preventDefault();
        clearAll();
        break;
      case '%':
        e.preventDefault();
        percent();
        break;
      default:
        // ignore other keys
        break;
    }
  });

  // Initialize
  updateDisplay();
})();
