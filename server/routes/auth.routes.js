import express from "express";
import { register, login, logoutUser } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validators.js";
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});
router.post("/logout", logoutUser);

export default router;
