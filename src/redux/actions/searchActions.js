import {SEARCH_SCHOOLS} from './types';

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
