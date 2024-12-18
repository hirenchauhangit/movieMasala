import React from "react";
import { render, screen } from "@testing-library/react";
import Ratings from "../components/Ratings";
import { Movie } from "../redux/types";

describe("Ratings Component", () => {
  // Helper function to mock a movie object
  const mockMovie = (
    internet_movie_database: number,
    rotton_tomatoes: number,
    metacritic: number
  ): Movie => ({
    internet_movie_database,
    rotton_tomatoes,
    metacritic,
    title: "",
    episode_id: 0,
    release_date: "",
  });

  it("renders the correct number of selected stars based on average rating", () => {
    const movie = mockMovie(80, 90, 70);
    render(<Ratings movie={movie} />);

    // Expect 7 selected stars
    const selectedStars = screen.getAllByAltText("star selected");
    expect(selectedStars.length).toBe(8);

    // Expect 3 empty stars (since maxRating is 10)
    const emptyStars = screen.getAllByAltText("star");
    expect(emptyStars.length).toBe(2);
  });

  it("renders the correct number of empty stars based on remaining rating", () => {
    const movie = mockMovie(50, 60, 70);
    render(<Ratings movie={movie} />);

    // Expect 6 selected stars
    const selectedStars = screen.getAllByAltText("star selected");
    expect(selectedStars.length).toBe(6);

    // Expect 4 empty stars (since maxRating is 10)
    const emptyStars = screen.getAllByAltText("star");
    expect(emptyStars.length).toBe(4);
  });

  it("handles the maximum rating (10) correctly", () => {
    const movie = mockMovie(100, 100, 100);
    render(<Ratings movie={movie} />);

    // Expect 10 selected stars
    const selectedStars = screen.getAllByAltText("star selected");
    expect(selectedStars.length).toBe(10);

    // Expect 0 empty stars
    const emptyStars = screen.queryAllByAltText("star");
    expect(emptyStars.length).toBe(0);
  });

  it("calculates the correct average rating", () => {
    const movie = mockMovie(75, 85, 95);
    render(<Ratings movie={movie} />);

    // Expect 8 selected stars
    const selectedStars = screen.getAllByAltText("star selected");
    expect(selectedStars.length).toBe(9);

    // Expect 2 empty stars (since maxRating is 10)
    const emptyStars = screen.getAllByAltText("star");
    expect(emptyStars.length).toBe(1);
  });
});
