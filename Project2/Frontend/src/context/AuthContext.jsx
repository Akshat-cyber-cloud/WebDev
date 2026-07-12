import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Configure axios defaults
axios.defaults.withCredentials = true;
const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/auth` : 'http://localhost:3000/api/auth';

// Set up Authorization header from localStorage on load if available
const localToken = localStorage.getItem('token');
if (localToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localToken}`;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user on mount
  useEffect(() => {
    const fetchUser = async () => {
      // Check if there is a token in URL search params (from Google OAuth redirect)
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get('token');
      if (urlToken) {
        localStorage.setItem('token', urlToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${urlToken}`;
        // Clean up URL search params without page reload
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      try {
        const res = await axios.get(`${API_URL}/me`);
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Register user
  const register = async (name, email, password) => {
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/register`, { name, email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      }
      setUser(res.data);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      return { success: false, message };
    }
  };

  // Login user
  const login = async (email, password) => {
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      }
      setUser(res.data);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      return { success: false, message };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/logout`);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
