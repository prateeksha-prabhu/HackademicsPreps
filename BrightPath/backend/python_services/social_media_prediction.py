import warnings
warnings.filterwarnings("ignore", category=UserWarning)
import joblib
import sys
import json
import numpy as np
import os

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Define the model path relative to the script's directory
model_path = os.path.join(script_dir, 'social_media_dropout_model(5th).pkl')

# Load the model with error handling
try:
    model = joblib.load(model_path)
except FileNotFoundError:
    print(f"Error: Model file not found at {model_path}")
    sys.exit(1)
except Exception as e:
    print(f"Error loading model: {e}")
    sys.exit(1)


# Function to predict dropout based on features
def predict_dropout(features):
    try:
        features_scaled = np.array([features])  # Ensure features are in the correct shape
        prediction = model.predict(features_scaled)
        return prediction[0]
    except Exception as e:
        return f"Error in prediction: {e}"

if __name__ == "__main__":
    try:
        # Read JSON data from stdin (input from Node.js)
        data = sys.stdin.read()
        input_features = json.loads(data)
        #print(input_features)


        # Extract features from the input data
        daily_usage_minutes = input_features.get("daily_usage_minutes", {}) or 0
        weekly_usage_minutes = input_features.get("weekly_usage_minutes", {}) or 0
        activity_breakdown = input_features.get("activity_breakdown", {}) or 0
        notifications_received_daily = input_features.get("notifications_received_daily", {}) or 0
        notifications_received_weekly = input_features.get("notifications_received_weekly", {}) or 0
        average_session_duration_minutes = input_features.get("average_session_duration_minutes", {}) or 0

        # print("at1",activity_breakdown.get("messaging", 0))
        # print("act2",activity_breakdown.get("content_scrolling", 0))

        # Prepare a feature vector (adjust based on how your features are structured)
        # Prepare feature vector with improved calculations
        features = [
            average_session_duration_minutes,
            activity_breakdown,
            daily_usage_minutes,
            weekly_usage_minutes,
            notifications_received_daily,
            notifications_received_weekly
         ]
        #print(features)

        # Predict dropout (1 for dropout, 0 for no dropout)
        prediction = predict_dropout(features)

        # Print the prediction (this will be sent back to Node.js)
        print(prediction)

    except json.JSONDecodeError:
        print("Error: Invalid JSON input")
    except Exception as e:
        print(f"Unexpected error: {e}")