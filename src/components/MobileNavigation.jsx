import React from 'react'
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import { Link } from 'react-router-dom';
export const MobileNavigation = () => {
  return (
    <>
      <section className="lg:hidden md:gap-[250px] opacity-50 bg-black fixed bottom-0 w-full h-[40px] flex gap-12 text-white">
        <div className="ml-4 mt-2">
          <Link className='' to="/">
            <HouseOutlinedIcon
              className="rounded transition"
              sx={{ fontSize: "30px" }}
            />home
             </Link>
        </div>
        <div className="mt-2">
          <Link to="/tv">
            <DesktopWindowsOutlinedIcon className="rounded transition" />
            TV Shows
          </Link>
        </div>
        <div className="mt-2">
          <Link to="/movie">
            <MovieCreationOutlinedIcon className="rounded transition" />
            Movies
          </Link>
        </div>
      </section>
    </>
  );
}
