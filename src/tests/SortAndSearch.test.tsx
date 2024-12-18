import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortAndSearch, { sortSearchProps } from "../components/SortAndSearch";
import { MovieListProps } from "../components/MovieList";

describe("SortAndSearch Component", () => {
  const mockSetSortBy = jest.fn();
  const mockSetSearchText = jest.fn();
  const mockSetSortOrder = jest.fn();

  const defaultProps: sortSearchProps = {
    setSortBy: mockSetSortBy,
    setSearchText: mockSetSearchText,
    setSortOrder: mockSetSortOrder,
    sortOrder: "ASC",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders Select, Button, and Input components", () => {
    render(<SortAndSearch {...defaultProps} />);

    // Check if Select component renders
    expect(screen.getByRole("combobox")).toBeInTheDocument();

    // Check if Button component renders
    expect(screen.getByRole("button")).toBeInTheDocument();

    // Check if Input component renders
    expect(
      screen.getByPlaceholderText("Type to search...")
    ).toBeInTheDocument();
  });

  it("calls setSortBy when a sort option is selected", () => {
    render(<SortAndSearch {...defaultProps} />);

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "title" } });

    expect(mockSetSortBy).toHaveBeenCalledWith("title");
  });

  it("calls setSearchText when input value changes", () => {
    render(<SortAndSearch {...defaultProps} />);

    const inputElement = screen.getByPlaceholderText("Type to search...");
    fireEvent.change(inputElement, { target: { value: "Star Wars" } });

    expect(mockSetSearchText).toHaveBeenCalledWith("Star Wars");
  });

  it("calls setSortOrder with 'DESC' when the sort order button is clicked and sortOrder is 'ASC'", () => {
    render(<SortAndSearch {...defaultProps} />);

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(mockSetSortOrder).toHaveBeenCalledWith("DESC");
  });

  it("calls setSortOrder with 'ASC' when the sort order button is clicked and sortOrder is 'DESC'", () => {
    render(<SortAndSearch {...defaultProps} sortOrder="DESC" />);

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(mockSetSortOrder).toHaveBeenCalledWith("ASC");
  });
});
