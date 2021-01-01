import { useContext, useState } from 'react';
import MovieContext from '../context/movieContext';

const Header = () => {
  const movieContext = useContext(MovieContext);

  const { searchMovies, showAlert } = movieContext;

  const [text, manageText] = useState('');

  const onChange = (e) => manageText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text) {
      searchMovies(text);
    } else {
      showAlert('Enter some text to search!', 'light');
    }
    manageText('');
  };

  return (
    <header className="header">
      <img src="/logo.svg" width="200px" alt="Logo" className="header__logo" />

      <form className="search" onSubmit={onSubmit}>
        <input
          type="text"
          className="search__field"
          placeholder="Search for movies"
          aria-label="Search movies"
          value={text}
          onChange={onChange}
        />
        <button className="btn">
          <svg>
            <use href="/icons.svg#icon-magnifying-glass"></use>
          </svg>
          <span>Search</span>
        </button>
      </form>
    </header>
  );
};

export default Header;
