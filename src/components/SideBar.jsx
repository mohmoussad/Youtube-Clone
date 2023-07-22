import React from "react";
import { Box, Stack } from "@mui/material";
import { categories } from "../utils/constants";
import { Link } from "react-router-dom";

function SideBar({ selectedCategory, setSelectedCategory, isOpen }) {
  return (
    <Box
      sx={
        isOpen
          ? { position: "sticky", top: "58px", height: "100vh" }
          : { position: "absolute", left: "-180px", width: "180px" }
      }
    >
      <Stack
        sx={{
          height: "100%",
          width: "180px",
          paddingBottom: 4,
          backgroundColor: "white",
          justifyContent: "start",
        }}
        className='sidebar-stack'
      >
        {categories.map((category) => {
          return (
            <Link key={category.name} to='/'>
              <button
                onClick={() => setSelectedCategory(category.name)}
                className='category-btn'
                style={{
                  background: selectedCategory === category.name && "rgb(198, 198, 198)",
                  color: "black",
                  width: "90%",
                }}
              >
                <span
                  style={{
                    marginRight: "15px",
                  }}
                >
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </button>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
}

export default SideBar;
