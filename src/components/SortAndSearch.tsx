import React from "react";
import search from "../images/search.png";
import { MovieListProps } from "./MovieList.tsx";
import Select from "../HtmlElements/Select.tsx";
import Button from "../HtmlElements/Button.tsx";
import Input from "../HtmlElements/Input.tsx";
export interface sortSearchProps {
  setSortBy: (sortBy: MovieListProps["sortBy"]) => void;
  setSearchText: (searchText: MovieListProps["searchText"]) => void;
  setSortOrder: (sortOrder: MovieListProps["sortOrder"]) => void;
  sortOrder: MovieListProps["sortOrder"];
}
function SortAndSearch(props: sortSearchProps) {
  const { setSortBy, setSearchText, setSortOrder, sortOrder } = props;
  const changeSortOption = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    setSortBy(target.value as MovieListProps["sortBy"]);
  };
  const handleFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setSearchText(target.value);
  };
  const handleSortOrder = () => {
    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
  };

  return (
    <div className="sort-search-section d-flex">
      <Select changeSortOption={changeSortOption} />
      <Button handleSortOrder={handleSortOrder} sortOrder={sortOrder} />
      <Input
        type="text"
        placeholder="Type to search..."
        handleFilterChange={handleFilterChange}
        searchImage={search}
      />
    </div>
  );
}

export default SortAndSearch;
