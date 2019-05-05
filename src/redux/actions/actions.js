import {FETCH_SCHOOL, SEARCH_SCHOOLS} from './types';

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
