import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useSelector } from "react-redux";

import Header from "./Header";
import Login from "../pages/Login";
import Browse from "../pages/Browse";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import Watch from "../pages/Watch";
import Details from "../pages/Details";
import TvShows from "../pages/TvShows";
import Watchlist from "../pages/Watchlist";
import SearchContens from "./SearchContents";
const Body = () => {
  const user = useSelector((store) => store.app.user);
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={user ? <Browse /> : <Navigate to={"/login"} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/details/:contentType/:id" element={<Details />} />
          <Route path="/watch/:contentType/:id" element={<Watch />} />
          <Route path="/search" element={<SearchContens />} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Body;
