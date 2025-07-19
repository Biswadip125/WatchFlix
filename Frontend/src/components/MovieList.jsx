import React, { useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { GrBold, GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

const MovieList = ({ title, movies }) => {
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  return (
    <div
      className={`relative ${location.pathname === "/search" ? "mt-5" : ""}`}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h1
        className={`md:text-[26px] text-[16px] ml-2 py-2 pt-2 mt-2 ${
          location.pathname.includes("/watch") ? "mb-0" : "mb-2"
        } overflow-hidden font-bold ${title ? "block" : "hidden"}`}
      >
        {title && title}
      </h1>
      <div
        className=" flex overflow-x-auto no-scrollbar  cursor-pointer relative"
        ref={sliderRef}
      >
        <div className="flex items-center ">
          {movies &&
            movies.length > 0 &&
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/4 left-5 md:left-15 md:flex hidden items-center justify-center size-12 rounded-full bg-red-600 bg-opacity-50 hover:bg-opacity-85 text-white z-10 "
            onClick={(e) => {
              e.stopPropagation();
              scrollLeft();
            }}
          >
            <GrPrevious size={20} />
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/4 right-5 md:right-15 md:flex hidden items-center justify-center size-12 rounded-full bg-red-600 bg-opacity-50 hover:bg-opacity-85 text-white z-10"
            onClick={(e) => {
              e.stopPropagation();
              scrollRight();
            }}
          >
            <GrNext size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default MovieList;
