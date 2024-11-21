import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const MovieAuthDetails = createContext();

export const MovieDetails = ({ children }) => {
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();

  const getEndpoint = () => {
    const path = location.pathname;
    if (path.includes("top_rated")) return "/movie/top_rated";
    if (path.includes("popular")) return "/movie/popular";
    if (path.includes("upcoming")) return "/movie/upcoming";
    if (path.includes("tv")) return "/trending/tv/week";
    if (path.includes("movie")) return "/trending/movie/week";
  };

  // Fetch movies based on category
  const fetchMovies = async (page) => {
    try {
      setLoading(true);
      const endpoint = getEndpoint();
      const response = await axios.get(endpoint, {
        params: {
          language: "en-US",
          page: page,
        },
      });

      // Set the entire movies list and total pages
      setMoviesList(response.data.results);
      setTotalPages(response.data.total_pages);
      setError(null);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when category changes
    fetchMovies(1);
  }, [location.pathname]); // Re-fetch when route changes

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const value = {
    moviesList,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    getEndpoint,
  };

  return (
    <MovieAuthDetails.Provider value={value}>
      {children}
    </MovieAuthDetails.Provider>
  );
};

export const useMovieDetails = () => {
  return useContext(MovieAuthDetails);
};
