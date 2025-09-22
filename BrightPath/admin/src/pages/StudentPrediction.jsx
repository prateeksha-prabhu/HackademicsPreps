import React, { useState } from "react";
import axios from "axios";

function StudentPrediction() {
  const [regno, setRegno] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDetails = async () => {
    if (!regno.trim()) {
      setError("Please enter a valid Registration Number.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:4000/predict", { regno });
      setStudentData(response.data);
      setPrediction(null); // Reset prediction if new student data is fetched
      console.log(response.data)
      console.log(studentData);
    } catch (err) {
      setError("No data found for this Registration Number.");
      setStudentData(null);
      setPrediction(null);
    }
    setLoading(false);
  };

  

  const fetchPrediction = async () => {
    if (!studentData) {
      setError("Fetch student details first.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:4000/predict", { regno });
      setPrediction(response.data.prediction);
    } catch (err) {
      setError("Error fetching prediction.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Student Prediction System</h1>

      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter Reg No"
          value={regno}
          onChange={(e) => setRegno(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={fetchDetails}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Get Details
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {studentData && (
        <div className="p-4 bg-white shadow-md rounded-lg w-1/2">
          <h2 className="text-lg font-semibold">Student Details</h2>
          <p><strong>Reg No:</strong> {studentData.Data.regno}</p>
          <p><strong>Course:</strong> {studentData.Data.course}</p>
          <p><strong>Age at Enrollment:</strong> {studentData.Data.ageAtEnrollment}</p>
          <p><strong>Scholarship Holder:</strong> {studentData.scholarshipHolder ? "Yes" : "No"}</p>

          <button
            onClick={fetchPrediction}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Predict Outcome
          </button>
        </div>
      )}

{prediction && (
  <div
    className={`mt-4 p-4 rounded-lg ${
      prediction.toLowerCase() === "dropout"
        ? "bg-red-100 text-red-800"
        : "bg-green-100 text-green-800"
    }`}
  >
    <h3 className="text-lg font-semibold">Predicted Outcome:</h3>
    <p>{prediction}</p>
  </div>
)}

    </div>
  );
}

export default StudentPrediction;
