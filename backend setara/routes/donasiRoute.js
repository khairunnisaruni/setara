import express from "express";
import { 
    getDonations, 
    createDonation, 
    updateDonation, 
    deleteDonation,
    updateDonationStatus 
} from "../controllers/donasiController.js";
import upload from "../middleware/upload.js"; 

const router = express.Router(); // <--- Pastikan variable ini namanya 'router'

router.get("/", getDonations);
router.post("/", upload.single('poster'), createDonation);
router.put("/:id", upload.single('poster'), updateDonation);
router.delete("/:id", deleteDonation);
router.patch("/:id/status", updateDonationStatus);

// INI YANG HILANG TADI:
export default router;