import joblib
from sklearn.linear_model import LogisticRegression
import numpy as np
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split

# Create a perfectly balanced dataset (equal number of at-risk and not-at-risk examples)
# Conditions for "At Risk":
# - GPA ≤ 6.0 OR
# - Attendance ≤ 60% OR
# - Study Hours < 5 hours/day

# ========= NOT AT RISK EXAMPLES (25 examples) =========
not_at_risk = [
    # All parameters good - clearly not at risk
    [8.5, 90, 7.0],    # ✅ High GPA, High Attendance, Good Study Hours
    [7.2, 85, 6.5],    # ✅ Good GPA, Good Attendance, Good Study Hours
    [6.8, 75, 5.8],    # ✅ Above threshold for all
    [9.0, 95, 8.0],    # ✅ Excellent student
    [8.0, 80, 7.0],    # ✅ Very good student
    [7.0, 70, 6.0],    # ✅ Good student
    [7.5, 78, 6.8],    # ✅ Strong student
    [8.2, 88, 7.5],    # ✅ Excellent performance
    [6.7, 72, 5.7],    # ✅ Solid performance
    
    # Borderline cases but still not at risk (all parameters meet minimum requirements)
    [6.1, 61, 5.1],    # ✅ Barely above threshold for all
    [6.0, 61, 5.0],    # ✅ At GPA and Study Hours threshold, Attendance above
    [6.0, 62, 5.1],    # ✅ At GPA threshold, others good
    [6.0, 65, 5.2],    # ✅ At GPA threshold, others good
    [6.0, 70, 5.5],    # ✅ At GPA threshold, others good
    [6.01, 60.1, 5.0], # ✅ Just above thresholds
    [6.1, 60.1, 5.0],  # ✅ Just above Attendance threshold
    [6.1, 61, 5.0],    # ✅ Exactly at Study Hours threshold, others good
    
    # Strong in some areas, adequate in others
    [7.0, 62, 5.0],    # ✅ Good GPA, barely above on others
    [6.2, 75, 5.0],    # ✅ Decent GPA, good attendance, minimum study
    [6.0, 85, 5.2],    # ✅ Minimum GPA, excellent attendance, good study
    [6.1, 62, 6.0],    # ✅ Low but passing on GPA and attendance, good study
    [6.5, 63, 5.0],    # ✅ Decent GPA, low but passing attendance, minimum study
    [6.2, 61, 5.1],    # ✅ All just above thresholds
    [6.5, 65, 5.0]     # ✅ Decent overall, minimum study hours
]

# ========= AT RISK EXAMPLES (25 examples) =========
at_risk = [
    # One parameter fails - GPA below threshold
    [5.9, 70, 6.0],    # ❌ GPA below threshold
    [5.9, 80, 6.0],    # ❌ GPA below threshold (Example case that was misclassified)
    [5.9, 85, 7.0],    # ❌ GPA below threshold with excellent other params
    [5.8, 75, 6.0],    # ❌ GPA below threshold
    [5.7, 90, 8.0],    # ❌ GPA below threshold despite excellent other params
    [5.5, 90, 7.0],    # ❌ Low GPA only
    
    # One parameter fails - Attendance below threshold
    [6.5, 60, 5.5],    # ❌ Exactly at Attendance threshold (≤60 is at risk)
    [7.0, 60, 6.0],    # ❌ Exactly at Attendance threshold
    [8.0, 60, 7.0],    # ❌ Exactly at Attendance threshold
    [6.5, 59, 5.5],    # ❌ Below Attendance threshold
    [7.0, 55, 6.0],    # ❌ Below Attendance threshold
    [8.0, 50, 7.0],    # ❌ Below Attendance threshold
    
    # One parameter fails - Study Hours below threshold
    [6.5, 65, 4.99],   # ❌ Just below Study Hours threshold
    [7.0, 70, 4.95],   # ❌ Below Study Hours threshold
    [7.0, 80, 4.9],    # ❌ Below Study Hours threshold
    [8.0, 90, 4.8],    # ❌ Below Study Hours threshold
    [9.0, 95, 4.5],    # ❌ Below Study Hours threshold despite excellent other params
    [8.5, 70, 4.8],    # ❌ Low Study Hours only
    
    # Multiple parameters fail
    [5.8, 58, 6.0],    # ❌ Low GPA, Low Attendance
    [5.7, 70, 4.5],    # ❌ Low GPA, Low Study Hours
    [7.5, 50, 4.7],    # ❌ Low Attendance, Low Study Hours
    
    # All parameters fail
    [5.5, 55, 4.5],    # ❌ All parameters below threshold
    [4.0, 40, 3.0],    # ❌ All very low
    [3.0, 30, 2.0],    # ❌ Extreme risk case
    [5.0, 50, 4.0]     # ❌ Struggling in all areas
]

# Combine into balanced dataset
X_data = np.array(not_at_risk + at_risk)
y_data = np.array([0] * len(not_at_risk) + [1] * len(at_risk))

# Verify dataset balance
print(f"Dataset balance - Not at Risk: {np.sum(y_data == 0)}, At Risk: {np.sum(y_data == 1)}")

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X_data, y_data, test_size=0.2, random_state=42, stratify=y_data
)

# Train the logistic regression model
model = LogisticRegression(max_iter=2000, C=10.0)  # Increased regularization strength and iterations
model.fit(X_train, y_train)

