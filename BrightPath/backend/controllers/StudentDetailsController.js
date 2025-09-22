import parentModel from "../models/parentModel.js"; // Ensure the path is correct

export const getStudentDetails = async (req, res) => {
  try {
    const students = await parentModel.find({}); // Fetch all student details
    res.json({ success: true, students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
