import axios from "axios";
import { useDispatch } from "react-redux";

import { setWatchlist } from "../redux/movieSlice";

const useFetchWatchlist = async () => {
  const dispatch = useDispatch();
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
  try {
    const res = await axios.get(`${BACKEND_API_URL}/watchlist`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });
    if (res.data.success) {
      console.log(res);
      dispatch(setWatchlist(res.data.watchlist));
    }
  } catch (err) {
    console.log(err.message);
  }
};

export default useFetchWatchlist;
