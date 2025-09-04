import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ post, type }) => {
  const isUpdate = type === "update";
  return (
    <Link
      to={isUpdate ? `/update/${post.id}` : `/blog/${post.id}` }
      className="rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-gray-700"
    >
      <img
        src={post.image_url}
        alt={post.title}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
        <p className="text-sm">{post.user["username"]} : {new Date(post.created_at).toDateString()}</p>
      </div>
      {isUpdate &&<div className="p-4">
        <p className={`text-sm ${post.is_published ? "text-green-500" : "text-red-500"}`}>{post.is_published ? "Published" : "Unpublished"}</p>
      </div>}
    </Link>
  );
};

export default Blog;
