import { useDispatch } from "react-redux";
import { options, Popular_TVSHOWS } from "../utils/constant";
import { getPopularTvShows } from "../redux/movieSlice";
import axios from "axios";
const usePopularTvshows = async () => {
  const dispatch = useDispatch();

  try {
    const res = await axios.get(Popular_TVSHOWS, options);
    dispatch(getPopularTvShows(res.data.results));
  } catch (err) {
    console.log(err);
  }
};

export default usePopularTvshows;
