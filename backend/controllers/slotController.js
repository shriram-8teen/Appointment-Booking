// backend/controllers/slotController.js
import Slot from "../models/Slot.js";

// Admin: create a single slot
export const createSlot = async (req, res) => {
  try {
    const { doctor = "General", date, time } = req.body;
    if (!date || !time) {
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "date and time are required" } });
    }
    // Build UTC start/end from date+time (e.g., "2025-08-25", "10:00")
    const startLocal = new Date(`${date}T${time}`);
    if (isNaN(startLocal.getTime())) {
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "Invalid date/time format" } });
    }
    const startAt = new Date(startLocal.toISOString()); // persist as UTC
    const endAt = new Date(startAt.getTime() + 30 * 60 * 1000);

    const slot = await Slot.create({ doctor, startAt, endAt });
    return res.status(201).json(slot);
  } catch (err) {
    // Handle unique constraint nicely
    if (err?.code === 11000) {
      return res.status(409).json({ error: { code: "SLOT_EXISTS", message: "Slot already exists for that time" } });
    }
    return res.status(500).json({ error: { code: "SERVER_ERROR", message: err.message } });
  }
};

// List available slots in range (default next 7 days, 09:00–17:00 seeded)
export const getSlots = async (req, res) => {
  try {
    const from = req.query.from ? new Date(`${req.query.from}T00:00:00Z`) : new Date();
    const to = req.query.to ? new Date(`${req.query.to}T23:59:59Z`) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    if (isNaN(from.getTime()) || isNaN(to.getTime()) || from > to) {
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "Invalid date range" } });
    }

    const slots = await Slot.find({
      startAt: { $gte: from, $lte: to },
      isBooked: false,
    })
      .sort({ startAt: 1 })
      .lean();

    return res.json(slots);
  } catch (err) {
    return res.status(500).json({ error: { code: "SERVER_ERROR", message: err.message } });
  }
};
