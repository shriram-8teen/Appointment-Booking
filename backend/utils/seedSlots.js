// backend/utils/seedSlots.js
import Slot from "../models/Slot.js";

/**
 * Seed next 7 days, 09:00–17:00, 30-min intervals, if not already present.
 * Uses UTC times—document this choice in README and be consistent on frontend.
 */
export default async function seedSlots() {
  const already = await Slot.estimatedDocumentCount();
  if (already > 0) return; // don't reseed if you already have data

  const days = 7;
  const startHour = 9;
  const endHour = 17;
  const intervalMinutes = 30;

  const slots = [];
  const now = new Date();

  // start today at 00:00 UTC
  const startDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));

  for (let d = 0; d < days; d++) {
    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += intervalMinutes) {
        const startAt = new Date(startDay.getTime() + d * 24 * 60 * 60 * 1000);
        startAt.setUTCHours(h, m, 0, 0);
        const endAt = new Date(startAt.getTime() + intervalMinutes * 60 * 1000);

        slots.push({
          doctor: "General",
          startAt,
          endAt,
          isBooked: false,
        });
      }
    }
  }

  if (slots.length) {
    await Slot.insertMany(slots, { ordered: false });
    console.log(`🌱 Seeded ${slots.length} slots`);
  }
}
