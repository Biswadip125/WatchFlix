import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BACKDROP_IMAGE_URL,
  MOVIE_DETAILS_URL,
  MOVIE_VIDEO_URL,
  options,
  TV_SHOWS_VIDEO_URL,
} from "../utils/constant";
import axios from "axios";
import Header from "./Header";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import ReactPlayer from "react-player";
import MovieList from "./MovieList";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchSkeleton from "./WatchSkeleton";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import ProfileMenu from "./ProfileMenu";

const Watch = () => {
  const { id } = useParams();
  const { contentType } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [similarContent, setSimilarContent] = useState(null);

  const profileMenuToggle = useSelector(
    (store) => store.movie.profileMenuToggle
  );
  const menuToggle = useSelector((store) => store.movie.menuToggle);

  const increaseIndex = () => {
    if (currentTrailerIdx < trailers.length - 1) {
      setCurrentTrailerIdx((currentTrailerIdx) => currentTrailerIdx + 1);
    }
  };

  const decreaseIndex = () => {
    if (currentTrailerIdx > 0) {
      setCurrentTrailerIdx((currentTrailerIdx) => currentTrailerIdx - 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    const getTrailers = async () => {
      try {
        const res = await axios.get(
          `${
            contentType === "movie" ? MOVIE_VIDEO_URL : TV_SHOWS_VIDEO_URL
          }${id}/videos?language=en-US`,
          options
        );
        setTrailers(res.data.results);
      } catch (err) {
        console.log(err);
        setTrailers([]);
      }
    };
    getTrailers();
  }, [id]);

  useEffect(() => {
    setLoading(true);
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(
          `${
            contentType === "movie" ? MOVIE_DETAILS_URL : TV_SHOWS_VIDEO_URL
          }${id}/similar?language=en-US`,
          options
        );
        setSimilarContent(res.data.results);
      } catch (err) {
        console.log(err);
        setSimilarContent([]);
      }
    };
    getSimilarContent();
  }, [id]);

  useEffect(() => {
    setLoading(true);
    const getMovieDetails = async () => {
      try {
        const res = await axios.get(
          `${
            contentType === "movie" ? MOVIE_VIDEO_URL : TV_SHOWS_VIDEO_URL
          }${id}?language=en-US`,
          options
        );
        setContent(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchSkeleton />
        {menuToggle && <Menu />}
      </div>
    );
  }

  if (!content) {
    return (
      <div className="w-full h-screen bg-black text-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <h2 className="text-5xl font-bold text-center">Content Not Found</h2>
        </div>
        {menuToggle && <Menu />}
      </div>
    );
  }

  return (
    <div className="bg-black h-auto w-full text-white relative">
      <Header />
      <div className=" px-12 md:px-30 lg:px-52 py-[85px] w-full h-full ">
        {/*Video Player */}

        {trailers.length > 0 && (
          <ReactPlayer
            controls={true}
            width={"100%"}
            height={"75vh"}
            className="mx-auto overflow-hidden rounded-lg"
            url={`https://youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
          />
        )}
        {trailers.length === 0 && (
          <h2 className="text-xl text-center mt-5">
            No trailers available for{" "}
            <span className="font-bold text-red-600">
              {content?.title || content?.original_name}
            </span>
          </h2>
        )}

        {/*Movie Details*/}
        <div className="flex flex-col mt-32 lg:flex-row gap-20 items-center justify-between">
          <div>
            <h2 className="text-5xl text-white font-bold text-balance">
              {content?.title || content?.original_name}
            </h2>
            <p className="mt-2 text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-2 text-lg ">{content?.overview}</p>
          </div>
          <img
            className="max-h-[600px] rounded-md"
            src={BACKDROP_IMAGE_URL + content?.poster_path}
          ></img>
        </div>

        {/*Similar Content Slider*/}
        <div className=" mt-5">
          {similarContent?.length > 0 && (
            <MovieList
              title={
                location.pathname.includes("/movies")
                  ? "Similar Movies"
                  : "Similar TvShows"
              }
              movies={similarContent}
            />
          )}
        </div>
      </div>

      {/*Navigation  Buttons*/}
      <div className="absolute top-32 flex justify-between w-full lg:px-28 px-1">
        <button
          className={`lg:w-11 lg:h-11 md:h-9 md:w-9 h-8 w-8 bg-gray-500/70 hover:bg-gray-500 rounded-full flex items-center justify-center  ${
            currentTrailerIdx === 0
              ? "opacity-50 cursor-not-allowed "
              : "cursor-pointer"
          }`}
          disabled={currentTrailerIdx === 0}
          onClick={decreaseIndex}
        >
          <GrPrevious className="lg:w-[20px] md:w-[17px] w-[15px] lg:h-[20px] md:h-[17px] h-[15px]" />
        </button>
        <button
          className={`lg:w-11 lg:h-11 md:h-9 md:w-9 h-8 w-8 bg-gray-500/70 hover:bg-gray-500 rounded-full flex items-center justify-center ${
            currentTrailerIdx === trailers.length - 1
              ? "opacity-50 cursor-not-allowed "
              : "cursor-pointer"
          }`}
          disabled={currentTrailerIdx === trailers.length - 1}
          onClick={increaseIndex}
        >
          <GrNext className="lg:w-[20px] md:w-[17px] w-[15px] lg:h-[20px] md:h-[17px] h-[15px]" />
        </button>
      </div>
      {menuToggle && <Menu />}
      {profileMenuToggle && <ProfileMenu />}
    </div>
  );
};

export default Watch;
