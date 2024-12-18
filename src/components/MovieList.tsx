import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../redux/movieListActions.ts";
import { RootState } from "../redux/rootReducers.ts";
import { selectMovie } from "../redux/movieListActions.ts";
import { Movie } from "../redux/types.ts";
import Ratings from "./Ratings.tsx";
import { sortByKey } from "./MovieListFlow.ts";
export type MovieListProps = {
  sortBy: "title" | "episode_id" | "release_date" | null;
  sortOrder: "ASC" | "DESC";
  searchText: string | null;
};
const MovieList: React.FC<MovieListProps> = (props: MovieListProps) => {
  const dispatch = useDispatch();
  const { sortBy, searchText, sortOrder } = props;

  let { loading, movies, error } = useSelector(
    (state: RootState) => state.movies
  );
  // As the API for Rating was failing so I have hardcoded the rating data
  const moviesWithRating = movies.map((m: Movie) => ({
    ...m,
    internet_movie_database: Math.floor(Math.random() * 100) + 1,
    rotton_tomatoes: Math.floor(Math.random() * 100) + 1,
    metacritic: Math.floor(Math.random() * 100) + 1,
  }));
  const filterAndSortMovies = (
    moviesWithRating: Movie[],
    searchText: string | null,
    sortBy: MovieListProps["sortBy"],
    order: MovieListProps["sortOrder"]
  ) => {
    // Filter moviesWithRating by name (if searchText is provided)
    const filteredMovies = searchText
      ? moviesWithRating.filter((movie) =>
          movie.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : moviesWithRating;

    // Sort filtered moviesWithRating by the selected key
    const sortedMovies = sortByKey(filteredMovies, sortBy, order);
    return sortedMovies;
  };
  const transformedMovies = filterAndSortMovies(
    moviesWithRating,
    searchText,
    sortBy,
    sortOrder
  );
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="movie-list">
        <p>Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-list">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      <table>
        <tbody>
          {transformedMovies &&
            transformedMovies.map((movie: Movie) => (
              <tr
                key={movie.episode_id}
                onClick={() => {
                  dispatch(selectMovie(movie));
                }}
              >
                <td>{`Episode ${movie.episode_id}`}</td>
                <td>{movie.title}</td>
                <td>
                  <Ratings movie={movie} />
                </td>
                <td>{movie.release_date}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
