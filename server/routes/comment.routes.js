import express from 'express';
import { addComment, getComments } from '../controllers/comment.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

// logged one's can comment
router.post('/:blogId', protect, addComment);

// Anyone can view comments
router.get('/:blogId', getComments);

export default router;
