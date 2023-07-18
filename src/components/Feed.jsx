import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import SideBar from "./SideBar";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";

function Feed() {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => setVideos(data.items));
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <Typography variant='body2' className='copyright' sx={{ mt: 1.5, color: "#fff" }}>
          © 2023 Google LLC
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant='h4' fontWeight='bold' marginBottom={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#F31503" }}>Videos</span>
        </Typography>
      </Box>
      <Videos videos={videos} />
    </Stack>
  );
}

export default Feed;
