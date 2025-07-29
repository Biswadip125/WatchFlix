import axios from "axios";
import { MOVIEDB_BASE_URL, options } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setDetails } from "../redux/movieSlice";

const useFetchDetails = () => {
  const dispatch = useDispatch();
  const fetchDetails = async (contentType, id) => {
    try {
      const res = await axios.get(
        `${MOVIEDB_BASE_URL}/${contentType}/${id}`,
        options
      );
      if (res.status === 200) {
        dispatch(setDetails(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { fetchDetails };
};
export default useFetchDetails;
