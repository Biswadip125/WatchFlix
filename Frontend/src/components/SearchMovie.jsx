import React, { useState } from "react";
import axios from "axios";
import { options, SEARCH_MOVIE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from "../redux/searchSlice";

import MovieList from "./MovieList";
import { setSearchPageContentType } from "../redux/movieSlice";

const SearchMovie = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const dispatch = useDispatch();

  const searchedMovies = useSelector((store) => store.search.searchedMovies);
  const movieName = useSelector((store) => store.search.movieName);

  const [searchMovieLoader, setSearchMovieloader] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("movie");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    dispatch(setSearchPageContentType(tab));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setSearchMovieloader(true);
    setHasSearched(true);
    try {
      const res = await axios.get(
        `${SEARCH_MOVIE_URL}${activeTab}?query=${searchInputValue}&include_adult=false&language=en-US&page=1`,
        options
      );

      if (res.data.results) {
        const movies = res.data.results;
        dispatch(setSearchMovieDetails({ searchInputValue, movies }));
      }
      setSearchInputValue("");
    } catch (err) {
      console.log(err);
    } finally {
      setSearchMovieloader(false);
    }
  };

  return (
    <>
      <div className=" pl-[7%] pr-[7%] pt-[15%] sm:pt-[10%] md:pt-[12%] lg:pt-[5%] h-screen relative">
        <div className=" mb-5 flex items-center justify-center gap-5">
          <button
            className={`h-10 w-20 ${
              activeTab === "movie" ? "bg-red-500" : "bg-gray-800"
            } hover:bg-red-700 rounded-lg `}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`h-10 w-24 ${
              activeTab === "tv" ? "bg-red-500" : "bg-gray-800"
            } rounded-lg hover:bg-red-700`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
        </div>
        <form>
          <div className="flex items-center p-2 border border-gray-300 rounded-full bg-white md:mt-0 mt-8">
            <input
              type="text"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              placeholder="Search..."
              className="flex-grow p-2 focus:outline-none text-black"
            />
            <button
              onClick={submitHandler}
              className="py-2 px-5 ml-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none "
            >
              Search
            </button>
          </div>
        </form>
        {movieName && (
          <div className="message mt-5 ml-2 font-semibold">
            <p className="text-xl ">Showing results for {movieName}</p>
          </div>
        )}
        {searchMovieLoader ? (
          <div role="status" className="mt-7 text-center">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : searchedMovies && searchedMovies.length > 0 ? (
          <MovieList movies={searchedMovies} />
        ) : hasSearched ? (
          <p className="mt-2 ml-2 text-[20px]">
            No {activeTab === "movie" ? "Movies" : "Tv Shows"} available
          </p>
        ) : (
          <p className="mt-9 ml-2 text-[20px] text-center">
            Nothing Searched Yet
          </p>
        )}
      </div>
    </>
  );
};

export default SearchMovie;
