import express from "express";
import {
  getUserResumes,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import protect from "../middleware/authmiddleware.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/resumes", protect, getUserResumes);

export default UserRouter;
