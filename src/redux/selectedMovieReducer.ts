import {
  SELECT_MOVIE,
  Movie,
  SelectMovieAction,
  DESELECT_MOVIE,
  deselectMovieAction,
} from "./types.ts";

type selectedMovieState = Movie | null;
type deselectedMovieState = null;

const initialState = null as Movie | null;

export const selectedMovieReducer = (
  state = initialState,
  action: SelectMovieAction | deselectMovieAction
): selectedMovieState | deselectedMovieState => {
  switch (action.type) {
    case SELECT_MOVIE:
      return action.payload;
    case DESELECT_MOVIE:
      return null;
    default:
      return state;
  }
};
