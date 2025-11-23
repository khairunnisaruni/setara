// backend setara/routes/userRoutes.js
import express from "express";
import {
  registerUser,
  getAllUsers,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser); // POST /api/users/register
router.post("/login", loginUser);       // POST /api/users/login
router.get("/", getAllUsers);           // GET  /api/users

export default router;
