import os

model_path = "F:\\BrightPath\\BrightPath\\backend\\python_services\\dropout_model.pkl"
if os.path.exists(model_path):
    print("File exists and is accessible!")
else:
    print("File not found at the specified path!")
