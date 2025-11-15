import express from "express";
import protect from "../middleware/authmiddleware.js";
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
} from "../controllers/ai.controller.js";

const AIRouter = express.Router();

AIRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);
AIRouter.post("/enhance-job-desc", protect, enhanceJobDescription);

export default AIRouter;
