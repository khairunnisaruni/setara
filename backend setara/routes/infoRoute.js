// routes/infoRoutes.js
import express from "express";
import { 
    getInfo, 
    createInfo, 
    updateInfo, 
    deleteInfo 
} from "../controllers/infoController.js";

const router = express.Router();

router.get("/", getInfo);
router.post("/", createInfo);
router.put("/:id", updateInfo);
router.delete("/:id", deleteInfo);

export default router;