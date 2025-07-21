import Header from "./Header";
import SearchMovie from "./SearchMovie";
import { useSelector } from "react-redux";
import Menu from "./Menu";

const SearchContents = () => {
  const menuToggle = useSelector((store) => store.movie.menuToggle);
  return (
    <div className="bg-black text-white">
      {menuToggle && <Menu />}
      <Header />
      <SearchMovie />
    </div>
  );
};

export default SearchContents;
