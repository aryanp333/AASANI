import { apiRequest, setToken, getToken, clearSession, ORG_KEY, USER_KEY } from "./apiClient";

/**
 * @param {string} email
 * @param {string} password
 */
export async function login(email, password) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: { email, password },
    auth: false,
  });
  persistSession(data);
  return data;
}

/**
 * @param {{ email: string, password: string, orgName: string, orgType?: string, bedCount?: number }} form
 */
export async function signup({ email, password, orgName, orgType, bedCount }) {
  const data = await apiRequest("/auth/signup", {
    method: "POST",
    body: { email, password, orgName, orgType, bedCount },
    auth: false,
  });
  // /auth/signup only echoes back { id, name } for the org — keep the type/bed
  // count the user just entered so the workspace header can still show them.
  persistSession(data, { type: orgType, bedCount });
  return data;
}

function persistSession(data, orgExtras = {}) {
  setToken(data.token);
  if (data.org) {
    localStorage.setItem(ORG_KEY, JSON.stringify({ ...data.org, ...orgExtras }));
  }
  if (data.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  }
}

export function logout() {
  clearSession();
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function getStoredOrg() {
  try {
    const raw = localStorage.getItem(ORG_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
