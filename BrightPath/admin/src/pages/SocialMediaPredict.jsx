import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, AlertCircle } from "lucide-react";

const SocialMediaPredict = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingStudent, setLoadingStudent] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("http://localhost:4000/api/admin/get-all-students-social-record");
            setStudents(response.data.students);
        } catch (err) {
            setError("Failed to fetch students",err);
        } finally {
            setLoading(false);
        }
    };

    const fetchPrediction = async (rollno) => {
        setLoadingStudent(rollno);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:4000/api/admin/predict-socialmedia-dropout/${rollno}`);
            setStudents(prevStudents =>
                prevStudents.map(student =>
                    student.rollno === rollno
                        ? { ...student, socialMediaPrediction: response.data.prediction || "N/A" }
                        : student
                )
            );
        } catch (err) {
            setError("Failed to fetch prediction",err);
        } finally {
            setLoadingStudent(null);
        }
    };

    const fetchAllPredictions = async () => {
        setLoading(true);
        setError(null);
        try {
            const updatedStudents = await Promise.all(
                students.map(async (student) => {
                    try {
                        const response = await axios.get(`http://localhost:4000/api/admin/predict-socialmedia-dropout/${student.rollno}`);
                        return { ...student, socialMediaPrediction: response.data.prediction || "N/A" };
                    } catch {
                        return { ...student, socialMediaPrediction: "Error" };
                    }
                })
            );
            setStudents(updatedStudents);
        } catch (err) {
            setError("Failed to fetch all predictions",err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
                <h1 className="text-2xl font-bold flex-1 text-center">Social Media Dropout Predictions</h1>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                    onClick={fetchAllPredictions}
                    disabled={loading}
                >
                    {loading ? "Fetching Predictions..." : "Fetch All Predictions"}
                </button>
            </div>

            {/* Error Message */}
            {error && <div className="text-red-600 mb-4 flex items-center"><AlertCircle className="mr-2" /> {error}</div>}

            {/* Loader when fetching students */}
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <Loader2 className="animate-spin text-gray-600" size={40} />
                </div>
            ) : (
                <table className="w-full border-collapse border border-gray-300 mt-4 shadow-md">
                    <thead>
                        <tr className="bg-primary text-white">
                            <th className="border p-3">Register Number</th>
                            <th className="border p-3">Student Name</th>
                            <th className="border p-3">Social Media Dropout Prediction</th>
                            <th className="border p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.rollno} className="bg-white border hover:bg-gray-100">
                                <td className="border p-3">{student.rollno}</td>
                                <td className="border p-3">{student.name}</td>
                                <td className={`border p-3 text-center 
                                    ${student.socialMediaPrediction === "0" ? "text-green-500" 
                                    : student.socialMediaPrediction === "1" ? "text-yellow-500"
                                    : student.socialMediaPrediction === "2" ? "text-red-500" 
                                    : ""}`}
                                >
                                    {student.socialMediaPrediction === "0" ? "Low Risk" 
                                    : student.socialMediaPrediction === "1" ? "Moderate Risk" 
                                    : student.socialMediaPrediction === "2" ? "High Risk" 
                                    : "-"}
                                </td>
                                <td className="border p-3 text-center">
                                    <button
                                        className="px-4 py-1 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
                                        onClick={() => fetchPrediction(student.rollno)}
                                        disabled={loadingStudent === student.rollno}
                                    >
                                        {loadingStudent === student.rollno ? <Loader2 className="animate-spin" size={16} /> : "Get Prediction"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SocialMediaPredict;
