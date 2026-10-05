import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserData = (userData) => setUser(userData);
  const clearUserData = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUserData, clearUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
