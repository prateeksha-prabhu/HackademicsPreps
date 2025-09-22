import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PredictionTable = () => {
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
            const response = await fetch("http://localhost:4000/api/admin/get-all-students-record");
            if (!response.ok) {
                throw new Error("Failed to fetch students");
            }
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
            return null;
        }
    };

    const determineOverallPrediction = (online, social, academic) => {
        let count = 0;
        if (online === "At Risk") count++;
        if (social == 1 || social == 2) count++; // Moderate(1) or High(2) = At Risk
        if (academic === "At Risk") count++;
        return count >= 2 ? "Risk" : "Not at Risk";
    };

    const fetchPredictions = async (registerNumber) => {
        setLoadingStudent(registerNumber);
        setError(null);
        try {
            console.log(`Fetching predictions for: ${registerNumber}`);
            const response = await fetch(`http://localhost:4000/api/admin/predict/${registerNumber}`);
            const socialMediaResponse = await fetch(`http://localhost:4000/api/admin/predict-socialmedia-dropout/${registerNumber}`);
            const academicResponse = await fetch(`http://localhost:4000/api/admin/academic-predict/${registerNumber}`);
            
            if (!response.ok || !socialMediaResponse.ok || !academicResponse.ok) {
                throw new Error("Failed to fetch predictions");
            }

            const data = await safeJsonParse(response);
            const socialMediaData = await safeJsonParse(socialMediaResponse);
            const academicData = await safeJsonParse(academicResponse);

            const overallPrediction = determineOverallPrediction(
                data?.prediction,
                socialMediaData?.prediction,
                academicData?.prediction
            );

            setStudents(prevStudents =>
                prevStudents.map(student =>
                    student.registerNumber === registerNumber
                        ? {
                            ...student,
                            onlineLearningPrediction: data?.prediction || "N/A",
                            socialMediaPrediction: socialMediaData?.prediction || "N/A",
                            academicPrediction: academicData?.prediction || "N/A",
                            overallPrediction: overallPrediction
                        }
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
                    console.log(`Fetching for student: ${student.registerNumber}`);
                    const response = await fetch(`http://localhost:4000/api/admin/predict/${student.registerNumber}`);
                    const socialMediaResponse = await fetch(`http://localhost:4000/api/admin/predict-socialmedia-dropout/${student.registerNumber}`);
                    const academicResponse = await fetch(`http://localhost:4000/api/admin/academic-predict/${student.registerNumber}`);
                    
                    if (!response.ok || !socialMediaResponse.ok || !academicResponse.ok) {
                        throw new Error("Failed to fetch predictions");
                    }

                    const data = await safeJsonParse(response);
                    const socialMediaData = await safeJsonParse(socialMediaResponse);
                    const academicData = await safeJsonParse(academicResponse);

                    return {
                        ...student,
                        onlineLearningPrediction: data?.prediction || "N/A",
                        socialMediaPrediction: socialMediaData?.prediction || "N/A",
                        academicPrediction: academicData?.prediction || "N/A",
                        overallPrediction: determineOverallPrediction(
                            data?.prediction,
                            socialMediaData?.prediction,
                            academicData?.prediction
                        )
                    };
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
            <div className="flex justify-between items-center mb-4">
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                    onClick={() => navigate(-1)}
                >
                    Back
                </button>
                <h1 className="text-2xl font-bold text-center flex-1">Overall Prediction</h1>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                    onClick={fetchAllPredictions}
                    disabled={loading}
                >
                    {loading ? "Fetching Predictions..." : "Get Predictions for All"}
                </button>
            </div>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            <table className="w-full border-collapse border border-gray-300 mt-4 shadow-md">
                <thead>
                    <tr className="bg-primary text-white leading-tight">
                        <th className="border p-3">Register Number</th>
                        <th className="border p-3">Student Name</th>
                        <th className="border p-3">Online Learning Prediction</th>
                        <th className="border p-3">Social Media Prediction</th>
                        <th className="border p-3">Academic Prediction</th>
                        <th className="border p-3">Overall Prediction</th>
                        <th className="border p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.registerNumber} className="bg-white border hover:bg-gray-100">
                            <td className="border p-3">{student.registerNumber}</td>
                            <td className="border p-3">{student.name}</td>
                            <td className={`border p-3 text-center ${
                                student.onlineLearningPrediction === "At Risk" ? "text-red-500" : "text-green-500"
                            }`}>
                                {student.onlineLearningPrediction || "-"}
                            </td>
                            <td className={`border p-3 text-center ${
                                student.socialMediaPrediction === "0" ? "text-green-500" : 
                                student.socialMediaPrediction === "1" ? "text-yellow-500" : 
                                student.socialMediaPrediction === "2" ? "text-red-500" : "text-black"
                            }`}>
                                {student.socialMediaPrediction === "0" ? "Low Risk" : 
                                student.socialMediaPrediction === "1" ? "Moderate Risk" : 
                                student.socialMediaPrediction === "2" ? "High Risk" : "-"}
                            </td>
                            <td className={`border p-3 text-center ${
                                student.academicPrediction === "At Risk" ? "text-red-500" : "text-green-500"
                            }`}>
                                {student.academicPrediction || "-"}
                            </td>
                            <td className={`border p-3 text-center ${
                                student.overallPrediction === "Risk" ? "text-red-500 font-bold" : "text-green-500"
                            }`}>
                                {student.overallPrediction || "-"}
                            </td>
                            <td className="border p-3 text-center">
                                <button
                                    className="px-4 py-1 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
                                    onClick={() => fetchPredictions(student.registerNumber)}
                                    disabled={loadingStudent === student.registerNumber}
                                >
                                    {loadingStudent === student.registerNumber ? "Fetching..." : "Get Predictions"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PredictionTable;
