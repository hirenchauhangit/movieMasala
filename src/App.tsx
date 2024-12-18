import React, { useState } from "react";
import MovieList, { MovieListProps } from "./components/MovieList.tsx";
import MovieDescription from "./components/MovieDescription.tsx";
import "./scss/main.scss";
import SortAndSearch from "./components/SortAndSearch.tsx";

const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<MovieListProps["sortBy"]>(null);
  const [sortOrder, setSortOrder] =
    useState<MovieListProps["sortOrder"]>("ASC");
  const [searchText, setSearchText] =
    useState<MovieListProps["searchText"]>(null);
  return (
    <div className="app moviestore-container">
      <div className="flex-1">
        <SortAndSearch
          setSortBy={setSortBy}
          setSearchText={setSearchText}
          setSortOrder={setSortOrder}
          sortOrder={sortOrder}
        />
        <div className="d-flex">
          <MovieList
            sortBy={sortBy}
            searchText={searchText}
            sortOrder={sortOrder}
          />
          <MovieDescription />
        </div>
      </div>
    </div>
  );
};

export default App;
