import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { setProfileMenuToggle } from "../redux/movieSlice";
import { forwardRef } from "react";
import { LuUser } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";

const ProfileMenu = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
  const profileMenulogoutHandler = async () => {
    try {
      const res = await axios.get(`${BACKEND_API_URL}/logout`, {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
      dispatch(setUser(null));
      dispatch(setProfileMenuToggle());
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div
      ref={ref}
      className={`absolute h-30 w-40  ${
        location.pathname.includes("/search") ||
        location.pathname.includes("/watch") ||
        location.pathname.includes("/details")
          ? "bg-black/20"
          : "bg-white/10"
      } backdrop-blur-2xl z-50 rounded-lg`}
    >
      <div className="w-full h-full text-white flex flex-col items-center gap-2 px-2 py-2">
        <Link
          to="/profile"
          className="flex items-center justify-center gap-2 w-full "
        >
          <LuUser size={20} />

          <span className="text-lg hover:text-white/70">View Profile</span>
        </Link>
        <hr className="w-full border-t border-white/70" />
        <Link
          to="/editprofile"
          className="flex items-center justify-center mr-1.5 gap-2 w-full"
        >
          <FiEdit size={19} />
          <span className="text-lg  hover:text-white/70">Edit Profile</span>
        </Link>
        <hr className="w-full border-t border-white/70" />

        <button
          className="flex items-center justify-center mr-8 gap-2 w-full"
          onClick={profileMenulogoutHandler}
        >
          <IoLogOutOutline size={24} />
          <span className="text-lg hover:text-white/70">Logout</span>
        </button>
      </div>
    </div>
  );
});

ProfileMenu.displayName = "ProfileMenu";

export default ProfileMenu;
