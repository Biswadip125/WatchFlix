import { useEffect } from "react";
import Header from "./Header";
import Carousel from "./Carousel";
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

  const navigate = useNavigate();
  const menuToggle = useSelector((store) => store.movie.menuToggle);
  const { fetchBackdropImages } = useBackdropImages();
  useAiringTodayTvshows();
  useOnTheAirTvshows();
  usePopularTvshows();
  useTopRatedTvshows();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetchBackdropImages();
  }, [fetchBackdropImages]);

  return (
    <div className="bg-black w-full h-auto text-white">
      <Header />

      {menuToggle && <Menu />}
      <Carousel interval={5000} />
      <TvShowsContainer />
    </div>
  );
};

export default TvShows;
