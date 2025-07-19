import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/userSlice";
import { setProfileMenuToggle } from "../redux/movieSlice";

const ProfileMenu = () => {
  const user = useSelector((store) => store.app.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const profileMenuToggleHandler = () => {
    dispatch(setProfileMenuToggle());
  };

  const profileMenulogoutHandler = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(setUser(null));
      dispatch(setProfileMenuToggle());
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div
      className={`absolute h-30 w-40 right-[9%] top-[65px]  ${
        location.pathname === "/search" || location.pathname.includes("/watch")
          ? "bg-gray-600"
          : "bg-gray-600/70"
      } z-50   rounded-lg `}
    >
      <div className="w-full h-full text- white flex flex-col text-white  items-center p-2">
        <Link
          to={"/profile"}
          className="text-xl mb-2 hover:text-white/70"
          onClick={profileMenuToggleHandler}
        >
          View Profile
        </Link>
        <hr className="w-full border-1 border-t-white/70" />
        <Link
          to={"/editprofile"}
          className="mb-2 text-xl hover:text-white/70"
          onClick={profileMenuToggleHandler}
        >
          Edit Profile
        </Link>
        <hr className="w-full border-1 border-t-white/70 " />
        <button
          className="text-xl text-red-600 hover:text-red-500 "
          onClick={profileMenulogoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
