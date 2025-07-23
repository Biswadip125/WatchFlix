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

  useEffect(() => {
    if (!slides || slides.length === 0) return;

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(slideInterval);
  }, [slides, interval]);

  if (!slides) {
    return (
      <div className="h-screen w-full text-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-10 shimmer"></div>
      </div>
    );
  }
  return (
    <div className="relative w-full h-auto lg:h-screen overflow-hidden ">
      {/* Gradient container */}
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-black via-transparent to-transparent"></div>

      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides &&
          slides.length > 0 &&
          slides.map((slide, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <img
                src={`${BACKDROP_IMAGE_URL}${slide.backdrop_path}`}
                alt={slide.original_title}
                className="w-full h-full object-cover "
              />
            </div>
          ))}
      </div>

      {slides && slides.length > 0 && (
        <div className="absolute lg:top-10 lg:bottom-10 md:top-24 md:bottom-0 top-12 bottom-0 left-1 right-4 md:left-3 md:right-8 flex flex-col justify-center space-x-2 mb-4 z-20">
          <div className="max-w-xl md:max-w-2xl ml-2">
            <h1 className="text-xl md:text-4xl lg:text-5xl font-bold ">
              {location.pathname === "/"
                ? slides[currentIndex].original_title
                : slides[currentIndex].name}
            </h1>
            <p className=" mt-1 md:mt-4 text-sm md:text-lg ">
              {location.pathname === "/"
                ? slides[currentIndex]?.release_date
                  ? slides[currentIndex].release_date.split("-")[0]
                  : "N/A"
                : slides[currentIndex]?.first_air_date
                ? slides[currentIndex].first_air_date.split("-")[0]
                : "N/A"}{" "}
              | {slides[currentIndex]?.adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-xs hidden md:block md:text-base lg:text-lg ">
              {slides[currentIndex].overview.length > 200
                ? slides[currentIndex].overview + "..."
                : slides[currentIndex].overview}
            </p>
          </div>
          <div className="flex gap-3 md:mt-8 mt-2">
            <Link
              className="flex items-center justify-center gap-2 px-2 py-1.5 md:px-3 md:py-2.5 lg:px-5 lg:py-3 bg-white hover:bg-white/80 text-black rounded-md text-xs md:text-sm lg:text-lg"
              to={`/watch/${location.pathname === "/" ? "movie" : "tvshow"}/${
                slides[currentIndex].id
              }`}
            >
              <FaPlay className="lg:h-[20px] md:h-[13px] h-[10px] lg:w-[20px] md:w-[15px] w-[10px]" />{" "}
              <span className="lg:text-[18px] md:text-[15px] text-[10px]">
                Play Now
              </span>
            </Link>
            <Link className="flex items-center justify-center gap-2 px-2 py-1.5  md:px-3 md:py-2.5 lg:px-5 lg:py-3 bg-gray-500/70 hover:bg-gray-500 text-white rounded-md ">
              <IoIosInformationCircleOutline className="lg:h-[26px] md:h-[19px] h-[15px] lg:w-[26px] md:w-[19px] w-[15px]" />{" "}
              <span className="lg:text-[18px] md:text-[15px] text-[10px]">
                More Info
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* Navigation dots */}
      {slides && slides.length > 0 && (
        <div className="absolute lg:bottom-4  bottom-0 md:bottom-0 left-0  md:right-6 right-12 flex justify-center space-x-2 md:mb-4 mb-3">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`md:w-3 w-2 md:h-3 h-2 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
Carousel.propTypes = {
  interval: PropTypes.number.isRequired,
};
export default Carousel;
