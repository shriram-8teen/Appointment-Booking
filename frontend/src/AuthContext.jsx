import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("sb_user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    // keep user in sync
    if (user) localStorage.setItem("sb_user", JSON.stringify(user));
    else localStorage.removeItem("sb_user");
  }, [user]);

  const login = (token, userInfo) => {
    localStorage.setItem("sb_token", token);
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem("sb_token");
    localStorage.removeItem("sb_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
