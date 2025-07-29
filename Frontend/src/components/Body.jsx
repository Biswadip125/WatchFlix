import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Watch from "./Watch";
import SearchContents from "./SearchContents";
import TvShows from "./TvShows";
import Watchlist from "./Watchlist";
import { useSelector } from "react-redux";
import Details from "./Details";
import Header from "./Header";

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
          <Route path="/:contentType/:id" element={<Details />} />
          <Route path="/watch/:contentType/:id" element={<Watch />} />
          <Route path="/search" element={<SearchContents />} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Body;
