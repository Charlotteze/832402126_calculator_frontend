/**
 * Calculator interaction logic.
 * Responsibilities: collect expression, send to back end, render result,
 * render history. It performs NO arithmetic itself.
 */
(function () {
    'use strict';

    const expressionEl = document.getElementById('expression');
    const resultEl = document.getElementById('result');
    const errorEl = document.getElementById('error');
    const historyListEl = document.getElementById('history-list');
    const clearAllBtn = document.getElementById('clear-all');

    let expression = '';

    function renderExpression() {
        expressionEl.textContent = expression;
    }

    function showResult(text) {
        resultEl.textContent = text;
        resultEl.classList.remove('error-text');
    }

    function showError(message) {
        resultEl.textContent = message;
        resultEl.classList.add('error-text');
    }

    function hideError() {
        errorEl.classList.add('hidden');
    }

    function appendChar(ch) {
        expression += ch;
        renderExpression();
        hideError();
    }

    function clearAll() {
        expression = '';
        renderExpression();
        showResult('\u00A0');
        hideError();
    }

    function backspace() {
        expression = expression.slice(0, -1);
        renderExpression();
    }

    async function evaluate() {
        if (!expression) {
            showError('Enter an expression');
            return;
        }
        hideError();
        try {
            // Convert display symbols (x, /) to API symbols (*, /) before sending
            const normalized = expression.replace(/\u00D7/g, '*').replace(/\u00F7/g, '/');
            const data = await calculate(normalized);
            if (data.success) {
                showResult(data.result);
                await loadHistory();
            } else {
                showError(data.message || 'Invalid expression');
            }
        } catch (err) {
            showError('Cannot reach back end. Is it running?');
            errorEl.textContent = 'Cannot reach back end. Is it running?';
            errorEl.classList.remove('hidden');
        }
    }

    function renderHistory(records) {
        historyListEl.innerHTML = '';
        if (!records || records.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'history-empty';
            empty.textContent = 'No history yet';
            historyListEl.appendChild(empty);
            return;
        }
        records.forEach(function (record) {
            const item = document.createElement('li');
            item.className = 'history-item';

            const calcText = document.createElement('span');
            calcText.className = 'calc-text';
            calcText.textContent = record.expression + ' = ' + record.result;

            const meta = document.createElement('span');
            meta.className = 'meta';

            const time = document.createElement('span');
            time.className = 'time';
            time.textContent = formatTime(record.createdAt);

            const delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.className = 'delete-one';
            delBtn.textContent = 'Delete';
            delBtn.addEventListener('click', function () {
                deleteHistory(record.id).then(function () {
                    return loadHistory();
                }).catch(function () {
                    alert('Failed to delete record');
                });
            });

            meta.appendChild(time);
            meta.appendChild(document.createElement('br'));
            meta.appendChild(delBtn);

            item.appendChild(calcText);
            item.appendChild(meta);
            historyListEl.appendChild(item);
        });
    }

    function formatTime(raw) {
        if (!raw) {
            return '';
        }
        return String(raw).replace('T', ' ').substring(0, 19);
    }

    async function loadHistory() {
        try {
            const records = await getHistory();
            renderHistory(records);
        } catch (err) {
            historyListEl.innerHTML = '';
            const item = document.createElement('li');
            item.className = 'history-empty';
            item.textContent = 'Cannot load history (back end offline?)';
            historyListEl.appendChild(item);
        }
    }

    function handleKey(key) {
        switch (key) {
            case 'C':
                clearAll();
                break;
            case 'BACK':
                backspace();
                break;
            case '=':
                evaluate();
                break;
            default:
                appendChar(key);
                break;
        }
    }

    function init() {
        document.querySelectorAll('.key').forEach(function (btn) {
            btn.addEventListener('click', function () {
                handleKey(btn.getAttribute('data-key'));
            });
        });

        clearAllBtn.addEventListener('click', function () {
            if (window.confirm('Clear all calculation history?')) {
                clearHistory().then(function () {
                    return loadHistory();
                }).catch(function () {
                    alert('Failed to clear history');
                });
            }
        });

        // Keyboard support (extended feature)
        document.addEventListener('keydown', function (e) {
            if (e.key >= '0' && e.key <= '9') {
                handleKey(e.key);
            } else if (e.key === '+' || e.key === '-' || e.key === '.' || e.key === '(' || e.key === ')') {
                handleKey(e.key);
            } else if (e.key === '*' || e.key === '/') {
                handleKey(e.key === '*' ? '\u00D7' : '\u00F7');
            } else if (e.key === 'Enter' || e.key === '=') {
                evaluate();
            } else if (e.key === 'Backspace') {
                backspace();
            } else if (e.key === 'Escape') {
                clearAll();
            }
        });

        loadHistory();
    }

    init();
})();
