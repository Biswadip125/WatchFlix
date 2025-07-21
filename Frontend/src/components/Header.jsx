import { API_END_POINT } from "../utils/constant";
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

const Header = ({ buttonName, link }) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.app.user);
  const location = useLocation();
  const hideNavOnRoutes = ["/register", "/"];
  const profileMenuRef = useRef(null);
  const profileBtnRef = useRef(null);
  const dispatch = useDispatch();

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

  console.log(profileMenuToggle);
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`, {
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
      <header
        id="header"
        className="fixed w-full z-30 transition duration-300 ease-in-out bg-gradient-to-b from-black via-black/70 to-transparent"
      >
        <div className="container mx-auto md:px-12 px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <img
              src="https://ik.imagekit.io/qsm4jtc2a/Hero_and_logo_images/watchflix-logo.png"
              alt="watchflix_logo"
              className="h-10 mt-1"
            />
          </div>
          {user && !hideNavOnRoutes.includes(location.pathname) && (
            <nav className="md:flex hidden space-x-8">
              <a
                href="/browse"
                className="text-gray-300 font-semibold hover:text-white transition"
              >
                Movies
              </a>
              <a
                href="/tvshows"
                className="text-gray-300 font-semibold
                 hover:text-white transition"
              >
                TV Shows
              </a>
              <a
                href="/watchlist"
                className="text-gray-300 font-semibold hover:text-white transition"
              >
                Watchlist
              </a>
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
              <Link
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 md:w-[104px] w-20 md:h-[12] font-medium rounded-lg md:text-lg md:px-3 px-2 md:py-2.5 py-2 text-sm   dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 cursor-pointer text-center"
                to={link}
              >
                {buttonName}
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