# Test on the held-out test set
y_pred = model.predict(X_test)
print("Test set accuracy:", accuracy_score(y_test, y_pred))
print("Classification report:")
print(classification_report(y_test, y_pred))

# Define critical test cases that previously failed
critical_test_cases = np.array([
    # Case 5 from previous output - should be NOT at risk (exactly at GPA threshold)
    [6.0, 61.0, 5.1],
    # Example 2 from previous output - should be AT risk (below GPA threshold)
    [5.9, 80.0, 6.0],
    # Additional critical cases
    [6.0, 60.0, 5.0],  # All exactly at threshold - should be at risk (attendance ≤ 60%)
    [6.01, 60.01, 5.0],  # Just above thresholds - should be not at risk
    [5.99, 60.01, 5.0],  # GPA just below - should be at risk
    [6.01, 59.99, 5.0],  # Attendance just below - should be at risk
    [6.01, 60.01, 4.99]  # Study hours just below - should be at risk
])

# Test the critical cases
print("\nCritical test cases:")
for i, test_case in enumerate(critical_test_cases):
    gpa, attendance, study_hours = test_case
    prediction = model.predict([test_case])[0]
    risk_status = "At Risk" if prediction == 1 else "Not at Risk"
    
    # Determine expected status based on rules
    expected_risk = 1 if (gpa <= 6.0 or attendance <= 60.0 or study_hours < 5.0) else 0
    expected_status = "At Risk" if expected_risk == 1 else "Not at Risk"
    
    correct = prediction == expected_risk
    
    print(f"Case {i+1}: GPA={gpa}, Attendance={attendance}%, Study Hours={study_hours}")
    print(f"   Prediction: {risk_status}, Expected: {expected_status}")
    print(f"   Criteria Check: GPA {'>6.0' if gpa > 6.0 else '≤6.0'}, " +
          f"Attendance {'>60%' if attendance > 60 else '≤60%'}, " +
          f"Study Hours {'≥5' if study_hours >= 5 else '<5'}")
    print(f"   Correct: {'✓' if correct else '✗'}")
    print()

# Complete verification examples
verification_examples = [
    [8.0, 80, 6.0],  # Should be Not at Risk
    [5.9, 80, 6.0],  # Should be At Risk (GPA ≤ 6.0)
    [7.0, 60, 6.0],  # Should be At Risk (Attendance = 60, not > 60)
    [7.0, 80, 4.9],  # Should be At Risk (Study Hours < 5)
    # Additional edge cases
    [6.0, 61, 5.0],  # GPA = 6.0, should be Not at Risk
    [6.0, 60, 5.0],  # Attendance = 60, should be At Risk
    [6.0, 61, 4.9]   # Study Hours < 5, should be At Risk
]

print("Verification examples:")
for i, example in enumerate(verification_examples):
    gpa, attendance, study_hours = example
    prediction = model.predict([example])[0]
    risk_status = "At Risk" if prediction == 1 else "Not at Risk"
    
    # Determine expected status based on rules
    expected_risk = 1 if (gpa <= 6.0 or attendance <= 60.0 or study_hours < 5.0) else 0
    expected_status = "At Risk" if expected_risk == 1 else "Not at Risk"
    
    correct = prediction == expected_risk
    
    print(f"Example {i+1}: GPA={gpa}, Attendance={attendance}%, Study Hours={study_hours}")
    print(f"   Prediction: {risk_status}, Expected: {expected_status}")
    print(f"   Criteria Check: GPA {'>6.0' if gpa > 6.0 else '≤6.0'}, " +
          f"Attendance {'>60%' if attendance > 60 else '≤60%'}, " +
          f"Study Hours {'≥5' if study_hours >= 5 else '<5'}")
    print(f"   Correct: {'✓' if correct else '✗'}")
    print()

# Calculate feature importance
coef = model.coef_[0]
feature_names = ['GPA', 'Attendance', 'Study Hours']
print("\nFeature importance:")
for feature, importance in zip(feature_names, coef):
    print(f"{feature}: {importance}")

# Save the trained model
model_path = 'F:\\BrightPath\\BrightPath\\backend\\python_services\\academic_risk_model_v4.pkl'  # Replace with your path: 'F:\\BrightPath\\BrightPath\\backend\\python_services\\academic_model(2nd).pkl'
joblib.dump(model, model_path)

# Load the model to verify
loaded_model = joblib.load(model_path)
print("\nModel successfully saved and loaded:", loaded_model)

# Final verification with original problematic cases
orig_test = np.array([
    [6.0, 61.0, 5.1],  # Should be Not at Risk
    [5.9, 80.0, 6.0]   # Should be At Risk
])

print("\nFinal verification of previously problematic cases:")
for i, test_case in enumerate(orig_test):
    gpa, attendance, study_hours = test_case
    prediction = loaded_model.predict([test_case])[0]
    risk_status = "At Risk" if prediction == 1 else "Not at Risk"
    
    # Determine expected status based on rules
    expected_risk = 1 if (gpa <= 6.0 or attendance <= 60.0 or study_hours < 5.0) else 0
    expected_status = "At Risk" if expected_risk == 1 else "Not at Risk"
    
    correct = prediction == expected_risk
    
    print(f"Test {i+1}: GPA={gpa}, Attendance={attendance}%, Study Hours={study_hours}")
    print(f"   Prediction: {risk_status}, Expected: {expected_status}")
    print(f"   Correct: {'✓' if correct else '✗'}")