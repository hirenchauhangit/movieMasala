import { AppState, Action } from "./types.ts";

import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  Movie,
  MovieActionTypes,
} from "./types.ts";

interface MovieState {
  loading: boolean;
  movies: Movie[];
  error: string | null;
}

const initialState: MovieState = {
  loading: false,
  movies: [],
  error: null,
};

export const movieReducer = (
  state = initialState,
  action: MovieActionTypes
): MovieState => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_MOVIES_SUCCESS:
      return { ...state, loading: false, movies: action.payload };
    case FETCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
