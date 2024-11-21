import Button from "@mui/material/Button";
import { useMovieAuth } from "../context/MovieAuth";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { ScrollCard } from "../components/ScrollCard";
import { Link } from "react-router-dom";

export const MovieList = () => {
  const {
    movies,
    image,
    nowplaying,
    topRated,
    popular,
    onTheair,
    airingToday,
    Media,
    getMediaUrl,
  } = useMovieAuth();
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < movies.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };
  const handlePrevs = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (current < movies.length - 1) {
        handleNext();
      } else {
        setCurrent(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [current, movies.length]);

  return (
    <>
      <section className="w-full h-full scroll-smooth">
        <div className="flex min-h-full max-h-[95vh] overflow-hidden">
          {movies.map((movie) => {
            const mediaurl = getMediaUrl(movie);
            return (
              <div
                className="min-w-full min-h-[550px] lg:min-h-full overflow-hidden relative group transition-transform duration-200"
                key={movie.id}
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                <div className="w-full h-full">
                  <img
                    className="h-full w-full object-cover"
                    src={image + movie.backdrop_path}
                    alt={movie.title || movie.name}
                  />
                </div>
                {/* Slider buttons */}
                <div className="absolute top-0 w-full h-full z-50 hidden items-center justify-between group-hover:lg:flex">
                  <Button sx={{ borderRadius: "700px" }} onClick={handlePrevs}>
                    <ArrowBackIosNewIcon sx={{ color: "white" }} />
                  </Button>
                  <Button sx={{ borderRadius: "700px" }} onClick={handleNext}>
                    <ArrowForwardIosIcon sx={{ color: "white" }} />
                  </Button>
                </div>
                <div className="absolute top-9 w-full h-full bg-gradient-to-t from-slate-950 to-transparent"></div>
                <div className="container mb-12 mx-auto absolute bottom-0 max-w-md px-4">
                  <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                    {movie?.name || movie?.title}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2 text-slate-400">
                    {movie.overview}
                  </p>
                  <div className="flex mb-2 items-center gap-4 text-slate-400">
                    <p>Ratings: {Number(movie.vote_average).toFixed(1)}+</p>
                    <span>|</span>
                    <p>View: {Number(movie.popularity).toFixed(0)}</p>
                  </div>
                  {/* Ensure z-index and positioning are correctly set */}
                  <Link
                    className="relative top-2 z-50 text-black bg-white px-4 py-2 rounded-md cursor-pointer hover:bg-slate-400"
                    to={mediaurl}
                  >
                    Play Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <ScrollCard data={movies} headings="Trending Shows" trending={true} />
      <ScrollCard data={popular} headings="Popular TV Shows" trending={true} />
      <ScrollCard data={nowplaying} headings="Now Playing" />
      <ScrollCard data={topRated} headings="Top Rated" />
      <ScrollCard data={onTheair} headings="On The Air" />
      <ScrollCard data={airingToday} headings="Upcoming" />
    </>
  );
};
