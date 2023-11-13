import axios from "axios";

export const fetchScored = async (page) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/recipes?userID=1&page=${page}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
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
