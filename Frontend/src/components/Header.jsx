import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { setMenuToggle, setProfileMenuToggle } from "../redux/movieSlice";
import PropTypes from "prop-types";
import { LuLogOut } from "react-icons/lu";
import { setSearchMovieDetails } from "../redux/searchSlice";
import { IoMenu } from "react-icons/io5";
import ProfileMenu from "./ProfileMenu";
import { useEffect } from "react";
import { useRef } from "react";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.app.user);
  const location = useLocation();
  const hideNavOnRoutes = ["/register", "/login"];
  const profileMenuRef = useRef(null);
  const profileBtnRef = useRef(null);
  const dispatch = useDispatch();
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const link = location.pathname === "/login" ? "/register" : "/login";
  const buttonName = location.pathname === "/login" ? "Sign Up" : "Sign In";

  const toggleHandler = () => {
    dispatch(setSearchMovieDetails({ searchInputValue: "", movies: "" }));
  };

  const profileMenuToggleHandler = () => {
    dispatch(setProfileMenuToggle());
  };

  const menuToggleHandler = () => {
    dispatch(setMenuToggle());
  };
  const profileMenuToggle = useSelector(
    (store) => store.movie.profileMenuToggle
  );

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BACKEND_API_URL}/logout`, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(setUser(null));
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileMenuToggle &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(e.target) &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target)
      ) {
        dispatch(setProfileMenuToggle());
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileMenuToggle, dispatch]);

  useEffect(() => {
    if (profileMenuToggle && profileBtnRef.current && profileMenuRef.current) {
      const iconRect = profileBtnRef.current.getBoundingClientRect();
      const menu = profileMenuRef.current;
      menu.style.top = `${iconRect.bottom + 10}px`;
      menu.style.left = `${iconRect.right - 160}px`; // adjust based on menu width
    }
  }, [profileMenuToggle]);

  return (
    <>
      <header id="header" className="absolute top-0 w-full z-50 ">
        <div className="container mx-auto  lg:px-32 px-2 py-2 md:py-2 lg:py-3 flex items-center justify-between ">
          <div className="text-2xl font-bold">
            <Link to="/">
              <img
                src="https://ik.imagekit.io/qsm4jtc2a/Hero_and_logo_images/watchflix-logo.png"
                alt="watchflix_logo"
                className="md:h-10 h-7 cursor-pointer"
              />
            </Link>
          </div>
          {user && !hideNavOnRoutes.includes(location.pathname) && (
            <nav className="md:flex hidden space-x-8">
              <Link
                to="/"
                className="text-gray-300 font-semibold hover:text-white transition cursor-pointer"
              >
                Movies
              </Link>
              <Link
                to="/tvshows"
                className="text-gray-300 font-semibold
                 hover:text-white transition cursor-pointer"
              >
                TV Shows
              </Link>
              <Link
                to="/watchlist"
                className="text-gray-300 font-semibold hover:text-white transition cursor-pointer"
              >
                Watchlist
              </Link>
            </nav>
          )}
          {user && !hideNavOnRoutes.includes(location.pathname) ? (
            <div className="flex items-center space-x-4 ">
              <Link onClick={toggleHandler} to={"/search"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-300 hover:text-white transition"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11a6 6 0 10-12 0 6 6 0 0012 0z"
                  />
                </svg>
              </Link>

              <button
                className="border-4 border-transparent hover:border-gray-500/50 rounded-full"
                ref={profileBtnRef}
              >
                <img
                  src={user?.picture}
                  alt="Profile"
                  className="h-8 w-8 rounded-full "
                  onClick={profileMenuToggleHandler}
                />
              </button>
              <button onClick={logoutHandler} className="md:block hidden">
                <LuLogOut size={25} color={"white"} />
              </button>
              <button className="block md:hidden " onClick={menuToggleHandler}>
                <IoMenu size={25} color={"white"} />
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Link to={link}>
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 md:py-2 px-4 text-sm rounded transition duration-200 ease-in-out hover:shadow-lg shadow ">
                  {buttonName}
                </button>
              </Link>
            </div>
          )}
        </div>
        {profileMenuToggle && <ProfileMenu ref={profileMenuRef} />}
      </header>
    </>
  );
};
Header.propTypes = {
  buttonName: PropTypes.string,
  link: PropTypes.string,
};

export default Header;
