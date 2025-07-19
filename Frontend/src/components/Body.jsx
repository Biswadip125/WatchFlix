import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Watch from "./Watch";
import SearchContents from "./SearchContents";
import TvShows from "./TvShows";
import Watchlist from "./Watchlist";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/editprofile",
      element: <EditProfile />,
    },
    {
      path: `watch/:contentType/:id`,
      element: <Watch />,
    },
    {
      path: "/search",
      element: <SearchContents />,
    },
    {
      path: "/tvshows",
      element: <TvShows />,
    },
    {
      path: "/watchlist",
      element: <Watchlist />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
