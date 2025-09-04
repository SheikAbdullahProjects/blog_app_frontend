import React, { useState } from 'react'
import useAuthStore from '../store/useAuthStore';
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';


const SignIn = () => {
  const [formData, setFormData] = useState({
      email: "",
      password: ""
    });
    const { signin } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    if (formData.email === "" || formData.password === "") {
      toast.error("Fill all Fields")
      return
    }
    signin(formData);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login User
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
          

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          

          {/* Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Sign In
          </button>
        </form>

        {/* Sign In link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          didn't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn