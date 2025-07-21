import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs, deleteBlog } from "@/features/blog/blogSlice";
import MyBlogs from "@/components/dashboard/MyBlogs";
import { toast } from "sonner";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBlog(id))
        .unwrap()
        .then(() => {
          dispatch(fetchAllBlogs());
        });
      toast.success("Blog deleted successfully");
    } catch (err) {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Blogs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <MyBlogs data={blogs} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Blogs;
