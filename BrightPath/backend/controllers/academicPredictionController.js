import StudentAcademic from "../models/StudentAcademicModel.js"
import { spawn } from "child_process";

export const academicpredict = async(req,res) => {
    try{
        const { rollno } = req.params

        const studentData = await StudentAcademic.findOne({ rollno });

        console.log(studentData)

        if (!studentData) {
            return res.status(404).json({ message: "Student not found" });
        }

        const {gpa,attendance,study_hours} = studentData;

        const features = {
            gpa,
            attendance,
            study_hours
        }

        
// Log the features for debugging
console.log("Features sent to Python:", features);

// Spawn the Python process to run the prediction script
const pythonProcess = spawn("python", ["./python_services/academic_prediction.py"]);
pythonProcess.stdin.write(JSON.stringify(features));
pythonProcess.stdin.end();

// Handle Python stdout (prediction result)
pythonProcess.stdout.on("data", (data) => {
  const prediction = data.toString().trim();
  res.json({ studentDetails: studentData, prediction });
});

// Handle Python stderr (errors)
pythonProcess.stderr.on("data", (data) => {
  console.error(`stderr: ${data.toString()}`);
  res.status(500).json({ message: "Error in prediction script", error: data.toString() });
});

// Handle Python process exit
pythonProcess.on("close", (code) => {
  if (code !== 0) {
    res.status(500).json({ message: `Python process exited with code ${code}` });
  }
});

} catch (error) {
console.error(error);
res.status(500).json({ message: "Server error" });
}
};
