import express from "express";
import { handleContactForm, getContacts } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/", handleContactForm);
router.get("/", getContacts);

export default router;
