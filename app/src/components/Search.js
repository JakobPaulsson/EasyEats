import { React, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

function Search({ currentSearch, handleSearch }) {
  const [searchValue, setSearchValue] = useState(currentSearch);

  const handleSubmit = async (event) => {
    console.log(event);
    event.preventDefault();
    handleSearch({ searchValue });
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Recipes"
        inputProps={{ "aria-label": "search google maps" }}
        value={searchValue}
        onChange={(event) => handleChange(event)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        onClick={(event) => handleSubmit(event)}
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Search;
