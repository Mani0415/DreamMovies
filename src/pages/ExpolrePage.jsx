import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Cards } from "../components/Cards";
import { useMovieDetails } from "../context/MovieAuthDetail";
import { useMovieAuth } from "../context/MovieAuth";

export const ExpolrePage = () => {

  const {
    moviesList,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useMovieDetails();
  const {getMediaUrl} = useMovieAuth();
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("top_rated")) return "Top Rated Movies";
    if (path.includes("popular")) return "Popular Movies";
    if (path.includes("upcoming")) return "Upcoming Movies";
    if (path.includes("tv")) return "TV Shows";
    if (path.includes("movie")) return "Movies";
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  if (loading) return <div className="pt-20 text-white">Loading...</div>;
  if (error) return <div className="pt-20 text-white">{error}</div>;

  return (
    <div className="container mx-1 md:mx-[15px] lg:mx-[30px]">
      <h1 className="text-white lg:text-3xl font-bold pt-20 pb-6">
        {getTitle()} (Page {currentPage} of {totalPages})
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 lg:gap-x-[200px] sm:gap-x-[70px] md:gap-x-[30px]">
        {moviesList &&
          moviesList.map((movie) => {
            const mediaUrl = getMediaUrl(movie);
            return (
              <div key={movie.id}>
                <Cards data={movie} media_type={mediaUrl} />
              </div>
            );
            
          })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 py-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-5 py-2 rounded-full text-[10px] lg:text-lg lg:py-2 lg:px-4 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white"
        >
          Previous
        </button>
        <span className="text-white flex items-center text-[12px] lg:text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-5 rounded-full text-[10px] lg:text-lg lg:py-2 lg:px-4 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};
