import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { useDispatch } from "react-redux";
import { createBlog, fetchAllBlogs } from "../../features/blog/blogSlice";
import { Input } from "../ui/input";

const CreateBlogSheet = ({ open, setOpen }) => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    attachments: [],
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };
    await dispatch(createBlog(blogData));
    dispatch(fetchAllBlogs());
    setOpen(false);
    setFormData({
      title: "",
      description: "",
      category: "",
      tags: "",
      attachments: [],
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl p-0 overflow-auto"
      >
        {/* Gradient Header */}
        <div className="bg-cyan-700 p-4 sm:p-6">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-white">
              Create a New Blog
            </SheetTitle>
          </SheetHeader>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 px-4 py-6 sm:px-6"
        >
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <Input
              type="text"
              name="title"
              placeholder="Amazing Blog Title"
              className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Write your blog description..."
              rows={4}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 scrollbar-hidden"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category & Tags */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col flex-1 gap-1">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <Input
                type="text"
                name="category"
                placeholder="Tech, Travel, Food..."
                className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <label className="text-sm font-medium text-gray-700">
                Tags (comma separated)
              </label>
              <Input
                type="text"
                name="tags"
                placeholder="React, Node, MongoDB"
                className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Attachments */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Upload Images
            </label>
            {/* Hidden file input for adding more imgs */}
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Initial Upload */}
            {formData.attachments.length === 0 && (
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="p-2 rounded border"
              />
            )}

            {/* Image Previews */}
            {formData.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.attachments.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="h-20 w-20 object-cover rounded border border-gray-200"
                  />
                ))}

                {/* Plus button */}
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center h-20 w-20 rounded text-4xl border border-dashed border-gray-400 cursor-pointer text-gray-500 hover:text-blue-600"
                >
                  +
                </label>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-600 transition"
          >
            Publish Blog
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateBlogSheet;
