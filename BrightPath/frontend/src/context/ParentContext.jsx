import React, { createContext, useState, useEffect } from 'react';

export const ParentContext = createContext();

const ParentContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/';
  const [isLoading, setIsLoading] = useState(true);

  const [pToken, setPToken] = useState('');

  useEffect(() => {
    // Initialize token from localStorage after component mounts
    const token = localStorage.getItem('aToken') || '';
    setPToken(token);
    setIsLoading(false);
  }, []);

  const value = {
    pToken,
    setPToken,
    backendUrl,
    isLoading,
  };

  return (
    <ParentContext.Provider value={value}>
      {children}
    </ParentContext.Provider>
  );
};

export default ParentContextProvider;
