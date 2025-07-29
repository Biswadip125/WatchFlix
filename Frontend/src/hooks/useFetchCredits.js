import axios from "axios";
import { MOVIEDB_BASE_URL, options } from "../utils/constant";

const useFetchCredits = () => {
  const fetchCredits = async (contentType, id) => {
    try {
      const res = await axios.get(
        `${MOVIEDB_BASE_URL}/${contentType}/${id}/credits?language=en-US`,
        options
      );
      return res.data.cast.slice(0, 21);
    } catch (err) {
      console.log(err);
    }
  };
  return { fetchCredits };
};

export default useFetchCredits;
