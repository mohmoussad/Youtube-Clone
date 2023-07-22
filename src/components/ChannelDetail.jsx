import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Videos from "./Videos";
import ChannelCard from "./ChannelCard";
import Loader from "./Loader";

const ChannelDetail = () => {
  const [channel, setChannel] = useState();
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => setChannel(data?.items[0]));
    fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`).then((data) => setVideos(data?.items));
    setLoading(false);
  }, [id]);

  return (
    <Box sx={{ overflowY: "auto", flex: 2 }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box>{channel && <ChannelCard channel={channel} marginTop='-93px' />}</Box>
          <Box p={2} display='flex'>
            <Box sx={{ mr: { sm: "100px" } }} />
            <Videos videos={videos} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ChannelDetail;
