import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import Videos from "./Videos";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => {
      setLoading(false);
      setVideos(data.items);
    });
  }, [searchTerm]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box minHeight='95vh'>
          <Typography variant='h5' fontWeight={900} mb={3}>
            Search Results for <span>{searchTerm}</span>
          </Typography>
          <Box display='flex'>
            <Box sx={{ mr: { sm: "100px" } }} />
            {<Videos videos={videos} />}
          </Box>
        </Box>
      )}
    </>
  );
};

export default SearchFeed;
