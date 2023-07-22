import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import Videos from "./Videos";
import Loader from "./Loader";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => setVideoDetail(data.items[0]));
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data) => setVideos(data.items));
    setLoading(false);
  }, [id]);

  return (
    <Box sx={{ overflowY: "auto", flex: 2 }}>
      {loading ? (
        <Loader />
      ) : (
        <Stack alignItems='center'>
          {videoDetail && (
            <Box sx={{ width: "70%" }}>
              <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls />
              <Typography variant='h5' fontWeight='bold' p={2}>
                {videoDetail.snippet.title}
              </Typography>
              <p>{videoDetail.snippet.publishedAt}</p>

              <Stack direction='row' justifyContent='space-between' py={1} px={2}>
                <Link to={`/channel/${videoDetail.snippet.channelId}`}>
                  <Typography variant='h5'>{videoDetail.snippet.channelTitle}</Typography>
                </Link>
                <Stack direction='row' gap='20px' alignItems='center'>
                  <Typography variant='body1' sx={{ opacity: 0.7 }}>
                    {parseInt(videoDetail.statistics.viewCount).toLocaleString()} views
                  </Typography>
                  <Typography variant='body1' sx={{ opacity: 0.7 }}>
                    {parseInt(videoDetail.statistics.likeCount).toLocaleString()} likes
                  </Typography>
                </Stack>
              </Stack>
              <p>{videoDetail.snippet.description}</p>
            </Box>
          )}

          {videos && (
            <Box margin={10} justifyContent='center' alignItems='center'>
              <Videos videos={videos} direction='row' />
            </Box>
          )}
        </Stack>
      )}
    </Box>
  );
};

export default VideoDetail;
