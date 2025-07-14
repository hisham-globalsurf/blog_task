const BlogCard = ({ blog }) => (
  <div className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 rounded-lg overflow-hidden">
    {/* Image if you have attachments */}
    {blog.attachments && blog.attachments.length > 0 && (
      <div className="relative overflow-hidden h-48">
        <img
          src={blog.attachments[0]}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    )}

    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
        {blog.title}
      </h2>

      <p className="text-gray-700 mb-3 line-clamp-3">
        {blog.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 text-xs rounded-full px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="text-sm text-gray-500">
        Category: {blog.category}
      </div>
    </div>
  </div>
)

export default BlogCard
