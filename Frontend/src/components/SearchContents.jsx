import { useSelector } from "react-redux";
import Menu from "./Menu";
import SearchMovie from "../pages/SearchMovie";

const SearchContents = () => {
  const menuToggle = useSelector((store) => store.movie.menuToggle);
  return (
    <div className="bg-black text-white">
      {menuToggle && <Menu />}

      <SearchMovie />
    </div>
  );
};

export default SearchContents;
