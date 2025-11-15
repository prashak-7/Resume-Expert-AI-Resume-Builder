import express from "express";
import { configDotenv } from "dotenv";
import "dotenv/config";
import cors from "cors";
import connectDB from "./db.js";
import UserRouter from "./routes/user.route.js";
import ResumeRouter from "./routes/resume.route.js";
import AIRouter from "./routes/ai.route.js";

configDotenv();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;

// routes
app.use("/api/users", UserRouter);
app.use("/api/resumes", ResumeRouter);
app.use("/api/ai", AIRouter);

await connectDB();
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
