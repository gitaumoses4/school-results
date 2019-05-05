import {INITIATE_PAYMENT, MAKE_PAYMENT} from '../actions/types';

const initialState = {
  isLoading: false,
  requestInfo: {},
  token: '',
  error: false,
  paymentError: false,
  paymentSuccess: false
};

export default (state=initialState, action) => {
  switch( action.type){
  case INITIATE_PAYMENT:
    return {...state, isLoading: true, token: action.token};
  case `${INITIATE_PAYMENT}_SUCCESS`:
    return {...state, isLoading: false, requestInfo: action.request};
  case `${INITIATE_PAYMENT}_FAILURE`:
    return {...state, isLoading: false, error: action.error};
  case MAKE_PAYMENT:
    return {...state, isLoading: true, paymentSuccess: false, paymentError: false};
  case `${MAKE_PAYMENT}_SUCCESS`:
    return {...state, isLoading: false, paymentSuccess: true, paymentError: false};
  case `${MAKE_PAYMENT}_FAILURE`:
    return {...state, isLoading: false, paymentSuccess: false, paymentError: true};
  default:
    return state;
  }
};
