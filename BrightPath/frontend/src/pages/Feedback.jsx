import React, { useState } from 'react';

const Feedback = () => {
  const [formData, setFormData] = useState({
    experience: '',
    attendanceTracking: '',
    internalMarks: '',
    studentDetails: '',
    easeOfUse: '',
    suggestions: '',
    issues: '',
    comments: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    alert('Thank you for your feedback!');
    setFormData({
      experience: '',
      attendanceTracking: '',
      internalMarks: '',
      studentDetails: '',
      easeOfUse: '',
      suggestions: '',
      issues: '',
      comments: '',
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-100 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Share Your Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium">Overall Experience:</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Attendance Tracking:</label>
          <select
            name="attendanceTracking"
            value={formData.attendanceTracking}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="veryUseful">Very Useful</option>
            <option value="useful">Useful</option>
            <option value="neutral">Neutral</option>
            <option value="notUseful">Not Useful</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Internal Marks View:</label>
          <select
            name="internalMarks"
            value={formData.internalMarks}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="veryUseful">Very Useful</option>
            <option value="useful">Useful</option>
            <option value="neutral">Neutral</option>
            <option value="notUseful">Not Useful</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Suggestions for Improvement:</label>
          <textarea
            name="suggestions"
            value={formData.suggestions}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your suggestions here"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Technical Issues:</label>
          <textarea
            name="issues"
            value={formData.issues}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Describe any issues you encountered"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">General Comments:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Share any additional feedback"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md shadow-md hover:bg-blue-600"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
