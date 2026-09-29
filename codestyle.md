# Code Style Standard — Frontend (JavaScript)

## Source

This code standard is derived from the **Airbnb JavaScript Style Guide**.

- Official document: https://github.com/airbnb/javascript
- This project follows the core rules below; any deviation is intentional and explained in code comments.

## 1. Naming

| Type | Rule | Example |
|---|---|---|
| Variables / functions | lowerCamelCase | `renderHistory`, `expression` |
| Constants | UPPER_SNAKE_CASE | `API_BASE` |
| File names | kebab-case | `api.js`, `calculator.js` |

## 2. Formatting

- Indent: 2 spaces (no tabs)
- Strings: single quotes
- Semicolons: required at the end of each statement
- Space before function parameter parentheses (`function render (x)` style function names are avoided; use `function render(x)` per Airbnb for named functions)
- No trailing whitespace

## 3. Variables

- `const` preferred; `let` only when the value is reassigned; `var` is never used
- Declare variables at the top of the scope where they are used

## 4. Functions

- Prefer named functions over anonymous callbacks for readability
- Module scope is isolated with an IIFE (`(function () { ... })();`)
- `'use strict';` at the top of each script

## 5. DOM and events

- Use `addEventListener`, never inline `onclick` attributes
- Cache frequently accessed DOM nodes in variables
- Use `textContent` for plain text to avoid XSS via innerHTML

## 6. Asynchronous code

- Use `async/await` with `fetch`
- Errors are handled with `try/catch`
- Network errors show a friendly message instead of failing silently

## 7. Security

- Never insert user input into the DOM via `innerHTML`; use `textContent` (this project does)
- No `eval` anywhere in the front end

## Verification

- Code is verified by loading the page in a real browser and exercising: calculation, error cases, history load/delete, and keyboard input
