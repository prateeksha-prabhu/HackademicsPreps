# BrightPath Quick Start Guide

This guide provides quick instructions to get the BrightPath AI-powered academic risk prediction platform up and running.

## Prerequisites

- Node.js (v16+)
- Python 3 (v3.8+)
- MongoDB (local or cloud)

## Quick Setup

### 1. Install Dependencies

```bash
# Backend
cd BrightPath/backend
npm install

# Frontend
cd ../frontend
npm install

# Admin Panel
cd ../admin
npm install

# Python ML dependencies
cd ../backend/python_services
pip install scikit-learn pandas numpy joblib
```

### 2. Start All Services

**Terminal 1 - Backend Server:**
```bash
cd BrightPath/backend
npm start
```
Backend runs on `http://localhost:4000`

**Terminal 2 - Frontend:**
```bash
cd BrightPath/frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

**Terminal 3 - Admin Panel:**
```bash
cd BrightPath/admin
npm run dev
```
Admin Panel runs on `http://localhost:5174`

## Accessing the Application

### Main Application URLs
- **Frontend Home**: `http://localhost:5173`
- **Parent Portal**: `http://localhost:5173/parent-portal`
- **Student Dashboard**: `http://localhost:5173/student-dashboard`
- **Student Predictor**: `http://localhost:5173/student-predictor`
- **Admin Panel**: `http://localhost:5174`

### Landing Page (Optional)
```bash
# From project root
npx serve -p 8000
```
Then access: `http://localhost:8000/index.html`

## Test Credentials

### Admin Login
- Email: admin@brightpath.edu
- Password: admin123

### Parent Login
- Direct access (no authentication required for the demo)

### Student Login
- Roll Number: S101, S102, or S103 (demo data)
- Password: student123

## AI/ML Features Demo

### Test Data Available
- **S101**: Anjali R - 10th Grade (Demo student with social media data)
- **S102**: Kiran M - 9th Grade (Demo student with academic data)
- **S103**: Rahul P - 11th Grade (Demo student with combined data)

### Prediction Features
1. **Dropout Risk Prediction**: Based on test completion, notifications ignored, course progress
2. **Social Media Impact**: Analyzes usage patterns and their effect on academics
3. **Academic Performance**: Predicts future performance based on GPA, attendance, study hours
4. **Combined Risk Assessment**: Holistic view using all available data

## Troubleshooting

### Recent Fixes Applied ✅
- **Parent Portal Routing**: Fixed "site can't be reached" issue on first visit
- **Python Spawn Errors**: Updated to use `python3` instead of `python`
- **HTTP Headers Error**: Fixed multiple response issue in social media controller
- **Scikit-learn Warnings**: Suppressed version compatibility warnings

### Common Issues

1. **Python spawn error**:
   ```bash
   # Ensure Python 3 is available
   python3 --version
   # Install required packages
   pip install scikit-learn pandas numpy joblib
   ```

2. **Parent Portal not loading**:
   - Clear browser cache
   - Ensure accessing `http://localhost:5173/parent-portal`
   - Check browser console for errors

3. **Backend crashes**:
   - Check MongoDB is running
   - Verify `.env` file exists with correct settings
   - Use `rs` in nodemon to restart

4. **Frontend routing issues**:
   - Refresh the page
   - Check that all servers are running
   - Verify Vite dev server is on correct port

### Development Tips
- Use browser dev tools to debug React components
- Monitor backend terminal for API errors
- Check Network tab for failed API requests
- Use `rs` command to restart nodemon server
