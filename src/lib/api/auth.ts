// src/lib/api/auth.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface TokenVerifyResponse {
  valid: boolean;
  user: User | null;
}

// Store token in localStorage
export const setAuthToken = (token: string) => {
  localStorage.setItem("auth_token", token);
};

// Get token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem("auth_token");
};

// Remove token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem("auth_token");
};

// Store user info in sessionStorage (for backward compatibility with existing code)
export const setUserSession = (user: User) => {
  sessionStorage.setItem(
    "user",
    JSON.stringify({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
    })
  );
};

// Get user from sessionStorage
export const getUserSession = (): User | null => {
  const userStr = sessionStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

// Remove user session
export const removeUserSession = () => {
  sessionStorage.removeItem("user");
};

// Register new user
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Registration failed" }));
    throw new Error(error.detail || "Registration failed");
  }

  const result: AuthResponse = await response.json();
  
  // Store token and user
  setAuthToken(result.access_token);
  setUserSession(result.user);
  
  return result;
}

// Login user
export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Login failed" }));
    throw new Error(error.detail || "Invalid username or password");
  }

  const result: AuthResponse = await response.json();
  
  // Store token and user
  setAuthToken(result.access_token);
  setUserSession(result.user);
  
  return result;
}

// Logout user
export async function logout(): Promise<void> {
  const token = getAuthToken();
  
  if (token) {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
  
  // Remove token and user session
  removeAuthToken();
  removeUserSession();
}

// Verify token and get current user
export async function verifyToken(): Promise<TokenVerifyResponse> {
  const token = getAuthToken();
  
  if (!token) {
    return { valid: false, user: null };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      removeAuthToken();
      removeUserSession();
      return { valid: false, user: null };
    }

    const result: TokenVerifyResponse = await response.json();
    
    if (result.valid && result.user) {
      setUserSession(result.user);
    } else {
      removeAuthToken();
      removeUserSession();
    }
    
    return result;
  } catch (error) {
    console.error("Token verification error:", error);
    removeAuthToken();
    removeUserSession();
    return { valid: false, user: null };
  }
}

// Get current user info
export async function getCurrentUser(): Promise<User | null> {
  const token = getAuthToken();
  
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      removeAuthToken();
      removeUserSession();
      return null;
    }

    const user: User = await response.json();
    setUserSession(user);
    return user;
  } catch (error) {
    console.error("Get current user error:", error);
    removeAuthToken();
    removeUserSession();
    return null;
  }
}

// Helper to add auth token to fetch requests
export const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = getAuthToken();
  
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  return fetch(url, {
    ...options,
    headers,
  });
};

