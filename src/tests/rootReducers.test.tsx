import { rootReducer } from "../redux/rootReducers";
import { movieReducer } from "../redux/movieReducers.ts";
import { selectedMovieReducer } from "../redux/selectedMovieReducer.ts";

describe("rootReducer", () => {
  it("should return the combined state", () => {
    const initialState = {
      movies: {
        loading: false,
        movies: [],
        error: null,
      },
      selectedMovie: null, // Assuming the initial state for selectedMovie is null
    };

    // When rootReducer is called without any action, it should return the initial state
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle actions correctly for the movies reducer", () => {
    const action = {
      type: "FETCH_MOVIES_REQUEST",
    };
    const state = rootReducer(undefined, action);

    expect(state.movies.loading).toBe(true);
    expect(state.movies.movies).toEqual([]);
    expect(state.movies.error).toBeNull();
  });

  it("should handle actions correctly for the selectedMovieReducer", () => {
    const action = {
      type: "SELECT_MOVIE",
      payload: {
        title: "Star Wars",
        episode_id: 1,
        release_date: "1977-05-25",
      },
    };
    const state = rootReducer(undefined, action);

    expect(state.selectedMovie).toEqual(action.payload);
  });

  it("should return the correct state for multiple actions", () => {
    const action1 = {
      type: "FETCH_MOVIES_REQUEST",
    };
    const action2 = {
      type: "SELECT_MOVIE",
      payload: {
        title: "Star Wars",
        episode_id: 1,
        release_date: "1977-05-25",
      },
    };
    const stateAfterAction1 = rootReducer(undefined, action1);
    const stateAfterAction2 = rootReducer(stateAfterAction1, action2);

    expect(stateAfterAction1.movies.loading).toBe(true);
    expect(stateAfterAction2.selectedMovie).toEqual(action2.payload);
  });
});
