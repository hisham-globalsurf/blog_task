import { createContact, getAllContacts } from "../services/contact.service.js";
import { sendContactEmail } from "../services/email.service.js";
import CustomError from "../utils/customError.js";

export const handleContactForm = async (req, res, next) => {
  try {
    const { name, email, mobile, state, country, message } = req.body;

    if (!name || !email || !mobile || !state || !country || !message) {
      throw new CustomError("All fields are required", 400);
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    const mobileRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      throw new CustomError("Invalid email format", 400);
    }

    if (!mobileRegex.test(mobile)) {
      throw new CustomError("Mobile must be 10 digits", 400);
    }

    const contact = await createContact({ name, email, mobile, state, country, message });
    await sendContactEmail({ name, email, mobile, state, country, message });

    res.status(201).json({ success: true, message: "Message sent", data: contact });
  } catch (err) {
    next(err);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.json({ success: true, data: contacts });
  } catch (err) {
    next(err);
  }
};
