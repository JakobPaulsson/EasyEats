import axios from "axios";

export const getIngredients = async (userID) => {
  try {
    const response = await axios.get(
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
  userID,
  ingredient,
  ingredientAmount,
  ingredientUnit,
) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/ingredient?userID=${userID}&ingredient=${ingredient}&ingredientAmount=${ingredientAmount}&ingredientUnit=${ingredientUnit}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};

export const removeIngredient = async (userID, ingredient) => {
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
