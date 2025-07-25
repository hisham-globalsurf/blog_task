import Contact from "../models/contact.model.js";

export const createContact = async (data) => {
  return await Contact.create(data);
};

export const getAllContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};
