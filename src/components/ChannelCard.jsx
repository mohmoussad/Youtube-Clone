import React from "react";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { truncateString } from "../utils/utils";

const ChannelCard = ({ channel }) => {
  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { md: "350px", xs: "100%" },
        height: "326px",
        margin: "auto",
      }}
    >
      <Link to={`/channel/${channel?.id?.channelId}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <CardMedia
            image={channel?.snippet?.thumbnails?.high?.url}
            alt={channel?.snippet?.title}
            sx={{ borderRadius: "50%", height: "180px", width: "180px", mb: 2, border: "2px solid #e3e3e3" }}
          />
          <Typography variant='h6'>{truncateString(channel?.snippet?.title, 20)}</Typography>
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
