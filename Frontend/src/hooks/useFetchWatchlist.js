import axios from "axios";
import { useDispatch } from "react-redux";
import { API_END_POINT } from "../utils/constant";
import { setWatchlist } from "../redux/movieSlice";

const useFetchWatchlist = async () => {
  const dispatch = useDispatch();
  try {
    const res = await axios.get(`${API_END_POINT}/watchlist`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });
    console.log(res);
    if (res.data.success) {
      console.log(res);
      dispatch(setWatchlist(res.data.watchlist));
    }
  } catch (err) {
    console.log(err.message);
  }
};

export default useFetchWatchlist;
