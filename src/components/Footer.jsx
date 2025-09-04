import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-8 md:px-20 py-12">
      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">
          © 2025 Sheik. All rights reserved.
        </span>
        <div className="flex gap-6 text-gray-400 text-sm">
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
