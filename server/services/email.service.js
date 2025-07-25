import nodemailer from "nodemailer";
import { contactEmailTemplate } from "../utils/emailTemplate.js";

export const sendContactEmail = async (formData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Blog Contact" <${process.env.SMTP_EMAIL}>`,
    to: process.env.SMTP_TO_EMAIL,
    subject: "New Contact Form Submission",
    html: contactEmailTemplate(formData),
  };

  await transporter.sendMail(mailOptions);
};
