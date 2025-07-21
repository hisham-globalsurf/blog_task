import * as blogService from "../services/blog.service.js";
import Blog from "../models/blog.model.js";

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

// individual's blogs
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

// update blog
export const updateBlogService = async (blog, updateData) => {
  blog.title = updateData.title || blog.title;
  blog.description = updateData.description || blog.description;
  blog.category = updateData.category || blog.category;
  blog.tags = updateData.tags || blog.tags;
  blog.attachments = updateData.attachments || blog.attachments;

  await blog.save();
  return blog;
};

// update blog
export const updateBlog = async (req, res, next) => {
  try {
    const newUploads = req.files?.map((file) => file.path) || [];

    const existingBlog = await Blog.findById(req.params.id);
    if (!existingBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const isOwner = existingBlog.createdBy.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Prepare attachments
    let keepAttachments = [];
    if (req.body.attachments?.existing) {
      if (typeof req.body.attachments.existing === "string") {
        keepAttachments = [req.body.attachments.existing];
      } else if (Array.isArray(req.body.attachments.existing)) {
        keepAttachments = req.body.attachments.existing;
      }
    } else {
      keepAttachments = existingBlog.attachments;
    }

    if (keepAttachments.length === 1 && keepAttachments[0] === "") {
      keepAttachments = [];
    }

    const updatedAttachments = [...keepAttachments, ...newUploads];

    // Parse tags
    let tags = [];
    if (Array.isArray(req.body.tags)) {
      tags = req.body.tags;
    } else if (typeof req.body.tags === "string") {
      tags = req.body.tags.split(",").map((tag) => tag.trim());
    }

    // Call service
    const updatedBlog = await blogService.updateBlogService(existingBlog, {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      tags,
      attachments: updatedAttachments,
    });

    res.json({ success: true, blog: updatedBlog });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Delete blog
export const deleteBlog = async (req, res, next) => {
  try {
    await blogService.deleteBlog(req.params.id, req.user);
    res.json({ success: true, message: "Blog deleted" });
  } catch (err) {
    next(err);
  }
};

