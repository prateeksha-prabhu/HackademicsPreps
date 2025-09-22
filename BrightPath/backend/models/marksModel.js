import mongoose from "mongoose";

const marksSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Student Name is required"],
    },
    registerNumber: {
      type: String,
      required: [true, "Registration Number is required"],
      unique: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: ["CSE", "ECE", "CS", "AIDS"], 
    },
    section: {
      type: String,
      required: [true, "Section is required"],
      enum: ["A", "B", "C", "D"], 
    },
    subjects: [
      {
        marks: {
          type: String,
        //   required: [true, "Marks are required"],
        //   min: [0, "Marks cannot be less than 0"],
        //   max: [100, "Marks cannot exceed 100"],
        },
        grade: {
          type: String,
          required: [true, "Grade is required"],
          maxlength: [2, "Grade cannot exceed 2 characters"],
        },
      },
    ],
  },
  { timestamps: true } 
);


const marksModel = mongoose.models.Marks || mongoose.model("Marks", marksSchema);

export default marksModel;
