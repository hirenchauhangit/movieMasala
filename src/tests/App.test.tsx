import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

// Mock the child components
jest.mock("../components/MovieList.tsx", () => ({
  __esModule: true,
  default: ({ sortBy, searchText, sortOrder }: any) => (
    <div data-testid="movie-list">
      <p>Sort By: {sortBy}</p>
      <p>Search Text: {searchText}</p>
      <p>Sort Order: {sortOrder}</p>
    </div>
  ),
}));

jest.mock("../components/MovieDescription.tsx", () => ({
  __esModule: true,
  default: () => <div data-testid="movie-description">Movie Description</div>,
}));

jest.mock("../components/SortAndSearch.tsx", () => ({
  __esModule: true,
  default: ({ setSortBy, setSearchText, setSortOrder }: any) => {
    return (
      <div data-testid="sort-and-search">
        <button onClick={() => setSortBy("title")}>Set Sort By</button>
        <button onClick={() => setSortOrder("DESC")}>Set Sort Order</button>
        <input
          data-testid="search-input"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
        />
      </div>
    );
  },
}));

describe("App Component", () => {
  test("should render the App component with initial state", () => {
    render(<App />);

    // Initial render checks
    expect(screen.getByTestId("movie-list")).toBeInTheDocument();
    expect(screen.getByTestId("movie-description")).toBeInTheDocument();
    expect(screen.getByTestId("sort-and-search")).toBeInTheDocument();
  });

  test("should update sortBy state on button click", () => {
    render(<App />);

    // Simulate button click to change the sortBy state
    fireEvent.click(screen.getByText("Set Sort By"));

    // Check if the updated state value is passed to the MovieList
    expect(screen.getByText("Sort By: title")).toBeInTheDocument();
  });

  test("should update sortOrder state on button click", () => {
    render(<App />);

    // Simulate button click to change the sortOrder state
    fireEvent.click(screen.getByText("Set Sort Order"));

    // Check if the updated sortOrder state is passed to the MovieList
    expect(screen.getByText("Sort Order: DESC")).toBeInTheDocument();
  });

  test("should update searchText state on input change", () => {
    render(<App />);

    // Simulate typing into the search input field
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Avengers" },
    });

    // Check if the updated searchText state is passed to the MovieList
    expect(screen.getByText("Search Text: Avengers")).toBeInTheDocument();
  });

  test("should render MovieList with props from App component", () => {
    render(<App />);

    // The MovieList should receive the updated sortBy, searchText, and sortOrder
    fireEvent.click(screen.getByText("Set Sort By"));
    fireEvent.click(screen.getByText("Set Sort Order"));
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Avengers" },
    });

    // Check the values passed to MovieList
    expect(screen.getByText("Sort By: title")).toBeInTheDocument();
    expect(screen.getByText("Sort Order: DESC")).toBeInTheDocument();
    expect(screen.getByText("Search Text: Avengers")).toBeInTheDocument();
  });
});
