import BlogCard from "./BlogCard";

const BlogList = ({ blogs }) => {
  if (!blogs.length) return <p>No blogs found.</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
