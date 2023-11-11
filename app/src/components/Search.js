import { React, useState } from "react";
import axios from "axios";

function Search({ string, page, handleSearch }) {
  const [searchValue, setSearchValue] = useState(string);
  const fetchRecipes = async (string) => {
    try {
      const ingredientsQuery = `title=${string}`;
      console.log(ingredientsQuery);
      const response = await axios.get(
        `http://localhost:8080/recipes/search?page=${page}&${ingredientsQuery}`,
      );
      if (response && response.data) {
        console.log(response);
        return response.data;
      }
    } catch (error) {
      console.error("Failed to fetch search query", error);
    }
  };
  const handleInputChange = async (event) => {
    setSearchValue(event.target.value);
    const value = await fetchRecipes(event.target.value); // Await the result
    handleSearch({ value: value, query: event.target.value });
  };
  return (
    <div className="searchWrapper">
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeHolder="Search"
      />
    </div>
  );
}

export default Search;
