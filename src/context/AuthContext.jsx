import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "auth-user";

const AuthContext = createContext(null);

function getStoredUser() {
  try {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to read auth data:", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Failed to save auth data:", error);
    }
  }, [user]);

  const login = (userData) => {
    setUser({
      ...userData,
      role: userData.role || "customer",
    });
  };

  const register = (userData) => {
    setUser({
      ...userData,
      role: userData.role || "customer",
    });
  };

  const logout = () => {
    setUser(null);
  };

  const setRole = (role) => {
    setUser((prev) =>
      prev
        ? {
            ...prev,
            role,
          }
        : null
    );
  };

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    setRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export default AuthContext;