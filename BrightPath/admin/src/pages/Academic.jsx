import React, { useEffect, useState } from "react";
import axios from "axios";

const Academic = () => {
  const [students, setStudents] = useState(null); // Initial state as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch predictions for all students from the backend
    const fetchStudentPredictions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/predict");
        
        // Ensure the response data is an array
       
          setStudents(response.data); // Set the response data if it's an array
          console.log(students) ; 
         
       

        setLoading(false);  // Turn off loading
      } catch (err) {
        setError("Error fetching data from the server.");
        setLoading(false);  // Turn off loading in case of error
      }
    };

    fetchStudentPredictions();
  }, []);

  if (loading) return <div className="text-center text-xl font-semibold text-blue-600">Loading...</div>;
  if (error) return <div className="text-center text-xl font-semibold text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Student Dropout Predictions</h2>
      
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2 text-left">Student ID</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Dropout Risk</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.studentId} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{student.regno}</td>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">
                  {student.dropoutRisk === "Error: Missing data for prediction"
                    ? <span className="text-red-500">Incomplete data for prediction</span>
                    : student.dropoutRisk}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-500">No student data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Academic;
