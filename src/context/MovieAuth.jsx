import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// 1. Create the context
const MovieAuth = createContext();

// 2. MovieProvider component
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [image, setImage] = useState([]);
  const [nowplaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [onTheair, setOnTheAir] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [Media, setMediaType] = useState(null);

  //configuration data
  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      setImage(response.data.images.secure_base_url + "original");
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchTrending = async () => {
    try {
      const response = await axios.get("/trending/all/week");
      setMovies(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get("/movie/now_playing");
      setNowPlaying(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchTopRated = async () => {
    try {
      const response = await axios.get("/movie/top_rated");
      setTopRated(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchPopular = async () => {
    try {
      const response = await axios.get("/trending/tv/week");
      setPopular(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchOnTheAir = async () => {
    try {
      const response = await axios.get("/tv/on_the_air");
      setOnTheAir(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchAiringToday = async () => {
    try {
      const response = await axios.get("/movie/upcoming");
      setAiringToday(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getMediaUrl = (item) => {
    // Check for media_type, fallback to "movie" or "tv"
    const mediaType = item?.media_type || (item.name ? "tv" : "movie");
    return `/${mediaType}/${item.id}`;
  };
  const updateMediaType = (mediaType) => {
    setMediaType(mediaType);
  };
  useEffect(() => {
    fetchTrending();
    fetchConfiguration();
    fetchNowPlaying();
    fetchTopRated();
    fetchPopular();
    fetchOnTheAir();
    fetchAiringToday();
  }, []);

  const values = {
    movies,
    image,
    nowplaying,
    topRated,
    popular,
    onTheair,
    airingToday,
    Media,
    updateMediaType,
    getMediaUrl,
  };

  // Return the provider with children
  return <MovieAuth.Provider value={values}>{children}</MovieAuth.Provider>;
};

// 3. Custom hook to use the context
export const useMovieAuth = () => {
  return useContext(MovieAuth);
};
