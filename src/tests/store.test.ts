import { createStore } from "redux";
import { store } from "../redux/store.ts"; // Import the store you've created
import { rootReducer } from "../redux/rootReducers.ts";
import { FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS } from "../redux/types.ts";
import { fetchMovies } from "../redux/movieListActions.ts";

// Mock the fetch function used in the async action
global.fetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({
    results: [
      {
        title: "Star Wars: A New Hope",
        episode_id: 1,
        release_date: "1977-05-25",
      },
    ],
  }),
});

describe("Redux Store", () => {
  it("should create a store with the root reducer and middleware", () => {
    const state = store.getState();
    expect(state).toHaveProperty("movies");
    expect(state).toHaveProperty("selectedMovie");
  });

  it("should have the correct initial state", () => {
    const state = store.getState();
    expect(state.movies.loading).toBe(false);
    expect(state.movies.movies).toEqual([]);
    expect(state.movies.error).toBeNull();
    expect(state.selectedMovie).toBeNull();
  });

  it("should dispatch FETCH_MOVIES_REQUEST when fetchMovies is called", async () => {
    const dispatch = jest.fn();
    await fetchMovies()(dispatch);

    // Ensure the first dispatched action is FETCH_MOVIES_REQUEST
    expect(dispatch).toHaveBeenCalledWith({ type: FETCH_MOVIES_REQUEST });
  });

  it("should dispatch FETCH_MOVIES_SUCCESS when fetchMovies is successful", async () => {
    const dispatch = jest.fn();
    await fetchMovies()(dispatch);

    // Ensure the second dispatched action is FETCH_MOVIES_SUCCESS
    expect(dispatch).toHaveBeenCalledWith({
      type: FETCH_MOVIES_SUCCESS,
      payload: [
        {
          title: "Star Wars: A New Hope",
          episode_id: 1,
          release_date: "1977-05-25",
        },
      ],
    });
  });

  it("should handle async action in the store", async () => {
    const stateBefore = store.getState();
    expect(stateBefore.movies.movies.length).toBe(0);

    // Dispatch async action
    await store.dispatch(fetchMovies());

    const stateAfter = store.getState();
    expect(stateAfter.movies.loading).toBe(false);
    expect(stateAfter.movies.movies.length).toBeGreaterThan(0);
  });
});
