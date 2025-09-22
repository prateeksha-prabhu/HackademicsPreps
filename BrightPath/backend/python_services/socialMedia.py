import joblib
from sklearn.linear_model import LogisticRegression
import numpy as np

# Features: [Average Session Duration, Activity Breakdown, Daily Usage, Weekly Usage, Daily Notifications, Weekly Notifications]
X_train = np.array([
    # Low Risk (✅)
    [20, 18, 45, 350, 70, 500],    # Normal low usage
    [15, 20, 35, 280, 50, 400],    # Minimal usage
    [10, 15, 25, 200, 40, 300],    # Extreme low
    [28, 22, 50, 380, 65, 490],    # Moderate low activity
    [25, 18, 48, 360, 70, 510],    # Slightly increased but still low risk

    # Moderate Risk (⚠️)
    [35, 40, 90, 700, 150, 1000],   # Moderate session duration and notifications
    [50, 55, 120, 850, 180, 1200],  # Balanced moderate usage
    [65, 60, 140, 1100, 190, 1350], # Close to high risk but still moderate
    [40, 38, 80, 620, 120, 850],    # Lower end of moderate risk
    [55, 50, 130, 900, 160, 1150],  # Higher end of moderate risk

    # High Risk (❌)
    [85, 92, 220, 1650, 280, 1950], # Very high usage, extremely high notifications
    [88, 97, 210, 1600, 270, 1850], # Extreme high usage, excessive notifications
    [100, 99, 260, 1900, 350, 2500],# Worst case scenario
    [95, 100, 250, 1800, 320, 2200],# Maximum usage, extreme notifications
    [90, 85, 200, 1500, 260, 1700]  # High but slightly lower than worst-case
])

# Labels: 0 = Low Risk, 1 = Moderate Risk, 2 = High Risk
y_train = np.array([
    0, 0, 0, 0, 0,  # Low Risk ✅
    1, 1, 1, 1, 1,  # Moderate Risk ⚠️
    2, 2, 2, 2, 2   # High Risk ❌
])

# Initialize and train the Logistic Regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Save the trained model to a file
joblib.dump(model, 'F:\\BrightPath\\BrightPath\\backend\\python_services\\social_media_dropout_model(5th).pkl')

# Check if the model is saved correctly by loading it again
loaded_model = joblib.load('F:\\BrightPath\\BrightPath\\backend\\python_services\\social_media_dropout_model(5th).pkl')

print("Model successfully saved and loaded:", loaded_model)
