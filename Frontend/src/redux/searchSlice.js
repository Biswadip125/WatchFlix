import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    movieName: null,
    searchedMovies: null,
  },
  reducers: {
    setSearchMovieDetails: (state, action) => {
      const { searchInputValue, movies } = action.payload;
      state.movieName = searchInputValue;
      state.searchedMovies = movies;
    },
    setMovieName: (state, action) => {
      state.movieName = action.payload;
    },
    setSearchedMovies: (state, action) => {
      state.searchedMovies = action.payload;
    },
  },
});

export const { setSearchedMovies, setMovieName, setSearchMovieDetails } =
  searchSlice.actions;

export default searchSlice.reducer;
