import mongoose from 'mongoose';

const { Schema } = mongoose;

// Social Media Usage Sub-schema
const socialMediaUsageSchema = new Schema({
  daily_usage_minutes: {
    instagram: { type: Number, default: 0 },
    facebook: { type: Number, default: 0 },
    twitter: { type: Number, default: 0 },
    snapchat: { type: Number, default: 0 },
    linkedin: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  weekly_usage_minutes: {
    instagram: { type: Number, default: 0 },
    facebook: { type: Number, default: 0 },
    twitter: { type: Number, default: 0 },
    snapchat: { type: Number, default: 0 },
    linkedin: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  favorite_platforms: {
    type: [String], // Array of platform names (e.g., ['Instagram', 'Snapchat'])
    default: []
  },
  activity_breakdown: {
    messaging: { type: Number, default: 0 },
    content_scrolling: { type: Number, default: 0 },
    posting: { type: Number, default: 0 },
    studying: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },
  notifications_received: {
    daily: { type: Number, default: 0 },
    weekly: { type: Number, default: 0 }
  },
  average_session_duration_minutes: {
    instagram: { type: Number, default: 0 },
    facebook: { type: Number, default: 0 },
    twitter: { type: Number, default: 0 },
    snapchat: { type: Number, default: 0 },
    linkedin: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  }
});

// Main student schema
const studentSocialMediaSchema = new Schema({
  rollno: { type: String, default: '' },
  name: { type: String, default: '' },
  social_media_usage: { type: socialMediaUsageSchema, default: () => ({}) },
  test_completion_rate: { type: Number, default: 0 },
  notifications_ignored: { type: Number, default: 0 },
  course_progress: { type: Number, default: 0 },
  last_active: { type: Date, default: Date.now }
}, { timestamps: true });

// Check if the model already exists in mongoose.models
const SocialMedia = mongoose.models.SocialMedia || mongoose.model('SocialMedia', studentSocialMediaSchema);

export default SocialMedia;
