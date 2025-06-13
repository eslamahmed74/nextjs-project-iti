import RecipesList from "@/components/recepiesList";
import { fetchAllRecipes } from "@/lib/api";
import Image from "next/image";

export default async function Home() {
  const recipes = await fetchAllRecipes();

  return (
    <main style={{ padding: "20px" }}>
      <h1>All Recipes</h1>
      <RecipesList recipes={recipes} />
    </main>
  );
}