export default function RecipeCard({ recipe }) {
  return (
    <a
      href={`/recipe/${recipe.id}`}
      style={{
        textDecoration: "none",
        color: "black",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
      }}>
      <img
        src={recipe.image}
        alt={recipe.name}
        width="100%"
        style={{ borderRadius: "8px" }}
      />
      <h3>{recipe.name}</h3>
      <p>
        <strong>Meal Type:</strong> {recipe.mealType?.join(", ")}
      </p>
      <p>
        <strong>Rating:</strong> {recipe.rating} ⭐
      </p>
    </a>
  );
}
