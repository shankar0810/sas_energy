import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");

    if (token && role && email) {
      setUser({ email, role, token });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3333/api/v1/login", {
        email,
        password
      });

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userRole", response.data.role);
      localStorage.setItem("userEmail", email);
      
      setUser({
        email,
        role: response.data.role,
        token: response.data.token
      });

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);