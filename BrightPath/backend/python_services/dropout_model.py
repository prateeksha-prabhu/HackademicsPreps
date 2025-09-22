import joblib
from sklearn.linear_model import LogisticRegression
import numpy as np

# Simulated data (replace with actual training data)
# X_train should be a 2D array (features)
# y_train should be a 1D array (labels, e.g., 0 for no dropout, 1 for dropout)
#X_train = np.array([[10, 2, 5], [5, 1, 3], [8, 3, 6]])  # Example features
#y_train = np.array([0, 1, 0])  # Example labels (0 = no dropout, 1 = dropout)
# Features: Test Completion Rate, Notifications Ignored, Course Progress
X_train = np.array([
    [80, 3, 60], 
    [50, 7, 40], 
    [90, 2, 70], 
    [65, 10, 30], 
    [75, 4, 55], 
    [40, 6, 20], 
    [85, 1, 80], 
    [30, 12, 25], 
    [95, 0, 90], 
    [60, 8, 45]
])

# Labels (Dropout Risk: 0 = Not at Risk, 1 = At Risk)
y_train = np.array([0, 1, 0, 1, 0, 1, 0, 1, 0, 1])

# Train your model
model = LogisticRegression()
model.fit(X_train, y_train)

# Save the trained model
joblib.dump(model,'F:\\BrightPath\\BrightPath\\backend\\python_services\\dropout_model(2nd).pkl')

# Check if model is saved by loading it again
loaded_model = joblib.load('F:\\BrightPath\\BrightPath\\backend\\python_services\\dropout_model(2nd).pkl')
print("Model successfully saved and loaded:", loaded_model)
