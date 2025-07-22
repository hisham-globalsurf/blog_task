import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MessageCircle,
  SendHorizonal,
  User,
  Clock,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { addComment } from "@/features/comment/commentSlice";

const CommentSection = ({ blogId, comments, loading }) => {
  const [commentInput, setCommentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (commentInput.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await dispatch(addComment({ blogId, content: commentInput }));
        setCommentInput("");
      } catch (error) {
        console.error("Failed to add comment:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInMinutes = Math.floor((now - commentDate) / (1000 * 60));
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="mb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="relative overflow-hidden shadow-xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 backdrop-blur-xl rounded-2xl">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-100/40 to-transparent rounded-full blur-3xl" />

        <CardContent className="relative p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-base font-medium text-gray-800">
                {comments.length}{" "}
                {comments.length === 1 ? "Comment" : "Comments"}
              </span>
            </div>
          </div>

          {/* Comment List */}
          <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {loading ? (
              [...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-sm text-gray-500">
                <MessageCircle className="w-6 h-6 mx-auto text-gray-300 mb-2" />
                No comments yet. Be the first to share your thoughts!
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="animate-[fadeInUp_0.5s_ease-in-out] bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm hover:shadow-md transition hover:translate-0.5 duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-800">
                          {comment.user?.name || "Anonymous"}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-line">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

          {/* Add Comment Form */}
          {user && (
            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Share your thoughts and join the discussion..."
                className="w-full p-4 rounded-2xl border-2 border-gray-200/50 focus:border-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-100 text-gray-800 resize-none min-h-[80px] bg-white/80 backdrop-blur-sm shadow-inner placeholder-gray-400 transition-all duration-300 placeholder:text-[15px]"
                required
                disabled={isSubmitting}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!commentInput.trim() || isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Posting..."
                  ) : (
                    <div className="flex items-center gap-2">
                      <SendHorizonal className="w-4 h-4" />
                      Post Comment
                    </div>
                  )}
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentSection;
