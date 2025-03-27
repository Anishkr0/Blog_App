import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

axios.defaults.baseURL = "http://localhost:8000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        if (localStorage.getItem("token")) {
          const token = localStorage.getItem("token");

          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            localStorage.removeItem("token");
            setUser(null);
            setIsAuthenticated(false);
          } else {
            setAuthToken(token);

            const res = await axios.get("/api/auth/profile");
            setUser(res.data.user);
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Set auth token in headers
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      setError(null);
      const res = await axios.post("/api/auth/register", userData);

      // Save token to local storage
      localStorage.setItem("token", res.data.token);

      // Set token to auth header
      setAuthToken(res.data.token);

      // Set user data
      setUser(res.data.user);
      setIsAuthenticated(true);

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      setError(null);
      const res = await axios.post("/api/auth/login", userData);

      // Save token to local storage
      localStorage.setItem("token", res.data.token);

      // Set token to auth header
      setAuthToken(res.data.token);

      // Set user data
      setUser(res.data.user);
      setIsAuthenticated(true);

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");

    // Remove auth header
    setAuthToken(null);

    // Clear user state
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
