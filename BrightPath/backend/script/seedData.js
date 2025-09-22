const sampleData = {
    rollno: "CS2025001",
    name: "John Doe",
    social_media_usage: {
      daily_usage_minutes: {
        instagram: 120,
        facebook: 60,
        twitter: 45,
        snapchat: 30,
        linkedin: 20,
        other: 15
      },
      weekly_usage_minutes: {
        instagram: 840,
        facebook: 420,
        twitter: 315,
        snapchat: 210,
        linkedin: 140,
        other: 105
      },
      favorite_platforms: ["Instagram", "Twitter", "Snapchat"],
      activity_breakdown: {
        messaging: 150,
        content_scrolling: 300,
        posting: 50,
        studying: 100,
        other: 25
      },
      notifications_received: {
        daily: 100,
        weekly: 700
      },
      average_session_duration_minutes: {
        instagram: 15,
        facebook: 10,
        twitter: 12,
        snapchat: 8,
        linkedin: 6,
        other: 5
      }
    },
    test_completion_rate: 85,
    notifications_ignored: 25,
    course_progress: 90
  };
  
  // Example of saving the document to the database
  const createStudentSocialMediaData = async () => {
    try {
      const savedData = await SocialMedia.create(sampleData);
      console.log("Data successfully saved:", savedData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  
  createStudentSocialMediaData();
  