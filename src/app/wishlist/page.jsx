"use client";
import { useEffect, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import Loading from "../loading";


export default function WishlistPage() {
  const [wishlistRecipes, setWishlistRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadWishlist = () => {
    setIsLoading(true);
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlistRecipes(JSON.parse(storedWishlist));
    } else {
      setWishlistRecipes([]);
    }
    // Simulate a small delay to show loading state
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const handleWishlistChange = () => {
    loadWishlist();
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-orange-800 mb-8">My Wishlist</h1>
          <Loading />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-5">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-orange-800 mb-8">My Wishlist</h1>
        {wishlistRecipes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-orange-100">
            <p className="text-gray-600 text-lg">Your wishlist is empty</p>
            <p className="text-gray-500 mt-2">
              Add recipes to your wishlist by clicking the heart icon
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onWishlistChange={handleWishlistChange}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
