import axiosInstance from "@/api/axiosInstance";

const submitContactForm = async (formData) => {
  const res = await axiosInstance.post("/contact-us", formData);
  return res.data;
};

const getAllContacts = async () => {
  const res = await axiosInstance.get("/contact-us");
  return res.data;
};

const contactService = {
  submitContactForm,
  getAllContacts,
};

export default contactService;
