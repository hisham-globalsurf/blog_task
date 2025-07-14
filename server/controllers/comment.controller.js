import * as commentService from "../services/comment.service.js";

export const addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { blogId } = req.params;
    const userId = req.user.id; 

    const comment = await commentService.createComment({
      blogId,
      userId,
      content,
    });

    res.status(201).json({ success: true, comment });
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const { blogId } = req.params;
 
    const comments = await commentService.getCommentsByPost(blogId);

    res.json({ success: true, comments });
  } catch (err) {
    next(err);
  }
}; 