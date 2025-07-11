import express from 'express';
import {
  getAllBlogs,
  getBlogById,
  getMyBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blog.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Public
router.get('/all', getAllBlogs);
router.get('/:id', getBlogById);

// Admin only
router.get('/myblogs', protect, getMyBlogs);
router.post('/myblog/create', protect, createBlog);
router.put('/myblog/:id', protect, updateBlog);
router.delete('/myblog/:id', protect, deleteBlog);

export default router;