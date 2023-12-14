import axios from "axios";
axios.defaults.withCredentials = true;

export const updateScores = async (userID: number) => {
  try {
    await axios.post(`${process.env.REACT_APP_HOST}/score?userID=${userID}`);
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};
