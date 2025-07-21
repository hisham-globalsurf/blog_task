import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Calendar, FileText, User, ExternalLink, Sparkles } from "lucide-react";

const UserBlogModal = ({ open, setOpen, user, blogs }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateId = (id) => {
    return id.length > 8 ? `${id.substring(0, 8)}...` : id;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-4xl bg-gradient-to-br from-white via-slate-50 to-blue-50/30 border-0 shadow-2xl rounded-2xl overflow-hidden">
        {/* Header with gradient background */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-sky-400 via-cyan-500 to-indigo-600 opacity-90"></div>
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-sky-400 via-cyan-500 to-indigo-600 backdrop-blur-sm"></div>
        
        <DialogHeader className="relative z-10 pt-6 pb-4">
          <div className="flex items-center gap-3 text-white">
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
              <User className="w-5 h-5" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {user?.name}'s Blog Collection
            </DialogTitle>
            <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>
        </DialogHeader>

        <div className="relative z-10 mt-4">
          {blogs.length > 0 ? (
            <div className="space-y-4">
              {/* Stats Card */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-800">Total Blogs</span>
                  </div>
                  <span className="bg-gradient-to-r from-sky-400 via-cyan-500 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {blogs.length}
                  </span>
                </div>
              </div>

              {/* Enhanced Table */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden border border-white/50 shadow-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-300">
                      <TableHead className="font-bold text-gray-700 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Blog ID
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-gray-700">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-purple-500" />
                          Title
                        </div>
                      </TableHead>
                      <TableHead className="text-right font-bold text-gray-700">
                        <div className="flex items-center justify-end gap-2">
                          <Calendar className="w-4 h-4 text-pink-500" />
                          Published
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blogs.map((blog, index) => (
                      <TableRow
                        key={blog._id}
                        className="group cursor-pointer hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-300 transform hover:scale-[1.01] border-b border-gray-100/50"
                        onClick={() => {
                          setOpen(false);
                          navigate(`/blog/${blog._id}`);
                        }}
                        style={{
                          animationDelay: `${index * 100}ms`
                        }}
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                              {index + 1}
                            </div>
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600 font-mono">
                              {truncateId(blog._id)}
                            </code>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800 group-hover:text-blue-700 transition-colors line-clamp-2">
                              {blog.title}
                            </span>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-4">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-sm text-gray-600 bg-gray-100/70 px-3 py-1 rounded-full font-medium">
                              {formatDate(blog.createdAt)}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-white/50 shadow-lg max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No Blogs Yet</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {user?.name} hasn't published any blogs yet. Check back later for amazing content!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-blue-400/20 rounded-full blur-xl"></div>
      </DialogContent>
    </Dialog>
  );
};

export default UserBlogModal;