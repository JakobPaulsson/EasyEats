import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function RecipeDetails() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await axios.get(`http://your-api/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    }

    fetchRecipe();
  }, [recipeId]); // Fetch the recipe details when `recipeId` changes

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      {/* Display other recipe details */}
    </div>
  );
}

export default RecipeDetails;
