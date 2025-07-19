import axios from "axios";
import { setWatchlist } from "../redux/movieSlice";
import { API_END_POINT } from "./constant";

export const fetchWatchlist = async (dispatch) => {
  try {
    const res = await axios.get(`${API_END_POINT}/watchlist`, {
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
