import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ParentContext } from '../context/ParentContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [parentEmail, setParentEmail] = useState('');
  const [parentPassword, setParentPassword] = useState('');
  const { setPToken, backendUrl } = useContext(ParentContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(`${backendUrl}/parent/login`, { parentEmail, parentPassword });
      if (data?.success) {
        setPToken(data.token);
        localStorage.setItem('PToken', data.token);
        toast.success("Login successful", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000, // Time in milliseconds before it disappears
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored", // Options: "light", "dark", "colored"
        });
        
        // Redirect to Parent Portal page after successful login
        setTimeout(() => {
          window.location.href = '/BrightPath/pages/Parent_portal.html';
        }, 3000);
      } else {
        toast.error(data?.message || 'Login failed'); // Error toast
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Something went wrong. Please try again.'); // Error toast
    }
  };

  return (
    <>
      <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>

      <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto">Parent Login</p>
          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setParentEmail(e.target.value)}
              value={parentEmail}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              required
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setParentPassword(e.target.value)}
              value={parentPassword}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              required
            />
          </div>
          <button className="bg-primary text-white w-full py-2 rounded-md text-base">
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
