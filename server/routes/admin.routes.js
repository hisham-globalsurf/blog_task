import express from "express";
import {
  getAllUsers,
  toggleBlockUser,
  getBlogsByUserId,
} from "../controllers/admin.controller.js";
import { protect, superAdminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect, superAdminOnly);

router.get("/users", getAllUsers);

router.patch("/users/:id/toggle-block", toggleBlockUser);

router.get("/users/:id/blogs", getBlogsByUserId);

export default router;
