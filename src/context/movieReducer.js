import {
  SEARCH_MOVIES,
  GET_MOVIE,
  SHOW_ALERT,
  CLEAR_ALERT,
  SET_LOADING,
  ADD_NOMINATION,
} from './types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case SEARCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_NOMINATION:
      return {
        ...state,
        nominations: action.payload,
      };
    case SHOW_ALERT:
      return {
        ...state,
        alert: action.payload,
        loading: false,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
};
