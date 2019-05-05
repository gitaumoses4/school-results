import {FETCH_SCHOOL} from '../actions/types';

const initialState = {
  isLoading: false,
  school: {},
  error: false
};

export default (state = initialState, action) => {
  switch(action.type){
  case FETCH_SCHOOL:
    return {...state, isLoading: true};
  case `${FETCH_SCHOOL}_SUCCESS`:
    return {...state, isLoading: false, school: action.school};
  case `${FETCH_SCHOOL}_FAILURE`:
    return {...state, isLoading: false, error: action.error};
  default:
    return state;
  }
};
