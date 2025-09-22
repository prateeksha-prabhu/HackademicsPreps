import Student_socialMedia from "../models/Module2.js";

import { spawn } from "child_process";

export const predictAllDropouts = async (req, res) => {
  try {
    // Get all student data from MongoDB
    const students = await Student_socialMedia.find();

    // If no students are found, return a message
    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    // Collect predictions for all students
    const predictions = [];

    // Loop through each student to predict dropout
    for (let studentData of students) {
      const { test_completion_rate, notifications_ignored, course_progress, social_media_usage_time } = studentData;

      // Validate that the features are not missing
      if (test_completion_rate === undefined || notifications_ignored === undefined || course_progress === undefined || social_media_usage_time === undefined) {
        continue; // Skip this student if data is missing
      }

      const features = { test_completion_rate, notifications_ignored, course_progress, social_media_usage_time };

      // Spawn the Python process to run the prediction script
      const pythonProcess = spawn("python", ["./python_services/prediction_media.py"]);

      // Send the student features as input to the Python script
      pythonProcess.stdin.write(JSON.stringify(features));
      pythonProcess.stdin.end(); // Close the input stream

      // Wait for the Python process to give the result
      const result = await new Promise((resolve, reject) => {
        pythonProcess.stdout.on("data", (data) => {
          const prediction = data.toString().trim(); // Get prediction result
          resolve({ studentDetails: studentData, prediction });
        });

        pythonProcess.stderr.on("data", (data) => {
          reject(`stderr: ${data.toString()}`);
        });

        pythonProcess.on("close", (code) => {
          if (code !== 0) {
            reject("Python script failed");
          }
        });
      });

      predictions.push(result); // Add the result to the predictions array
    }

    // Return all the predictions
    res.json({ predictions });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
