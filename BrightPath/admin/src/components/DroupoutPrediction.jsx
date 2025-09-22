import { useState } from "react";

const DropoutPrediction = () => {
  const [rollno, setRollno] = useState(""); // To input roll number
  const [studentDetails, setStudentDetails] = useState(null); // To store student details
  const [prediction, setPrediction] = useState(null); // To store prediction result
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(""); // To handle errors

  const fetchPrediction = async () => {
    setLoading(true);
    setError("");
    setStudentDetails(null);
    setPrediction(null);

    try {
      const response = await fetch(
        `http://localhost:4000/api/admin/predict/${rollno}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch student details");
      }

      const data = await response.json();

      // Assuming the response contains both student details and prediction
      setStudentDetails(data.studentDetails);
      setPrediction(data.prediction);
    } catch (err) {
      setError("Error fetching prediction. Please check the roll number.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Student Dropout Prediction
        </h2>

        {/* Input for Roll Number */}
        <input
          type="text"
          placeholder="Enter Roll Number"
          value={rollno}
          onChange={(e) => setRollno(e.target.value)}
          className="border p-2 mb-4 w-full rounded"
        />

        {/* Predict Button */}
        <button
          onClick={fetchPrediction}
          disabled={!rollno || loading}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {/* Loading State */}
        {loading && (
          <p className="mt-4 text-blue-500 text-center">Loading...</p>
        )}

        {/* Error Message */}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {/* Student Details Table */}
        {studentDetails && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Student Details:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-left border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Field</th>
                    <th className="border border-gray-300 p-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Render student details without the '_id' */}
                  {Object.entries(studentDetails)
                    .filter(([key]) => key !== "_id") // Exclude '_id' field
                    .map(([key, value]) => (
                      <tr key={key}>
                        <td className="border border-gray-300 p-2 capitalize">
                          {key}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {/* Check if the value is an object */}
                          {typeof value === "object"
                            ? JSON.stringify(value)
                            : value}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-6 p-4 rounded-lg shadow-md text-center">
            {prediction === "At Risk" ? (
              <div>
                <h3 className="text-xl font-bold text-red-500">
                  Prediction: Student is at risk of dropping out!
                </h3>
                <p className="mt-2 text-red-400">
                  Reason: Declining grades or low participation. Please take
                  immediate action.
                </p>
              </div>
            ) : (
              <h3 className="text-xl font-bold text-green-500">
                Prediction: Student is not at risk!
              </h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropoutPrediction;