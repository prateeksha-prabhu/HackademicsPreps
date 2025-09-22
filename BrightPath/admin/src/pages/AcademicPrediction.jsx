import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";

const AcademicPrediction = () => {
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
            const response = await fetch("http://localhost:4000/api/admin/get-all-academic-students-record");
            if (!response.ok) throw new Error("Failed to fetch students");

            const data = await response.json();
            setStudents(data.students);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const safeJsonParse = async (response) => {
        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (error) {
            console.error("JSON Parse Error:", error);
        }
    };

    const fetchPredictions = async (rollno) => {
        setLoadingStudent(rollno);
        setError(null);
        try {
            console.log(`Fetching predictions for: ${rollno}`);
            const response = await fetch(`http://localhost:4000/api/admin/academic-predict/${rollno}`);
            if (!response.ok) throw new Error("Failed to fetch predictions");

            const data = await safeJsonParse(response);
            console.log("Predictions for", rollno, data);

            setStudents(prevStudents =>
                prevStudents.map(student =>
                    student.rollno === rollno
                        ? { ...student, AcademicPrediction: data?.prediction || "N/A" }
                        : student
                )
            );
        } catch (err) {
            setError(err.message);
            console.error("Error fetching predictions:", err.message);
        } finally {
            setLoadingStudent(null);
        }
    };

    const fetchAllPredictions = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log("Fetching predictions for all students...");
            const updatedStudents = await Promise.all(
                students.map(async (student) => {
                    console.log(`Fetching for student: ${student.rollno}`);
                    const response = await fetch(`http://localhost:4000/api/admin/academic-predict/${student.rollno}`);
                    if (!response.ok) throw new Error("Failed to fetch predictions");

                    const data = await safeJsonParse(response);
                    return { ...student, AcademicPrediction: data?.prediction || "N/A" };
                })
            );

            setStudents(updatedStudents);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching all predictions:", err.message);
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
                <h1 className="text-2xl font-bold flex-1 text-center">Academic Student Predictions</h1>
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
                        <tr className="bg-primary text-white leading-tight">
                            <th className="border p-3">Register Number</th>
                            <th className="border p-3">Student Name</th>
                            <th className="border p-3">Academic Prediction</th>
                            <th className="border p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.rollno} className="bg-white border hover:bg-gray-100">
                                <td className="border p-3">{student.rollno}</td>
                                <td className="border p-3">{student.name}</td>
                                <td className={`border p-3 text-center 
                                    ${student.AcademicPrediction === 'At Risk' ? "text-red-500" : "text-green-500"}`}
                                >
                                    {student.AcademicPrediction || "-"}
                                </td>
                                <td className="border p-3 text-center">
                                    <button
                                        className="px-4 py-1 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
                                        onClick={() => fetchPredictions(student.rollno)}
                                        disabled={loadingStudent === student.rollno}
                                    >
                                        {loadingStudent === student.rollno ? <Loader2 className="animate-spin" size={16} /> : "Get Predictions"}
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

export default AcademicPrediction;
