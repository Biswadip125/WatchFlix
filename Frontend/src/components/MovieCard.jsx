import { useState } from "react";
import { Banner_URL } from "../utils/constant";
import { Link, useLocation } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import {
  setMoviesList,
  setTvShowsList,
  setWatchlist,
} from "../redux/movieSlice.js";

const MovieCard = ({ movie }) => {
  if (!movie.poster_path) {
    return;
  }

  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const watchlist = useSelector((store) => store.movie.watchlist);
  const moviesList = useSelector((store) => store.movie.moviesList);
  const tvShowsList = useSelector((store) => store.movie.tvShowsList);

  const watchlistItem = watchlist.find((item) => item.id === movie.id);
  const searchPageContentType = useSelector(
    (store) => store.movie.searchPageContentType
  );

  const dispatch = useDispatch();
  const location = useLocation();
  const contentType =
    location.pathname.includes("/movie") ||
    location.pathname === "/browse" ||
    (location.pathname === "/search" && searchPageContentType === "movie")
      ? "movie"
      : location.pathname === "/tvshows" ||
        location.pathname.includes("/tvshow") ||
        (location.pathname === "/search" && searchPageContentType === "tv")
      ? "tvshow"
      : watchlistItem?.contentType;

  const [showAddtoWatchList, setShowAddToWatchList] = useState(false);

  const fetchWatchlist = async (dispatch) => {
    try {
      const res = await axios.get(`${BACKEND_API_URL}/watchlist`, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        dispatch(setWatchlist(res.data.watchlist));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAddToWatchList = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_API_URL}/addtowatchlist`,
        {
          id: movie.id,
          contentType: contentType,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchWatchlist(dispatch);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_API_URL}/deletefromwatchlist`,
        {
          id: movie.id,
          contentType: contentType,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchWatchlist(dispatch);
        dispatch(
          location.pathname === "/browse" ||
            location.pathname.includes("/movies") ||
            watchlistItem.contentType === "movie"
            ? setMoviesList(moviesList.filter((m) => m.id !== movie.id))
            : setTvShowsList(
                tvShowsList.filter((tvshow) => tvshow.id !== movie.id)
              )
        );
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div>
        <div
          className="w-20 md:w-32 lg:w-48 rounded-md overflow-hidden  mx-2 relative"
          onMouseEnter={() => setShowAddToWatchList(true)}
          onMouseLeave={() => setShowAddToWatchList(false)}
        >
          <Link to={`/watch/${contentType}/${movie.id}`} className="group">
            <img
              src={`${Banner_URL}${movie.poster_path}`}
              alt="movie-banner"
              className="transition-transfrom duration-300 ease-in-out group-hover:scale-125"
            ></img>
          </Link>
          <div
            className={`${
              showAddtoWatchList ? "flex" : "hidden"
            } absolute bottom-2 right-2 bg-gray-500/70 hover:bg-gray-500 h-8 w-8  items-center justify-center rounded-full`}
          >
            {watchlist && watchlist.some((item) => item.id === movie.id) ? (
              <button
                onClick={() => {
                  handleRemoveFromWatchlist();
                }}
              >
                <TiDeleteOutline size={20} />
              </button>
            ) : (
              <button
                onClick={() => {
                  handleAddToWatchList();
                }}
              >
                <IoMdAdd size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
