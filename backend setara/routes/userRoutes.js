// backend setara/routes/userRoutes.js
import express from "express";
import {
  registerUser,
  getAllUsers,
  loginUser,
  getProfile,
  updateProfile,
  updatePassword,
} from "../controllers/userController.js";

import { getUsers, deleteUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);          // POST /api/users/register
router.post("/login", loginUser);                // POST /api/users/login
router.get("/", getAllUsers);                    // GET  /api/users
router.get("/profile", protect, getProfile);     // GET  /api/users/profile
router.put("/profile", protect, updateProfile);  // PUT  /api/users/profile
router.put("/password", protect, updatePassword); // PUT /api/users/password

router.get("/", getUsers);
router.delete("/:id", deleteUser);


export default router;
