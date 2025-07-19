import axios from "axios";
import { options, Top_Rated_Movie } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getTopRatedMovies } from "../redux/movieSlice";

const useTopRatedMovies = async () => {
  const dispatch = useDispatch();
  try {
    const res = await axios.get(Top_Rated_Movie, options);
    dispatch(getTopRatedMovies(res.data.results));
  } catch (err) {
    console.log(err.message);
  }
};

export default useTopRatedMovies;
