import { useEffect } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import useNowPlayingMovies from "../hooks/useNowPLayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import MovieContainer from "./MovieContainer";
import useBackdropImages from "../hooks/useBackdropImages.js";
import ProfileMenu from "./ProfileMenu.jsx";
import { fetchWatchlist } from "../utils/fetchWatchlist.js";
import Menu from "./Menu.jsx";

const Browse = () => {
  const user = useSelector((store) => store.app.user);

  const navigate = useNavigate();

  const profileMenuToggle = useSelector(
    (store) => store.movie.profileMenuToggle
  );
  const menuToggle = useSelector((store) => store.movie.menuToggle);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  //my custom hooks
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useBackdropImages();
  fetchWatchlist(dispatch);

  return (
    <div className="bg-black h-auto w-full  text-white relative">
      <Header />
      {profileMenuToggle && <ProfileMenu />}
      {menuToggle && <Menu />}
      <Carousel interval={5000} />
      <MovieContainer />
    </div>
  );
};

export default Browse;
