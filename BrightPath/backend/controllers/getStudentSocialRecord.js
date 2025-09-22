import SocialMedia from "../models/socialMediaModel.js";

// Controller to get all student records
export const getAllStudentsSocialRecord = async (req, res) => {
    try {
        const students = await SocialMedia.find({});
        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({ message: "Error fetching student records", error: error.message });
    }
};
