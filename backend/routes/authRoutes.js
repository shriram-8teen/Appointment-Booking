// backend/routes/authRoutes.js
import { Router } from "express";
import { register, login } from "../controllers/authController.js";

const router = Router();

router.post("/signup", register); // matches your earlier usage
router.post("/login", login);

// also support spec names
router.post("/register", register);

export default router;
