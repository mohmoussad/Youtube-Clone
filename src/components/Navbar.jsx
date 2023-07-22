import React from "react";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";

function Navbar({ toggleSidebar }) {
  return (
    <Stack
      direction='row'
      alignItems='center'
      sx={{
        zIndex: 3,
        background: "white",
        position: "sticky",
        height: "auto",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <Stack direction='row'>
        <button onClick={toggleSidebar} className='sidebar-toggle-btn'>
          <MenuIcon />
        </button>
        <Link to='/' style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt='Logo' height={45} />
        </Link>
      </Stack>

      <SearchBar />
    </Stack>
  );
}

export default Navbar;
