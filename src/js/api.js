/**
 * API wrapper.
 * The front end NEVER calculates; every calculation request is sent
 * to the back end, and the returned result is displayed as-is.
 */
// Deployed backend (cpolar public tunnel).
// For local development, change back to: http://localhost:8080/api
const API_BASE = 'https://619839ed.r32.cpolar.top/api';

async function calculate(expression) {
    const res = await fetch(`${API_BASE}/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: expression })
    });
    return res.json();
}

async function getHistory() {
    const res = await fetch(`${API_BASE}/history`);
    if (!res.ok) {
        throw new Error('Failed to load history');
    }
    return res.json();
}

async function deleteHistory(id) {
    await fetch(`${API_BASE}/history/${id}`, { method: 'DELETE' });
}

async function clearHistory() {
    await fetch(`${API_BASE}/history`, { method: 'DELETE' });
}
