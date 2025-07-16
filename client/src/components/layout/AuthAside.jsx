import React from "react";

const BlogAside = () => {
  return (
    <div className="hidden lg:flex items-center justify-center px-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-xl space-y-6">
        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
          Discover & Share Inspiring Blogs
        </h2>

        <p className="text-gray-700 text-lg">
          Join a vibrant community of writers and readers. Create, explore, and
          share stories that matter.
        </p>

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Why Blog with Us?</h3>
          <ul className="space-y-3 text-gray-700 text-sm">
            <li className="flex items-center">
              <span className="text-indigo-500 mr-2">✏️</span> Easy-to-use
              blogging tools
            </li>
            <li className="flex items-center">
              <span className="text-indigo-500 mr-2">🌍</span> Connect with
              readers worldwide
            </li>
            <li className="flex items-center">
              <span className="text-indigo-500 mr-2">📈</span> Grow your
              audience and brand
            </li>
            <li className="flex items-center">
              <span className="text-indigo-500 mr-2">💬</span> Engage with
              comments & feedback
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <div className="bg-indigo-600 text-white font-semibold text-lg py-4 px-6 rounded-2xl text-center shadow-md hover:bg-indigo-700 transition">
            10,000+ <br />
            <span className="text-sm font-normal">Published Blogs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAside;
