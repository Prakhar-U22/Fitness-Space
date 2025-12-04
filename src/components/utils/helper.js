// src/utils/api.js

// If your backend is on another URL, set VITE_API_BASE in .env
const BASE = import.meta.env.VITE_API_BASE || '';

async function request(path, opts = {}) {
  const res = await fetch(BASE + path, opts);
  let json = null;
  try {
    json = await res.json();
  } catch (e) {
    // ignore
  }
  if (!res.ok) {
    return { error: json?.message || 'Request failed', status: res.status };
  }
  return json;
}

// For endpoints that need JWT
async function authRequest(path, opts = {}) {
  const token = localStorage.getItem('token');
  if (!token) return { error: 'Not logged in' };

  const headers = {
    ...(opts.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  return request(path, { ...opts, headers });
}

// ---------- AUTH ----------
export async function login(email, password) {
  return request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

export async function registerPatient({ name, email, password, age, gender }) {
  return request('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, age, gender, role: 'patient' }),
  });
}

export async function getMe(token) {
  // used on first load in App.jsx
  return request('/api/users/me', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

// ---------- PATIENT DASHBOARD ----------

// GET all dashboard data for logged-in patient
export async function getPatientDashboard() {
  return authRequest('/api/patients/me/dashboard');
}

// Update wellness metrics (sleep, walk, active)
export async function updateWellness({ steps, activeMinutes, sleepHours }) {
  return authRequest('/api/patients/me/wellness', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ steps, activeMinutes, sleepHours }),
  });
}

// Update allergies + medications arrays
export async function updateHealthInfo({ allergies, medications }) {
  return authRequest('/api/patients/me/health-info', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ allergies, medications }),
  });
}
