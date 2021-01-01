import { useContext } from 'react';
import MovieContext from '../context/movieContext';

const Alert = () => {
  const movieContext = useContext(MovieContext);

  const { alert, clearAlert } = movieContext;

  if (alert) {
    return (
      <div className={`alert alert-${alert.type}`}>
        {alert.msg}
        <button className="alert-btn" onClick={clearAlert}>
          &times;
        </button>
      </div>
    );
  } else return null;
};

export default Alert;
