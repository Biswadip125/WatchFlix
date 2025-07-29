import { useEffect, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  MOVIE_DETAILS_URL,
  options,
  TV_SHOWS_DETAILS_URL,
} from "../utils/constant";

import { setMoviesList, setTvShowsList } from "../redux/movieSlice";
import MovieList from "./MovieList";
import Menu from "./Menu";

const Watchlist = () => {
  const watchlist = useSelector((store) => store.movie.watchlist);

  const moviesInWatchlist = useMemo(
    () => watchlist.filter((item) => item.contentType === "movie"),
    [watchlist]
  );

  const tvShowsInWatchlist = useMemo(
    () => watchlist.filter((item) => item.contentType === "tvshow"),
    [watchlist]
  );

  const dispatch = useDispatch();

  const moviesList = useSelector((store) => store.movie.moviesList);

  const tvShowsList = useSelector((store) => store.movie.tvShowsList);

  const menuToggle = useSelector((store) => store.movie.menuToggle);

  // Fetch movies only when moviesInWatchlist changes
  useEffect(() => {
    const fetchMovies = async () => {
      if (moviesInWatchlist.length === 0) return; // Exit if no movies

      const movieDataArray = [];

      await Promise.all(
        moviesInWatchlist.map(async (movie) => {
          try {
            const res = await axios.get(
              `${MOVIE_DETAILS_URL}${movie.id}`,
              options
            );
            movieDataArray.push(res.data);
          } catch (err) {
            console.error(err.message);
          }
        })
      );

      // Only dispatch if there's new data to set
      if (movieDataArray.length > 0) {
        dispatch(setMoviesList(movieDataArray));
      }
    };

    fetchMovies();
  }, [moviesInWatchlist, dispatch]); // Depend only on moviesInWatchlist and dispatch

  // Fetch tvshows only when tvShowsInWatchlist changes
  useEffect(() => {
    const fetchTvShows = async () => {
      if (tvShowsInWatchlist === 0) return; // Exit if no movies

      const tvShowsDataArray = [];

      await Promise.all(
        tvShowsInWatchlist.map(async (tvShow) => {
          try {
            const res = await axios.get(
              `${TV_SHOWS_DETAILS_URL}${tvShow.id}`,
              options
            );
            tvShowsDataArray.push(res.data);
          } catch (err) {
            console.error(err.message);
          }
        })
      );

      // Only dispatch if there's new data to set
      if (tvShowsDataArray.length > 0) {
        dispatch(setTvShowsList(tvShowsDataArray));
      }
    };

    fetchTvShows();
  }, [tvShowsInWatchlist, dispatch]); // Depend only on tvShowsInWatchlist and dispatch

  return (
    <div
      className={`w-full ${
        moviesInWatchlist.length > 0 && tvShowsInWatchlist.length > 0
          ? "lg:h-auto"
          : "lg:h-screen"
      } h-screen bg-black text-white`}
    >
      {menuToggle && <Menu />}
      <div className="h-3/4 w-full pt-24 md:pl-24 md:pr-24 pl-10 pr-10">
        <h1 className="text-3xl font-bold">Watchlist : Movies & Tv Shows</h1>
        <div className="movies">
          <h3 className="text-2xl font-semibold mt-6">
            Movies ({moviesList.length})
          </h3>
          <hr className="w-full border-1 border-t-white/70" />
          <div className="mt-5  items-center ">
            <MovieList movies={moviesList} />
          </div>
        </div>
        <div className="movies">
          <h3 className="text-2xl font-semibold mt-6">
            TV Shows ({tvShowsList.length})
          </h3>
          <hr className="w-full border-1 border-t-white/70" />
          <div className="mt-5  items-center ">
            <MovieList movies={tvShowsList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
