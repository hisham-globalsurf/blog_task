import User from "../models/user.model.js";
import Blog from "../models/blog.model.js";

// Get all non-admin users
export const getAllUsers = async () => {
  return await User.find({ role: { $ne: "admin" } }).select("-password");
};

// Toggle blocked status
export const toggleBlockUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.blocked = !user.blocked;
  await user.save();
  return user;
};

// Get blogs created by a specific user
export const getBlogsByUserId = async (userId) => {
  return await Blog.find({ createdBy: userId });
};
