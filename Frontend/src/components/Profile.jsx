import React, { useEffect } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { BACKEND_IMAGE_URL } from "../utils/constant";
import ProfileMenu from "./ProfileMenu";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

const Profile = () => {
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

  return (
    <>
      <Header />
      {profileMenuToggle && <ProfileMenu />}
      {menuToggle && <Menu />}

      {user && (
        <div className="w-full h-screen pt-20 md:pl-20 md:pr-20 pl-10 pr-10 bg-black/90 text-white">
          <div className="p-4">
            <h1 className="text-3xl">User Details</h1>
            <hr className="w-full border-1 border-t-white-500" />

            {/* profile Image*/}
            <div className=" profileImage mt-4">
              <h2 className="text-2xl">Profile Picture</h2>
              <img
                src={`${BACKEND_IMAGE_URL}/${user.picture} `}
                alt="profile"
                className="h-20 w-20 rounded-md mt-2 object-cover"
              />
            </div>

            {/* User Name*/}
            <div className=" name mt-4">
              <h2 className="text-2xl">User Name</h2>
              <h3 className="bg-gray-700  rounded-md mt-2 text-start px-3 h-[50px] py-3 font-bold text-xl">
                {user.fullname}
              </h3>
            </div>

            {/*Email*/}
            <div className=" email mt-4 ">
              <h2 className="text-2xl">Email</h2>
              <h3 className="bg-gray-700  rounded-md mt-2 text-start px-3 md:h-[50px] h-auto py-3 font-bold text-xl break-words">
                {user.email}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
