const DetailsSkeleton = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col py-24 px-4 md:px-8 animate-pulse"
      aria-hidden="true"
    >
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        {/* Poster Image */}
        <div className="w-full max-w-xs h-[400px] md:h-[500px] bg-gray-700 rounded-lg shimmer mx-auto lg:mx-0" />

        {/* Details */}
        <div className="flex flex-col gap-4 w-full">
          {/* Title */}
          <div className="h-8 lg:w-3/4 w-full mx-auto lg:mx-0 max-w-sm bg-gray-700 shimmer rounded-lg" />

          {/* Info Tags */}
          <div className="h-5 w-full mx-auto lg:mx-0 max-w-lg bg-gray-700 shimmer rounded-lg" />

          {/* Tagline */}
          <div className="h-6 lg:w-3/4 w-full mx-auto lg:mx-0 max-w-md bg-gray-700 shimmer rounded-lg" />

          {/* User Score */}
          <div className="flex mx-auto lg:mx-0 flex-wrap gap-6 mt-4 items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full shimmer bg-gray-700" />
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg shimmer bg-gray-700" />
          </div>

          {/* Overview */}
          <div className=" flex flex-col gap-2 mt-6">
            <div className=" mx-auto lg:mx-0 h-6 w-24 bg-gray-700 shimmer rounded-lg" />
            <div className="h-16 w-full bg-gray-700 shimmer rounded-lg" />
          </div>

          {/* Watch Trailer Button */}
          <div className="w-full max-w-xs mx-auto lg:mx-0 h-10 bg-gray-700 shimmer rounded-lg mt-4" />
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
