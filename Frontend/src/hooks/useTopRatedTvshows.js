import { useDispatch } from "react-redux";
import { options, Top_Rated_TVSHOWS } from "../utils/constant";
import { getTopRatedTvShows } from "../redux/movieSlice";
import axios from "axios";
const useTopRatedTvshows = async () => {
  const dispatch = useDispatch();

  try {
    const res = await axios.get(Top_Rated_TVSHOWS, options);
    dispatch(getTopRatedTvShows(res.data.results));
  } catch (err) {
    console.log(err);
  }
};

export default useTopRatedTvshows;
