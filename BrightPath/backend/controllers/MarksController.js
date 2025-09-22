import marksModel from "../models/marksModel.js";

// Controller to add marks for a student
export const addMarks = async (req, res) => {
  try {
    const {
      studentName,
      registerNumber,
      department,
      section,
      subjects,
    } = req.body;

    // Validate required fields
    if (!studentName || !registerNumber || !department || !section || !subjects) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Validate department and section values
    const validDepartments = ["CSE", "ECE", "CS", "AIDS"];
    const validSections = ["A", "B", "C", "D"];

    if (!validDepartments.includes(department)) {
      return res.status(400).json({ success: false, message: "Invalid department" });
    }

    if (!validSections.includes(section)) {
      return res.status(400).json({ success: false, message: "Invalid section" });
    }

    // Validate subjects array
    if (!Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ success: false, message: "Subjects must be a non-empty array" });
    }

    for (const subject of subjects) {
      const { marks, grade } = subject;

      if (isNaN(marks) || marks.trim() === '' || parseFloat(marks) < 0 || parseFloat(marks) > 100) {
        return res.status(400).json({
          success: false,
          message: "Marks must be a string that can be converted to a number between 0 and 100 for each subject",
        });
      }
      

      if (!grade || grade.length > 2) {
        return res.status(400).json({
          success: false,
          message: "Grade must be provided and must not exceed 2 characters",
        });
      }
    }

    // Prepare marks data
    const marksData = {
      studentName,
      registerNumber,
      department,
      section,
      subjects,
    };

    // Save to database
    const newMarks = new marksModel(marksData);
    await newMarks.save();

    return res.status(201).json({
      success: true,
      message: "Marks added successfully",
      marksId: newMarks._id,
    });
  } catch (error) {
    console.error("Error adding marks:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
