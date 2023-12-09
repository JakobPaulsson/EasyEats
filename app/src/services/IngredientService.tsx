import axios from "axios";
axios.defaults.withCredentials = true;

export interface IngredientResponse {
  data: IngredientData | undefined;
}

export interface IngredientData {
  ingredientAmounts: Array<string>;
  ingredientUnit: Array<string>;
  ingredients: Array<string>;
}
export const getIngredients = async (userID: number) => {
  try {
    const response: IngredientResponse = await axios.get(
      `${process.env.REACT_APP_HOST}/ingredient?userID=${userID}`,
    );
    if (response && response.data) {
      localStorage.setItem("ingredients", JSON.stringify(response));
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
      `${process.env.REACT_APP_HOST}/ingredient?userID=${userID}&ingredient=${ingredient}&ingredientAmount=${ingredientAmount}&ingredientUnit=${ingredientUnit}`,
    );
  } catch (error) {
    console.error("Failed to fetch search query", error);
  } finally {
    getIngredients(userID);
  }
};

export const removeIngredient = async (userID: number, ingredient: string) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_HOST}/ingredient?userID=${userID}&ingredient=${ingredient}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch search query", error);
  } finally {
    getIngredients(userID);
  }
};
