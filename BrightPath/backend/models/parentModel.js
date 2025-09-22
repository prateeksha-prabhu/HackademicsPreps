import mongoose from "mongoose";

const parentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Student Name is required"],
    },
    parentEmail: {
      type: String,
      required: [true, "Parent Email is required"],
      unique: true,
    },
    parentPassword: {
      type: String,
      required: [true, "Parent Password is required"],
    },
    studentRegNo: {
      type: String,
      required: [true, "Student Registration Number is required"],
      unique: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
    },
    section: {
      type: String,
      required: [true, "Section is required"],
    },
    fatherName: {
      type: String,
      required: [true, "Father's Name is required"],
    },
    motherName: {
      type: String,
      required: [true, "Mother's Name is required"],
    },
    studentNumber: {
      type: String,
      required: [true, "Student's Contact Number is required"],
    },
    parentNumber: {
      type: String,
      required: [true, "Parent's Contact Number is required"],
    },
    address1: {
      type: String,
      
    },
    address2: {
      type: String,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Check if the model already exists, and use it; otherwise, create a new one
const parentModel = mongoose.models.Parent || mongoose.model("Parent", parentSchema);

export default parentModel;
