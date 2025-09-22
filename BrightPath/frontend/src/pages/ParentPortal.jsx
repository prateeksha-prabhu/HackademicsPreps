import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatbotComponent from '../components/ChatbotComponent';

const ParentPortal = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);
  const navigate = useNavigate();

  // Demo data for testing without MongoDB
  const students = {
    "S101": {name:"Anjali R", id:"S101", class:"10th Grade", attendance:82, marks:72},
    "S102": {name:"Kiran M", id:"S102", class:"9th Grade", attendance:55, marks:60},
    "S103": {name:"Rahul P", id:"S103", class:"11th Grade", attendance:92, marks:88}
  };

  // Calculate risk based on attendance and marks
  const calculateRisk = (attendance, marks) => {
    const wA = 0.6, wM = 0.4;
    const score = Math.round((wA*(100-attendance)) + (wM*(100-marks)));
    if (score >= 60) return {level:'HIGH', class:'risk-high'};
    else if (score >= 30) return {level:'MEDIUM', class:'risk-medium'};
    else return {level:'LOW', class:'risk-low'};
  };

  // Function to fetch student data from MongoDB
  const fetchStudentData = async (rollno) => {
    try {
      setLoading(true);
      
      try {
        const response = await fetch(`http://localhost:4000/api/admin/students?rollno=${rollno}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching student data:', error);
        return null;
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      setLoading(false);
      return null;
    }
  };

  // Search button click handler
  const handleSearch = async () => {
    if (!rollNumber.trim()) {
      alert("Please enter a roll number");
      return;
    }
    
    // For demo purposes, use static data if MongoDB is not available
    if (rollNumber === 'S101' || rollNumber === 'S102' || rollNumber === 'S103') {
      const student = students[rollNumber];
      if (!student) {
        alert("Student not found!");
        return;
      }
      setStudentDetails(student);
    } else {
      // Try to fetch from MongoDB
      const studentData = await fetchStudentData(rollNumber);
      if (studentData) {
        // Format the data to match our display requirements
        const student = {
          name: studentData.name,
          id: studentData.rollno || studentData.studentId,
          class: studentData.class || studentData.grade || "Not specified",
          attendance: studentData.attendance?.attendancePercentage || 75,
          marks: studentData.academicPerformance?.gpa * 25 || 70 // Convert GPA to percentage
        };
        setStudentDetails(student);
      } else {
        alert("Student not found or server error!");
      }
    }
  };

  // Logout function
  const handleLogout = () => {
    // In a real app, you would clear authentication tokens
    navigate('/');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Welcome to Parent Portal</h2>
            <p className="text-sm opacity-90">Monitor your child's academic progress</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Student Risk Overview</h1>
          <p className="text-gray-600">Enter your child's roll number to view their academic risk prediction</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4">Search Student</h3>
          <div className="flex">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Roll Number (e.g., S101)"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center p-6">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-gray-600">Fetching student data...</p>
          </div>
        )}

        {/* Student Details */}
        {studentDetails && (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-semibold mb-4">Student Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{studentDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ID</p>
                  <p className="font-medium">{studentDetails.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Class</p>
                  <p className="font-medium">{studentDetails.class}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Performance Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Attendance</p>
                  <p className="font-medium">{studentDetails.attendance}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Marks</p>
                  <p className="font-medium">{studentDetails.marks}%</p>
                </div>
              </div>
              
              {(() => {
                const risk = calculateRisk(studentDetails.attendance, studentDetails.marks);
                let bgColor, textColor, message;
                
                if (risk.level === 'HIGH') {
                  bgColor = 'bg-red-100';
                  textColor = 'text-red-600';
                  message = "⚠️ High risk. Please meet the mentor immediately and ensure attendance improves.";
                } else if (risk.level === 'MEDIUM') {
                  bgColor = 'bg-yellow-100';
                  textColor = 'text-yellow-600';
                  message = "🟠 Medium risk. Encourage consistent study and attendance.";
                } else {
                  bgColor = 'bg-green-100';
                  textColor = 'text-green-600';
                  message = "✅ Low risk. Keep up the good work.";
                }
                
                return (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Risk Level</p>
                    <div className={`inline-block px-3 py-1 rounded-full ${bgColor} ${textColor} font-medium`}>
                      {risk.level} RISK
                    </div>
                    <p className="mt-4 text-gray-600 text-sm">{message}</p>
                  </div>
                );
              })()}
            </div>
          </>
        )}
      </div>
      
      <ChatbotComponent />
    </div>
  );
};

export default ParentPortal;
