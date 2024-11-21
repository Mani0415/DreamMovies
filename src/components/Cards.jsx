import React from "react";
import { Link } from "react-router-dom"; // Import useNavigate
import { useMovieAuth } from "../context/MovieAuth";
import moment from "moment";
import StarRateIcon from "@mui/icons-material/StarRate";

export const Cards = ({ data, trending, index,media_type }) => {
  const { image, loading, error } = useMovieAuth();

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error: {error}</p>;
  if (!data) return null;

  return (
    <Link to={media_type}
      className="lg:w-[230px] md:w-[180px] w-[170px] lg:h-80 overflow-hidden rounded relative block hover:scale-105 transition-transform duration-200 cursor-pointer no-underline"
    >
      <div className="w-full h-full">
        {data.poster_path ? (
          <img
            src={image + data.poster_path}
            alt={data.title || data.name || "Movie poster"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-700 flex items-center justify-center text-white">
            No Image Available
          </div>
        )}
      </div>

      {trending && (
        <div className="absolute top-5 backdrop-blur-3xl bg-black/60 overflow-hidden text-white rounded-r-full p-1 px-4 font-semibold text-sm">
          #{index} Trending
        </div>
      )}

      <div className="absolute bottom-0 backdrop-blur-3xl p-2 text-sm w-full h-14 bg-black/65">
        <h2 className="text-white font-semibold text-ellipsis line-clamp-1">
          {data?.title || data?.name}
        </h2>
        <div className="flex justify-between text-[10px] lg:text-xs mt-1">
          <p className="text-slate-400">
            {data?.release_date || data?.first_air_date
              ? moment(data?.release_date || data?.first_air_date).format("LL")
              : "Release date unknown"}
          </p>
          <p className="text-white flex items-center gap-1">
            <StarRateIcon sx={{ fontSize: "12px", color: "yellow" }} />
            <span>
              {data?.vote_average
                ? Number(data?.vote_average).toFixed(1)
                : "N/A"}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};
