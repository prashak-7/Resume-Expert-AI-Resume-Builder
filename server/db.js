import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_CONN);
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed", err);
  }
}

export default connectDB;
