# BrightPath Quick Start Guide

This guide provides quick instructions to get the BrightPath application up and running.

## Starting the Application

### 1. Start the Backend Server

```bash
cd BrightPath/backend
npm run dev
```

This will start the Node.js/Express backend server on port 4000.

### 2. Start the Admin Panel (React)

```bash
cd BrightPath/admin
npm run dev
```

This will start the React admin panel on port 5174.

### 3. Serve the Static Files

```bash
# From the project root
serve -p 8000
```

This will serve the static HTML files on port 8000.

## Accessing the Application

1. Open your browser and navigate to:
   - Main Landing Page: `http://localhost:8000/index.html`

2. From the landing page, you can access:
   - Admin Login: Redirects to the React Admin Panel (`http://localhost:5174/adminPanel`)
   - Parent Login: Redirects to the Parent Portal
   - Student Login: Redirects to the Student Login page

## Test Credentials

### Admin Login
- Email: admin@brightpath.edu
- Password: admin123

### Parent Login
- Direct access (no authentication required for the demo)

### Student Login
- Roll Number: S101, S102, or S103
- Password: student123

## Troubleshooting

### 404 Not Found Errors
- Make sure all servers are running
- Check that the paths in the HTML files are correct
- Try using the browser's developer tools to see any errors

### Chatbot Not Loading
- Check that the paths to the chatbot iframe are correct
- The chatbot should be accessible at `../chatbot/frontend/index.html` from the pages directory

### MongoDB Connection Issues
- Verify MongoDB is running
- Check the connection string in the backend .env file
