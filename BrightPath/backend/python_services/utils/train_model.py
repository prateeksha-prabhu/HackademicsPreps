import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler

# Load dataset (Replace with actual dataset path)
data = pd.read_csv("student_data.csv")

# Features & Labels
X = data[['gpa', 'attendance_percentage', 'study_hours_per_week']]
y = data['dropout_risk']  # Labels: 0 (Low), 1 (Moderate), 2 (High)

# Normalize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Train Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save Model & Scaler
with open("dropout_model_academic.pkl", "wb") as f:
    pickle.dump((scaler, model), f)

print("Model trained and saved!")
