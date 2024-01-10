import axios from "axios";
import { RecipeResponse } from "../types/responses.interface";
axios.defaults.withCredentials = true;

export const fetchSearchResults = async (
  ingredients: string,
  page: string | undefined,
  userID: number
): Promise<RecipeResponse | undefined> => {
  try {
    const ingredientsQuery = `title=${ingredients}`;
    const response = await axios.get(
      `${process.env.REACT_APP_HOST}/recipes/search?page=${page}&${ingredientsQuery}&userID=${userID}`
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
      `${process.env.REACT_APP_HOST}/recipes?userID=${userID}&page=${page}`
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};
