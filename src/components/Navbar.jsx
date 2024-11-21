import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useMovieAuth } from "../context/MovieAuth";
import { useState } from "react";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery(""); // Clear search after submitting
    }
  };

  return (
    <>
      <div className="flex fixed bg-black opacity-50 w-full h-16 px-4 py-2 items-center justify-between lg:justify-start z-40">
        {/* Logo Section */}
        <div className="text-white text-[15px] md:text-2xl font-bold sm:text-xl lg:text-3xl">
          <h1>Dream Movies</h1>
        </div>

        {/* Navigation Links (Hidden on small screens, visible on lg and above) */}
        <div className="hidden lg:flex px-20 space-x-10 text-neutral-100 list-none">
          <Link to="/" className="hover:text-[#646963]">
            <li>Home</li>
          </Link>
          <Link to="/top_rated" className="hover:text-[#646963]">
            <li>Top</li>
          </Link>
          <Link to="/popular" className="hover:text-[#646963]">
            <li>Popular</li>
          </Link>
          <Link to="/upcoming" className="hover:text-[#646963]">
            <li>Upcoming</li>
          </Link>
        </div>

        {/* Search Section */}
        <form onSubmit={handleSearch} className="relative flex justify-center items-center w-[200px] sm:w-[60%] md:w-[50%] lg:w-[30%] lg:ml-8 mt-2 sm:mt-0">
          <SearchIcon className="absolute z-30 left-3 top-1/2 transform -translate-y-1/2 text-gray-700 sm:text-lg" />
          <InputBase
            className="relative bg-white opacity-50 rounded px-7 sm:px-4 w-full"
            sx={{ ml: 1, flex: 1, paddingX: 4 }}
            placeholder="Search Movies..."
            inputProps={{ "aria-label": "search Movies" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
    </>
  );
};
