import RecipeCard from "./RecipeCard"; // ← هنا استدعيناه

export default function RecipesList({ recipes }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
}
