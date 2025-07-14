import * as React from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useDispatch } from "react-redux";
import { createBlog, fetchAllBlogs } from "../features/blog/blogSlice";

const CreateBlogDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    category: "",
    tags: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    setFormData({ title: "", description: "", category: "", tags: "" });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="bg-blue-600 text-white px-4 py-2 rounded">
        Create New Blog
      </DrawerTrigger>
      <DrawerContent className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border p-2 rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="border p-2 rounded"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="border p-2 rounded"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="border p-2 rounded"
            value={formData.tags}
            onChange={handleChange}
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateBlogDrawer;
