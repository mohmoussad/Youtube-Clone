import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Videos from "./Videos";
import Loader from "./Loader";
import ErrorAlert from "./ErrorAlert";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    Promise.all([
      fetchFromAPI(`videos?part=snippet,statistics&id=${id}`),
      fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`),
    ])
      .then(([videoDetailData, videosData]) => {
        if (videoDetailData?.items?.length == 0) {
          throw new Error("There is an Error in getting this video, Try again later");
        }
        setVideoDetail(videoDetailData.items[0]);
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
        <Box sx={{ marginTop: { xs: 0, md: 3 }, width: { xs: "100%", md: "80%" } }}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls height='60vh' />
          <Typography variant='h5' fontWeight='bold' p={2}>
            {videoDetail.snippet.title}
          </Typography>

          <Stack direction='row' alignItems='center' justifyContent='space-between' py={1} px={2}>
            <Link to={`/channel/${videoDetail.snippet.channelId}`}>
              <Typography
                sx={{
                  backgroundColor: "whitesmoke",
                  px: 2,
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <SmartDisplayIcon style={{ marginRight: "6px", color: "red" }} />
                {videoDetail.snippet.channelTitle}
              </Typography>
            </Link>
            <Stack
              sx={{
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: "0px", md: "20px" },
                alignItems: { xs: "start", md: "center" },
                px: 2,
              }}
            >
              <Typography variant='body1' className='dimmed'>
                {parseInt(videoDetail.statistics.viewCount).toLocaleString()} views
              </Typography>
              <Typography variant='body1' className='dimmed'>
                {parseInt(videoDetail.statistics.likeCount).toLocaleString()} likes
              </Typography>
            </Stack>
          </Stack>
          <Stack direction='column' justifyContent='space-between' py={1} px={2}>
            <Typography variant='body1' className='dimmed'>
              {}
              {showMore ? videoDetail.snippet.description : `${videoDetail.snippet.description.substring(0, 250)}`}
              <button className='show-more-btn' onClick={() => setShowMore(!showMore)}>
                {showMore ? "Show less" : "Show more"}
              </button>
            </Typography>
          </Stack>
        </Box>

        <Box margin={10} justifyContent='center' alignItems='center'>
          <Videos videos={videos} direction='row' />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
