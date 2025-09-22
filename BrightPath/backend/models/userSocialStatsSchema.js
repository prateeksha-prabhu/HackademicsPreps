import mongoose from "mongoose";

const userSocialStatsSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    platform: { 
      type: String, 
      required: true, 
      enum: ["Facebook", "Twitter", "Instagram", "LinkedIn", "Other"] 
    },
    totalPosts: { type: Number, default: 0 },
    totalComments: { type: Number, default: 0 },
    totalLikes: { type: Number, default: 0 },
    avgDailyUsageHours: { type: Number, required: true },
    sentimentScore: { type: Number, min: -1, max: 1 }, // NLP-based sentiment analysis score
    dropoutRisk: { type: Boolean, default: false } // Predicted dropout status
  }, 
  { timestamps: true }
);

const UserSocialStats = mongoose.model("UserSocialStats", userSocialStatsSchema);

export default UserSocialStats;
