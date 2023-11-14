import axios from "axios";

export const fetchRecipes = async (ingredients, page) => {
  const ingredientsQuery = ingredients
    .map((ing) => `ingredients=${ing}`)
    .join("&");
  console.log(ingredientsQuery);
  try {
    const response = await axios.get(
      `http://localhost:8080/recipes?page=${page}&${ingredientsQuery}`,
    );

    if (response.data.length === 0) {
      return 1;
    } else {
      return response;
    }
  } catch (error) {}
};

export const fetchSearchResults = async (ingredients, page) => {
  try {
    const ingredientsQuery = `title=${ingredients}`;
    const response = await axios.get(
      `http://localhost:8080/recipes/search?page=${page}&${ingredientsQuery}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};
