import express from "express";
import {
  createResume,
  deleteResume,
} from "../controllers/resume.controller.js";
import protect from "../middleware/authmiddleware.js";

const ResumeRouter = express.Router();

ResumeRouter.post("/create", protect, createResume);
ResumeRouter.delete("/delete/:resumeId", protect, deleteResume);

export default ResumeRouter;
