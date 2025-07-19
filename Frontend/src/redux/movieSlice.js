import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    airingTodayTvShows: null,
    onTheAirTvShows: null,
    popularTvShows: null,
    topRatedTvShows: null,
    backdropImages: null,
    profileMenuToggle: false,
    watchlist: [],
    moviesList: [],
    tvShowsList: [],
    menuToggle: false,
    searchPageContentType: null,
  },
  reducers: {
    //action
    getNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    getPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    getTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    getUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    getBackdropImages: (state, action) => {
      state.backdropImages = action.payload;
    },
    getAiringTodayTvShows: (state, action) => {
      state.airingTodayTvShows = action.payload;
    },
    getOnTheAirTvShows: (state, action) => {
      state.onTheAirTvShows = action.payload;
    },
    getPopularTvShows: (state, action) => {
      state.popularTvShows = action.payload;
    },
    getTopRatedTvShows: (state, action) => {
      state.topRatedTvShows = action.payload;
    },
    setProfileMenuToggle: (state) => {
      state.profileMenuToggle = !state.profileMenuToggle;
    },
    setWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    setMenuToggle: (state) => {
      state.menuToggle = !state.menuToggle;
    },
    setMoviesList: (state, action) => {
      state.moviesList = action.payload;
    },
    setTvShowsList: (state, action) => {
      state.tvShowsList = action.payload;
    },
    setSearchPageContentType: (state, action) => {
      state.searchPageContentType = action.payload;
    },
  },
});

export const {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getAiringTodayTvShows,
  getOnTheAirTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
  getBackdropImages,
  setProfileMenuToggle,
  setWatchlist,
  setMenuToggle,
  setMoviesList,
  setTvShowsList,
  setSearchPageContentType,
} = movieSlice.actions;

export default movieSlice.reducer;
