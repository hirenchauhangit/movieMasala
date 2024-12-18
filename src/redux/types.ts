export interface AppState {
  movies: Movie[];
  selectedMovie: Movie | null;
}

export interface Action {
  type: string;
  payload?: any;
}

export interface Movie {
  title: string;
  episode_id: number;
  opening_crawl?: string;
  director?: string;
  producer?: string;
  release_date?: string;
  characters?: string[];
  internet_movie_database?: number;
  rotton_tomatoes?: number;
  metacritic?: number;
}

export const FETCH_MOVIES_REQUEST = "FETCH_MOVIES_REQUEST";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";
export const SELECT_MOVIE = "SELECT_MOVIE";
export const DESELECT_MOVIE = "DESELECT_MOVIE";

interface FetchMoviesRequestAction {
  type: typeof FETCH_MOVIES_REQUEST;
}

interface FetchMoviesSuccessAction {
  type: typeof FETCH_MOVIES_SUCCESS;
  payload: Movie[];
}

interface FetchMoviesFailureAction {
  type: typeof FETCH_MOVIES_FAILURE;
  payload: string;
}

export interface SelectMovieAction {
  type: typeof SELECT_MOVIE;
  payload: Movie | null;
}
export interface deselectMovieAction {
  type: typeof DESELECT_MOVIE;
}
export type MovieActionTypes =
  | FetchMoviesRequestAction
  | FetchMoviesSuccessAction
  | FetchMoviesFailureAction
  | SelectMovieAction
  | deselectMovieAction;
