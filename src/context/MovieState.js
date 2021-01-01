import { useReducer } from 'react';
import axios from 'axios';

import movieReducer from './movieReducer';
import {
  ADD_NOMINATION,
  CLEAR_ALERT,
  GET_MOVIE,
  SEARCH_MOVIES,
  SET_LOADING,
  SHOW_ALERT,
} from './types';
import MovieContext from './movieContext';

const api_key = process.env.REACT_APP_OMDB_KEY;

const MovieState = (props) => {
  const initialState = {
    movies: [],
    movie: {},
    nominations: [],
    loading: false,
    alert: null,
  };

  const [state, dispatch] = useReducer(movieReducer, initialState);

  // fetch movies based on entered query
  const searchMovies = async (name) => {
    manageLoading();

    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${api_key}&s=${name}&type=movie`
      );

      if (res.data.Response === 'True') {
        dispatch({
          type: SEARCH_MOVIES,
          payload: res.data.Search,
        });
      } else {
        showAlert('No results found for given search item', 'danger');
      }
      // To-Do add error showing for res.data.Response === 'False'
    } catch (error) {
      showAlert('Error in OMDb API', 'danger');
      console.log(error);
    }
  };

  // fetch movie details using imdbID
  const fetchMovieInfo = async (id) => {
    manageLoading();

    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${api_key}&i=${id}&type=movie&plot=full`
      );

      if (res) {
        dispatch({
          type: GET_MOVIE,
          payload: res.data,
        });
      }
    } catch (error) {
      showAlert('Error in OMDb API', 'danger');
      console.log(error);
    }
  };

  // Manage Nomination state //

  const loadNominated = () => {
    let nominatedList = [];
    const data = JSON.parse(localStorage.getItem('nominated'));

    if (data) {
      nominatedList = data;
    }
    dispatch({ type: ADD_NOMINATION, payload: nominatedList });
  };

  const addNominated = (movie) => {
    return new Promise((resolve, reject) => {
      let nominatedList = [];
      const data = JSON.parse(localStorage.getItem('nominated'));

      if (data) {
        nominatedList = data;
      }

      // checking if the movie's already nominated
      if (
        nominatedList.some((nomination) => nomination.imdbID === movie.imdbID)
      ) {
        resolve(true);
      } else {
        if (nominatedList.length < 5) {
          if (nominatedList.length === 4) {
            showAlert(
              '5 nominations have been successfuly selected.',
              'success'
            );
          }
          nominatedList = [...nominatedList, movie];
          nominatedList = [...new Set(nominatedList)];
          localStorage.setItem('nominated', JSON.stringify(nominatedList));
          dispatch({ type: ADD_NOMINATION, payload: nominatedList });
          resolve(true);
        } else {
          showAlert("Can't add more than 5 nominations.", 'danger');
          reject(false);
        }
      }
    });
  };

  const removeNominated = (id) => {
    let nominatedList = JSON.parse(localStorage.getItem('nominated'));
    nominatedList = nominatedList.filter((movie) => movie.imdbID !== id);
    localStorage.setItem('nominated', JSON.stringify(nominatedList));
    loadNominated();
  };

  // manage loading
  const manageLoading = () => dispatch({ type: SET_LOADING });

  // alerts
  const showAlert = (msg, type) => {
    dispatch({
      type: SHOW_ALERT,
      payload: { msg, type },
    });
    setTimeout(() => dispatch({ type: CLEAR_ALERT }), 5000);
  };

  const clearAlert = () => dispatch({ type: CLEAR_ALERT });

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        movie: state.movie,
        nominations: state.nominations,
        loading: state.loading,
        alert: state.alert,
        searchMovies,
        fetchMovieInfo,
        loadNominated,
        addNominated,
        removeNominated,
        showAlert,
        clearAlert,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
