import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs } from "../features/blog/blogSlice";
import BlogList from "../components/blog/BlogList";
import CreateBlogSheet from "../components/blog/CreateBlogSheet";
import { useNavigate } from "react-router-dom";
import HeroBanner from "../components/home/HeroBanner";
import { Button } from "@/components/ui/button";
import { User, PlusCircle } from "lucide-react";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, isLoading } = useSelector((state) => state.blog);

  const { user } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const filteredBlogs = blogs?.filter(
    (blog) =>
      blog?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog?.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <CreateBlogSheet open={open} setOpen={setOpen} />
      <HeroBanner searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">All Blogs</h2>
            <p className="text-gray-600">
              Stay updated with the latest insights and tutorials
            </p>
          </div>

          {user ? (
            <Button
              onClick={() => setOpen(true)}
              variant="default"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Blog
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
            >
              <User className="w-4 h-4 mr-2" />
              Login to Create Blog
            </Button>
          )}
        </div>

        {isLoading ? <p>Loading...</p> : <BlogList blogs={filteredBlogs} />}
      </div>
    </div>
  );
};

export default HomePage;
