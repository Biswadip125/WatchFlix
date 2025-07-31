import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
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

  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const getInputData = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const user = { fullname, email, password };
    try {
      const res = await axios.post(`${BACKEND_API_URL}/${apiLink}`, user, {
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
      <div className="min-h-screen flex flex-col items-center justify-center hero-bg bg-no-repeat bg-cover bg-center text-white">
        <div className="bg-black/60 p-8 rounded-lg shadow-lg md:w-96 w-80  ">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>

          <form id="loginForm" onSubmit={getInputData}>
            {!isLogin && (
              <div className="mb-4 ">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-300"
                >
                  FullName
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="John Doe"
                  value={fullname}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  required
                  className="mt-1 block w-full px-3 py-2 border bg-transparent border-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring"
                />
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@example..com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-transparent text-white rounded-md shadow-sm focus:outline-none focus:ring"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="*******"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                className="mt-1 block w-full px-3 py-2 bg-transparent border border-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md  "
            >
              {isLoading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>
          <div id="error" className="text-red-500 text-sm mt-4  hidden">
            Please fill in all fields.
          </div>
          <p className="text-center text-sm mt-4 text-gray-400">
            {isLogin
              ? `New to Netflix?${" "}`
              : `Already have an account?${" "}`}
            <Link to={link} className="text-red-500 hover:underline">
              {isLogin ? "Sign Up" : "Sign In"}
            </Link>
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
