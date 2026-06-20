import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    setIsAuthenticated(storedAuthStatus === 'true');
    if (storedUsername) setUsername(storedUsername);
    if (storedRole) setRole(storedRole);
  }, []);

  const login = (user) => {
    setIsAuthenticated(true);
    setUsername(user.username);
    setRole(user.role || '');
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('username', user.username);
    localStorage.setItem('role', user.role || '');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setRole('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
