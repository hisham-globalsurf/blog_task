import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { FileText, User, X } from "lucide-react";

const UserBlogModal = ({ open, setOpen, user, blogs }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateId = (id) => {
    return id.length > 8 ? `${id.substring(0, 8)}...` : id;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-6xl bg-white rounded-xl p-6 shadow-lg max-h-[80vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 text-gray-800 mb-6">
          <div className="p-2 bg-blue-100 rounded-full">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">{user?.name}'s Blog Collection</h2>
        </div>

        {/* Blog Count */}
        {blogs?.length > 0 ? (
          <>
            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <FileText className="w-4 h-4 text-blue-500" />
                  <span>Total Blogs</span>
                </div>
                <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                  {blogs.length}
                </span>
              </div>
            </div>

            {/* Blog Table */}
            <div className="rounded-md border border-gray-200 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 text-sm">
                    <TableHead className="min-w-[120px]">Blog ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="text-right min-w-[140px]">
                      Published
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog) => (
                    <TableRow
                      key={blog._id}
                      className="cursor-pointer hover:bg-gray-50 transition"
                      onClick={() => {
                        setOpen(false);
                        navigate(`/blog/${blog._id}`);
                      }}
                    >
                      <TableCell>
                        <code className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {truncateId(blog._id)}
                        </code>
                      </TableCell>
                      <TableCell className="text-gray-800 font-medium">
                        {blog.title}
                      </TableCell>
                      <TableCell className="text-right text-sm text-gray-600">
                        {formatDate(blog.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto text-gray-700">
              <div className="mb-4">
                <FileText className="w-10 h-10 mx-auto text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Blogs Found</h3>
              <p className="text-sm">
                {user?.name} hasn't published any blogs yet.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBlogModal;
