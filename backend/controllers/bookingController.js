// backend/controllers/bookingController.js
import Booking from "../models/Booking.js";
import Slot from "../models/Slot.js";

// Create booking (patient)
// Atomic guard: only flip isBooked from false->true when booking, else SLOT_TAKEN
export const createBooking = async (req, res) => {
  try {
    const { slotId } = req.body;
    if (!slotId) {
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "slotId is required" } });
    }

    // Atomically mark slot as booked if currently free
    const slot = await Slot.findOneAndUpdate(
      { _id: slotId, isBooked: false },
      { $set: { isBooked: true } },
      { new: true }
    );

    if (!slot) {
      return res.status(409).json({ error: { code: "SLOT_TAKEN", message: "This slot is already booked" } });
    }

    try {
      const booking = await Booking.create({ user: req.user.id, slot: slot._id });
      return res.status(201).json(booking);
    } catch (err) {
      // Rollback slot flag if unique constraint on booking fires (extreme race case)
      await Slot.updateOne({ _id: slotId }, { $set: { isBooked: false } });
      if (err?.code === 11000) {
        return res.status(409).json({ error: { code: "SLOT_TAKEN", message: "This slot is already booked" } });
      }
      throw err;
    }
  } catch (err) {
    return res.status(500).json({ error: { code: "SERVER_ERROR", message: err.message } });
  }
};

// My bookings (patient)
export const myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("slot")
      .sort({ createdAt: -1 })
      .lean();
    return res.json(bookings);
  } catch (err) {
    return res.status(500).json({ error: { code: "SERVER_ERROR", message: err.message } });
  }
};

// All bookings (admin)
export const allBookings = async (_req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("slot")
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .lean();
    return res.json(bookings);
  } catch (err) {
    return res.status(500).json({ error: { code: "SERVER_ERROR", message: err.message } });
  }
};

// Optional: cancel booking (patient can cancel own; admin can cancel any)
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: { code: "NOT_FOUND", message: "Booking not found" } });
    }

    // RBAC: patient can cancel only their booking
    if (req.user.role !== "admin" && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ error: { code: "FORBIDDEN", message: "Not allowed to cancel this booking" } });
    }

    // free slot
    await Slot.updateOne({ _id: booking.slot }, { $set: { isBooked: false } });
    await booking.deleteOne();

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: { code: "SERVER_ERROR", message: err.message } });
  }
};
