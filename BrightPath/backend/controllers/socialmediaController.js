import SocialMedia from "../models/socialMediaModel.js";
import { spawn } from "child_process";

export const predictDropoutBasedOnSocialMedia = async (req, res) => {
  try {
    const { rollno } = req.params; // Extract roll number from request parameters

    // Fetch student data by roll number
    const studentData = await SocialMedia.findOne({ rollno });

    // Check if the student exists
    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { social_media_usage } = studentData;

    // Validate that the required data exists
    if (!social_media_usage) {
      return res.status(400).json({ message: "Missing social media usage data" });
    }

    // Extract the necessary features
    const {
      daily_usage_minutes,
      weekly_usage_minutes,
      favorite_platforms,
      activity_breakdown,
      notifications_received,
      average_session_duration_minutes,
    } = social_media_usage;
    
    const average = (daily_usage_minutes) => {
      const values = Object.values(daily_usage_minutes); // Get an array of numerical values
      const total = values.reduce((acc, value) => acc + value, 0); // Sum up the values
      return Math.round(total / values.length); // Calculate the average
    };
    // Prepare features to send to Python
    const features = {
      average_session_duration_minutes: average(average_session_duration_minutes),
      activity_breakdown: average(activity_breakdown),
      daily_usage_minutes: average(daily_usage_minutes),
      weekly_usage_minutes: average(weekly_usage_minutes),
      notifications_received_daily: notifications_received.daily,
      notifications_received_weekly: notifications_received.weekly
    };

    // Log the features for debugging
    console.log("Features sent to Python:", features);

    // Spawn the Python process to run the prediction script
    const pythonProcess = spawn("python", ["./python_services/social_media_prediction.py"]);
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
