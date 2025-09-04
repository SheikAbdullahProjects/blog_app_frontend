import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const { signup } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username === "" || formData.email === "" || formData.password === "" || formData.confirm_password === "") {
      toast.error("Please fill in all fields");
      return
    }
    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
          {/* Username */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={formData.confirm_password}
              onChange={(e) =>
                setFormData({ ...formData, confirm_password: e.target.value })
              }
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Sign Up
          </button>
        </form>

        {/* Sign In link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
