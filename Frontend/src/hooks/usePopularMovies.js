import axios from "axios";
import { options, Popular_Movie } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getPopularMovies } from "../redux/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const fetchPopularMovies = async () => {
    try {
      const res = await axios.get(Popular_Movie, options);
      dispatch(getPopularMovies(res.data.results));
    } catch (err) {
      console.log(err.message);
    }
  };

  return { fetchPopularMovies };
};

export default usePopularMovies;
