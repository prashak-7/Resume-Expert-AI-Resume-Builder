import express from "express";
import {
  createResume,
  deleteResume,
  getResumeById,
  updateResume,
  getPublicResumeById,
} from "../controllers/resume.controller.js";
import protect from "../middleware/authmiddleware.js";
import upload from "../middleware/multer.js";

const ResumeRouter = express.Router();

ResumeRouter.post("/create", protect, createResume);
ResumeRouter.delete("/delete/:resumeId", protect, deleteResume);
ResumeRouter.put("/update", upload.single("image"), protect, updateResume);
ResumeRouter.get("/get/:resumeId", protect, getResumeById);
ResumeRouter.get("/public/:resumeId", getPublicResumeById);

export default ResumeRouter;
