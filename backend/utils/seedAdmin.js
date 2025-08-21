import bcrypt from "bcryptjs";
import User from "../models/User.js";

const seedAdmin = async () => {
  try {
    const adminEmail = "admin@clinic.com";

    // always remove old admin before creating new
    await User.deleteOne({ email: adminEmail });

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created: admin@clinic.com / admin123");
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  }
};

export default seedAdmin;
