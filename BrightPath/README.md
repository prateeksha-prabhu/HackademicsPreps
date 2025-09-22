# BrightPath - AI-Powered Academic Risk Prediction Platform

## Description
BrightPath is an advanced educational platform that empowers parents, students, and administrators with real-time academic insights and AI-powered risk prediction. The platform addresses the critical need for early intervention in student academic performance by analyzing multiple data points including attendance, academic performance, social media usage patterns, and behavioral indicators.

This comprehensive solution uses machine learning algorithms to predict student dropout risk and provides actionable insights to help educators and parents take proactive measures to ensure student success. Built with modern web technologies including React.js, Node.js, Express, MongoDB, and Python-based ML models.

---

## Features

### 🤖 AI-Powered Risk Prediction
- **Dropout Risk Analysis**: Machine learning models predict student dropout risk using multiple data points
- **Social Media Impact Assessment**: Analyze how social media usage affects academic performance
- **Academic Performance Prediction**: Predict future academic outcomes based on current trends
- **Early Warning System**: Automated alerts for students at risk

### 👨‍💼 Admin Panel
- **User Management**: Add, update, and delete student and parent profiles
- **Attendance Management**: Upload and update student attendance records
- **Marks Management**: Add and manage internal marks for students
- **Risk Dashboard**: Monitor students at risk with AI-powered insights
- **Prediction Analytics**: View detailed risk analysis and recommendations
- **Notifications**: Send updates and important announcements to parents

### 👨‍👩‍👧‍👦 Parent Portal
- **Student Risk Overview**: View your child's academic risk level with detailed analysis
- **Real-time Attendance**: Access up-to-date attendance records
- **Academic Performance**: Check marks, grades, and performance trends
- **Social Media Insights**: Understand how social media usage impacts academic performance
- **Personalized Recommendations**: Get actionable advice to support your child's success
- **Interactive Chatbot**: Get instant answers to common questions

### 🎓 Student Dashboard
- **Personal Risk Assessment**: View your own academic risk level and contributing factors
- **Performance Analytics**: Track your academic progress over time
- **Study Recommendations**: Get personalized study suggestions based on AI analysis
- **Goal Setting**: Set and track academic goals with AI-powered insights

---

## Tech Stack
- **Frontend**: React.js with Vite, TailwindCSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **AI/ML**: Python with scikit-learn, pandas, numpy
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Process Management**: Child Process for Python integration
- **Development**: Nodemon, Vite Dev Server

---

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **Python 3** (v3.8 or higher)
- **MongoDB** (local or cloud instance)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/BrightPath.git
   ```
2. Navigate to the project directory:
   ```bash
   cd BrightPath
   ```

3. Install dependencies for all components:

   - **Backend**
     ```bash
     cd backend
     npm install
     ```
   - **Frontend**
     ```bash
     cd ../frontend
     npm install
     ```
   - **Admin Panel**
     ```bash
     cd ../admin
     npm install
     ```

4. Set up Python environment for ML models:
   ```bash
   cd backend/python_services
   pip install scikit-learn pandas numpy joblib
   ```

5. Create a `.env` file in the `backend` directory:
   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/brightpath
   JWT_SECRET=your_jwt_secret_here
   ```

6. Start the development servers:

   - **Backend** (Terminal 1)
     ```bash
     cd backend
     npm start
     ```
   - **Frontend** (Terminal 2)
     ```bash
     cd frontend
     npm run dev
     ```
   - **Admin Panel** (Terminal 3)
     ```bash
     cd admin
     npm run dev
     ```

7. Access the application:
   - **Frontend**: `http://localhost:5173`
   - **Admin Panel**: `http://localhost:5174`
   - **Parent Portal**: `http://localhost:5173/parent-portal`
   - **Student Dashboard**: `http://localhost:5173/student-dashboard`
   - **Backend API**: `http://localhost:4000`

---

## Folder Structure
```
BrightPath/
├── backend/
│   ├── controllers/          # API route handlers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # Express routes
│   ├── python_services/     # ML prediction scripts
│   │   ├── *.py            # Python prediction models
│   │   └── *.pkl           # Trained ML models
│   ├── config/             # Database configuration
│   └── server.js           # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context providers
│   │   └── App.jsx         # Main app component
│   ├── public/
│   │   └── _redirects      # SPA routing fallback
│   └── vite.config.js      # Vite configuration
├── admin/
│   ├── src/                # Admin panel source
│   └── public/             # Admin panel assets
├── chatbot/
│   ├── backend/            # Chatbot API
│   └── frontend/           # Chatbot UI
└── README.md
```

---

## AI/ML Models

### Prediction Models
BrightPath uses multiple machine learning models to predict student outcomes:

1. **Dropout Risk Prediction** (`prediction.py`)
   - Features: test completion rate, notifications ignored, course progress
   - Model: Logistic Regression
   - Output: "At Risk" or "Not At Risk"

2. **Social Media Impact Analysis** (`social_media_prediction.py`)
   - Features: usage patterns, session duration, notifications
   - Model: Logistic Regression
   - Output: Risk level (0-2 scale)

3. **Academic Performance Prediction** (`academic_prediction.py`)
   - Features: GPA, attendance, study hours
   - Model: Logistic Regression
   - Output: Academic risk assessment

4. **Combined Risk Assessment** (`prediction_media.py`)
   - Features: Academic + social media + behavioral data
   - Model: Ensemble approach
   - Output: Comprehensive risk analysis

### Model Training
Models are pre-trained and stored as `.pkl` files. To retrain models:
```bash
cd backend/python_services
python academic_model_train.py
```

---

## Troubleshooting

### Common Issues

1. **Python spawn error**: 
   - Ensure Python 3 is installed and accessible as `python3`
   - Check that all required Python packages are installed

2. **Parent Portal "site can't be reached"**:
   - This was fixed in recent updates
   - Ensure you're accessing `http://localhost:5173/parent-portal`
   - Clear browser cache if issues persist

3. **HTTP headers error**:
   - Fixed in recent backend updates
   - Restart the backend server if you see this error

4. **MongoDB connection issues**:
   - Ensure MongoDB is running locally or update connection string
   - Check `.env` file configuration

5. **Scikit-learn version warnings**:
   - These are suppressed in the code but don't affect functionality
   - Models work across different scikit-learn versions

### Development Tips
- Use `rs` in nodemon to restart the backend server
- Frontend hot-reload should work automatically
- Check browser console for React errors
- Monitor backend terminal for API errors

---

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/feature-name
   ```
5. Create a Pull Request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments
- Inspiration for building this project stems from the need to bridge the communication gap between parents and educational institutions.
- Special thanks to open-source contributors and online learning platforms for their resources.

---

Feel free to raise issues or submit suggestions to improve the platform further.

