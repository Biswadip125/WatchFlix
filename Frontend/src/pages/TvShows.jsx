import { useEffect } from "react";
import Carousel from "../components/Carousel";
import Menu from "../components/Menu";
import { useSelector } from "react-redux";
import useBackdropImages from "../hooks/useBackdropImages";
import useAiringTodayTvshows from "../hooks/useAiringTodayTvshows";
import TvShowsContainer from "../components/TvShowsContainer";
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
      {menuToggle && <Menu />}
      <Carousel interval={5000} />
      <TvShowsContainer />
    </div>
  );
};

export default TvShows;
