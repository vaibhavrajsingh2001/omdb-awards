import { useContext } from 'react';
import MovieContext from '../context/movieContext';

const ResultsItem = ({ movie }) => {
  const movieContext = useContext(MovieContext);

  const { fetchMovieInfo, removeNominated } = movieContext;

  const movieSelected = (id) => {
    fetchMovieInfo(id);
  };

  const removeFromNominated = (id) => {
    removeNominated(id);
  };

  return (
    <li onClick={() => movieSelected(movie.imdbID)}>
      <div className="results__link">
        <figure className="results__fig">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/p.jpg'}
            alt="Poster"
          />
        </figure>
        <div className="results__data">
          <h4 className="results__name">{movie.Title}</h4>
          <p className="results__launched">Year of launch: {movie.Year}</p>
          <button
            className="btn-remove btn-small"
            onClick={() => removeFromNominated(movie.imdbID)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};

export default ResultsItem;
