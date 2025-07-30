import axios from "axios";
import { options, Top_Rated_Movie } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getTopRatedMovies } from "../redux/movieSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const fetchTopRatedMovies = async () => {
    try {
      const res = await axios.get(Top_Rated_Movie, options);
      dispatch(getTopRatedMovies(res.data.results));
    } catch (err) {
      console.log(err.message);
    }
  };

  return { fetchTopRatedMovies };
};

export default useTopRatedMovies;
