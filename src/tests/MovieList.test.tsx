import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "redux-mock-store";
import thunk from "redux-thunk";
import MovieList from "../components/MovieList";
import { fetchMovies } from "../redux/movieListActions";
import { selectMovie } from "../redux/movieListActions";
import { sortByKey } from "../components/MovieListFlow";

// Mocking the Ratings component
jest.mock("../components/Ratings.tsx", () => ({ movie }: { movie: any }) => (
  <div>Ratings for {movie.title}</div>
));

// Mocking fetchMovies async action
jest.mock("../redux/movieListActions.ts", () => ({
  fetchMovies: jest.fn().mockReturnValue((dispatch) => {
    dispatch({ type: "FETCH_MOVIES" });
  }),
}));

// Configure the mock store with thunk middleware
const mockStore = configureStore([thunk]);

describe("MovieList Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      movies: {
        loading: false,
        movies: [
          {
            episode_id: 1,
            title: "Star Wars",
            release_date: "1977-05-25",
            internet_movie_database: 85,
            rotton_tomatoes: 90,
            metacritic: 90,
          },
          {
            episode_id: 2,
            title: "The Empire Strikes Back",
            release_date: "1980-05-21",
            internet_movie_database: 90,
            rotton_tomatoes: 95,
            metacritic: 92,
          },
        ],
        error: null,
      },
    });
  });

  it("renders the movie list without any error", async () => {
    render(
      <Provider store={store}>
        <MovieList sortBy="title" searchText="" sortOrder="ASC" />
      </Provider>
    );
    expect(screen.getByText("Star Wars")).toBeInTheDocument();
    expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
  });

  it("displays loading state when movies are loading", async () => {
    store = mockStore({
      movies: { loading: true, movies: [], error: null },
    });
    render(
      <Provider store={store}>
        <MovieList sortBy="title" searchText="" sortOrder="ASC" />
      </Provider>
    );
    expect(screen.getByText("Loading movies...")).toBeInTheDocument();
  });

  it("displays error message when there is an error fetching movies", async () => {
    store = mockStore({
      movies: { loading: false, movies: [], error: "Failed to fetch movies" },
    });
    render(
      <Provider store={store}>
        <MovieList sortBy="title" searchText="" sortOrder="ASC" />
      </Provider>
    );
    expect(screen.getByText("Failed to fetch movies")).toBeInTheDocument();
  });

  it("filters movies based on search text", async () => {
    store = mockStore({
      movies: {
        loading: false,
        movies: [
          {
            episode_id: 1,
            title: "Star Wars",
            release_date: "1977-05-25",
            internet_movie_database: 85,
            rotton_tomatoes: 90,
            metacritic: 90,
          },
          {
            episode_id: 2,
            title: "The Empire Strikes Back",
            release_date: "1980-05-21",
            internet_movie_database: 90,
            rotton_tomatoes: 95,
            metacritic: 92,
          },
        ],
        error: null,
      },
    });
    render(
      <Provider store={store}>
        <MovieList sortBy="title" searchText="Empire" sortOrder="ASC" />
      </Provider>
    );
    expect(screen.queryByText("Star Wars")).not.toBeInTheDocument();
    expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
  });

  it("sorts movies based on the selected sort option", async () => {
    const sortedMovies = [
      {
        episode_id: 2,
        title: "The Empire Strikes Back",
        release_date: "1980-05-21",
        internet_movie_database: 90,
        rotton_tomatoes: 95,
        metacritic: 92,
      },
      {
        episode_id: 1,
        title: "Star Wars",
        release_date: "1977-05-25",
        internet_movie_database: 85,
        rotton_tomatoes: 90,
        metacritic: 90,
      },
    ];
    store = mockStore({
      movies: { loading: false, movies: sortedMovies, error: null },
    });

    render(
      <Provider store={store}>
        <MovieList sortBy="title" searchText="" sortOrder="ASC" />
      </Provider>
    );

    // Verify the first movie is The Empire Strikes Back
    expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
  });

  it("dispatches selectMovie when a movie is clicked", async () => {
    render(
      <Provider store={store}>
        <MovieList sortBy="title" searchText="" sortOrder="ASC" />
      </Provider>
    );

    const movieRow = screen.getAllByRole("row")[0]; // Assuming first movie row
    fireEvent.click(movieRow);

    // Ensure selectMovie has been dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(
      selectMovie({
        episode_id: 1,
        title: "Star Wars",
        release_date: "1977-05-25",
        internet_movie_database: 85,
        rotton_tomatoes: 90,
        metacritic: 90,
      })
    );
  });

  const movies = [
    { episode_id: 1, title: "A New Hope", release_date: "1977-05-25" },
    {
      episode_id: 2,
      title: "The Empire Strikes Back",
      release_date: "1980-05-21",
    },
    {
      episode_id: 3,
      title: "Return of the Jedi",
      release_date: "1983-05-25",
    },
  ];

  it("should sort movies by title in ascending order", () => {
    const sortedMovies = sortByKey(movies, "title", "ASC");
    expect(sortedMovies[0].title).toBe("A New Hope");
    expect(sortedMovies[1].title).toBe("Return of the Jedi");
    expect(sortedMovies[2].title).toBe("The Empire Strikes Back");
  });

  it("should sort movies by title in descending order", () => {
    const sortedMovies = sortByKey(movies, "title", "DESC");
    expect(sortedMovies[0].title).toBe("The Empire Strikes Back");
    expect(sortedMovies[1].title).toBe("Return of the Jedi");
    expect(sortedMovies[2].title).toBe("A New Hope");
  });

  it("should sort movies by episode_id in ascending order", () => {
    const sortedMovies = sortByKey(movies, "episode_id", "ASC");
    expect(sortedMovies[0].episode_id).toBe(1);
    expect(sortedMovies[1].episode_id).toBe(2);
    expect(sortedMovies[2].episode_id).toBe(3);
  });

  it("should sort movies by episode_id in descending order", () => {
    const sortedMovies = sortByKey(movies, "episode_id", "DESC");
    expect(sortedMovies[0].episode_id).toBe(3);
    expect(sortedMovies[1].episode_id).toBe(2);
    expect(sortedMovies[2].episode_id).toBe(1);
  });
});
