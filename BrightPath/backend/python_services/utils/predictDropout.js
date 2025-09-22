import { exec } from "child_process";
import path from "path";

// Function to predict dropout risk using the Python script
export const predictDropoutRisk = (student) => {
  return new Promise((resolve, reject) => {
    // Log the received student data
    console.log("Received student data:", student);

    const { gpa, attendancePercentage, studyHoursPerWeek } = student;

    // Ensure the student has the necessary data for prediction
    if (gpa == null || attendancePercentage == null || studyHoursPerWeek == null) {
      console.error(`Error predicting dropout risk for student ID: ${student?.id || "Unknown"} - Missing required student data for prediction`);
      reject("Missing required student data for prediction");
      return;
    }

    console.log(`Running prediction with GPA: ${gpa}, Attendance: ${attendancePercentage}, Study Hours: ${studyHoursPerWeek}`);

    // Resolve the absolute path to the Python script using import.meta.url
  

// Relative path from the current directory
const scriptPath = path.resolve(__dirname, '../../python_services/utils/predict.py');

console.log(scriptPath);  // This will print the resolved path


    // Run the Python script with the student's data as arguments
    exec(
      `python "${scriptPath}" ${gpa} ${attendancePercentage} ${studyHoursPerWeek}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject("Error executing Python script");
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          reject("Error in Python script");
          return;
        }

        const predictionResult = stdout.trim();
        console.log(`Predicted Dropout Risk for Student ID: ${student?.id || "Unknown"} - ${predictionResult}`);

        resolve(predictionResult);
      }
    );
  });
};

// Example Usage (for Debugging)


export default predictDropoutRisk;
