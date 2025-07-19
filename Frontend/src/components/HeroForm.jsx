import { useState } from "react";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/userSlice";
import PropTypes from "prop-types";

const HeroForm = ({ isLogin, link, apiLink, navigateLink }) => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.app.isLoading);

  const getInputData = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const user = { fullname, email, password };
    try {
      const res = await axios.post(`${API_END_POINT}/${apiLink}`, user, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
      if (isLogin) {
        dispatch(setUser(res.data.user));
      }
      navigate(navigateLink);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[url('/images/netflix-hero-image.jpg')] bg-no-repeat bg-cover">
        <div className="bg-black p-8 rounded-lg shadow-lg md:w-96 w-80 opacity-80 ">
          <h2 className="text-3xl font-semibold mb-4 text-center text-white">
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>

          <form id="loginForm" onSubmit={getInputData}>
            {!isLogin && (
              <div className="mb-4 ">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-white"
                >
                  FullName
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={fullname}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {isLoading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>
          <div id="error" className="text-red-500 text-sm mt-4  hidden">
            Please fill in all fields.
          </div>
          <p className="text-center text-sm mt-4 text-white">
            {isLogin
              ? `New to Netflix?${" "}`
              : `Already have an account?${" "}`}
            <a href={link} className="text-blue-500 hover:underline">
              {isLogin ? "Sign Up" : "Sign In"}
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
HeroForm.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  apiLink: PropTypes.string.isRequired,
  navigateLink: PropTypes.string.isRequired,
};
export default HeroForm;
