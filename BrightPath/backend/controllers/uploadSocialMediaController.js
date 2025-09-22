import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import SocialMedia from "../models/socialMediaModel.js";

export const uploadSocialMediaData = async (req, res) => {
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

    // Map data to match MongoDB Schema
    const socialMediaRecords = jsonData.map((row) => ({
      rollno: row["RollNo"],
      name: row["Name"],
      social_media_usage: {
        daily_usage_minutes: {
          instagram: row["Instagram_Daily"] || 0,
          facebook: row["Facebook_Daily"] || 0,
          twitter: row["Twitter_Daily"] || 0,
          snapchat: row["Snapchat_Daily"] || 0,
          linkedin: row["LinkedIn_Daily"] || 0,
          other: row["Other_Daily"] || 0,
        },
        weekly_usage_minutes: {
          instagram: row["Instagram_Weekly"] || 0,
          facebook: row["Facebook_Weekly"] || 0,
          twitter: row["Twitter_Weekly"] || 0,
          snapchat: row["Snapchat_Weekly"] || 0,
          linkedin: row["LinkedIn_Weekly"] || 0,
          other: row["Other_Weekly"] || 0,
        },
        favorite_platforms: row["Favorite Platforms"] ? row["Favorite Platforms"].split(",") : [],
        activity_breakdown: {
          messaging: row["Messaging"] || 0,
          content_scrolling: row["Content_Scrolling"] || 0,
          posting: row["Posting"] || 0,
          studying: row["Studying"] || 0,
          other: row["Other_Activities"] || 0,
        },
        notifications_received: {
          daily: row["Daily_Notifications"] || 0,
          weekly: row["Weekly_Notifications"] || 0,
        },
        average_session_duration_minutes: {
          instagram: row["Instagram_Session"] || 0,
          facebook: row["Facebook_Session"] || 0,
          twitter: row["Twitter_Session"] || 0,
          snapchat: row["Snapchat_Session"] || 0,
          linkedin: row["LinkedIn_Session"] || 0,
          other: row["Other_Session"] || 0,
        },
      },
      test_completion_rate: row["Test_Completion_Rate"] || 0,
      notifications_ignored: row["Notifications_Ignored"] || 0,
      course_progress: row["Course_Progress"] || 0,
      last_active: row["Last Active"] ? new Date(row["Last Active"]) : new Date(),
    }));

    // Insert or update records in MongoDB
    for (const record of socialMediaRecords) {
      await SocialMedia.findOneAndUpdate(
        { rollno: record.rollno },
        { $set: record },
        { upsert: true, new: true }
      );
    }

    return res.status(200).json({ message: "File uploaded and data stored successfully", socialMediaRecords });
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).json({ message: "Error processing file", error });
  }
};
