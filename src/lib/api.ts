// lib/api.ts
const NEXT_PUBLIC_COURT_URL = "https://creek-sport.ddns.net";
const NEXT_PUBLIC_COURT_XAPI = "court_secret";
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class ApiError extends Error {
  status: number;
  body?: unknown;
  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

const BASE_URL = NEXT_PUBLIC_COURT_URL;
const XAPI = NEXT_PUBLIC_COURT_XAPI;

// Lazy import to avoid circular init issues.
function getTokenSafe(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("court_token");
  } catch {
    return null;
  }
}

async function request<T>(
  path: string,
  opts: {
    method?: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
    isFormData?: boolean; // ✅ NEW
  } = {}
): Promise<T> {
  const token = getTokenSafe();

  const headers: Record<string, string> = {
    "x-api-key": XAPI,
    ...(opts.headers || {}),
  };

  if (!opts.isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.accessToken = `Bearer ${token}`;
  }

  console.log("➡️ API Request", {
    url: `${BASE_URL}${path}`,
    headers,
    body: opts.isFormData ? "[FormData]" : opts.body,
  });

  const res = await fetch(`${BASE_URL}${path}`, {
    method: opts.method || "GET",
    headers,
    body: opts.body
      ? opts.isFormData
        ? opts.body // send raw FormData
        : JSON.stringify(opts.body)
      : undefined,
  });

  const text = await res.text();
  const data = text ? safeJsonParse(text) : null;

  if (!res.ok) {
    const message =
      (data && (data as any).message) ||
      `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status, data ?? text);
  }

  return (data as T) ?? ({} as T);
}

function safeJsonParse(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return s;
  }
}

export const api = {
  get: <T>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: "GET", headers }),
  post: <T>(
    path: string,
    body?: any,
    headers?: Record<string, string>,
    isFormData?: boolean
  ) => request<T>(path, { method: "POST", body, headers, isFormData }),
  put: <T>(
    path: string,
    body?: any,
    headers?: Record<string, string>,
    isFormData?: boolean
  ) => request<T>(path, { method: "PUT", body, headers, isFormData }),
  patch: <T>(
    path: string,
    body?: any,
    headers?: Record<string, string>,
    isFormData?: boolean
  ) => request<T>(path, { method: "PATCH", body, headers, isFormData }),
  delete: <T>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: "DELETE", headers }),
};
