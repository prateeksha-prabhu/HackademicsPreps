import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SideBar from '../components/SideBar';

const StudentDetails = () => {
  const [students, setStudents] = useState([]); // State to hold student data
  const [loading, setLoading] = useState(true); // State for loading indication
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  // Fetch students from backend
  const studentDetailsFetch = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/students');
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data.students); // Set the fetched student data
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch students when the component mounts
  useEffect(() => {
    studentDetailsFetch();
  }, []);

  return (
    <div className="flex h-screen">
      <SideBar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">All Students</h2>
          <button
            onClick={() => navigate("/studentAdmin")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Student
          </button>
        </div>

        {/* Loading State */}
        {loading && <p>Loading students...</p>}

        {/* Error State */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Student Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!loading && !error && students.map((student, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{student.studentName}</h3>
              <p className="text-sm text-gray-600">{student.department}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentDetails;
