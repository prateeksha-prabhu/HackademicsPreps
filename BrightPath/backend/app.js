import express from 'express';
import attendanceRoutes from './routes/attendanceRoutes.js';
// import studentRoutes from './routes/studentRoutes.js';


import cors from 'cors'
import connectDB from './config/db.js';
import errorHandler from './python_services/utils/errorHandler.js';


const app = express();


connectDB()

app.use(cors())

app.use(express.json());

// API routes
app.use('/api/attendance', attendanceRoutes);
// app.use('/api/students', studentRoutes);


// Error handling
app.use(errorHandler);










export default app;
