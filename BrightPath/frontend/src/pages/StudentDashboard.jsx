import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import ChatbotComponent from '../components/ChatbotComponent';

// Mock data for the dashboard
const studentData = [
  { id: 0, name: "John Smith", riskLevel: "High", attendance: 65, grade: 68, 
    lastActivity: "2 days ago" },
  { id: 1, name: "Emma Johnson", riskLevel: "Medium", attendance: 82, grade: 
    74, lastActivity: "1 day ago" },
  { id: 2, name: "Michael Brown", riskLevel: "Low", attendance: 94, grade: 88, 
    lastActivity: "Today" },
  { id: 3, name: "Sarah Davis", riskLevel: "High", attendance: 58, grade: 62, 
    lastActivity: "3 days ago" },
  { id: 4, name: "David Wilson", riskLevel: "Medium", attendance: 78, grade: 
    76, lastActivity: "Today" },
];

const riskDistributionData = [
  { name: "Low Risk", value: 45 },
  { name: "Medium Risk", value: 30 },
  { name: "High Risk", value: 25 },
];

const attendanceTrendData = [
  { month: "Jan", attendance: 85 },
  { month: "Feb", attendance: 82 },
  { month: "Mar", attendance: 78 },
  { month: "Apr", attendance: 80 },
  { month: "May", attendance: 75 },
  { month: "Jun", attendance: 72 },
];

const performanceData = [
  { subject: "Math", score: 78 },
  { subject: "Science", score: 82 },
  { subject: "English", score: 75 },
  { subject: "History", score: 68 },
  { subject: "Art", score: 90 },
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

// Simple Card component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 p-5 shadow-sm ${className}`}>
    {children}
  </div>
);

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState(null);
  
  useEffect(() => {
    // Get student roll number from session storage
    const studentRollNo = sessionStorage.getItem('studentRollNo');
    
    if (studentRollNo) {
      // In a real app, fetch student data from API
      // For demo, use mock data
      const studentIndex = parseInt(studentRollNo.replace('S', '')) - 101;
      if (studentIndex >= 0 && studentIndex < studentData.length) {
        setStudentInfo(studentData[studentIndex]);
      } else {
        setStudentInfo(studentData[0]); // Default to first student
      }
    } else {
      // If no student is logged in, redirect to login
      // navigate('/student-login');
      setStudentInfo(studentData[0]); // For demo purposes
    }
  }, [navigate]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('studentRollNo');
    navigate('/');
  };
  
  const handleGoToPredictor = () => {
    navigate('/student-predictor');
  };
  
  if (!studentInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-2">Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Student Dashboard</h1>
              <p className="opacity-80">Welcome, {studentInfo.name}</p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={handleGoToPredictor}
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
              >
                Risk Predictor
              </button>
              <button 
                onClick={handleLogout}
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Current Attendance</p>
                <p className="text-2xl font-bold">{studentInfo.attendance}%</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Average Grade</p>
                <p className="text-2xl font-bold">{studentInfo.grade}%</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="flex items-center">
              <div className={`rounded-full p-3 mr-4 ${
                studentInfo.riskLevel === "High" ? "bg-red-100" : 
                studentInfo.riskLevel === "Medium" ? "bg-yellow-100" : "bg-green-100"
              }`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                  studentInfo.riskLevel === "High" ? "text-red-600" : 
                  studentInfo.riskLevel === "Medium" ? "text-yellow-600" : "text-green-600"
                }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Risk Level</p>
                <p className="text-2xl font-bold">{studentInfo.riskLevel}</p>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Attendance Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="attendance" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          
          <Card>
            <h2 className="text-lg font-semibold mb-4">Subject Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Risk Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          
          <Card>
            <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
            <div className="space-y-4">
              {studentInfo.riskLevel === "High" && (
                <>
                  <div className="flex items-start">
                    <div className="rounded-full bg-red-100 p-2 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-red-600">Immediate Attention Required</p>
                      <p className="text-gray-600 text-sm">Schedule a meeting with your mentor this week to discuss improvement strategies.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="rounded-full bg-red-100 p-2 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-red-600">Improve Attendance</p>
                      <p className="text-gray-600 text-sm">Your attendance is below the required threshold. Make sure to attend all classes.</p>
                    </div>
                  </div>
                </>
              )}
              
              {studentInfo.riskLevel === "Medium" && (
                <>
                  <div className="flex items-start">
                    <div className="rounded-full bg-yellow-100 p-2 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-yellow-600">Monitor Progress</p>
                      <p className="text-gray-600 text-sm">Keep track of your attendance and grades. Consider seeking help in subjects where you're struggling.</p>
                    </div>
                  </div>
                </>
              )}
              
              {studentInfo.riskLevel === "Low" && (
                <>
                  <div className="flex items-start">
                    <div className="rounded-full bg-green-100 p-2 mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-green-600">Keep Up the Good Work</p>
                      <p className="text-gray-600 text-sm">You're doing well! Continue with your current study habits and attendance.</p>
                    </div>
                  </div>
                </>
              )}
              
              <div className="flex items-start">
                <div className="rounded-full bg-blue-100 p-2 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-blue-600">Additional Resources</p>
                  <p className="text-gray-600 text-sm">Check the online learning portal for supplementary materials and practice tests.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <ChatbotComponent />
    </div>
  );
};

export default StudentDashboard;
