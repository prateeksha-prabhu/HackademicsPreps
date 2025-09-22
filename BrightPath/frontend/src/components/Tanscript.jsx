import React from "react";
import transcriptData from "../data/transcriptdata.js";
import profileData from "../data/profiledata.js";
const Transcript = () => {
  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4 text-center">
      PROVISIONAL RESULTS OF END SEMESTER EXAMINATIONS NOV/DEC 2024
    </h1>
    <div className="mb-6 flex flex-col p-6 bg-blue-100 rounded-lg shadow-lg border border-blue-200">
  <div className="flex flex-wrap gap-6 mb-4">
    <p className="text-lg font-medium text-gray-700">
      <strong>Name of the Student:</strong> {profileData.name}
    </p>
    <p className="text-lg font-medium text-gray-700">
      <strong>Register No:</strong> {profileData.registerNo}
    </p>
  </div>
  <div className="flex flex-wrap gap-6 mb-4">
    <p className="text-lg font-medium text-gray-700">
      <strong>Branch:</strong> {profileData.branch}
    </p>
    <p className="text-lg font-medium text-gray-700">
      <strong>Batch:</strong> {profileData.batch}
    </p>
  </div>
  <p className="text-lg font-medium text-gray-700 flex justify-between items-center">
  <strong>GPA:</strong> {profileData.gpa} &nbsp;
  <span className="ml-auto">
    <strong className="font-medium">CGPA:</strong> {profileData.cgpa}
  </span>
</p>

</div>

    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">SEM</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Subject Code</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Subject Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Grade</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Result</th>
          </tr>
        </thead>
        <tbody>
          {transcriptData.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td className="border border-gray-300 px-4 py-2 text-sm">{row.sem}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm">{row.code}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm">{row.title}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm">{row.grade}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm">{row.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  

  );
};

export default Transcript;
