import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Label } from "@radix-ui/react-label";

export default function EditBlogModal({ blog, onUpdate, children }) {
  const [title, setTitle] = useState(blog.title || "");
  const [description, setDescription] = useState(blog.description || "");
  const [category, setCategory] = useState(blog.category || "");
  const [tags, setTags] = useState(blog.tags?.join(", ") || "");
  const [existingAttachments, setExistingAttachments] = useState(
    blog.attachments || []
  );
  const [newAttachments, setNewAttachments] = useState([]);

  useEffect(() => {
    setTitle(blog.title || "");
    setDescription(blog.description || "");
    setCategory(blog.category || "");
    setTags(blog.tags?.join(", ") || "");
    setExistingAttachments(blog.attachments || []);
    setNewAttachments([]);
  }, [blog]);

  const handleFileChange = (e) => {
    setNewAttachments((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const handleRemoveExisting = (url) => {
    setExistingAttachments((prev) => prev.filter((item) => item !== url));
  };

  const handleRemoveNew = (index) => {
    setNewAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdate = () => {
    const updatedBlog = {
      _id: blog._id,
      title,
      description,
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
      attachments: {
        existing: existingAttachments,
        new: newAttachments,
      },
    };
    onUpdate(updatedBlog);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-xl md:max-w-3xl overflow-hidden">
        <DialogHeader className={"font-bold text-[20px]"}>
          Edit Blog
        </DialogHeader>

        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto scrollbar-hidden">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="space-y-3">
              <Label>Title</Label>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Label>Category</Label>
              <Input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />

              <Label>Tags</Label>
              <Input
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div className="space-y-3 flex flex-col">
              <Label>Description</Label>
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-40 overflow-y-auto resize-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Attachments</Label>

            {(existingAttachments.length > 0 || newAttachments.length > 0) && (
              <div className="flex flex-wrap gap-3 max-h-52 overflow-y-auto">
                {/* Existing */}
                {existingAttachments.map((url) => (
                  <div
                    key={url}
                    className="relative w-24 h-24 rounded overflow-hidden border"
                  >
                    <img
                      src={url}
                      alt="attachment"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExisting(url)}
                      className="absolute top-0 right-0 bg-black/50 text-white p-1 rounded-bl"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* New */}
                {newAttachments.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded overflow-hidden border"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="new upload"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNew(index)}
                      className="absolute top-0 right-0 bg-black/50 text-white p-1 rounded-bl"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <Input type="file" multiple onChange={handleFileChange} />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleUpdate}
            className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
