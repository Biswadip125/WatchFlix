import { useDispatch } from "react-redux";
import { Airing_Today, options } from "../utils/constant";
import { getAiringTodayTvShows } from "../redux/movieSlice";
import axios from "axios";
const useAiringTodayTvshows = async () => {
  const dispatch = useDispatch();

  try {
    const res = await axios.get(Airing_Today, options);
    dispatch(getAiringTodayTvShows(res.data.results));
  } catch (err) {
    console.log(err);
  }
};

export default useAiringTodayTvshows;
