import joblib
import json
import sys
import os
import numpy as np

# Define the model path
model_path = os.path.abspath("python_services/dropout_model(2nd).pkl")

# Load the model with error handling
try:
    model = joblib.load(model_path)
except FileNotFoundError:
    print(f"Error: Model file not found at {model_path}")
    sys.exit(1)
except Exception as e:
    print(f"Error loading model: {e}")
    sys.exit(1)

def get_prediction(student_data):
    """
    Predict whether a student is at risk of dropping out.
    """
    try:
        # Extract features
        features = [
            student_data.get('test_completion_rate', 0),
            student_data.get('notifications_ignored', 0),
            student_data.get('course_progress', 0)
        ]

        # Convert features into a numpy array
        features = np.array(features).reshape(1, -1)

        # Get the prediction
        prediction = model.predict(features)

        # Return the result
        if(prediction[0]==0):
            return "Not At Risk"
        else:
            return "At Risk"

    except Exception as e:
        return f"Error in prediction: {e}"

if __name__ == "__main__":
    try:
        # Read input from Node.js
        input_data = sys.stdin.read()
        student_data = json.loads(input_data)  # Parse JSON input

        # Get prediction result
        result = get_prediction(student_data)

        # Print result
        print(result)

    except json.JSONDecodeError:
        print("Error: Invalid JSON input")
    except Exception as e:
        print(f"Unexpected error: {e}")
