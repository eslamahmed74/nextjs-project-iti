"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useWishlist } from "@/lib/WishlistContext";
import { FaUtensils } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { wishlistCount } = useWishlist();

  return (
<nav className="bg-gradient-to-r from-orange-200 to-orange-100 border-b border-orange-200 shadow-lg">
      <div className="container px-4 flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-2 rtl:space-x-reverse group">
          <div className="p-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 group-hover:from-orange-600 group-hover:to-amber-600 transition-all duration-300">
            <FaUtensils className="text-white text-xl" />
          </div>

          <span className="self-center text-2xl font-bold whitespace-nowrap bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent group-hover:from-orange-700 group-hover:to-amber-700 transition-all duration-300">
            TastyRecipes
          </span>
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-orange-700 rounded-lg md:hidden hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-200"
          aria-expanded={isMenuOpen}>
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Menu items */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default">
          <ul className="font-medium flex flex-col md:items-center p-4 md:p-0 mt-4 border border-orange-100 rounded-lg bg-orange-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 px-3 rounded ${
                  pathname === "/"
                    ? "text-white bg-gradient-to-r from-orange-500 to-amber-500"
                    : "text-orange-700 hover:bg-orange-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-600"
                }`}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 px-3 rounded relative ${
                  pathname === "/wishlist"
                    ? "text-white bg-gradient-to-r from-orange-500 to-amber-500"
                    : "text-orange-700 hover:bg-orange-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-600"
                }`}>
                Wishlist
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
