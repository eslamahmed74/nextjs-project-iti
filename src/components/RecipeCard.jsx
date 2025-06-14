import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaClock,
  FaUtensils,
  FaFire,
  FaStar,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { useWishlist } from "@/lib/WishlistContext";

export default function RecipeCard({ recipe, onWishlistChange }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { updateWishlistCount } = useWishlist();

  useEffect(() => {
    // Check if recipe is in wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsFavorite(wishlist.some((item) => item.id === recipe.id));
  }, [recipe.id]);

  if (!recipe) return null;

  const toggleFavorite = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (isFavorite) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item) => item.id !== recipe.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      // Add to wishlist
      const updatedWishlist = [...wishlist, recipe];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }

    setIsFavorite(!isFavorite);
    // Update wishlist count
    updateWishlistCount();
    // Call the callback function if provided
    if (onWishlistChange) {
      onWishlistChange();
    }
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      {/* Recipe Image with Favorite Heart */}
      <div className="relative h-48 overflow-hidden group flex-shrink-0">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          priority
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={toggleFavorite}
          className="absolute cursor-pointer top-3 right-3 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-colors duration-200"
          aria-label={
            isFavorite ? "Remove from favorites" : "Add to favorites"
          }>
          {isFavorite ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-600 text-lg hover:text-red-500" />
          )}
        </button>
      </div>

      {/* Recipe Content - flex-grow makes this section take remaining space */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title and Rating */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
            {recipe.name}
          </h3>
          <div className="flex items-center text-amber-500">
            <FaStar className="mr-1" />
            <span className="font-medium">{recipe.rating?.toFixed(1)}</span>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
          <span className="flex items-center">
            <FaClock className="mr-1.5 text-gray-400" />
            {recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins
          </span>
          <span className="flex items-center">
            <FaUtensils className="mr-1.5 text-gray-400" />
            {recipe.servings} servings
          </span>
          <span className="flex items-center">
            <FaFire className="mr-1.5 text-gray-400" />
            {recipe.caloriesPerServing} cal
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
            {recipe.cuisine}
          </span>
          <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
            {recipe.difficulty}
          </span>
          {recipe.mealType?.map((type, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
              {type}
            </span>
          ))}
        </div>

        {/* Ingredients Preview - flex-grow makes this take available space */}
        <div className="mb-5 flex-grow">
          <h4 className="font-semibold text-gray-700 mb-2">Main Ingredients</h4>
          <p className="text-sm text-gray-600 line-clamp-2">
            {recipe.ingredients?.slice(0, 4).join(", ")}...
          </p>
        </div>

        {/* View Recipe Button - mt-auto pushes it to bottom if there's space */}
        <Link
          href={`/recipes/${recipe.id}`}
          className="w-full text-center cursor-pointer bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md mt-auto">
          View Full Recipe
        </Link>
      </div>
    </div>
  );
}
