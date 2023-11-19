import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

interface SearchProps {
  currentSearch: string;
  handleSearch: (s: string) => void;
}

function Search({ currentSearch, handleSearch }: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>(currentSearch);

  const submitSearch = () => {
    handleSearch(searchValue);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch();
  };

  const handleChange = (event: string) => {
    setSearchValue(event);
  };

  const handleClick = () => {
    submitSearch();
  };
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      onSubmit={(event) => handleSubmit(event)}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Recipes"
        inputProps={{ "aria-label": "search google maps" }}
        value={searchValue}
        onChange={(event) => handleChange(event.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        onClick={() => handleClick()}
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
