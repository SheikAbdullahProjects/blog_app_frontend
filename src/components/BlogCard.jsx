import { Calendar, User, MessageSquare } from "lucide-react";
import { useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const BlogCard = ({ blog }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handlePublish = async () => {
        try {
            setIsLoading(true);
            await axiosInstance.put(`/blog/admin/publish/${blog.id}`);
            navigate(`/blog/${blog.id}`);
        } catch (error) {
            console.log(error);
            toast.error("Failed to publish the blog.");
        } finally {
            setIsLoading(false);
        }
    }
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 border-b py-4">
      {/* Blog Image */}
      <img
        src={blog.image_url || "https://via.placeholder.com/150"}
        alt={blog.title}
        className="w-full md:w-40 h-20 object-cover rounded-lg"
      />

      {/* Blog Content */}
      <div className="flex-1 flex flex-col justify-between">
        <h2 className="text-lg font-semibold text-white-800 hover:text-blue-600 cursor-pointer">
          {blog.title}
        </h2>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
          <span className="flex items-center gap-1">
            <User size={14} /> {blog.user?.username || "Unknown"}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {blog.created_at || "Sep 04, 2025"}
          </span>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            disabled={isLoading}
            onClick={handlePublish}
          >
            {isLoading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
