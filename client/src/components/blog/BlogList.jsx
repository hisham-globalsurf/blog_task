import BlogCard from "./BlogCard";
import { motion, AnimatePresence } from "framer-motion";

const BlogList = ({ blogs }) => {
  if (!blogs?.length) return <p>No blogs found.</p>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
      <AnimatePresence>
        {blogs?.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            <BlogCard blog={blog} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BlogList;
