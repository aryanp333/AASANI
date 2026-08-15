/**
 * Shared HTTP client for the AASANI backend (Node/Express, real auth + API).
 * dataService.js and authService.js both build on this.
 */

export const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const TOKEN_KEY = "aasani_token";
const ORG_KEY = "aasani_org";
const USER_KEY = "aasani_user";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ORG_KEY);
  localStorage.removeItem(USER_KEY);
}

export { ORG_KEY, USER_KEY };

/**
 * @param {string} path - e.g. "/api/kpis?period=30D"
 * @param {{ method?: string, body?: unknown, auth?: boolean }} [options]
 */
export async function apiRequest(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error("Couldn't reach the AASANI backend. Check your connection and try again.");
  }

  if (res.status === 401 && auth) {
    // Token missing/expired — clear it and bounce back to login.
    clearSession();
    const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
    window.location.href = `${base}/login`;
    throw new Error("Session expired. Redirecting to login…");
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // no/invalid JSON body — leave data as null
  }

  if (!res.ok) {
    throw new Error(data?.error || `Request failed with status ${res.status}`);
  }

  return data;
}
