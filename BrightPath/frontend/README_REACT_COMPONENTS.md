# React Components for BrightPath

This folder contains React components for the BrightPath application. These components provide enhanced functionality and a better user experience compared to the static HTML pages.

## New Components

### 1. ChatbotComponent
A React-based chatbot component that can be used in any page. It includes:
- Modern UI with suggestion chips
- Typing indicators
- Animated responses
- Pre-programmed responses for common questions

### 2. ParentPortal
A React version of the Parent Portal page with:
- Student search functionality
- Risk level calculation and display
- MongoDB integration for fetching student data
- Responsive design

### 3. StudentDashboard
A new dashboard page for students with:
- Overview of attendance, grades, and risk level
- Interactive charts using Recharts
- Risk distribution visualization
- Personalized recommendations based on risk level
- Navigation to the risk predictor

### 4. StudentPredictor
A React version of the Dropout Predictor page with:
- Input validation
- Risk calculation
- Visual indicators for risk levels
- Integration with student login

### 5. StudentLogin
A React-based login page for students with:
- Credential validation
- Session storage for maintaining login state
- Error handling
- "Remember me" functionality

## How to Use These Components

### Option 1: Use the React Components

1. Update the App.jsx file to use the new components:
   ```jsx
   import ParentPortal from './pages/ParentPortal';
   import StudentLogin from './pages/StudentLogin';
   import StudentDashboard from './pages/StudentDashboard';
   import StudentPredictor from './pages/StudentPredictor';
   
   // Add routes in your Routes component
   <Route path="/parent-portal" element={<ParentPortal />} />
   <Route path="/student-login" element={<StudentLogin />} />
   <Route path="/student-dashboard" element={<StudentDashboard />} />
   <Route path="/student-predictor" element={<StudentPredictor />} />
   ```

2. Update the main.jsx file to include Font Awesome for icons:
   ```jsx
   import '@fortawesome/fontawesome-free/css/all.min.css'
   ```

3. Install required dependencies:
   ```bash
   npm install recharts @fortawesome/fontawesome-free
   ```

### Option 2: Quick Start with Updated Files

1. Replace your existing App.jsx with App_updated.jsx:
   ```bash
   mv src/App_updated.jsx src/App.jsx
   ```

2. Replace your existing main.jsx with main_updated.jsx:
   ```bash
   mv src/main_updated.jsx src/main.jsx
   ```

3. Install required dependencies:
   ```bash
   npm install recharts @fortawesome/fontawesome-free
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Accessing the Components

After starting the development server, you can access the components at:

- Parent Portal: http://localhost:5173/parent-portal
- Student Login: http://localhost:5173/student-login
- Student Dashboard: http://localhost:5173/student-dashboard
- Student Predictor: http://localhost:5173/student-predictor

## Test Credentials

### Student Login
- Roll Number: S101, S102, or S103
- Password: student123
