import React, { useEffect } from "react";
import Header from "./Header";
import Carousel from "./Carousel";
import ProfileMenu from "./ProfileMenu";
import Menu from "./Menu";
import { useSelector } from "react-redux";
import useBackdropImages from "../hooks/useBackdropImages";
import useAiringTodayTvshows from "../hooks/useAiringTodayTvshows";
import TvShowsContainer from "./TvShowsContainer";
import useOnTheAirTvshows from "../hooks/useOnTheAirTvshows";
import usePopularTvshows from "../hooks/usePopularTvshows";
import useTopRatedTvshows from "../hooks/useTopRatedTvshows";
import { useNavigate } from "react-router-dom";

const TvShows = () => {
  const user = useSelector((store) => store.app.user);
  const profileMenuToggle = useSelector(
    (store) => store.movie.profileMenuToggle
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });
  const menuToggle = useSelector((store) => store.movie.menuToggle);

  useAiringTodayTvshows();
  useOnTheAirTvshows();
  usePopularTvshows();
  useTopRatedTvshows();
  useBackdropImages();

  return (
    <div className="bg-black w-full h-auto text-white">
      <Header />
      {profileMenuToggle && <ProfileMenu />}
      {menuToggle && <Menu />}
      <Carousel interval={5000} />
      <TvShowsContainer />
    </div>
  );
};

export default TvShows;
