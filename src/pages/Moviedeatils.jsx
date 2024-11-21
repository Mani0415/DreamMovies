import React, { useEffect, useState } from "react";
import { useLocation, useParams,Link } from "react-router-dom";
import { useMovieAuth } from "../context/MovieAuth";
import StarRateIcon from "@mui/icons-material/StarRate";
import axios from "axios";
import { Divider } from "../components/Divider";
import { ScrollCard, VideoPlay } from "./index";

export const Moviedeatils = () => {
  const { id, params } = useParams();
  const [details, setDetails] = useState(null);
  const [credit, setCredit] = useState(null);
  const { image , Media } = useMovieAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [reccom, setReccom] = useState([]);
  const [videoplay,setVideoPlay] = useState(false)
  const [videoplayID,setVideoPlayID] = useState('')
  const location = useLocation();
  const path = location.pathname;

  const handleVideoPlay = (details) =>{
    setVideoPlayID(details)
    setVideoPlay(true)
  }

  const getMovieDetailsEndpoint = (id) => {
    const path = location.pathname;
    if (path.includes("movie")) return `/movie/${id}`;
    if (path.includes("tv")) return `/tv/${id}`;
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const endpoint = getMovieDetailsEndpoint(id);
        const response = await axios.get(endpoint, {
          params: {
            language: "en-US",
          },
        });
        setDetails(response.data);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.status_message || error.message);
        console.error("Error fetching details:", error); // Log the error details
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  const getDirector = (id) => {
    let endpoint = "";
    if (path.includes("movie")) {
      endpoint = `/movie/${id}/credits`;
    } else if (path.includes("tv")) {
      endpoint = `/tv/${id}/credits`;
    }
    return endpoint;
  };

  const fetchCreadits = async () => {
    const endpoint = getDirector(id);
    try {
      const response = await axios.get(endpoint, {
        params: {
          language: "en-US",
        },
      });
      setCredit(response.data);
    } catch (error) {
      console.error("Error fetching credits:", error);
      setError(error.message);
    }
  };

  const getSimilr = () => {
    const path = location.pathname;
    let endpoint = "";
    if (path.includes("movie")) {
      endpoint = `/movie/${id}/similar`;
    } else if (path.includes("tv")) {
      endpoint = `/tv/${id}/similar`;
    }
    return endpoint;
  };

  const fetchSimilar = async () => {
    try {
      const endpoint = getSimilr(id);
      const response = await axios.get(endpoint, {
        params: {
          language: "en-US",
        },
      });
      setSimilar(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getReccom = () => {
    const path = location.pathname;
    let endpoint = "";
    if (path.includes("movie")) {
      endpoint = `/movie/${id}/recommendations`;
    } else if (path.includes("tv")) {
      endpoint = `/tv/${id}/recommendations`;
    }
    return endpoint;
  };

  const fetchReccom = async () => {
    try {
      const endpoint = getReccom(id);
      const response = await axios.get(endpoint, {
        params: {
          language: "en-US",
        },
      });
      setReccom(response.data.results);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchCreadits();
    fetchSimilar();
    fetchReccom();
  }, []);

  if (loading) return <div className="pt-20 text-white">Loading...</div>;
  if (error) return <div className="pt-20 text-white">Error: {error}</div>;
  if (!details) return <div className="pt-20 text-white">No details found</div>;

  const duration = Number(details.runtime / 60)
    .toFixed(1)
    .split(".");

  // Assuming names holds multiple jobs, you should use an array, not duplicate keys
  const names = ["Producer", "Executive Producer"];
  // Now filter the crew by job and map to the movie names
  const credits = credit?.crew
    ?.filter((movie) => names.includes(movie.job))
    ?.map((movie) => movie?.name)
    .join(",");

  return (
    <div key={details.id} className="h-full w-full">
      <div className="h-full w-full">
        {details ? (
          <>
            <div className="w-full h-full relative">
              <div className="w-full h-full hidden lg:block md:block">
                <img
                  className="w-full h-full object-cover"
                  src={
                    details?.backdrop_path
                      ? image + details.backdrop_path
                      : details?.belongs_to_collection?.backdrop_path
                      ? image + details.belongs_to_collection.backdrop_path
                      : "https://clipground.com/images/no-image-available-png-4.png"
                  }
                  alt={details?.title || "Image not available"}
                />
              </div>
              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-slate-950 to-transparent/60"></div>
            </div>
            <div className="absolute top-[345px] left-0 w-full h-full bg-gradient-to-t from-slate-950 to-transparent/90"></div>
            {/* <div className="absolute top-[645px] left-0 w-full h-full bg-gradient-to-t from-slate-950 to-transparent/90"></div> */}
            <div className="h-full w-full flex">
              <div className="h-full w-full ml-[55px] md:ml-[25px] lg:ml-[70px]">
                <img
                  className="absolute top-[80px] lg:top-[300px] md:top-[285px] w-[250px] lg:w-[200px] md:w-[200px] opacity-100 object-cover rounded-lg"
                  src={image + details.poster_path}
                  alt=""
                />
                <div className="absolute text-black top-[480px] left-[75px] lg:left-[70px] lg:top-[620px] bg-slate-200 px-16 py-2 rounded-xl hover:bg-gray-500">
                  <Link>
                    <button
                      onClick={() => handleVideoPlay(details)}
                      className=""
                    >
                      Play Now
                    </button>
                  </Link>
                </div>
                <div className="absolute p-3 left-4 text-black bg-slate-600 hidden lg:block">
                  <p className="font-bold">Production Companies:</p>
                  <img
                    className="w-[250px] mt-6 py-2"
                    src={
                      image + details?.production_companies?.[0]?.logo_path ||
                      "Logo not available"
                    }
                    alt=""
                  />
                  <img
                    className="w-[250px] mt-6 py-2"
                    src={
                      image + details?.production_companies?.[1]?.logo_path ||
                      "Logo not available"
                    }
                    alt=""
                  />
                  <img
                    className="w-[250px] mt-6 py-2"
                    src={
                      image + details?.production_companies?.[2]?.logo_path ||
                      "Logo not available"
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="z-30 h-full w-full mt-[540px]  -ml-[420px] md:-ml-[350px] md:-mt-[80px] lg:-ml-[750px] lg:-mt-[350px]">
                <div className="w-full h-full text-slate-400 px-6">
                  <h1 className="text-xl font-bold lg:text-3xl">
                    {details.title || details.name || details.original_name}
                  </h1>
                  <p className="text-sm py-2">
                    {details?.tagline || details?.genres ? [0]?.name : ""}
                  </p>
                  <Divider />
                  <div className="flex py-5 lg:gap-10 gap-[24px] text-[12px] lg:text-[14px]">
                    <p className="">
                      Ratings : {Number(details?.vote_average).toFixed(1)}
                      <StarRateIcon
                        className="absolute"
                        sx={{
                          fontSize: "14px",
                          color: "yellow",
                          marginTop: "2px",
                          marginLeft: "2px",
                        }}
                      />
                    </p>
                    |<p>View : {Number(details.vote_count).toFixed(0)}</p>|
                    <p>
                      Duration:{" "}
                      {duration?.length > 0
                        ? `${duration[0]}h ${duration[1] || 0}m`
                        : details.episode_run_time
                        ? `${Math.floor(details.episode_run_time / 60)}h ${
                            details.episode_run_time % 60
                          }m`
                        : "Not mentioned"}
                    </p>
                  </div>
                  <Divider />
                  <h2 className="text-lg py-2">Overview :</h2>
                  <p className="text-sm py-3 text-slate-500">
                    {details.overview}
                  </p>
                  <Divider />
                  <div className="flex py-4 items-center text-[14px] lg:text-[16px] leading-8 text-center gap-3">
                    <p className="">Status : {details.status}</p>
                    <span>|</span>
                    <p className="">
                      Release date :{" "}
                      {details.release_date || details.first_air_date}
                    </p>
                    <span>|</span>
                    <p>Revenue : {details.revenue || "Not mentioned"}</p>
                  </div>
                  <Divider />
                  <div className="text-sm leading-8">
                    <p className="py-3">
                      <strong className="text-slate-300">Director</strong> :{" "}
                      {credit?.crew && credit?.crew[0]?.original_name
                        ? credit.crew[0].original_name
                        : "Unknown Director"}
                    </p>
                    <Divider />
                    <p className="py-3">
                      <strong className="text-slate-300">Producers</strong> :{" "}
                      {credits && credits ? credits : "Unknown producers"}
                    </p>
                    <Divider />
                  </div>
                </div>

                <div className="text-slate-300 w-full h-full text-sm">
                  <h2 className="text-2xl py-4 ml-3">Cast : </h2>
                  <div className="ml-4 gap-6 grid grid-cols-3 lg:grid-cols-7 md:grid-cols-6">
                    {credit?.cast
                      ?.filter((profile) => profile.profile_path)
                      .map((starcast, index) => {
                        return (
                          <div key={starcast.id} className="py-2">
                            <div className="">
                              <img
                                className="w-24 h-24 object-cover rounded-full"
                                src={image + starcast?.profile_path}
                                alt=""
                              />
                            </div>
                            <div className="text-center mt-6">
                              <h2 className="">
                                {starcast?.original_name || starcast?.name}
                                <br />
                                As
                                <br /> {starcast?.character || "Not Mentined"}
                              </h2>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <Divider />
              </div>
            </div>
            <div className="h-full">
              <ScrollCard
                data={similar}
                headings={"Similar " + Media + " Shows"}
              />
              <ScrollCard
                data={reccom}
                headings={"Reccom " + Media + " Shows"}
              />
            </div>
            <div className="">
              {videoplay && (
                <VideoPlay
                  videoID={videoplayID}
                  close={() => setVideoPlay(false)}
                  media_type={Media}
                />
              )}
            </div>
          </>
        ) : (
          "no details"
        )}
      </div>
    </div>
  );
};
