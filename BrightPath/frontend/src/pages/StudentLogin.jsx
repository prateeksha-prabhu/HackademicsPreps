import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatbotComponent from '../components/ChatbotComponent';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Demo credentials
  const validCredentials = [
    { rollno: "S101", password: "student123" },
    { rollno: "S102", password: "student123" },
    { rollno: "S103", password: "student123" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check credentials
    const isValid = validCredentials.some(cred => 
      cred.rollno === rollNo && cred.password === password
    );
    
    if (isValid) {
      // Store roll number in session storage for use in dropout predictor
      sessionStorage.setItem('studentRollNo', rollNo);
      
      // Redirect to student dashboard
      navigate('/student-dashboard');
    } else {
      // Show error message
      setError('Invalid roll number or password. Please try again.');
      
      // Clear password field
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex justify-center items-center p-4">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md border border-gray-700 rounded-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-500 mb-2">Student Login</h1>
          <p className="text-gray-400">Enter your credentials to access your account</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="rollno" className="block text-gray-300 mb-2">Roll Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-id-card text-gray-500"></i>
              </div>
              <input
                type="text"
                id="rollno"
                className="bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg w-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your roll number"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-500"></i>
              </div>
              <input
                type="password"
                id="password"
                className="bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg w-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          </div>
          
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-400">Remember me</label>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Login
          </button>
        </form>
        
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Forgot your password? <a href="#" className="text-blue-500 hover:underline">Reset Password</a>
          </p>
          <p className="text-gray-400 text-sm mt-2">
            <a href="/" className="text-blue-500 hover:underline">Back to Home</a>
          </p>
        </div>
      </div>
      
      <ChatbotComponent />
    </div>
  );
};

export default StudentLogin;
