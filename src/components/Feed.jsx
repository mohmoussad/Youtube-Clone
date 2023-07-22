import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Videos from "./Videos";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Loader from "./Loader";
import ErrorAlert from "./ErrorAlert";

function Feed({ selectedCategory }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory == "Home" ? "New" : selectedCategory}`)
      .then((data) => {
        setVideos(data.items);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [selectedCategory]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <>
      <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
        <Box p={2} sx={{ overflowY: "auto", height: "auto", flex: 2 }}>
          <Typography variant='h5' fontWeight='bold' marginBottom={2}>
            {selectedCategory} <span>Videos</span>
          </Typography>

          <Videos videos={videos} />
        </Box>
      </Stack>
    </>
  );
}

export default Feed;
