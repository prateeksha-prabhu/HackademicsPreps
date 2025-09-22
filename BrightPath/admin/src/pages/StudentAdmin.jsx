import React, { useState } from "react";
import { FaUserGraduate, FaCalendarAlt, FaBook, FaUsers } from "react-icons/fa";
import logo from "../assets/assets_frontend/logo.svg";
import SideBar from "../components/SideBar";
import axios from "axios";

const backendUrl = "http://localhost:4000"; // Replace with your backend URL

const ContentHeader = () => {
  return (
    <div className="w-full flex justify-between items-center bg-white shadow px-6 py-4">
      <h2 className="text-xl font-bold">Student Details</h2>
    </div>
  );
};

const FormContainer = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    parentEmail: "",
    parentPassword: "",
    studentRegNo: "",
    department: "",
    section: "",
    fatherName: "",
    motherName: "",
    studentNumber: "",
    parentNumber: "",
    address1: "",
    address2: "",
  });

  const handleChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/admin/add-Parent`, formData);
      alert(response.data.message); // Show success message
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred"); // Show error message
    }
  };

  return (
    <div className="bg-white shadow rounded p-8 mt-6 w-full max-w-4xl">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormGroup
          label="Student Name"
          id="student-name"
          type="text"
          value={formData.studentName}
          onChange={(e) => handleChange(e, "studentName")}
        />
        <FormGroup
          label="Parent Email"
          id="parent-email"
          type="email"
          value={formData.parentEmail}
          onChange={(e) => handleChange(e, "parentEmail")}
        />
        <FormGroup
          label="Parent Password"
          id="parent-password"
          type="password"
          value={formData.parentPassword}
          onChange={(e) => handleChange(e, "parentPassword")}
        />
        <FormGroup
          label="Student RegNo"
          id="student-regno"
          type="number"
          value={formData.studentRegNo}
          onChange={(e) => handleChange(e, "studentRegNo")}
        />
        <FormGroup
          label="Department"
          id="student-dept"
          type="select"
          options={[
            { value: "cse", label: "CSE" },
            { value: "csc", label: "CSC" },
            { value: "ece", label: "ECE" },
            { value: "aids", label: "AIDS" },
          ]}
          value={formData.department}
          onChange={(e) => handleChange(e, "department")}
        />
        <FormGroup
          label="Section"
          id="student-sec"
          type="select"
          options={[
            { value: "A", label: "A" },
            { value: "B", label: "B" },
            { value: "C", label: "C" },
          ]}
          value={formData.section}
          onChange={(e) => handleChange(e, "section")}
        />
        <FormGroup
          label="Father Name"
          id="father-name"
          type="text"
          value={formData.fatherName}
          onChange={(e) => handleChange(e, "fatherName")}
        />
        <FormGroup
          label="Mother Name"
          id="mother-name"
          type="text"
          value={formData.motherName}
          onChange={(e) => handleChange(e, "motherName")}
        />
        <FormGroup
          label="Student Number"
          id="student-number"
          type="number"
          value={formData.studentNumber}
          onChange={(e) => handleChange(e, "studentNumber")}
        />
        <FormGroup
          label="Parent Number"
          id="parent-number"
          type="number"
          value={formData.parentNumber}
          onChange={(e) => handleChange(e, "parentNumber")}
        />
        <FormGroup
          label="Address 1"
          id="address1"
          type="text"
          value={formData.address1}
          onChange={(e) => handleChange(e, "address1")}
        />
        <FormGroup
          label="Address 2"
          id="address2"
          type="text"
          value={formData.address2}
          onChange={(e) => handleChange(e, "address2")}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const FormGroup = ({ label, id, type, options, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={onChange}
        >
          <option value="">Select</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
};

const StudentAdmin = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <div className="flex-grow flex flex-col items-center">
        <ContentHeader />
        <FormContainer />
      </div>
    </div>
  );
};

export default StudentAdmin;
