import axios from "axios";
import {
  BACKDROP_IMAGE,
  options,
  TV_SHOWS_BACKDROP_IMAGE,
} from "../utils/constant";
import { useDispatch } from "react-redux";
import { getBackdropImages } from "../redux/movieSlice";
import { useLocation } from "react-router-dom";

const useBackdropImages = async () => {
  const dispatch = useDispatch();
  const location = useLocation();
  try {
    const res = await axios.get(
      location.pathname === "/browse"
        ? BACKDROP_IMAGE
        : TV_SHOWS_BACKDROP_IMAGE,
      options
    );

    dispatch(getBackdropImages(res.data.results.slice(0, 5)));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default useBackdropImages;
