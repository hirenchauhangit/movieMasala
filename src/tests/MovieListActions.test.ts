import {
  fetchMovies,
  selectMovie,
  deselectMovie,
} from "../redux/movieListActions";
import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
} from "../redux/types.ts";

// Mocking fetch to control API responses
global.fetch = jest.fn();

describe("MovieList Actions", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it("should dispatch FETCH_MOVIES_REQUEST before API call", async () => {
    const dispatch = jest.fn();
    const mockResponse = {
      json: jest.fn().mockResolvedValue({
        results: [{ title: "Movie 1" }, { title: "Movie 2" }],
      }),
    };
    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    await fetchMovies()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: FETCH_MOVIES_REQUEST });
  });

  it("should dispatch FETCH_MOVIES_SUCCESS after API call", async () => {
    const dispatch = jest.fn();
    const mockResponse = {
      json: jest.fn().mockResolvedValue({
        results: [{ title: "Movie 1" }, { title: "Movie 2" }],
      }),
    };
    (fetch as jest.Mock).mockResolvedValue(mockResponse);

    await fetchMovies()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: FETCH_MOVIES_SUCCESS,
      payload: [{ title: "Movie 1" }, { title: "Movie 2" }],
    });
  });

  it("should dispatch FETCH_MOVIES_FAILURE on API call error", async () => {
    const dispatch = jest.fn();
    (fetch as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    await fetchMovies()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: FETCH_MOVIES_FAILURE,
      payload: "Failed to fetch movies",
    });
  });

  it("should dispatch SELECT_MOVIE action when selecting a movie", () => {
    const movie = { title: "Movie 1", episode_id: 1 };
    const result = selectMovie(movie);
    expect(result).toEqual({
      type: "SELECT_MOVIE",
      payload: movie,
    });
  });

  it("should dispatch DESELECT_MOVIE action when deselecting a movie", () => {
    const result = deselectMovie();
    expect(result).toEqual({
      type: "DESELECT_MOVIE",
    });
  });
});
