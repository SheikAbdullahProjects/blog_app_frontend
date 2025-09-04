import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchAllMyBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/blog/blogs-owners/");
        setBlogs(response.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Failed to fetch blogs.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllMyBlogs();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  return (
    <section className="px-8 md:px-16 py-16">
      <h2 className="text-2xl font-bold mb-8">Recent blog posts</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {blogs.length < 1 ? (
          <p>No blogs</p>
        ) : (
          blogs.map((post, i) => <Blog key={i} post={post} type={"update"} />)
        )}
      </div>

    </section>
  );
};

export default MyBlogs;
