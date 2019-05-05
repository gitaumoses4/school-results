import {FETCH_SCHOOL, INITIATE_PAYMENT, MAKE_PAYMENT, REQUEST_FILES, SEARCH_SCHOOLS} from './types';

export const searchSchools = (search) => ({
  type: SEARCH_SCHOOLS,
  search
});

export const searchSchoolsSuccess = (schools) => ({
  type: `${SEARCH_SCHOOLS}_SUCCESS`,
  schools
});

export const searchSchoolsFailure = (error) => ({
  type: `${SEARCH_SCHOOLS}_FAILURE`,
  error
});

export const fetchSchool = (code) => ({
  type: FETCH_SCHOOL,
  code
});

export const fetchSchoolSuccess = (school) => ({
  type: `${FETCH_SCHOOL}_SUCCESS`,
  school
});


export const fetchSchoolFailure = (error) => ({
  type: `${FETCH_SCHOOL}_FAILURE`,
  error
});

export const requestFiles = (data, history) => ({
  type: REQUEST_FILES,
  data,
  history
});

export const requestFilesSuccess = (response) => ({
  type: `${REQUEST_FILES}_SUCCESS`,
  response
});

export const requestFilesFailure = (error) => ({
  type: `${REQUEST_FILES}_FAILURE`,
  error
});

export const initiatePayment = (token, history) => ({
  type: INITIATE_PAYMENT,
  token,
  history
});

export const initiatePaymentSuccess = (request) =>  ({
  type: `${INITIATE_PAYMENT}_SUCCESS`,
  request
});

export const initiatePaymentFailure = (error) => ({
  type: `${INITIATE_PAYMENT}_FAILURE`,
  error
});

export const makePayment = (token, phone_number) => ({
  type: MAKE_PAYMENT,
  data: { token, phone_number }
});

export const makePaymentSuccess = (response) => ({
  type: `${MAKE_PAYMENT}_SUCCESS`,
  response
});

export const makePaymentFailure = (error) => ({
  type: `${MAKE_PAYMENT}_FAILURE`,
  error
});
