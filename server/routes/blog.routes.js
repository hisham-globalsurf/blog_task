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
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

// Admin only
router.get('/myblogs', protect, getMyBlogs);

router.post(
  '/myblog/create',
  protect,
  upload.array('attachments'), // The field name must match FormData field!
  createBlog
);


router.put(
  '/myblog/:id',
  protect,
  upload.array('attachments'),
  updateBlog
);

router.delete('/myblog/:id', protect, deleteBlog);

// Public
router.get('/all', getAllBlogs);
router.get('/:id', getBlogById);

export default router;