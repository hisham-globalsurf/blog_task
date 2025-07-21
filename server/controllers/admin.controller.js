import * as adminService from "../services/admin.service.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers();
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};

export const toggleBlockUser = async (req, res, next) => {
  try {
    const user = await adminService.toggleBlockUser(req.params.id);
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const getBlogsByUserId = async (req, res, next) => {
  try {
    const blogs = await adminService.getBlogsByUserId(req.params.id);
    res.json({ success: true, blogs });
  } catch (err) {
    next(err);
  }
};
