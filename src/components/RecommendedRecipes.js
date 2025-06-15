"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAllRecipes } from "@/lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RecommendedRecipes({ currentId }) {
  const [recipes, setRecipes] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const cardsToShow = 5;

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const allRecipes = await fetchAllRecipes();
        const filtered = allRecipes.filter((r) => r.id !== Number(currentId));
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setRecipes(shuffled.slice(0, 15));
      } catch (err) {
        console.error("Failed to fetch recipes", err);
      }
    };

    getRecipes();
  }, [currentId]);

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + cardsToShow >= recipes.length ? 0 : prev + cardsToShow
    );
  };

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev - cardsToShow < 0 ? recipes.length - cardsToShow : prev - cardsToShow
    );
  };

  return (
    <div className="bg-white pt-16 pb-8 px-4 mt-12 shadow-inner rounded-xl">
      <div className="max-w-8xl mx-auto relative">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Recommended Recipes
        </h2>

        <div className="flex overflow-hidden gap-4 justify-center">
          {recipes.slice(startIndex, startIndex + cardsToShow).map((recipe) => (
            <div
              key={recipe.id}
              className="min-w-[250px] bg-white rounded-xl shadow-md overflow-hidden transition mb-2.5 hover:scale-105">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-3 text-center">
                <h3 className="text-base font-semibold mb-1">{recipe.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.cuisine && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                      {recipe.cuisine}
                    </span>
                  )}

                  {recipe.difficulty && (
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                      {recipe.difficulty}
                    </span>
                  )}
                  {recipe.mealType && recipe.mealType.length > 0 && (
                    <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
                      {recipe.mealType[0]}
                    </span>
                  )}
                </div>
                <Link href={`/recipes/${recipe.id}`}>
                  <button className="bg-orange-500 text-white px-4 py-1 rounded-md text-sm hover:bg-orange-600 transition cursor-pointer">
                    View Recipe
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-orange-200 text-orange-800 p-2 rounded-full shadow hover:bg-orange-300">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-200 text-orange-800 p-2 rounded-full shadow hover:bg-orange-300">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
