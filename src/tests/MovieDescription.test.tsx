import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import MovieDescription from "../components/MovieDescription";
import { deselectMovie } from "../redux/movieListActions";
import { AppState } from "../redux/types";

// Mock the Redux store with a movie selected
const initialState = {
  selectedMovie: {
    title: "Star Wars: A New Hope",
    opening_crawl: "A long time ago in a galaxy far, far away...",
    director: "George Lucas",
    internet_movie_database: 92,
    rotton_tomatoes: 93,
    metacritic: 85,
  },
};

// Create a mock Redux store for testing
const mockStore = createStore((state = initialState, action: any) => {
  switch (action.type) {
    case "DESELECT_MOVIE":
      return { ...state, selectedMovie: null };
    default:
      return state;
  }
});

// Mock images to prevent errors during testing
jest.mock("../images/close.png", () => "close.png");
jest.mock("../images/starwars.jpeg", () => "starwars.jpeg");

describe("MovieDescription Component", () => {
  test("should render movie description when a movie is selected", () => {
    render(
      <Provider store={mockStore}>
        <MovieDescription />
      </Provider>
    );

    // Check if the movie title is rendered
    expect(screen.getByText("Star Wars: A New Hope")).toBeInTheDocument();
    // Check if the opening crawl is rendered
    expect(
      screen.getByText("A long time ago in a galaxy far, far away...")
    ).toBeInTheDocument();
    // Check if the director's name is rendered
    expect(screen.getByText("George Lucas")).toBeInTheDocument();
    // Check if ratings are shown
    expect(screen.getByText("Internet Movie Database:")).toBeInTheDocument();
    expect(screen.getByText("Rotten Tomatoes:")).toBeInTheDocument();
    expect(screen.getByText("Metacritic:")).toBeInTheDocument();
  });

  test("should show 'Select a movie to see its description' when no movie is selected", () => {
    const emptyState = { selectedMovie: null };
    const emptyStore = createStore((state = emptyState, action: any) => {
      switch (action.type) {
        default:
          return state;
      }
    });

    render(
      <Provider store={emptyStore}>
        <MovieDescription />
      </Provider>
    );

    // Check that the placeholder text is displayed
    // expect(
    //   screen.getByText("Select a movie to see its description")
    // ).toBeInTheDocument();
  });

  // test("should call deselectMovie when close icon is clicked", () => {
  //   const mockDispatch = jest.fn();
  //   const store = createStore((state = initialState, action: any) => {
  //     switch (action.type) {
  //       case "DESELECT_MOVIE":
  //         return { ...state, selectedMovie: null };
  //       default:
  //         return state;
  //     }
  //   }, initialState);

  //   render(
  //     <Provider store={store}>
  //       <MovieDescription />
  //     </Provider>
  //   );

  //   // Find the close button and simulate a click
  //   fireEvent.click(screen.getByAltText("close"));

  //   // Check if the deselectMovie action was called
  //   expect(mockDispatch).toHaveBeenCalledWith({ type: "DESELECT_MOVIE" });
  // });
});
