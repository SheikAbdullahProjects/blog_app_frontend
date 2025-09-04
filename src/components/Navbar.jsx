import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // optional icons
import useAuthStore from "../store/useAuthStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="hover:text-blue-400 transition duration-300">
          <div className="logo text-2xl font-bold cursor-pointer">Bloggy</div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {authUser && (
            <Link
              to="/about"
              className="hover:text-blue-400 transition duration-300 my-auto"
            >
              About
            </Link>
          )}
          {(authUser && authUser.is_admin) && (
            <Link
              to="/publish"
              className="hover:text-blue-400 transition duration-300 my-auto"
            >
              Publish Blogs
            </Link>
          )}
          {authUser && (
            <Link
              to="/create"
              className="hover:text-blue-400 transition duration-300 my-auto"
            >
              Create Blog
            </Link>
          )}
          {!authUser && (
            <Link
              to="/signup"
              className="hover:text-blue-400 transition duration-300"
            >
              Sign Up
            </Link>
          )}
          {!authUser && (
            <Link
              to="/signin"
              className="hover:text-blue-400 transition duration-300"
            >
              Sign In
            </Link>
          )}
          {authUser && (
            <details className="dropdown">
              <summary className="btn m-1">Account</summary>
              <ul className="menu dropdown-content bg-base-100 text-white rounded-box z-1 w-52 p-2 shadow-sm">
                <Link
                  to="/profile"
                  className="hover:text-blue-400 transition duration-300 p-2"
                >
                  Profile
                </Link>
                <Link
                  to="/my-blogs"
                  className="hover:text-blue-400 transition duration-300 p-2"
                >
                  My Blogs
                </Link>
              </ul>
            </details>
          )}
          {authUser && (
            <button
              onClick={logout}
              className="hover:text-blue-400 transition duration-300"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4">
          {authUser && (
            <Link
              to="/about"
              className="block hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          )}
          {authUser && (
           
            <Link
              to="/create"
              className="block hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Create Blog
            </Link>
          )}
          {(authUser && authUser.is_admin) && (
             <Link
              to="/publish"
              className="block hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}

            >
              Publish Blogs
            </Link>
          )}
          {!authUser && (
            <Link
              to="/signup"
              className="block hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          )}
          {!authUser && (
            <Link
              to="/signin"
              className="block hover:text-blue-400 transition duration-300"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          )}
          {authUser && (
            <>
              <Link
                to="/profile"
                className="block hover:text-blue-400 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/my-blogs"
                className="block hover:text-blue-400 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                My Blogs
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block hover:text-blue-400 transition duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
