"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r mb-7  from-orange-50 to-amber-50 border-b border-orange-100 shadow-sm">
      <div className="container px-4 flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-orange-800">
            Recipes App
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
                className="block py-2 px-3 text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded md:bg-transparent md:text-orange-700 md:dark:text-orange-500"
                aria-current="page">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/favrecipes"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 px-3 text-orange-700 rounded hover:bg-orange-100 md:hover:bg-transparent md:border-0 md:hover:text-amber-600 ">
                FavRecipes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
