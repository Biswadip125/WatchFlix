import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const TvShowsContainer = () => {
  const movie = useSelector((store) => store.movie);
  return (
    <div>
      <div className="-mt-18 relative z-10">
        <MovieList title={"Airing Today"} movies={movie.airingTodayTvShows} />
        <MovieList title={"On the Air"} movies={movie.onTheAirTvShows} />
        <MovieList title={"Popular"} movies={movie.popularTvShows} />
        <MovieList title={"Top Rated"} movies={movie.topRatedTvShows} />
      </div>
    </div>
  );
};

export default TvShowsContainer;
