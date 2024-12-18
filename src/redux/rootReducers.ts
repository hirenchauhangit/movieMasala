import { combineReducers } from "redux";
import { movieReducer } from "./movieReducers.ts";
import { selectedMovieReducer } from "./selectedMovieReducer.ts";

export const rootReducer = combineReducers({
  movies: movieReducer,
  selectedMovie: selectedMovieReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
