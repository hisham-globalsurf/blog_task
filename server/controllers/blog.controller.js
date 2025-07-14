import * as blogService from "../services/blog.service.js";

// Get all blogs (home page)
export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json({ success: true, blogs });
  } catch (err) {
    next(err);
  }
};

// single blog by ID
export const getBlogById = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    res.json({ success: true, blog });
  } catch (err) {
    next(err);
  }
};

// admin's blog
export const getMyBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getBlogsByUser(req.user.id);
    res.json({ success: true, blogs });
  } catch (err) {
    next(err);
  }
};

// create blog
export const createBlog = async (req, res, next) => {
  try {
    const attachments = req.files?.map((file) => file.path);

    const blogData = {
      ...req.body,
      attachments,
    };

    const blog = await blogService.createBlog(blogData, req.user.id);

    res.status(201).json({ success: true, blog });
  } catch (err) {
    next(err);
  }
};

// Update blog
export const updateBlog = async (req, res, next) => {
  try {
    const attachments = req.files?.map((file) => file.path);

    const blogData = { ...req.body };
    if (attachments.length) {
      blogData.attachments = [...existingBlog.attachments, ...attachments];
    }

    const blog = await blogService.updateBlog(
      req.params.id,
      blogData,
      req.user.id
    );

    res.json({ success: true, blog });
  } catch (err) {
    next(err);
  }
};

// Delete blog
export const deleteBlog = async (req, res, next) => {
  try {
    await blogService.deleteBlog(req.params.id, req.user.id);
    res.json({ success: true, message: "Blog deleted" });
  } catch (err) {
    next(err);
  }
};
