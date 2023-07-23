import React from "react";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";

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
            alignItems: "center",

            textAlign: "center",
            gap: "5px",
          }}
        >
          <CardMedia
            image={channel?.snippet?.thumbnails?.high?.url}
            alt={channel?.snippet?.title}
            sx={{ borderRadius: "50%", height: "180px", width: "180px", mb: 2, border: "2px solid #e3e3e3" }}
          />
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
            {channel?.snippet?.title}
          </Typography>
        </CardContent>
      </Link>
    </Box>
  );
};

export default ChannelCard;
