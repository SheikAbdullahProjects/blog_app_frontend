import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance";

const ProfilePage = () => {
  const { authUser, logout, setAuthUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(authUser?.profile_picture_url || "");
  const [isLoading, setIsLoading] = useState(false);
 

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // preview image
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a picture!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsLoading(true);
      const response = await axiosInstance.put("/auth/update-user", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile picture updated 🎉")
      setAuthUser(response.data)
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.detail || "Failed to update profile picture");
    } finally {
      setIsLoading(false);
    }
  };

  if (!authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">You must sign in to view profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Banner */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
        <div className="absolute -bottom-12 left-8">
          <img
            src={authUser.profile_picture_url || ""}
            alt="avatar"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-16 px-4">
        <h1 className="text-3xl font-bold">{authUser.username}</h1>
        <p className="text-gray-500">@{authUser.email}</p>
        {/* <p className="mt-3 text-gray-700">
          {authUser.bio || "No bio added yet. ✨"}
        </p> */}
        <p className="mt-2 text-sm text-gray-500">
          Joined on {new Date(authUser.created_at).toDateString()}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            onClick={() => setIsOpen((o) => !o)}

          >
            Edit Profile
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Update Profile Picture</h2>

      {/* Preview Image */}
      <div className="flex justify-center mb-6">
        <img
          src={preview || "https://via.placeholder.com/150"}
          alt="Profile Preview"
          className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
        />
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full"
        >
          {isLoading ? "Uploading..." : "Update Picture"}
        </button>
      </form>
    </div>
      )}

      
    </div>
  );
};

export default ProfilePage;
