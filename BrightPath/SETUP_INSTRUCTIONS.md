# BrightPath Setup Instructions

This document provides detailed instructions for setting up and testing the BrightPath Academic Insights Platform.

## Quick Start Guide

### 1. Install Dependencies

First, install all the required dependencies for the backend, frontend, and admin panel:

```bash
# Install backend dependencies
cd BrightPath/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install admin panel dependencies
cd ../admin
npm install
```

### 2. Configure Environment Variables

Create `.env` files in the following directories:

**Backend (.env in BrightPath/backend/)**
```
PORT=4000
MONGO_URI=mongodb://localhost:27017/brightpath
JWT_SECRET=your_secret_key_here
```

**Frontend (.env in BrightPath/frontend/)**
```
VITE_BACKEND_URL=http://localhost:4000
```

**Admin Panel (.env in BrightPath/admin/)**
```
VITE_BACKEND_URL=http://localhost:4000
```

### 3. Start the Services

#### Start the Backend Server
```bash
cd BrightPath/backend
npm run dev
```

#### Start the Frontend (Parent Portal)
```bash
cd BrightPath/frontend
npm run dev
```

#### Start the Admin Panel
```bash
cd BrightPath/admin
npm run dev
```

#### Serve the Static Files
```bash
# From the project root
npx serve -p 8000
```

### 4. Access the Application

Open your browser and navigate to:
- Main Landing Page: `http://localhost:8000/BrightPath/index.html`
- If that doesn't work, try: `http://localhost:8000/index.html`

## File Structure Overview

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
│   │   ├── Dropout_predictor_updated.html
│   │   ├── Parent_portal.html
│   │   ├── Parent_portal_updated.html
│   │   └── StudentLogin.html
│   └── index.html         # Main landing page
└── Data/                  # Data files for ML models
```

## Using the Updated Pages

We've created updated versions of the Parent Portal and Dropout Predictor pages with enhanced functionality:

1. To use the updated Parent Portal:
   - Rename `Parent_portal_updated.html` to `Parent_portal.html` (after backing up the original)
   - This version includes MongoDB integration and improved UI

2. To use the updated Dropout Predictor:
   - Rename `Dropout_predictor_updated.html` to `Dropout_predictor.html` (after backing up the original)
   - This version includes student login integration and pre-filled data

## Test Credentials

### Admin Login
- Email: admin@brightpath.edu
- Password: admin123

### Parent Login
- Email: parent@example.com
- Password: parent123

### Student Login
- Roll Number: S101, S102, or S103
- Password: student123

## Troubleshooting

### Permission Issues

If you encounter permission issues with npm scripts:
```bash
chmod +x node_modules/.bin/vite
```

### Path Issues with Chatbot

If the chatbot is not loading properly in the pages:
1. Make sure the paths in the iframe src attributes are correct
2. The updated pages use relative paths (`../chatbot/frontend/index.html`) instead of absolute paths (`/BrightPath/chatbot/frontend/index.html`)
3. If you're still having issues, check the browser console for any errors related to the chatbot paths

### Login Redirect Issues

If the login redirects are not working:
1. We've updated all redirects to use relative paths instead of absolute paths
2. The admin login now redirects to a static HTML page (`admin/login.html`) that works with the static server
3. The parent login redirects directly to the Parent_portal.html page
4. The student login redirects to the StudentLogin.html page

### MongoDB Connection Issues

If MongoDB fails to connect:
1. Verify MongoDB is running: `mongod --version`
2. Check your connection string in the `.env` file
3. Try connecting manually: `mongo mongodb://localhost:27017/brightpath`

### Path Issues

If you encounter 404 errors:
1. Check that you're serving files from the correct directory
2. Verify that file paths in HTML files are correct
3. Try using absolute paths instead of relative paths

## Additional Resources

- MongoDB Documentation: [https://docs.mongodb.com/](https://docs.mongodb.com/)
- React Documentation: [https://reactjs.org/docs/getting-started.html](https://reactjs.org/docs/getting-started.html)
- Express.js Documentation: [https://expressjs.com/en/guide/routing.html](https://expressjs.com/en/guide/routing.html)
- Vite Documentation: [https://vitejs.dev/guide/](https://vitejs.dev/guide/)
