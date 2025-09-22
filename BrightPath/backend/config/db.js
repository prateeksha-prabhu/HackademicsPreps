import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Database Connected'));
    await mongoose.connect(`${process.env.MONGODB_URI}/brightpath`);
    console.log('MongoDB connection established');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
