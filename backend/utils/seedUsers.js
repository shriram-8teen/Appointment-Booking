import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import User from "../models/User.js";

const run = async () => {
  try {
    await connectDB();

    const ensure = async (name, email, password, role) => {
      let u = await User.findOne({ email });
      if (!u) {
        u = new User({ name, email, password, role });
        await u.save();
        console.log(`Seeded: ${email} (${role})`);
      } else {
        console.log(`Exists: ${email}`);
      }
    };

    await ensure("Clinic Admin", "admin@example.com", "Passw0rd!", "admin");
    await ensure("Demo Patient", "patient@example.com", "Passw0rd!", "patient");

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

run();
