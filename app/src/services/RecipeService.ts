import axios from "axios";
import { RecipeResponse } from "../types/responses.interface";

export const fetchSearchResults = async (
  ingredients: string,
  page: string | undefined,
): Promise<RecipeResponse | undefined> => {
  try {
    const ingredientsQuery = `title=${ingredients}`;
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/recipes/search?page=${page}&${ingredientsQuery}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};

export const fetchScored = async (page: string | undefined, userID: number) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/recipes?userID=${userID}&page=${page}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};
