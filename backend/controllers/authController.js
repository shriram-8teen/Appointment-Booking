// backend/controllers/authController.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "name, email, password required" } });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: { code: "EMAIL_EXISTS", message: "Email already registered" } });
    }
    const user = await User.create({ name, email, password, role: role === "admin" ? "admin" : "patient" });
    const token = signToken(user);
    return res.status(201).json({ token, role: user.role, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ error: { code: "SERVER_ERROR", message: err.message } });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "email and password required" } });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });

    const ok = await user.matchPassword(password);
    if (!ok) return res.status(401).json({ error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });

    const token = signToken(user);
    return res.status(200).json({ token, role: user.role, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(500).json({ error: { code: "SERVER_ERROR", message: err.message } });
  }
};
