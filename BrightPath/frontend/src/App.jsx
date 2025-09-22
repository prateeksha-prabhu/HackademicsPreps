import React, { useContext } from 'react';
import Navbar from './components/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Mark from './pages/Mark';
import Attedence from './pages/Attedence';

import Login from './pages/Login';
import userData from "./data/data"; // Ensure only one import for userData
import SemesterResult from './pages/SemesterResult';
import Announcement from './pages/Announcement';
import Feedback from './pages/Feedback';
import { ParentContext } from './context/ParentContext';
import StudentMarks from './components/StudentMarks';
import Semester1 from './results/Semester1';

// Import our new components
import ParentPortal from './pages/ParentPortal';
import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './pages/StudentDashboard';
import StudentPredictor from './pages/StudentPredictor';

const App = () => {
  const { pToken, isLoading } = useContext(ParentContext); // Context for authentication
  console.log("pToken:", pToken);

  // Show loading spinner while context is initializing
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Public routes available regardless of authentication */}
        <Route path="/parent-portal" element={<ParentPortal />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-predictor" element={<StudentPredictor />} />
        <Route path="/login" element={<Login />} />
        
        {pToken ? (
          // Authenticated Routes
          <>
            <Route path="/home" element={
              <div className=" mx-4 sm:mx-[10%]">
                <Navbar />
                <Home user={userData} />
              </div>
            } />
            <Route path="/mark" element={
              <div className=" mx-4 sm:mx-[10%]">
                <Navbar />
                <Mark />
              </div>
            } />
            <Route path="/attendence" element={
              <div className=" mx-4 sm:mx-[10%]">
                <Navbar />
                <Attedence />
              </div>
            } />
            <Route path="/announcement" element={
              <div className=" mx-4 sm:mx-[10%]">
                <Navbar />
                <Announcement />
              </div>
            } />
            <Route path="/semesterResult" element={
              <div className=" mx-4 sm:mx-[10%]">
                <Navbar />
                <SemesterResult />
              </div>
            } />
            <Route path="/feedback" element={
              <div className=" mx-4 sm:mx-[10%]">
                <Navbar />
                <Feedback />
              </div>
            } />
            <Route path="/student-marks" element={
              <div className=" mx-4 sm:mx-[10%]">
                <Navbar />
                <StudentMarks />
              </div>
            } />
            <Route path="/semester-1" element={
              <div className=" mx-4 sm:mx-[10%]">
                <Navbar />
                <Semester1 />
              </div>
            } />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          // Non-authenticated Routes
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
