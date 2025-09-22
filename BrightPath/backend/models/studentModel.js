import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  rollno: { type: String, required: true },
  name: { type: String, required: true }, // Added 'name' field
  login_activity: Object,
  test_completion_rate: Number,
  time_spent: Object,
  performance: Object,
  activity_participation: Object,
  notifications_ignored: Number,
  course_progress: Number,
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
