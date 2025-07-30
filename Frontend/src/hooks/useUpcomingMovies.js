import axios from "axios";
import { options, Upcoming_Movies } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getUpcomingMovies } from "../redux/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const fetchUpcomingMovies = async () => {
    try {
      const res = await axios.get(Upcoming_Movies, options);
      dispatch(getUpcomingMovies(res.data.results));
    } catch (err) {
      console.log(err.message);
    }
  };
  return { fetchUpcomingMovies };
};

export default useUpcomingMovies;
