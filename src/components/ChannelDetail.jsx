import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
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
  const [showMore, setShowMore] = useState(false);

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
        console.log(channel);
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
        <Stack sx={{ flexDirection: { xs: "column", md: "row" }, justifyContent: "center", alignItems: "center" }}>
          <Box>{channel && <ChannelCard channel={channel} />}</Box>
          <Stack
            direction='column'
            justifyContent='start'
            sx={{ backgroundColor: "whitesmoke", width: { xs: "80%", md: "60%" } }}
            py={1}
            px={2}
          >
            <Typography variant='body1'>
              {showMore ? channel.snippet.description : `${channel.snippet.description.substring(0, 250)}`}
              <button className='show-more-btn' onClick={() => setShowMore(!showMore)}>
                {showMore ? "Show less" : "Show more"}
              </button>
            </Typography>
            <Stack
              sx={{
                flexDirection: "row",
                gap: { xs: "20px", md: "20px" },
                alignItems: { xs: "start", md: "center" },
                py: 3,
                flexWrap: "wrap",
              }}
            >
              <Typography variant='body1' sx={{ fontWeight: "bold", textAlign: "center" }}>
                {parseInt(channel.statistics.subscriberCount).toLocaleString()} subscribers
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: "bold", textAlign: "center" }}>
                {parseInt(channel.statistics.videoCount).toLocaleString()} videos
              </Typography>
              <Typography variant='body1' sx={{ fontWeight: "bold", textAlign: "center" }}>
                {parseInt(channel.statistics.viewCount).toLocaleString()} views
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Box p={2} display='flex'>
          <Box justifyContent='center' alignItems='center' />
          <Videos videos={videos} />
        </Box>
      </Stack>
    </Box>
  );
};

export default ChannelDetail;
