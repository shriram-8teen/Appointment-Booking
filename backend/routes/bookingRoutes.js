// backend/routes/bookingRoutes.js
import { Router } from "express";
import { protect, requireRole } from "../middleware/auth.js";
import { createBooking, myBookings, allBookings, cancelBooking } from "../controllers/bookingController.js";

const router = Router();

// Spec: POST /api/book – { slotId }
router.post("/book", protect, createBooking);

// Spec: GET /api/my-bookings – patient
router.get("/my-bookings", protect, myBookings);

// Spec: GET /api/all-bookings – admin
router.get("/all-bookings", protect, requireRole("admin"), allBookings);

// Optional: DELETE /api/bookings/:id – cancel
router.delete("/bookings/:id", protect, cancelBooking);

export default router;
