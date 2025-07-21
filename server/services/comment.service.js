import Comment from '../models/comment.model.js';
import Blog from '../models/blog.model.js';
import CustomError from '../utils/customError.js';

export const createComment = async ({ blogId, userId, content }) => {
  const blog = await Blog.findById(blogId);
  if (!blog) throw new CustomError('Blog post not found', 404);

  const comment = await Comment.create({
    content,
    post: blogId,
    user: userId,
  });

  await comment.populate("user", "name email");

  return comment;
};

export const getCommentsByPost = async (blogId) => {
  return Comment.find({ post: blogId })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
};