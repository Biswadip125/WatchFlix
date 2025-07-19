import { useDispatch } from "react-redux";
import { On_The_Air, options } from "../utils/constant";
import { getOnTheAirTvShows } from "../redux/movieSlice";
import axios from "axios";
const useOnTheAirTvshows = async () => {
  const dispatch = useDispatch();

  try {
    const res = await axios.get(On_The_Air, options);
    dispatch(getOnTheAirTvShows(res.data.results));
  } catch (err) {
    console.log(err);
  }
};

export default useOnTheAirTvshows;
