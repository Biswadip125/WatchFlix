import React, { useEffect, useState } from "react";
import Header from "./Header";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

const EditProfile = () => {
  const user = useSelector((store) => store.app.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });
  const profileMenuToggle = useSelector(
    (store) => store.movie.profileMenuToggle
  );

  const menuToggle = useSelector((store) => store.movie.menuToggle);

  const [fullname, setFullName] = useState(user.fullname);
  const [email, setEmail] = useState(user.email);
  const [file, setFile] = useState();
  const dispatch = useDispatch();

  const uploadFile = async (e) => {
    e.preventDefault();

    //create a form data object
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_END_POINT}/edit`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.updatedUser));
        toast.success(res.data.message);
        navigate("/profile");
      }
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <Header />
      {profileMenuToggle && <ProfileMenu />}
      {menuToggle && <Menu />}
      <div className="w-full h-screen pt-20 md:pl-20 md:pr-20 pl-10 pr-10  bg-black/90 text-white">
        <div className="p-4">
          <h1 className="text-3xl">Edit User Details</h1>
          <hr className="w-full border-1 border-t-white-500" />
          <form>
            {/* profile Image*/}
            <div className=" profileImage mt-4">
              <h2 className="text-2xl">Profile Picture</h2>
              <input
                type="file"
                name="image"
                className="mt-2 bg-transparent  "
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>

            {/* User Name*/}
            <div className=" name mt-4">
              <h2 className="text-2xl">User Name</h2>
              <input
                className="bg-gray-700  rounded-md mt-2 text-start px-3 h-[50px] py-3  text-xl w-full outline-none text-white "
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/*Email*/}
            <div className=" name mt-4">
              <h2 className="text-2xl">Email</h2>
              <input
                className="bg-gray-700  rounded-md mt-2 text-start px-3 h-[50px] py-3 text-xl w-full outline-none text-white "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="mt-5 px-4 py-2 bg-gray-200 text-black text-[20px] rounded-lg"
              type="submit"
              onClick={uploadFile}
            >
              Update Details
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
