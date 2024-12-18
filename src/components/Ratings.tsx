import React from "react";
import starSelected from "../images/starSelected.png";
import star from "../images/star.png";
import { Movie } from "../redux/types.ts";

function Ratings(props: Movie) {
  const { movie } = props;
  var maxRating = 10;
  const averageRating = () => {
    return Math.ceil(
      (movie.internet_movie_database +
        movie.rotton_tomatoes +
        movie.metacritic) /
        3 /
        10
    );
  };
  const remainingRating = maxRating - averageRating();
  return (
    <div className="ratings">
      {Array.from({ length: averageRating() }).map((_, index) => (
        <img key={index} src={starSelected} alt="star selected" />
      ))}
      {Array.from({ length: remainingRating }).map((_, index) => (
        <img key={index} src={star} alt="star" />
      ))}
    </div>
  );
}

export default Ratings;
