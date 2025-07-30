import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import useNowPlayingMovies from "../hooks/useNowPLayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import MovieContainer from "./MovieContainer";
import useBackdropImages from "../hooks/useBackdropImages.js";
import { fetchWatchlist } from "../utils/fetchWatchlist.js";
import Menu from "./Menu.jsx";
import Carousel from "./Carousel.jsx";

const Browse = () => {
  const user = useSelector((store) => store.app.user);

  const navigate = useNavigate();

  const menuToggle = useSelector((store) => store.movie.menuToggle);

  const dispatch = useDispatch();

  //my custom hooks
  const { fetchBackdropImages } = useBackdropImages();
  const { fetchNowPLayingMovies } = useNowPlayingMovies();
  const { fetchPopularMovies } = usePopularMovies();
  const { fetchTopRatedMovies } = useTopRatedMovies();
  const { fetchUpcomingMovies } = useUpcomingMovies();
  useEffect(() => {
    fetchBackdropImages();
    fetchNowPLayingMovies();
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpcomingMovies();
    fetchWatchlist(dispatch);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  return (
    <div className="bg-black h-auto w-full  text-white relative">
      {menuToggle && <Menu />}

      <Carousel interval={5000} />

      <MovieContainer />
    </div>
  );
};

export default Browse;
