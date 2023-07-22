import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import Navbar from "./components/Navbar";
import Feed from "./components/Feed";
import VideoDetail from "./components/VideoDetail";
import ChannelDetail from "./components/ChannelDetail";
import SearchFeed from "./components/SearchFeed";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { useState, useRef, useEffect } from "react";
import SideBar from "./components/SideBar";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [position, setPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    window.scroll({
      top: position.top,
      left: position.left,
      behavior: "smooth",
    });
  });

  const scrollTop = useRef();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 200
        ? (scrollTop.current.style.display = "inline-block")
        : (scrollTop.current.style.display = "none");
    });
  });

  return (
    <BrowserRouter>
      <Box>
        <Navbar toggleSidebar={toggleSidebar} />
        <Stack
          sx={{
            flexDirection: { sx: "column", md: "row" },
          }}
        >
          <SideBar isOpen={isOpen} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <Routes>
            <Route
              path='/'
              exact
              element={<Feed selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}
            />
            <Route path='/video/:id' exact element={<VideoDetail />} />
            <Route path='/channel/:id' exact element={<ChannelDetail />} />
            <Route path='/search/:searchTerm' exact element={<SearchFeed />} />
          </Routes>
        </Stack>
        <button
          onClick={() => setPosition({ ...position, position: { top: 0, left: 0 } })}
          className='to-top-btn'
          ref={scrollTop}
        >
          <ArrowUpwardIcon />
        </button>
      </Box>
    </BrowserRouter>
  );
}

export default App;
