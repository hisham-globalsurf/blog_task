import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "../features/blog/blogSlice";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Calendar, Tag, FolderOpen, Pen } from "lucide-react";
import { fetchComments, addComment } from "../features/comment/commentSlice";
import CommentSection from "../components/blog/singleBlog/CommentSection";
import { Helmet } from "react-helmet";

const SingleBlogPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleBlog } = useSelector((state) => state.blog);
  const { comments, loading: commentsLoading } = useSelector(
    (state) => state.comment
  );

  useEffect(() => {
    dispatch(fetchBlogById(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [id, dispatch]);

  if (!singleBlog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl mx-auto px-4">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{singleBlog?.title || "Blog Post"}</title>
        <meta
          name="description"
          content={singleBlog?.description?.slice(0, 150)}
        />

        <meta property="og:title" content={singleBlog?.title} />
        <meta
          property="og:description"
          content={singleBlog?.description?.slice(0, 150)}
        />
        {singleBlog.attachments?.[0] && (
          <meta property="og:image" content={singleBlog.attachments[0]} />
        )}
      </Helmet>

      <div className="min-h-screen bg-slate-100 pb-10">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{singleBlog.createdAt.slice(0, 10)}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto">
                {singleBlog.title}
              </h1>

              <div className="flex items-center justify-center space-x-4 pt-4">
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <FolderOpen className="w-3 h-3" />
                  <span>{singleBlog.category}</span>
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <Pen className="w-3 h-3" />
                  <span>{singleBlog?.createdBy?.name}</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          {/* Image Gallery */}
          {singleBlog.attachments && singleBlog.attachments.length > 0 && (
            <Card className="mb-6 overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 lg:p-8">
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                  {singleBlog.attachments.map((url, i) => (
                    <div
                      key={i}
                      className="break-inside-avoid group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Blog image ${i + 1}`}
                          className="w-full h-[200px] object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 lg:p-12">
                  <div className="h-[430px] overflow-y-auto pr-2 custom-scrollbar">
                    <p className="text-xl leading-relaxed text-gray-700 font-light whitespace-pre-line break-words">
                      {singleBlog.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Tags */}
              {singleBlog.tags && singleBlog.tags.length > 0 && (
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm h-[160px] overflow-scroll scrollbar-hidden">
                  <CardContent className="p-6 overflow-y-auto custom-scrollbar">
                    <div className="flex items-center space-x-2 mb-4">
                      <Tag className="w-5 h-5 text-gray-600" />
                      <h3 className="font-semibold text-gray-900">Tags</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {singleBlog.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="hover:bg-blue-50 hover:border-blue-200 transition-colors duration-200 cursor-pointer"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Category Card */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50 h-[160px] overflow-scroll scrollbar-hidden">
                <CardContent className="p-6 flex flex-col justify-center items-center text-center">
                  <div className="text-center">
                    <FolderOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Category
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {singleBlog.category}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info Card */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-200 h-[160px] overflow-scroll scrollbar-hidden">
                <CardContent className="p-6 flex flex-col justify-center items-center text-center">
                  <div className="text-center">
                    <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {singleBlog.createdAt.slice(0, 10)}
                    </h3>
                    <p className="text-green-800 text-[12px] font-medium flex flex-col">
                      <p>Name: {singleBlog.createdBy.name}</p>
                      <p>Email: {singleBlog.createdBy.email}</p>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection
          blogId={id}
          comments={comments}
          loading={commentsLoading}
        />
      </div>
    </>
  );
};

export default SingleBlogPage;
