import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/types.ts";
import close from "../images/close.png";
import { deselectMovie } from "../redux/movieListActions.ts";
import starwars from "../images/starwars.jpeg";
import Ratings from "./Ratings.tsx";

const MovieDescription: React.FC = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state: AppState) => state.selectedMovie);
  const handleDeselectMovie = () => {
    dispatch(deselectMovie());
  };
  return (
    <div className="movie-description">
      <div className="close-icon" onClick={handleDeselectMovie}>
        <img src={close} className="close" alt="close" />
      </div>
      {selectedMovie ? (
        <>
          <h2>{selectedMovie.title}</h2>
          <div>
            <div className="d-flex">
              <img src={starwars} alt="starwars" />
              <p>{selectedMovie.opening_crawl}</p>
            </div>
            <span className="directed-by">
              <label>Directed By:</label> {selectedMovie.director}
            </span>
            <span className="d-flex">
              <label>Average Rating:&nbsp;</label>
              <Ratings movie={selectedMovie} />
            </span>
            <div className="agency-ratings">
              <span>
                <label>Internet Movie Database: </label>
                {selectedMovie.internet_movie_database}%
              </span>
              <span>
                <label>Rotten Tomatoes:</label>
                {selectedMovie.rotton_tomatoes}%
              </span>
              <span>
                <label> Metacritic:</label>
                {selectedMovie.metacritic}%
              </span>
            </div>
          </div>
        </>
      ) : (
        <p>Select a movie to see its description</p>
      )}
    </div>
  );
};

export default MovieDescription;
