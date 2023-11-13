import axios from "axios";

export const updateScores = async (userID) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/recipes/score?userID=${userID}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};
