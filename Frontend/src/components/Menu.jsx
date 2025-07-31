import { setMenuToggle } from "../redux/movieSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Menu = () => {
  const dispatch = useDispatch();
  const cancelMenuHandler = () => {
    dispatch(setMenuToggle());
  };
  return (
    <div className="fixed inset-0 z-40 bg-black/95 md:hidden animate-slide-in pt-20">
      <div className="px-6 text-white">
        <h1 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">
          Explore More
        </h1>
        <nav className="space-y-4">
          <Link
            to="/"
            onClick={cancelMenuHandler}
            className="block text-lg text-red-500 hover:text-white transition-colors"
          >
            Movies
          </Link>
          <Link
            to="/tvshows"
            onClick={cancelMenuHandler}
            className="block text-lg text-red-500 hover:text-white transition-colors"
          >
            TV Shows
          </Link>
          <Link
            to="/watchlist"
            onClick={cancelMenuHandler}
            className="block text-lg text-red-500 hover:text-white transition-colors"
          >
            Watchlist
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
