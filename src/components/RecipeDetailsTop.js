"use client";
import { fetchRecipeById } from "@/lib/api";
import { useEffect, useState } from "react";
import { Clock, Users, ChefHat, Star } from "lucide-react";
import { useParams } from "next/navigation";
import InfoCard from "./infoCard";
import RecommendedRecipes from "./RecommendedRecipes";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Loading from "@/app/loading";
import { useWishlist } from "@/lib/WishlistContext";

function RecipeDetailsTop() {
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const { updateWishlistCount } = useWishlist();

  useEffect(() => {
    async function getRecipe() {
      const data = await fetchRecipeById(id);
      if (data) {
        setRecipe(data);
      }
    }
    if (id) getRecipe();
  }, [id]);

  useEffect(() => {
    if (!recipe) return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsFavorite(wishlist.some((item) => item.id === recipe.id));
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        <Loading></Loading>
      </div>
    );
  }

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
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden my-8">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative group">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-96 lg:h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-4 right-4 flex space-x-2">
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
            </div>

            <div className="p-8 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {recipe.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                    {tag}
                  </span>
                ))}
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(
                    recipe.difficulty
                  )}`}>
                  {recipe.difficulty}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {recipe.name}
              </h1>

              <div className="flex items-center space-x-1 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(recipe.rating)
                        ? "text-yellow-300 fill-current"
                        : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900 ml-2">
                  {recipe.rating}
                </span>
                <span className="text-gray-600">
                  ({recipe.reviewCount} reviews)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                <InfoCard
                  icon={<Clock />}
                  title="Prep Time"
                  value={`${recipe.prepTimeMinutes}m`}
                  color="blue"
                />
                <InfoCard
                  icon={<Clock />}
                  title="Cook Time"
                  value={`${recipe.cookTimeMinutes}m`}
                  color="green"
                />
                <InfoCard
                  icon={<Users />}
                  title="Servings"
                  value={recipe.servings}
                  color="purple"
                />
                <InfoCard
                  icon={<ChefHat />}
                  title="Calories"
                  value={recipe.caloriesPerServing}
                  color="orange"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex flex-wrap items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Ingredients
                </h2>
              </div>

              <ul className="space-y-3">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-center group">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:bg-orange-500 transition-colors"></div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      {ingredient}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Instructions
              </h2>
              <div className="space-y-6">
                {recipe.instructions?.map((instruction, index) => (
                  <div key={index} className="flex group">
                    <div className="step-number pe-2 pt-0.5">{index + 1}-</div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                        {instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 mt-8">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Cuisine Type
                  </h3>
                  <p className="text-gray-700">{recipe.cuisine}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Meal Type
                  </h3>
                  <p className="text-gray-700">{recipe.mealType?.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecommendedRecipes currentId={recipe.id} />
    </div>
  );
}

export default RecipeDetailsTop;
