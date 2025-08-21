// backend/routes/compatRoutes.js
import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { createBooking, myBookings, allBookings } from "../controllers/bookingController.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = Router();

/**
 * Compatibility routes to match the take-home spec exactly:
 * POST  /api/register     -> register
 * POST  /api/login        -> login
 * POST  /api/book         -> book slot (patient only)
 * GET   /api/my-bookings  -> patient bookings
 * GET   /api/all-bookings -> admin bookings
 */

router.post("/register", register);
router.post("/login", login);

// patient books a slot
router.post("/book", protect, requireRole("patient"), createBooking);

// patient fetches own bookings
router.get("/my-bookings", protect, requireRole("patient"), myBookings);

// admin fetches all bookings
router.get("/all-bookings", protect, requireRole("admin"), allBookings);

export default router;
