import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import StudentAcademic from "../models/StudentAcademicModel.js";

export const uploadacademicdetails = async (req, res) => {
  try {
    console.log("Multer file object:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Read the file from disk
    const filePath = path.join(req.file.destination, req.file.filename);
    const fileBuffer = fs.readFileSync(filePath);

    // Read Excel file
    const workbook = xlsx.read(fileBuffer, { type: "buffer" });

    // Get first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    console.log("Extracted Data:", jsonData);

    const academicRecords = jsonData.map((row) => ({
      rollno: row["RollNo"],
      name: row["Name"],
      gpa: row["GPA"],
      attendance: row["Attendance"],
      study_hours: row["Study_Hours"],
    }));

    for (const record of academicRecords) {
      await StudentAcademic.findOneAndUpdate(
        { rollno: record.rollno }, // Search condition
        { $set: record }, // Update data
        { upsert: true, new: true } // Create if not exists
      );
    }

    return res.status(200).json({
      message: "File uploaded and data stored/updated successfully",
      academicRecords,
    });
  } catch (error) {
    return res.status(500).json({ Error: "Internal Server Error", error: error });
  }
};
