import React from "react";
import { RxCross2 } from "react-icons/rx";
import { setMenuToggle } from "../redux/movieSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Menu = () => {
  const dispatch = useDispatch();
  const cancelMenuHandler = () => {
    dispatch(setMenuToggle());
  };
  return (
    <div className="h-full w-full bg-black absolute md:hidden block z-40 top-0 left-0 ">
      <div className="flex justify-between items-center  text-white p-4">
        <h1 className="font-bold text-lg">Explore More</h1>
        <button onClick={cancelMenuHandler}>
          <RxCross2 size={30} />
        </button>
      </div>
      <div className="flex flex-col ">
        <hr className="w-full border-1 border-t-gray-500/70" />
        <Link
          className=" h-16 pl-4 pt-2 flex items-center text-red-600"
          to={"/browse"}
          onClick={cancelMenuHandler}
        >
          Movies
        </Link>
        <hr className="w-full border-1 border-t-gray-500/70" />

        <Link
          className=" h-16 pl-4 pt-2  flex items-center text-red-600"
          to={"/tvshows"}
          onClick={cancelMenuHandler}
        >
          TV Shows
        </Link>
        <hr className="w-full border-1 border-t-gray-500/70" />
        <Link
          className=" h-16 pl-4 pt-2  flex items-center text-red-600"
          to={"/watchlist"}
          onClick={cancelMenuHandler}
        >
          Watchlist
        </Link>
        <hr className="w-full border-1 border-t-gray-500/70" />
      </div>
    </div>
  );
};

export default Menu;
