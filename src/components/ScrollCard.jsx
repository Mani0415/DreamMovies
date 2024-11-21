import React, { useRef, useEffect } from "react";
import { Cards } from "./Cards";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../App.css";
import { useMovieAuth } from "../context/MovieAuth";
import { useMovieDetails } from "../context/MovieAuthDetail";

export const ScrollCard = ({ data, headings, trending }) => {
  const { getMediaUrl, updateMediaType } = useMovieAuth();
  const { setCurrentPage } = useMovieDetails();
  const containerRef = useRef();
  let scrollStartX = 0;
  let isDragging = false;

  // Set current page after the component mounts
  useEffect(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  // Handle scrolling
  const handleNext = (e) => {
    e.stopPropagation();
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  const handlePrevs = (e) => {
    e.stopPropagation();
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  // Handle mouse events for scrolling
  const handleMouseDown = (e) => {
    isDragging = true;
    scrollStartX = e.pageX - containerRef.current.offsetLeft;
    containerRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - scrollStartX) * 2;
    containerRef.current.scrollLeft -= walk;
    scrollStartX = x;
  };

  const handleMouseUp = () => {
    isDragging = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseLeave = () => {
    isDragging = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  return (
    <div className="capitalize">
      <div>
        <h2 className="text-2xl text-white mt-3 p-2 font-bold">{headings}</h2>
      </div>
      <div className="relative">
        <div
          ref={containerRef}
          className="flex overflow-x-scroll gap-4 scroll-smooth transition-all scrollbar p-2 cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {data?.map((item, index) => {
            // Generate URL dynamically for each item in the data array
            const mediaUrl = getMediaUrl(item);

            return (
              <div
                key={item.id}
                className="flex-none"
                onClick={(e) => {
                  if (isDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                  // Update media type when an item is clicked
                  updateMediaType(
                    item.media_type || (item.name ? "tv" : "movie")
                  );
                }}
              >
                {/* Pass the dynamically generated mediaUrl to Cards */}
                <Cards
                  data={item}
                  index={index + 1}
                  trending={trending}
                  media_type={mediaUrl}
                />
              </div>
            );
          })}
        </div>
        <div className="absolute hidden lg:flex justify-between w-full h-80 items-center top-0 pointer-events-none">
          <button
            onClick={handlePrevs}
            className="bg-white/30 backdrop-blur-sm p-1 rounded-full ml-2 hover:bg-white/50 transition-colors pointer-events-auto"
          >
            <ArrowBackIosNewIcon sx={{ color: "white" }} />
          </button>
          <button
            onClick={handleNext}
            className="bg-white/30 backdrop-blur-sm p-1 rounded-full mr-2 hover:bg-white/50 transition-colors pointer-events-auto"
          >
            <ArrowForwardIosIcon sx={{ color: "white" }} />
          </button>
        </div>
      </div>
    </div>
  );
};
