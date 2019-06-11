import {FETCH_SCHOOL, REQUEST_FILES} from '../actions/types';

const initialState = {
  isLoading: true,
  school: {},
  error: false,
  requester: {}
};

export default (state = initialState, action) => {
  switch(action.type){
  case FETCH_SCHOOL:
    return {...state, isLoading: true};
  case `${FETCH_SCHOOL}_SUCCESS`:
    return {...state, isLoading: false,
      school: {
        ...action.school,
        other_files: action.school.other_files.filter(
          file => file.file_type !== 'raw'
        )
      }
    };
  case `${FETCH_SCHOOL}_FAILURE`:
    return {...state, isLoading: false, error: action.error};
  case REQUEST_FILES:
    return {...state, isLoading: true, requester: action.data};
  default:
    return state;
  }
};
