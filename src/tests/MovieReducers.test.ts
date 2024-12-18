import { movieReducer } from "../redux/movieReducers";
import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
} from "../redux/types.ts";

describe("movieReducer", () => {
  const initialState = {
    loading: false,
    movies: [],
    error: null,
  };

  it("should return the initial state", () => {
    expect(movieReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FETCH_MOVIES_REQUEST", () => {
    const action = { type: FETCH_MOVIES_REQUEST };
    const expectedState = {
      loading: true,
      movies: [],
      error: null,
    };
    expect(movieReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_MOVIES_SUCCESS", () => {
    const action = {
      type: FETCH_MOVIES_SUCCESS,
      payload: [
        { title: "Movie 1", episode_id: 1, release_date: "2022-01-01" },
        { title: "Movie 2", episode_id: 2, release_date: "2022-02-01" },
      ],
    };
    const expectedState = {
      loading: false,
      movies: action.payload,
      error: null,
    };
    expect(movieReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle FETCH_MOVIES_FAILURE", () => {
    const action = {
      type: FETCH_MOVIES_FAILURE,
      payload: "Failed to fetch movies",
    };
    const expectedState = {
      loading: false,
      movies: [],
      error: action.payload,
    };
    expect(movieReducer(initialState, action)).toEqual(expectedState);
  });
});
