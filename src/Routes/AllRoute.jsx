import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { ExpolrePage, MovieList, Moviedeatils, SearchPage } from "../pages";
import { MovieDetails } from "../context/MovieAuthDetail";

export const AllRoute = () => {
  return (
    <MovieDetails>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:category" element={<ExpolrePage />} />
        <Route
          path="/:category/:id"
          element={<Moviedeatils />}
        />
        <Route path="*" element={<div>404: Page not found</div>} />
      </Routes>
    </MovieDetails>
  );
};
