import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import VideoCard from "./VideoCard";
import ChannelCard from "./ChannelCard";

function Videos({ videos, direction }) {
  return (
    <Stack direction={direction || "row"} flexWrap='wrap' justifyContent='center' gap={3}>
      {videos &&
        videos.map((item, index) => {
          return (
            <Box key={index}>
              {item.id.videoId && <VideoCard video={item} />}
              {item.id.channelId && <ChannelCard channel={item} />}
            </Box>
          );
        })}
    </Stack>
  );
}

export default Videos;
