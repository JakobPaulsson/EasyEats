import axios from "axios";

interface IngredientResponse {
  data: IngredientData | undefined;
}

interface IngredientData {
  ingredientAmounts: Array<string>;
  ingredientUnit: Array<string>;
  ingredients: Array<string>;
}
export const getIngredients = async (userID: number) => {
  try {
    const response: IngredientResponse = await axios.get(
      `http://localhost:8080/ingredient?userID=${userID}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};

export const addIngredient = async (
  userID: number,
  ingredient: string,
  ingredientAmount: number,
  ingredientUnit: string,
) => {
  try {
    await axios.post(
      `http://localhost:8080/ingredient?userID=${userID}&ingredient=${ingredient}&ingredientAmount=${ingredientAmount}&ingredientUnit=${ingredientUnit}`,
    );
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};

export const removeIngredient = async (userID: number, ingredient: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/ingredient?userID=${userID}&ingredient=${ingredient}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};
