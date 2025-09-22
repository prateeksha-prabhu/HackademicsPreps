import sys
import json
import pickle
import numpy as np

# Load the trained model
MODEL_PATH = "dropout.pkl"
try:
    with open(MODEL_PATH, "rb") as model_file:
        model = pickle.load(model_file)
except Exception as e:
    print(json.dumps({"error": f"Failed to load model: {str(e)}"}))
    sys.exit(1)

def preprocess_input(data):
    """Convert input JSON into the correct format for the model."""
    feature_order = [
        'Application mode', 'Displaced', 'Debtor', 'Tuition fees up to date',
        'Gender', 'Scholarship holder', 'Age at enrollment',
        'Curricular units 1st sem (enrolled)', 'Curricular units 1st sem (approved)',
        'Curricular units 1st sem (grade)', 'Curricular units 2nd sem (enrolled)',
        'Curricular units 2nd sem (approved)', 'Curricular units 2nd sem (grade)'
    ]
    
    try:
        input_values = [float(data[feature]) for feature in feature_order]
        return np.array(input_values).reshape(1, -1)
    except KeyError as e:
        print(json.dumps({"error": f"Missing feature: {str(e)}"}))
        sys.exit(1)
    except ValueError as e:
        print(json.dumps({"error": f"Invalid data format: {str(e)}"}))
        sys.exit(1)

if __name__ == "__main__":
    try:
        # Load the JSON from the file instead of command line arguments
        with open("input.json", "r") as file:
            input_data = json.load(file)

        processed_input = preprocess_input(input_data)
        
        # Make a prediction
        prediction = model.predict(processed_input)
        
        # Convert prediction to standard Python type
        result = {"prediction": int(prediction[0])}  # Convert numpy int64 to int
        
        # Print the result as JSON
        print(json.dumps(result))
        
    except Exception as e:
        print(json.dumps({"error": f"Prediction error: {str(e)}"}))
        sys.exit(1)