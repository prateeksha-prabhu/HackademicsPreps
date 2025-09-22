import StudentAcademic from "../models/StudentAcademicModel.js"


export const getAllAcadmeicStudentsRecord = async (req, res) => {
    try {
        const students = await StudentAcademic.find({});
        res.status(200).json({ students });
    } catch (error) {
        res.status(500).json({ message: "Error fetching student records", error: error.message });
    }
};