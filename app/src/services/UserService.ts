import axios from "axios";

export const setSelectedPreset = async (userID: number, name: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/user/preset?userID=${userID}&name=${name}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to set selected preset", error);
  }
};
