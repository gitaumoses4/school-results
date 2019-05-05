import {SEARCH_SCHOOLS} from '../actions/types';

const initialState = {
  isLoading: false,
  schools: [],
  searchDone: false,
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SEARCH_SCHOOLS:
    return {...state, isLoading: true, searchDone: false};
  case `${SEARCH_SCHOOLS}_SUCCESS`:
    return {...state, isLoading: false, schools: action.schools, searchDone: true};
  case `${SEARCH_SCHOOLS}_FAILURE`:
    return {...state, isLoading: false, error: true, searchDone: true};
  default:
    return state;
  }
};
