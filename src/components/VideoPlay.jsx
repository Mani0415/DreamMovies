import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import ReactPlayer from "react-player";
import '../App.css'

export const VideoPlay = ({ videoID, close, media_type }) => {
  const [video, setVideo] = useState(null);

  const fetchVideoplay = async () => {
    try {
      const response = await axios.get(
        `/${media_type}/${videoID?.id}/videos`,
        {
          params: {
            language: "en-US",
          },
        }
      );
      setVideo(response.data);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  useEffect(() => {
    fetchVideoplay();
  }, []);

  // Filter to find a video of type 'Teaser'
  const teaserVideo = video?.results?.find((vid) => vid.type === "Trailer");

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-opacity-50 bg-neutral-700 h-full w-full z-40 flex justify-center items-center video-play-container">
      <div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded-lg overflow-hidden video-play-content">
        <button
          onClick={close}
          className="absolute text-sm lg:right-[120px] lg:top-8 right-2 top-[190px] close-icon-button"
        >
          <CloseIcon sx={{ color: "white", fontSize: "32px" }} />
        </button>
        {teaserVideo ? (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${teaserVideo.key}`}
            playing
            controls
            width="100%"
            height="100%"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            No teaser video available.
          </div>
        )}
      </div>
    </div>
  );
};
