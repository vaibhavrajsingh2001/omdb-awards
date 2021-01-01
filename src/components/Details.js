import { useContext, useState, useEffect } from 'react';
import MovieContext from '../context/movieContext';

const Details = () => {
  const movieContext = useContext(MovieContext);

  const { loading, movie, nominations, addNominated } = movieContext;

  const [nominated, setNominated] = useState(false);

  useEffect(() => {
    let nominatedIds = nominations.map((movie) => movie.imdbID);
    if (nominatedIds.some((id) => id === movie.imdbID)) {
      setNominated(true);
    }

    return () => {
      setNominated(false);
    };
  }, [nominations, movie]);

  const nominationHandler = async (movie) => {
    try {
      const res = await addNominated(movie);
      setNominated(res);
    } catch (error) {
      setNominated(error);
    }
  };

  if (loading) {
    return (
      <div className="details">
        <div className="loader">
          <svg>
            <use href="/icons.svg#icon-cw"></use>
          </svg>
        </div>
      </div>
    );
  } else if (movie.Title) {
    return (
      <div className="details">
        <figure className="details__fig">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/p.jpg'}
            alt={movie.Title}
            className="details__img"
          />
          <h1 className="details__title">
            <span>{movie.Title}</span>
          </h1>
        </figure>

        <div className="details__extended">
          <div className="details__info">
            <svg className="details__info-icon">
              <use href="/icons.svg#icon-stopwatch"></use>
            </svg>
            <span className="details__info-data details__info-data--minutes">
              {movie.Runtime}
            </span>
          </div>
          <div className="details__info">
            <svg className="details__info-icon">
              <use href="/icons.svg#icon-dollar"></use>
            </svg>
            <span className="details__info-data details__info-data--people">
              {movie.BoxOffice}
            </span>
          </div>
          {nominated ? (
            <div className="badge">
              <svg className="search__icon">
                <use href="/icons.svg#icon-check"></use>
              </svg>
              <span>Nominated!</span>
            </div>
          ) : (
            <button
              onClick={() => nominationHandler(movie)}
              className="btn-small details__btn details__btn-nominate"
            >
              <svg className="search__icon">
                <use href="/icons.svg#icon-circle-with-plus"></use>
              </svg>
              <span>Add to Nominations</span>
            </button>
          )}
        </div>

        <div className="details__facts">
          <h3>Ratings</h3>
          <ul className="details__facts-list">
            {movie.Ratings.map((rating) => (
              <li key={rating.Source} className="details__item">
                <svg className="details__icon">
                  <use href="/icons.svg#icon-check"></use>
                </svg>
                <div className="facts">{rating.Source}</div>
                <div className="facts">{rating.Value}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="details__directions">
          <h2 className="heading-2">Plot</h2>
          <p className="details__directions-text">{movie.Plot}</p>
          {movie.Website !== 'N/A' && (
            <a className="btn-small details__btn" href={movie.Website}>
              <span>Official Website</span>
              <svg className="search__icon">
                <use href="/icons.svg#icon-triangle-right"></use>
              </svg>
            </a>
          )}
        </div>
      </div>
    );
  } else {
    return <div className="details"></div>;
  }
};

export default Details;
