// backend/models/Slot.js
import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    doctor: { type: String, required: true, default: "General" },
    startAt: { type: Date, required: true, index: true }, // UTC
    endAt: { type: Date, required: true },
    isBooked: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

// Avoid duplicate slot time for same doctor
slotSchema.index({ doctor: 1, startAt: 1 }, { unique: true });

const Slot = mongoose.models.Slot || mongoose.model("Slot", slotSchema);
export default Slot;
