import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <Stack
      sx={{
        flexDirection: "row",
        borderRadius: 20,
        border: "1px solid #e3e3e3",
        pl: 2,
        boxShadow: "none",
        mr: 1,
        width: "50%",
      }}
    >
      <input
        className='search-bar'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton onClick={onhandleSubmit} type='submit' sx={{ p: "10px", color: "red" }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Stack>
  );
};

export default SearchBar;
