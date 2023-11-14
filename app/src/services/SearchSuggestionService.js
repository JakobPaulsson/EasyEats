import axios from "axios";

export const getSearchSuggestions = async (searchTerm) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/suggestions?searchInput=${searchTerm}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};
