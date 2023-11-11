import { React, useState } from "react";
import axios from "axios";

function Search({handleSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleSearch({searchValue});
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <div className="searchWrapper">
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchValue} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>    </div>
  );
}

export default Search;
