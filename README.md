# BrightPath - Academic Insights Platform

## Overview
BrightPath is a comprehensive academic insights platform designed to bridge the communication gap between parents, students, and educational institutions. The platform provides real-time access to student academic performance, attendance records, and dropout risk predictions.

## Features

### Common Landing Page
- Three login options: Admin, Parent, and Student
- Modern and responsive design
- Integrated chatbot for assistance

### Admin Panel
- User Management: Add, update, and delete student and parent profiles
- Attendance Management: Upload and update student attendance records
- Marks Management: Add and manage internal marks for students
- Dropout Prediction: AI-powered prediction of student dropout risk
- Notifications: Send updates and important announcements to parents
- Dashboard: Overview of academic data

### Parent Portal
- View student details and academic performance
- Check attendance records
- Monitor dropout risk predictions
- Receive notifications from administrators

### Student Portal
- Self-assessment of dropout risk based on attendance and marks
- View personalized recommendations
- Access academic resources

### Chatbot Integration
- Available on all pages (Admin, Parent, Student)
- Provides instant assistance and answers to common questions
- Accessible via a floating button in the bottom-right corner

## Tech Stack
- **Frontend**: React.js, HTML5, CSS3, JavaScript
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **State Management**: Context API
- **Styling**: TailwindCSS
- **Machine Learning**: Python with scikit-learn for dropout prediction

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- Python 3.8+ (for ML components)
- npm or yarn

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ProjectBright.git
   cd ProjectBright
   ```

2. Install backend dependencies:
   ```bash
   cd BrightPath/backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Install admin panel dependencies:
   ```bash
   cd ../admin
   npm install
   ```

5. Install Python dependencies (for ML components):
   ```bash
   pip install -r BrightPath/backend/requirements.txt
   ```

6. Configure environment variables:
   - Create a `.env` file in the `backend` directory:
     ```
     PORT=4000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
   - Create a `.env` file in the `frontend` directory:
     ```
     VITE_BACKEND_URL=http://localhost:4000
     ```
   - Create a `.env` file in the `admin` directory:
     ```
     VITE_BACKEND_URL=http://localhost:4000
     ```

## Running the Application

### Starting the Backend Server
```bash
cd BrightPath/backend
npm run dev
```
The backend server will start on port 4000 (or the port specified in your .env file).

### Starting the Frontend Application
```bash
cd BrightPath/frontend
npm run dev
```
The frontend application will start on port 3000 by default.

### Starting the Admin Panel
```bash
cd BrightPath/admin
npm run dev
```
The admin panel will start on port 3001 by default.

### Serving the Static Pages
You can use any static file server to serve the main landing page and static HTML pages. For example, using Python's built-in HTTP server:

```bash
cd ProjectBright
python -m http.server 8000
```

Or using Node.js with a package like `serve`:
```bash
npm install -g serve
serve ProjectBright -p 8000
```

## Testing the Application

### Accessing the Application
1. Open your browser and navigate to:
   - Main Landing Page: `http://localhost:8000/BrightPath/index.html`

2. From the landing page, you can access:
   - Admin Login: Redirects to the Admin Panel
   - Parent Login: Redirects to the Parent Portal
   - Student Login: Redirects to the Dropout Predictor

### Test Credentials

#### Admin Login
- Email: admin@brightpath.edu
- Password: admin123

#### Parent Login
- Email: parent@example.com
- Password: parent123

#### Student Login
- Direct access (no authentication required for the demo)

### Testing the Chatbot
1. The chatbot button appears in the bottom-right corner of every page
2. Click the button to open the chatbot window
3. Type your question or select from suggested queries
4. The chatbot will respond with relevant information

### Testing Dropout Prediction
1. Login as a parent and enter a student roll number (e.g., S101, S102, S103)
2. View the student's dropout risk prediction
3. As a student, enter your attendance and marks to see your risk prediction

## Project Structure
```
ProjectBright/
├── BrightPath/
│   ├── admin/             # Admin panel (React)
│   ├── backend/           # Backend server (Node.js/Express)
│   ├── chatbot/           # Chatbot implementation
│   │   ├── backend/       # Chatbot server
│   │   └── frontend/      # Chatbot UI
│   ├── frontend/          # Parent portal frontend (React)
│   ├── pages/             # Static HTML pages
│   │   ├── Dropout_predictor.html
│   │   └── Parent_portal.html
│   └── index.html         # Main landing page
└── Data/                  # Data files for ML models
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running on your system
   - Check the connection string in your `.env` file

2. **Backend API Not Accessible**
   - Verify the backend server is running on the correct port
   - Check for any CORS issues in the browser console

3. **Chatbot Not Loading**
   - Ensure the paths to the chatbot iframe are correct
   - Check the browser console for any path-related errors

4. **Login Redirect Issues**
   - Verify that the redirect paths in the login components are correct
   - Check if the authentication tokens are being stored properly

## Future Enhancements
- Mobile application for easier access
- Real-time notifications via WebSockets
- Enhanced ML models for more accurate predictions
- Integration with school management systems
- Multi-language support

## Contributors
- [Your Name]
- [Other Contributors]

## License
This project is licensed under the MIT License - see the LICENSE file for details.
