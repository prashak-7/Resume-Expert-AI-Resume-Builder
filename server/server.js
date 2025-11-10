import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import UserRouter from "./routes/user.route.js";
import ResumeRouter from "./routes/resume.route.js";

configDotenv();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// routes
app.use("/api/users", UserRouter);
app.use("/api/resumes", ResumeRouter);

await connectDB();
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
