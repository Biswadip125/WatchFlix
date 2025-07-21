import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/userSlice";
import { setProfileMenuToggle } from "../redux/movieSlice";
import { forwardRef } from "react";

const ProfileMenu = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const profileMenulogoutHandler = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`, {
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
        location.pathname === "/search" || location.pathname.includes("/watch")
          ? "bg-gray-600"
          : "bg-gray-600/70"
      } z-50 rounded-lg`}
    >
      <div className="w-full h-full text-white flex flex-col items-center p-2">
        <Link to="/profile" className="text-xl mb-2 hover:text-white/70">
          View Profile
        </Link>
        <hr className="w-full border-t border-white/70" />
        <Link to="/editprofile" className="text-xl mb-2 hover:text-white/70">
          Edit Profile
        </Link>
        <hr className="w-full border-t border-white/70" />
        <button
          className="text-xl text-red-600 hover:text-red-500"
          onClick={profileMenulogoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
});

ProfileMenu.displayName = "ProfileMenu";

export default ProfileMenu;
