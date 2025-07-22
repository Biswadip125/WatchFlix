import axios from "axios";
import { setWatchlist } from "../redux/movieSlice";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
export const fetchWatchlist = async (dispatch) => {
  try {
    const res = await axios.get(`${BACKEND_API_URL}/watchlist`, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    });

    if (res.data.success) {
      dispatch(setWatchlist(res.data.watchlist));
    }
  } catch (err) {
    console.log(err.message);
  }
};
