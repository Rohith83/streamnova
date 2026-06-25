import { createContext, useContext, useState, useCallback } from "react";
import { getItem, setItem, removeItem, STORAGE_KEYS } from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getItem(STORAGE_KEYS.USER, null));

  const signup = useCallback(({ name, email, password }) => {
    const users = getItem(STORAGE_KEYS.USERS, []);
    const exists = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      return { success: false, message: "An account with this email already exists." };
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      plan: "Standard",
      avatar: null,
      joined: new Date().toISOString(),
    };
    setItem(STORAGE_KEYS.USERS, [...users, newUser]);
    const { password: _pw, ...safeUser } = newUser;
    setItem(STORAGE_KEYS.USER, safeUser);
    setUser(safeUser);
    return { success: true };
  }, []);

  const login = useCallback(({ email, password }) => {
    const users = getItem(STORAGE_KEYS.USERS, []);
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, message: "Incorrect email or password." };
    }
    const { password: _pw, ...safeUser } = found;
    setItem(STORAGE_KEYS.USER, safeUser);
    setUser(safeUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    removeItem(STORAGE_KEYS.USER);
    setUser(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      setItem(STORAGE_KEYS.USER, updated);
      const users = getItem(STORAGE_KEYS.USERS, []);
      const updatedUsers = users.map((u) =>
        u.id === updated.id ? { ...u, ...updates } : u
      );
      setItem(STORAGE_KEYS.USERS, updatedUsers);
      return updated;
    });
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    signup,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
