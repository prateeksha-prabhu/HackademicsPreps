import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatbotComponent from '../components/ChatbotComponent';

const StudentPredictor = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState('');
  const [marks, setMarks] = useState('');
  const [result, setResult] = useState(null);
  const [studentRollNo, setStudentRollNo] = useState('');

  useEffect(() => {
    // Get student roll number from session storage
    const rollNo = sessionStorage.getItem('studentRollNo');
    setStudentRollNo(rollNo);
    
    // Pre-fill data for demo students
    if (rollNo) {
      if (rollNo === 'S101') {
        setAttendance('82');
        setMarks('72');
      } else if (rollNo === 'S102') {
        setAttendance('55');
        setMarks('60');
      } else if (rollNo === 'S103') {
        setAttendance('92');
        setMarks('88');
      }
    }
  }, []);

  const handlePredict = () => {
    if (!attendance || !marks) {
      alert('Please enter both attendance and marks');
      return;
    }

    const attendanceValue = parseFloat(attendance);
    const marksValue = parseFloat(marks);

    if (isNaN(attendanceValue) || isNaN(marksValue)) {
      alert('Please enter valid numbers');
      return;
    }

    if (attendanceValue < 0 || attendanceValue > 100 || marksValue < 0 || marksValue > 100) {
      alert('Values must be between 0 and 100');
      return;
    }

    // Rule-based scoring
    const wA = 0.6; // weight for attendance
    const wM = 0.4; // weight for marks
    const score = Math.round((wA * (100 - attendanceValue)) + (wM * (100 - marksValue)));

    let level, pillClass, suggestion;
    if (score >= 60) {
      level = 'HIGH';
      pillClass = 'bg-red-100 text-red-600';
      suggestion = "⚠️ You are at high risk. Please meet your mentor immediately, attend remedial classes, and improve attendance.";
    } else if (score >= 30) {
      level = 'MEDIUM';
      pillClass = 'bg-yellow-100 text-yellow-600';
      suggestion = "🟠 You are at medium risk. Stay consistent, attend all classes, and seek mentor support.";
    } else {
      level = 'LOW';
      pillClass = 'bg-green-100 text-green-600';
      suggestion = "✅ You are at low risk. Keep up your good work and continue engaging in studies.";
    }

    setResult({ level, score, pillClass, suggestion });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('studentRollNo');
    navigate('/');
  };

  const handleDashboard = () => {
    navigate('/student-dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Welcome Banner */}
        {studentRollNo ? (
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 mb-6 text-center">
            <p className="font-semibold">Welcome, Student {studentRollNo}!</p>
            <div className="mt-2 flex justify-center space-x-3">
              <button 
                onClick={handleDashboard}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={handleLogout}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 mb-6 text-center">
            <p className="font-semibold">Welcome to the Student Dropout Predictor</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              Login
            </button>
          </div>
        )}

        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold">My Dropout Risk Prediction</h1>
          <p className="text-gray-300">Based on your attendance & marks</p>
        </header>

        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 mb-6 backdrop-blur-sm border border-gray-700">
          <div className="mb-4">
            <label htmlFor="attendance" className="block text-gray-300 mb-2">Attendance %</label>
            <input
              id="attendance"
              type="number"
              min="0"
              max="100"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              placeholder="Enter your attendance %"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="marks" className="block text-gray-300 mb-2">Average Marks %</label>
            <input
              id="marks"
              type="number"
              min="0"
              max="100"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              placeholder="Enter your average marks %"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handlePredict}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Predict My Risk
          </button>
        </div>

        {result && (
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
            <h3 className="text-xl font-semibold mb-4">Prediction Result</h3>
            <div className={`inline-block px-4 py-2 rounded-full ${result.pillClass} font-medium`}>
              {result.level} RISK ({result.score})
            </div>
            <div className="mt-4 text-gray-300">
              {result.suggestion}
            </div>
          </div>
        )}
      </div>

      <ChatbotComponent />
    </div>
  );
};

export default StudentPredictor;
