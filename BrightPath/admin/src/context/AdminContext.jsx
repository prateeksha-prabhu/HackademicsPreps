import { createContext, useState } from 'react';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'): '')
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure this value is set correctly in your .env file
  const value = {
    aToken,
    setAToken,
    backendUrl, // Include backendUrl here
  };

  console.log('Backend URL:', backendUrl);

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
