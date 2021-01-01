import { useContext } from 'react';
import MovieContext from '../context/movieContext';
import ResultsItem from './ResultsItem';

const Results = () => {
  const movieContext = useContext(MovieContext);

  const { movies } = movieContext;

  return (
    <div className="results">
      <ul className="results__list">
        {typeof movies !== 'undefined' &&
          movies.length > 0 &&
          movies.map((movie) => (
            <ResultsItem key={movie.imdbID} movie={movie} isNominated={false} />
          ))}
      </ul>
      <div className="results__pages"></div>
    </div>
  );
};

export default Results;
