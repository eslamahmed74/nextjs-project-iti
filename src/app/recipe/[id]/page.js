import RecipeDetailsTop from "@/components/RecipeDetailsTop";
// import { fetchRecipeById } from "../../../lib/api";


export default async function RecipeDetails({ params }) {
    // const recipe = await fetchRecipeById(params.id);

    return (
    <RecipeDetailsTop/>

        // <main className="w-[80%] mx-auto my-5">
        //     <div className="flex gap-4" >
        //         <img src={recipe.image} alt={recipe.name} className="w-full max-w-[500px] h-auto object-cover rounded-xl" />
        //         <div>
        //             <h1 className="font-bold text-xl">{recipe.name}</h1>
        //             <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins</p>
        //             <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} mins</p>
        //             <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
        //             <p><strong>Servings:</strong> {recipe.servings}</p>
        //             <p><strong>Calories/Serving:</strong> {recipe.caloriesPerServing}</p>
        //             <p><strong>Tags:</strong> {recipe.tags?.join(", ")}</p>
        //             <h3>Ingredients</h3>
        //             <ul>
        //                 {recipe.ingredients?.map((ing, idx) => (
        //                     <li key={idx}>{ing}</li>
        //                 ))}
        //             </ul>
        //         </div>
        //     </div>
        //     <div className="">
        //         <h3>Instructions</h3>
        //         <ol>
        //             {recipe.instructions?.map((step, idx) => (
        //                 <li key={idx}>{step}</li>
        //             ))}
        //         </ol>
        //     </div>
        // </main>
    );
}
