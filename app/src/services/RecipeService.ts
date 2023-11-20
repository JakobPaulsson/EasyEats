import axios from "axios";
import { RecipeResponse } from "../types/responses.interface";

export const fetchSearchResults = async (
  ingredients: string,
  page: string | undefined,
): Promise<RecipeResponse | undefined> => {
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

export const fetchScored = async (page: string | undefined) => {
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
