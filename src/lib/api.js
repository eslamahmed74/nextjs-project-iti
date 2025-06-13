export async function fetchAllRecipes() {
    const response = await fetch('https://dummyjson.com/recipes');
    const data = await response.json();
    console.log('Fetching all recipes from API');
    return data.recipes;
}

export async function fetchRecipeById(id) {
    const response = await fetch(`https://dummyjson.com/recipes/${id}`);
    if (!response.ok) {
        throw new Error(`Error fetching recipe with ID ${id}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(`Fetching recipe with ID ${id} from API`);
    return data;
}