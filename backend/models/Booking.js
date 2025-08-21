// backend/models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true, unique: true }, // unique => no double booking for same slot
  },
  { timestamps: true }
);

// (Optional) prevent the same user booking the exact same slot twice (redundant with unique on slot, but harmless)
bookingSchema.index({ user: 1, slot: 1 }, { unique: true });

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;
