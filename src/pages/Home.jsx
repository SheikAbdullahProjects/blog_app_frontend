import React, { useEffect, useState } from "react";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    
    setIsLoading(true)
    const getAllBlogs = async () => {
      try {
        const response = await axiosInstance.get("/blog/")
        setBlogs(response.data || [])
      } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.detail || "Failed to fetch blogs");
      } finally {
        setIsLoading(false)
      }
      
    }
    getAllBlogs()
  }, [])

  if (isLoading) return (
    <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
  )

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[500px]">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="Featured"
          className="w-full h-full object-cover rounded-b-2xl"
        />
        <div className="absolute inset-0 bg-black/40 rounded-b-2xl"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 text-white">
          <p className="text-sm font-semibold mb-2">Featured</p>
          <h1 className="text-3xl md:text-5xl font-bold max-w-2xl">
            Breaking Into Product Design: Advice from Untitled Founder, Frankie
          </h1>
          <p className="mt-4 max-w-xl text-sm md:text-base text-gray-200">
            You don’t need a fancy Bachelor’s Degree to get into Product Design.
            We sat down with Frankie Sullivan to talk about gatekeeping in
            product design and how anyone can get into this growing industry.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="px-8 md:px-16 py-16">
        <h2 className="text-2xl font-bold mb-8">Recent blog posts</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.length < 1 ? <p>No blogs</p> : (blogs.map((post, i) => (
            <Blog key={i} post={post} />
          )))}
        </div>

        {/* Load More
        <div className="flex justify-center mt-10">
          <button className="px-6 py-2 border rounded-lg hover:bg-gray-100 text-sm font-medium">
            Loading more...
          </button>
        </div> */}
      </section>
    </>
  );
};

export default Home;
