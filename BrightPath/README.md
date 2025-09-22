# Empowering Parental Engagement Through Real-Time Academic Insights

## Description
Parents often face difficulties in accessing accurate and up-to-date information about their children’s academic performance, including attendance records, internal marks, and general student details. This lack of transparency and real-time access creates a communication gap between parents and educational institutions, making it challenging for parents to stay actively involved in their child’s academic journey. The problem is further compounded by the absence of a centralized and secure platform to provide this information efficiently and reliably.

This project aims to solve these challenges by creating a **Real-Time Academic Insights Platform** using React.js, Node.js, Express, and MongoDB. The platform includes separate panels for administrators and users (parents) to manage and access academic information seamlessly.

---

## Features

### Admin Panel
- **User Management**: Add, update, and delete student and parent profiles.
- **Attendance Management**: Upload and update student attendance records.
- **Marks Management**: Add and manage internal marks for students.
- **Notifications**: Send updates and important announcements to parents.
- **Dashboard**: Overview of the academic data.

### User Panel (Parents)
- **View Attendance**: Real-time updates on the student’s attendance.
- **Check Marks**: Access internal and other academic performance metrics.
- **Student Details**: View general student information like class, section, and roll number.
- **Notifications**: Receive updates and announcements from the admin.

---

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **State Management**: Context API (or Redux, if preferred)
- **Styling**: CSS/Bootstrap/TailwindCSS

---

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/academic-insights.git
   ```
2. Navigate to the project directory:
   ```bash
   cd brightpath
   ```

3. Install dependencies for both frontend and backend:

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

4. Create a `.env` file in the `backend` directory with the following details:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development servers:

   - **Backend**
     ```bash
     cd backend
     npm run dev
     ```
   - **Frontend**
     ```bash
     cd ../frontend
     npm start
     ```

6. Access the application:
   - Admin Panel: `http://localhost:3000/admin`
   - User Panel: `http://localhost:3000/user`

---

## Folder Structure
```
academic-insights/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
│   └── public/
└── README.md
```

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

