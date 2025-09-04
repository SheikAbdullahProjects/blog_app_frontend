import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  console.log(id);

  useEffect(() => {
    setIsLoading(true);
    const getBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blog/${id}`);
        setBlog(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.detail || "Failed to fetch blogs");
      } finally {
        setIsLoading(false);
      }
    };
    getBlog();
  }, [id]);

  if (isloading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  if (!blog) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-gray-600">No blog found.</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[400px]">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="Blog hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-10 left-10 text-white max-w-2xl">
          <h1 className="text-4xl font-bold">{blog.title}</h1>
        </div>
      </section>

      {/* Blog Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Author + Date */}
        <div className="flex items-center gap-3 mb-8">
          <img
            src={blog.user?.profile_picture_url}
            alt={blog.user?.username}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{blog.user?.username}</p>
            <p className="text-xs text-gray-500">
              {new Date(blog.created_at).toDateString()}
            </p>
          </div>
        </div>

        {/* Blog Body */}
        <article className="prose prose-lg max-w-none">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="rounded-xl my-6"
          />
          <p>{blog.description}</p>
        </article>
      </main>
    </>
  );
};

export default BlogDetail;
