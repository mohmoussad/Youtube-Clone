import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { truncateString } from "../utils/utils";

function VideoCard({ video }) {
  const {
    id: { videoId },
    snippet,
  } = video;
  return (
    video && (
      <Card sx={{ boxShadow: "none", borderRadius: "15px 15px 0 0", width: "350px" }}>
        <Link to={`/video/${videoId}`}>
          <CardMedia alt={snippet?.title} sx={{ width: "100%", height: 200 }} image={snippet?.thumbnails?.high?.url} />
        </Link>
        <CardContent sx={{ height: 100 }}>
          <Link to={`/video/${videoId}`}>
            <Typography fontWeight='bold' variant='subtitle1'>
              {truncateString(snippet?.title, 60)}
            </Typography>
          </Link>
          <Link to={`/channel/${snippet?.channelId}`}>
            <Typography fontWeight='bold' variant='subtitle2' sx={{ marginTop: 1 }}>
              {truncateString(snippet?.channelTitle, 38)}
            </Typography>
          </Link>
        </CardContent>
      </Card>
    )
  );
}

export default VideoCard;
