import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Videos from "./Videos";
import ChannelCard from "./ChannelCard";
import Loader from "./Loader";
import ErrorAlert from "./ErrorAlert";

const ChannelDetail = () => {
  const [channel, setChannel] = useState();
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    Promise.all([
      fetchFromAPI(`channels?part=snippet&id=${id}`),
      fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`),
    ])
      .then(([channelData, videosData]) => {
        if (channelData?.pageInfo?.totalResults == 0) {
          throw new Error("There is an Error in getting this channel, Try again later");
        }
        setChannel(channelData.items[0]);
        setVideos(videosData.items);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <Box sx={{ overflowY: "auto", flex: 2 }}>
      <Stack alignItems='center'>
        <Box>{channel && <ChannelCard channel={channel} marginTop='-93px' />}</Box>
        <Box p={2} display='flex'>
          <Box justifyContent='center' alignItems='center' />
          <Videos videos={videos} />
        </Box>
      </Stack>
    </Box>
  );
};

export default ChannelDetail;
