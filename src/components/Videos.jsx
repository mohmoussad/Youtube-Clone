import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";

function Videos({ videos, direction }) {
  return (
    <Stack direction={direction || "row"} flexWrap='wrap' justifyContent='center' gap={3}>
      {videos?.length > 0 ? (
        videos.map((item, index) => {
          return (
            <Box key={index}>
              {item.id.videoId && <VideoCard video={item} />}
              {item.id.channelId && <ChannelCard channel={item} />}
            </Box>
          );
        })
      ) : (
        <h3>No videos to show</h3>
      )}
    </Stack>
  );
}

export default Videos;
