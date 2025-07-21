// src/services/adminService.js
import axiosInstance from "@/api/axiosInstance";

const adminService = {
  getAllUsers: async () => {
    const res = await axiosInstance.get("/admin/users");
    return res.data;
  },

  toggleBlockUser: async (id) => {
    const res = await axiosInstance.patch(`/admin/users/${id}/toggle-block`);
    return res.data;
  },    

  getBlogsByUserId: async (userId) => {
    const res = await axiosInstance.get(`/admin/users/${userId}/blogs`);
    return res.data;
  },
};

export default adminService;
