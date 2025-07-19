import axios from "axios";
import { Now_Playing_Movie, options } from "../utils/constant";
import { getNowPlayingMovies } from "../redux/movieSlice";
import { useDispatch } from "react-redux";

const useNowPlayingMovies = async () => {
  const dispatch = useDispatch();
  try {
    const res = await axios.get(Now_Playing_Movie, options);
    dispatch(getNowPlayingMovies(res.data.results));
  } catch (err) {
    console.log(err.message);
  }
};

export default useNowPlayingMovies;
