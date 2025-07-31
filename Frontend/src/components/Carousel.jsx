import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BACKDROP_IMAGE_URL } from "../utils/constant";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
const Carousel = ({ interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = useSelector((store) => store.movie.backdropImages);

  const location = useLocation();
  const [imgLoading, setImgLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    if (!slides || slides.length === 0) return;

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(slideInterval);
  }, [slides, interval]);

  useEffect(() => {
    setImgLoading(true);
  }, [currentIndex]);

  if (!slides) {
    return (
      <div className="h-screen w-full text-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-10 shimmer"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      {/* Background image */}
      {initialLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-10 shimmer"></div>
      )}
      <img
        key={slides?.[currentIndex]?.id}
        src={`${BACKDROP_IMAGE_URL}${slides?.[currentIndex]?.backdrop_path}`}
        alt="hero"
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-all ease-out delay-75 duration-700 ${
          !imgLoading
            ? "opacity-100 blur-0 scale-100"
            : "opacity-0 blur-sm scale-105"
        }`} //← use z-0
        onLoad={() => {
          setImgLoading(false);
          setInitialLoading(false);
        }}
      />
      {/*Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-transparent z-20" />
      {/* Content */}
      <div className="relative z-30 h-full flex items-center px-6 md:px-16 lg:px-32">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            {location.pathname === "/"
              ? slides[currentIndex]?.original_title
              : slides[currentIndex]?.name}
          </h1>

          <p className="text-sm md:text-base text-gray-200">
            {location.pathname === "/"
              ? slides[currentIndex]?.release_date?.split("-")[0]
              : slides[currentIndex]?.first_air_date?.split("-")[0]}{" "}
            | {slides[currentIndex]?.adult ? "18+" : "PG-13"}
          </p>

          <p className="text-gray-300">
            {slides[currentIndex]?.overview?.length > 200
              ? slides[currentIndex].overview.slice(0, 200) + "..."
              : slides[currentIndex]?.overview}
          </p>

          <div className="flex gap-4 mt-6">
            <Link
              to={`/watch/${location.pathname === "/" ? "movie" : "tvshow"}/${
                slides[currentIndex]?.id
              }`}
              className="bg-white hover:bg-white/80 text-black font-semibold py-2 px-4 rounded-md flex items-center gap-2 text-sm md:text-base"
            >
              <FaPlay className="w-4 h-4" />
              Play Now
            </Link>
            <Link
              to={`/details/${location.pathname === "/" ? "movie" : "tv"}/${
                slides[currentIndex]?.id
              }`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded-md flex items-center gap-2 text-sm md:text-base"
            >
              <IoIosInformationCircleOutline className="w-5 h-5" />
              More Info
            </Link>
          </div>
        </div>
      </div>
      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides?.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2  rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
Carousel.propTypes = {
  interval: PropTypes.number.isRequired,
};
export default Carousel;
