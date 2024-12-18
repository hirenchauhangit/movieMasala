import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  Movie,
  MovieActionTypes,
  SELECT_MOVIE,
  DESELECT_MOVIE,
  deselectMovieAction,
} from "./types.ts";

export const fetchMovies = () => {
  return async (dispatch: any) => {
    dispatch({ type: FETCH_MOVIES_REQUEST });
    try {
      const response = await fetch(
        "https://swapi.py4e.com/api/films/?format=json"
      );
      const data: Movie[] = await response.json();
      dispatch({ type: FETCH_MOVIES_SUCCESS, payload: data.results });
    } catch (error) {
      dispatch({
        type: FETCH_MOVIES_FAILURE,
        payload: "Failed to fetch movies",
      });
    }
  };
};

export const selectMovie = (movie: Movie): MovieActionTypes => {
  return {
    type: SELECT_MOVIE,
    payload: movie,
  };
};
export const deselectMovie = (): deselectMovieAction => {
  return {
    type: DESELECT_MOVIE,
  };
};
