import mongoose from "mongoose";

// Define schema for student data
const AcademicSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 10, // Assuming minimum age for students
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  academicPerformance: {
    gpa: {
      type: Number,
      required: true,
      min: 0.0,
      max: 4.0, // Assuming a 4.0 GPA scale
      default: 2.5, // Default GPA to prevent missing data
    },
    previousScores: [
      {
        subject: String,
        score: Number,
      },
    ],
  },
  attendance: {
    totalClasses: {
      type: Number,
      required: true,
    },
    attendedClasses: {
      type: Number,
      required: true,
    },
    attendancePercentage: {
      type: Number,
      default: function () {
        return this.attendance.totalClasses
          ? (this.attendance.attendedClasses / this.attendance.totalClasses) * 100
          : 0; // Avoid division by zero
      },
    },
  },
  studyHoursPerWeek: {
    type: Number,
    required: true,
    default: 10, // Default study hours per week
  },
  enrollmentYear: {
    type: Number,
    required: true,
  },
  encodedFeatures: {
    type: Object,
    default: {},
  },
});

// Middleware to handle missing values & preprocessing
AcademicSchema.pre("save", function (next) {
  // Ensure GPA is valid
  if (!this.academicPerformance.gpa) {
    this.academicPerformance.gpa = 2.5;
  }

  // Normalize attendance percentage
  if (this.attendance.totalClasses && this.attendance.attendedClasses) {
    this.attendance.attendancePercentage =
      (this.attendance.attendedClasses / this.attendance.totalClasses) * 100;
  } else {
    this.attendance.attendancePercentage = 0; // Default value to prevent errors
  }

  // Ensure study hours are present
  if (!this.studyHoursPerWeek) {
    this.studyHoursPerWeek = 10;
  }

  // Encode categorical features (Example: Gender)
  this.encodedFeatures = {
    genderEncoded: this.gender === "Male" ? 1 : this.gender === "Female" ? 2 : 3,
    departmentEncoded: this.department.toLowerCase().replace(/\s+/g, "_"),
  };

  next();
});

const AcademicModel = mongoose.model("Academic", AcademicSchema);
export default AcademicModel;
