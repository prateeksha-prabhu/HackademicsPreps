import AcademicModel from "../models/AcademicModel.js";
import predictDropoutRisk from "../python_services/utils/predictDropout.js";

export const getAllStudentsPrediction = async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await AcademicModel.find();

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    // Flatten the student data
    const predictions = await Promise.all(
      students.map(async (student) => {
        // Flatten academicPerformance and attendance into a flat structure
        const flattenedStudent = {
          studentId: student.studentId,
          name: student.name,
          gpa: student.academicPerformance.gpa || 2.5,  // Default to 2.5 if missing
          attendancePercentage: student.attendance.attendancePercentage || 0, // Default to 0 if missing
          studyHoursPerWeek: student.studyHoursPerWeek || 0,  // Default to 0 if missing
        };

        // Make the prediction
        const riskPrediction = await predictDropoutRisk(flattenedStudent);
        
        return {
          studentId: student.studentId,
          name: student.name,
          dropoutRisk: riskPrediction,
        };
      })
    );

    res.status(200).json(predictions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
