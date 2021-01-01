import { useContext, useState, useEffect } from 'react';
import MovieContext from '../context/movieContext';

const ResultsItem = ({ movie, isNominated }) => {
  const movieContext = useContext(MovieContext);

  const {
    fetchMovieInfo,
    nominations,
    addNominated,
    removeNominated,
  } = movieContext;

  const [nominated, setNominated] = useState(isNominated);

  useEffect(() => {
    let nominatedIds = nominations.map((movie) => movie.imdbID);
    if (nominatedIds.some((id) => id === movie.imdbID)) {
      setNominated(true);
    }

    return () => {
      setNominated(false);
    };
  }, [nominations, movie]);

  const movieSelected = (id) => {
    fetchMovieInfo(id);
  };

  const nominationHandler = async (movie) => {
    try {
      const res = await addNominated(movie);
      setNominated(res);
    } catch (error) {
      setNominated(error);
    }
  };

  const removeFromNominated = (id) => {
    removeNominated(id);
    setNominated(false);
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
          {nominated ? (
            <button
              className="btn-remove btn-small"
              onClick={() => removeFromNominated(movie.imdbID)}
            >
              Remove
            </button>
          ) : (
            <button
              className="btn btn-small"
              onClick={() => nominationHandler(movie)}
            >
              Nominate
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default ResultsItem;
