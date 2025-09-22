import React, { useState } from 'react';
import axios from 'axios';

const StudentMarks = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    registerNumber: '',
    department: '',
    section: '',
    subjects: [
      { id: 1, code: "22CS512", name: "Internship/Seminar", marks: '', grade: '' },
      { id: 2, code: "22CS909", name: "Software Testing and Automation (Lab Integrated)", marks: '', grade: '' },
      { id: 3, code: "22CS938", name: "REST Application Development using Spring Boot and JPA (Lab Integrated)", marks: '', grade: '' },
    ],
  });

  const backendUrl = "http://localhost:4000"; // Replace with your backend URL

  const departments = ['CSE', 'IT', 'ECE', 'EEE']; // Example departments
  const sections = ['A', 'B', 'C', 'D']; // Example sections

  const handleChange = (e, index, field) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index][field] = e.target.value;
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/admin/add-Marks`, formData);
      alert(response.data.message); // Show success message
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred"); // Show error message
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Student Marks</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Student Name</label>
            <input
              type="text"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Register Number</label>
            <input
              type="text"
              value={formData.registerNumber}
              onChange={(e) => setFormData({ ...formData, registerNumber: e.target.value })}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Section</label>
            <select
              value={formData.section}
              onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Section</option>
              {sections.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {formData.subjects.map((subject, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Subject {index + 1}: {subject.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject Code</label>
                <input
                  type="text"
                  value={subject.code}
                  readOnly
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Marks</label>
                <input
                  type="text"
                  value={subject.marks}
                  onChange={(e) => handleChange(e, index, 'marks')}
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Grade</label>
                <input
                  type="text"
                  value={subject.grade}
                  onChange={(e) => handleChange(e, index, 'grade')}
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentMarks;
