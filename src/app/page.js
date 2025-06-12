"use client";
import RecipeCard from "@/components/RecipeCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const recipesPerPage = 8; // You can adjust this number

  async function fetchRecipes() {
    try {
      setIsLoading(true);
      const skip = (currentPage - 1) * recipesPerPage;
      const response = await fetch(
        `https://dummyjson.com/recipes?limit=${recipesPerPage}&skip=${skip}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data.recipes);
      setTotalPages(Math.ceil(data.total / recipesPerPage));
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
          <button
            onClick={fetchRecipes}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-4 rounded">
            Retry
          </button>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-lg text-gray-600">Loading recipes...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center flex-wrap container mx-auto px-4 mt-8 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 cursor-pointer border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50">
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border cursor-pointer rounded-md ${
                currentPage === page
                  ? "bg-orange-500 text-white"
                  : "hover:bg-orange-50"
              }`}>
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 cursor-pointer border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50">
            Next
          </button>
        </div>
      )}
    </main>
  );
}
