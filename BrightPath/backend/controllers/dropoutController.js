import Student from "../models/studentModel.js";
import { spawn } from "child_process";

export const predictDropout = async (req, res) => {
  try {
    // Get student data by rollno from MongoDB
    const { rollno } = req.params;
    const studentData = await Student.findOne({ rollno });

    // Check if the student exists in the database
    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Extract the necessary features from student data
    const { test_completion_rate, notifications_ignored, course_progress } = studentData;

    // Validate that the features are not missing
    if (!test_completion_rate || !notifications_ignored || !course_progress) {
      return res.status(400).json({ message: "Missing required student data" });
    }

    const features = { test_completion_rate, notifications_ignored, course_progress };

    // Log the features to check the data before sending it to Python
    console.log("Features sent to Python:", features);

    // Spawn the Python process to run the prediction script
    const pythonProcess = spawn("python", ["./python_services/prediction.py"]);

    // Send the student features as input to the Python script
    pythonProcess.stdin.write(JSON.stringify(features));
    pythonProcess.stdin.end(); // Close the input stream

    let isResponseSent = false; // Track if the response has been sent

    // Handle the stdout (output from Python script)
    pythonProcess.stdout.on("data", (data) => {
      if (!isResponseSent) {
        const prediction = data.toString().trim(); // Get prediction result
        isResponseSent = true; // Mark that the response has been sent

        // Log the raw output from the Python script
        console.log(`Raw prediction from Python script: ${prediction}`);

        // Send the student details and prediction to the frontend
        res.json({
          studentDetails: studentData,
          prediction, // The prediction made by Python
        });
      }
    });

    // Handle stderr (errors from Python script)
    pythonProcess.stderr.on("data", (data) => {
      if (!isResponseSent) {
        isResponseSent = true; // Mark that the response has been sent
        console.error(`stderr: ${data.toString()}`);
        res.status(500).json({ message: `Error in prediction: ${data.toString()}` });
      }
    });

    // Handle when the Python process closes
    pythonProcess.on("close", (code) => {
      if (!isResponseSent) {
        isResponseSent = true; // Mark that the response has been sent
        if (code !== 0) {
          res.status(500).json({ message: "Python script failed with code " + code });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
