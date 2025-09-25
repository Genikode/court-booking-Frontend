// lib/auth.ts
import { api } from "./api";

export type StandardResponse<T = any> = {
  status?: number;
  success?: boolean;
  message?: string;
  data?: T;
  // Some backends return tokens at top-level too:
  token?: string;
  accessToken?: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type LoginUser = {
  id?: string;
  name?: string;
  email?: string;
  [k: string]: any;
};

export type LoginData = {
  token?: string;
  accessToken?: string;
  user?: LoginUser;
  [k: string]: any;
};

const TOKEN_KEY = "court_token";
const USER_KEY = "court_user";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

export function getUser<T = LoginUser>(): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function setUser(user: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user ?? {}));
}

export function clearUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * Login via POST /users/login-user
 * Saves token + user to localStorage
 */
export async function login(body: LoginBody) {
  const res = await api.post<StandardResponse<LoginData>>(
    "/users/login-user",
    body
  );

  // Flexible token extraction (covers multiple backend shapes)
  const token =
    res.data?.token ||
    res.data?.accessToken ||
    res.token ||
    res.accessToken;

  if (!token) throw new Error("Token missing in login response.");
  if (!res.data?.userData) throw new Error("User data missing in login response.");

  setToken(token);
  if (res.data?.userData) setUser(res.data.userData);

  return { token, user: res.data?.userData, raw: res };
}

export function logout() {
  clearToken();
  clearUser();
}
