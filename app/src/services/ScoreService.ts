import axios from "axios";

export const updateScores = async (userID: number) => {
  try {
    await axios.post(`http://localhost:8080/score?userID=${userID}`);
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};
