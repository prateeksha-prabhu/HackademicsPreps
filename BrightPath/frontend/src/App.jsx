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
  const { pToken } = useContext(ParentContext); // Context for authentication
  console.log("pToken:", pToken);

  return (
    <>
      {pToken ? (
        // Authenticated Routes
        <div className=" mx-4 sm:mx-[10%]">
          <Navbar />
          <div>
          <Routes>
            <Route path="/home" element={<Home user={userData} />} />
            <Route path="/mark" element={<Mark />} />
            <Route path="/attendence" element={<Attedence />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/semesterResult" element={<SemesterResult />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/student-marks" element={<StudentMarks />} />
            <Route path="/semester-1" element={<Semester1 />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          </div>
        </div>
      ) : (
        // Non-authenticated Routes
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* New routes for our components */}
          <Route path="/parent-portal" element={<ParentPortal />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-predictor" element={<StudentPredictor />} />
          
          {/* Default route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
};

export default App;
