import mongoose from "mongoose";

const studentSchema2 = new mongoose.Schema({
  rollno: { type: String, required: true },
  name: { type: String, required: true }, // Added 'name' field
  login_activity: Object,
  test_completion_rate: Number,
  time_spent: Object,
  performance: Object,
  activity_participation: Object,
  notifications_ignored: Number,
  course_progress: Number,
  social_media_usage_time: Number,  // New feature for social media usage time
});

const Student_socialMedia = mongoose.model("Student-social-media", studentSchema2);

export default Student_socialMedia;
