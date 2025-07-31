import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useDispatch, useSelector } from "react-redux";
import { BACKDROP_IMAGE_URL, CAST_IMAGE_URL } from "../utils/constant";
import { setDetails } from "../redux/movieSlice";
import { formatDate } from "../utils/formatDate";
import { calculateMovieDuration } from "../utils/calculateMovieDuration";
import CircleComponent from "../components/CircleComponent";
import { formatCurrency } from "../utils/formatCurrency";
import { FaChevronRight, FaPlay } from "react-icons/fa";
import useFetchCredits from "../hooks/useFetchCredits";
import { FaChevronLeft } from "react-icons/fa";
import DetailsSkeleton from "../components/DetailsSkeleton";

const Details = () => {
  const { id } = useParams();
  const { contentType } = useParams();
  const { fetchDetails } = useFetchDetails();
  const { fetchCredits } = useFetchCredits();
  const dispatch = useDispatch();
  const [casts, setCasts] = useState(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetchDetails(contentType, id);

    return () => dispatch(setDetails(""));
  }, [contentType, id]);

  useEffect(() => {
    (async () => {
      const credits = await fetchCredits(contentType, id);
      setCasts(credits);
    })();
  }, [contentType, id]);

  const details = useSelector((store) => store.movie.details);
  const percentage = Math.round(details?.vote_average * 10);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <div className="bg-black min-h-screen  w-full text-white  px-8 md:px-40 flex flex-col">
        {details ? (
          <div className="min-h-screen flex flex-col py-24">
            <div className="flex  lg:flex-row flex-col lg:gap-20 gap-10  ">
              {/*Poster */}
              <div className="flex-shrink-0 self-center lg:self-start h-full">
                <img
                  src={BACKDROP_IMAGE_URL + details?.poster_path}
                  alt="poster"
                  loading="lazy"
                  className="max-h-[530px] h-full object-cover flex-shrink-0 rounded-lg"
                />
              </div>
              {/*Details Section */}
              <div className="flex flex-col gap-2 justify-center md:justify-start">
                {/*Heading*/}
                <div className="flex gap-2 items-center justify-center lg:justify-start">
                  <h1 className="md:text-3xl text-2xl font-bold ">
                    {contentType === "movie" ? details?.title : details?.name}{" "}
                    <span className="md:text-3xl text-2xl">
                      (
                      {contentType === "movie"
                        ? details?.release_date?.slice(0, 4)
                        : details?.first_air_date?.slice(0, 4)}
                      )
                    </span>
                  </h1>
                </div>

                {/*Info Tags*/}
                <div className="flex flex-wrap items-center mt-4 md:mt-0 justify-center lg:justify-start gap-x-4 gap-y-2">
                  {/* Age Tag */}
                  <div
                    className={`transition duration-300 ease-in-out hover:ring-2 ${
                      details.adult
                        ? "hover:ring-red-800 border-red-900 text-red-500"
                        : "hover:ring-green-800 border-green-900 text-green-500"
                    } border-2 h-7 px-2 min-w-[2rem] text-center rounded-md`}
                  >
                    {details?.adult ? "18+" : "PG"}
                  </div>

                  {/* Date + Country */}
                  <p className="whitespace-nowrap">
                    {formatDate(
                      contentType === "movie"
                        ? details?.release_date
                        : details?.first_air_date
                    )}{" "}
                    ({details.origin_country[0]})
                  </p>

                  {/* Genres */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="h-1 w-1 rounded-full bg-white mt-1"></div>
                    <div>
                      {details?.genres.map((genre, index) => (
                        <span key={genre.id}>
                          {genre.name}
                          {index !== details?.genres.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                    <div className="h-1 w-1 rounded-full bg-white mt-1"></div>
                  </div>

                  {/* Runtime */}
                  {details?.runtime && (
                    <p className="whitespace-nowrap">
                      {contentType === "movies"
                        ? calculateMovieDuration(details?.runtime)
                        : ""}
                    </p>
                  )}
                </div>

                {/*Tagline*/}
                {details.tagline && (
                  <div className="text-xl text-center lg:text-start text-gray-400 mt-6 italic ">
                    {details?.tagline}
                  </div>
                )}

                {/*User Score */}
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="relative w-20 h-20 mt-2 ">
                    <CircleComponent percentage={percentage} />

                    <div className="absolute inset-0 flex items-center justify-center ">
                      <p className="text-xl font-bold text-white">
                        {percentage}
                        <span className="text-xs align-super font-bold">%</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-xl mt-1 font-bold w-12">User Score</p>
                </div>

                {/*Overview*/}
                <div className="mt-2  flex flex-col gap-2 ">
                  <h3 className="text-gray-300 text-xl text-center lg:text-start font-semibold">
                    Overview
                  </h3>
                  <p className="text-base text-center lg:text-start leading-relaxed text-gray-200">
                    {details?.overview}
                  </p>
                </div>
                {/*Language, Budget and Revenue */}
                <div className="flex flex-col md:flex-row md:items-start items-center md:justify-center lg:justify-start gap-4 mt-4 text-sm text-gray-300">
                  <div>
                    <span className="text-xl  font-semibold"> Language: </span>
                    {details.original_language.toUpperCase()}
                  </div>
                  <div>
                    <span className="text-xl  font-semibold"> Budget: </span>
                    {formatCurrency(details?.budget)}
                  </div>
                  <div>
                    <span className="text-xl  font-semibold"> Revenue: </span>
                    {formatCurrency(details?.revenue)}
                  </div>
                </div>
                {/*Play Trailer Button */}
                <div className="flex  justify-center lg:justify-start w-full">
                  <Link
                    to={`/watch/${contentType}/${id}`}
                    className="max-w-md w-full"
                  >
                    <button className="px-4 py-2.5 bg-white text-black hover:bg-gray-200 shadow-md hover:shadow-xl  transition-all duration-300 rounded-full w-full max-w-md flex items-center justify-center gap-2 text-md font-semibold group mt-4">
                      <div className="h-6 w-6 pl-0.5 rounded-full flex items-center justify-center bg-black ">
                        <FaPlay
                          className="text-white group-hover:animate-pulse"
                          size={12}
                        />
                      </div>

                      <span className="tracking-wide ">Play Trailer</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/*Top Billed Casts */}
            <div className="py-8">
              <h1 className="text-2xl font-bold mb-4">Top Billed Cast</h1>

              <div className="relative group">
                {/* Scrollable container */}
                <div
                  className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
                  ref={sliderRef}
                >
                  {casts?.map((cast) => {
                    if (!cast.profile_path) return null;
                    return (
                      <div
                        key={cast.id}
                        className="w-[138px] rounded-md bg-gray-200 text-black flex-shrink-0"
                      >
                        <img
                          src={CAST_IMAGE_URL + cast.profile_path}
                          className="rounded-t-md h-40 w-full object-cover"
                        />
                        <div className="px-2 pb-2 flex flex-col gap-1">
                          <h3 className="text-md font-semibold line-clamp-1">
                            {cast.character}
                          </h3>
                          <h6 className="text-base text-gray-900 line-clamp-1">
                            {cast.original_name}
                          </h6>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Left button */}
                <button
                  className={`absolute top-1/2 -translate-y-1/2 left-2 h-12 w-12 rounded-full bg-white/90 hover:bg-white transition-all duration-300 md:flex hidden items-center justify-center opacity-0 group-hover:opacity-100 `}
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollLeft();
                  }}
                >
                  <FaChevronLeft color="black " size={20} />
                </button>

                {/* Right button */}
                <button
                  className={`absolute top-1/2 -translate-y-1/2 right-2 h-12 w-12 rounded-full bg-white/90 hover:bg-white transition-all duration-300 md:flex hidden items-center justify-center opacity-0 group-hover:opacity-100`}
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollRight();
                  }}
                >
                  <FaChevronRight color="black" size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <DetailsSkeleton />
        )}
      </div>
    </div>
  );
};

export default Details;
