import React, { useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import axiosInstance from "../lib/axiosInstance";
import { useNavigate } from "react-router-dom";

const BlogCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    picture: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle image upload
  const handleImageChange = (e) => {
    setImagePreview(null);

    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setImagePreview(URL.createObjectURL(file))

    setFormData({ ...formData, picture: file });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();

      if (!formData.title || !formData.description || !formData.picture) {
        toast.error("Title, Description, and Picture are required!");
        return;
      }
      const formData1 = new FormData();
      formData1.append("title", formData.title);
      formData1.append("description", formData.description);
      formData1.append("file", formData.picture);

      await axiosInstance.post("/blog/create", formData1, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Successfully Posted, waiting for admin to publish");
      navigate("/my-blogs");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create blog.");
    } finally {
      setIsLoading(false);
      setImagePreview(null);
      setFormData({ title: "", description: "", picture: null });
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, picture: null });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md my-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a Blog</h2>

      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-300"
            />
            {!isLoading && (
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center"
                type="button"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter blog title"
            className="w-full px-4 py-2 border bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            placeholder="Enter blog description"
            rows="6"
            className="w-full px-4 py-2 border bg-gray-800 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </div>

        {/* Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Picture
          </label>

          {/* Hide real input */}
          <input
            id="pictureUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {/* Custom button instead of default file input */}
          <label
            htmlFor="pictureUpload"
            className="inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Choose File
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Publishing..." : "Publish Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogCreate;
