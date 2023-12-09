import axios from "axios";
axios.defaults.withCredentials = true;

interface SearchResponse {
  data: SearchData;
}

interface SearchData {
  searchResults: [string];
}
export const getSearchSuggestions = async (
  searchTerm: string,
  userID: number
) => {
  try {
    const response: SearchResponse = await axios.get(
      `${process.env.REACT_APP_HOST}/suggestions?searchInput=${searchTerm}&userID=${userID}`
    );
    if (response && response.data) {
      return response;
    }
  } catch (error) {
    console.error("Failed to fetch search query", error);
  }
};
