import Blog from '../models/blog.model.js';
import CustomError from '../utils/customError.js';

// Get all blogs
export const getAllBlogs = async () => {
  return await Blog.find().populate('createdBy', 'name email');
};

// single blog by ID
export const getBlogById = async (id) => {
  const blog = await Blog.findById(id).populate('createdBy', 'name email');
  if (!blog) throw new CustomError('Blog not found', 404);
  return blog;
};

// blogs og admin
export const getBlogsByUser = async (userId) => {
  return await Blog.find({ createdBy: userId });
};

// Create blog
export const createBlog = async (blogData, userId) => {
  const blog = await Blog.create({
    ...blogData,
    createdBy: userId,
  });
  return blog;
};

// Update blog
export const updateBlog = async (id, blogData, userId) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new CustomError('Blog not found', 404);

  if (blog.createdBy.toString() !== userId) {
    throw new CustomError('Not authorized to update this blog', 403);
  }

  Object.assign(blog, blogData);
  await blog.save();
  return blog;
};

// Delete blog
export const deleteBlog = async (id, userId) => {
  const blog = await Blog.findById(id);
  if (!blog) throw new CustomError('Blog not found', 404);

  if (blog.createdBy.toString() !== userId) {
    throw new CustomError('Not authorized to delete this blog', 403);
  }

  await blog.deleteOne();
};
