import React, { createContext, useState } from 'react';

export const ParentContext = createContext();

const ParentContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000/';

  const [pToken, setPToken] = useState(
    localStorage.getItem('aToken') ? localStorage.getItem('aToken') : ''
  );

  const value = {
    pToken,
    setPToken,
    backendUrl,
  };

  return (
    <ParentContext.Provider value={value}>
      {children}
    </ParentContext.Provider>
  );
};

export default ParentContextProvider;
