// src/schema/contactSchema.js
import { z } from "zod";

// Regex to allow only letters, spaces, and basic accents (no emojis, numbers, or symbols)
const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .regex(nameRegex, "Name must only contain letters and spaces (no symbols or emojis)"),

  email: z
    .string()
    .email("Please enter a valid email"),

  mobile: z
    .string()
    .regex(/^\d{10}$/, "Mobile must be exactly 10 digits"),

  state: z
    .string()
    .min(2, "State is required")
    .regex(nameRegex, "State must only contain letters and spaces"),

  country: z
    .string()
    .min(2, "Country is required")
    .regex(nameRegex, "Country must only contain letters and spaces"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters"),
});
