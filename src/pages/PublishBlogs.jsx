import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'
import axiosInstance from '../lib/axiosInstance'
import toast from 'react-hot-toast'

const PublishBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const fetchAllBlogs = async () => {
            setIsLoading(true)
            try {
                const response = await axiosInstance.get("/blog/all-blogs")
                setBlogs(response.data)
            } catch (error) {
                console.log(error)
                toast.error(error.response?.data?.message || "Failed to fetch blogs.")
            } finally {
                setIsLoading(false)
            }
        } 
        fetchAllBlogs()
    }, [])
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
          blogs.map((post, i) => <BlogCard key={i} blog={post}/>)
        )}
      </div>

    </section>
  )
}

export default PublishBlogs