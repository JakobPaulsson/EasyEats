import axios from "axios";

interface SearchResponse {
  data: SearchData;
}

interface SearchData {
  searchResults: [string];
}
export const getSearchSuggestions = async (searchTerm: string) => {
  try {
    const response: SearchResponse = await axios.get(
      `http://localhost:8080/suggestions?searchInput=${searchTerm}`,
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};
