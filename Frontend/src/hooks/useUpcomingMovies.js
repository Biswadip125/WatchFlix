import axios from "axios";
import { options, Upcoming_Movies } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getUpcomingMovies } from "../redux/movieSlice";

const useUpcomingMovies = async () => {
  const dispatch = useDispatch();
  try {
    const res = await axios.get(Upcoming_Movies, options);
    dispatch(getUpcomingMovies(res.data.results));
  } catch (err) {
    console.log(err.message);
  }
};

export default useUpcomingMovies;
