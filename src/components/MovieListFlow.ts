import { Movie } from "../redux/types.ts";
import { MovieListProps } from "./MovieList.tsx";

export const sortByKey = (
  array: Movie[],
  key: MovieListProps["sortBy"],
  order: string = "ASC"
) => {
  return array.sort((a: Movie, b: Movie) => {
    if (a[key!]! < b[key!]!) {
      return order === "ASC" && key ? -1 : 1;
    }
    if (a[key!]! > b[key!]!) {
      return order === "ASC" && key ? 1 : -1;
    }
    if (key === "release_date" && order === "ASC" && key) {
      return new Date(a[key]!).getTime() - new Date(b[key]!).getTime();
    }
    return 0;
  });
};
