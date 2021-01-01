import { useContext, useEffect } from 'react';
import MovieContext from '../context/movieContext';
import NominationsItem from './NominationsItem';

const Nominations = () => {
  const movieContext = useContext(MovieContext);

  const { nominations, loadNominated } = movieContext;

  useEffect(() => {
    loadNominated();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="nominations">
      <h2 className="heading-2">My Nominations List ({nominations.length}/5)</h2>
      <ul className="nominations__list">
        {nominations.map((movie) => (
          <NominationsItem key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    </div>
  );
};

export default Nominations;
