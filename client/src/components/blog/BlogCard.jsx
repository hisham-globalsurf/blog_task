import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => (
  <Link
    to={`/blog/${blog._id}`}
    className="block group hover:no-underline h-full"
  >
    <div className="transition-all duration-300 border shadow-md hover:shadow-xl hover:-translate-y-1 rounded-lg overflow-hidden flex flex-col h-full">
      {/* Image Section */}
      {blog.attachments && blog.attachments.length > 0 && (
        <div className="relative overflow-hidden h-48">
          <img
            src={blog.attachments[0]}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content Section */}

      <div className="p-4 flex flex-col flex-1 overflow-hidden">
        <div className="w-[300px] lg:w-full">
          <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors overflow-hidden">
            {blog.title}
          </h2>
        </div>

        <div className="text-gray-700 mb-5 text-sm w-[300px] lg:w-full line-clamp-5">
          {blog.description}
        </div>

        <div className="flex flex-wrap gap-1 mb-3 overflow-hidden max-h-[50px]">
          {blog.tags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="bg-gray-200 text-xs rounded-full px-2 py-1 "
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="text-sm text-gray-500 truncate mt-auto">
          Category: {blog.category}
        </div>
      </div>
    </div>
  </Link>
);

export default BlogCard;