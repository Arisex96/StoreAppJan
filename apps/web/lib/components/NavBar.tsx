"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-indigo-600">
          MyApp
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            Dashboard
          </Link>

          <Link
            href="/login"
            className="text-gray-700 hover:text-indigo-600 transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
