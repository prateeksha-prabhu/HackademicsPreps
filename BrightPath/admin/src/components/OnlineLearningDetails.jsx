import { useState } from "react";
import axios from "axios";

const OnlineLearningDetails = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/admin/upload-online",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUploadStatus(response.data.message);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          Online Learning Details Upload
        </h2>

        <label className="w-full cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="hidden"
          />
          <svg
            className="w-10 h-10 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16l4-4m0 0l4 4m-4-4v12M4 12a8 8 0 1116 0c0 4.418-3.582 8-8 8s-8-3.582-8-8z"
            />
          </svg>
          <span className="text-gray-600 text-sm">
            {file ? file.name : "Click to upload or drag and drop"}
          </span>
        </label>

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Upload
        </button>

        {uploadStatus && (
          <p className="text-sm text-gray-500 text-center">{uploadStatus}</p>
        )}

        <button
          onClick={() => window.history.back()}
          className="bg-red-600 text-white w-full py-2 rounded-lg hover:bg-red-700 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default OnlineLearningDetails;
