// backend/routes/slotRoutes.js
import { Router } from "express";
import { protect, requireRole } from "../middleware/auth.js";
import { createSlot, getSlots } from "../controllers/slotController.js";

const router = Router();

// Admin only: create slot
router.post("/", protect, requireRole("admin"), createSlot);

// Anyone authenticated or anon can list? Spec doesn't require auth to list.
// We'll allow public listing.
router.get("/", getSlots);

export default router;
