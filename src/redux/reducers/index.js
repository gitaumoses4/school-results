import {combineReducers} from 'redux';
import searchSchools from './searchSchools';
import school from './school';


const rootReducer = combineReducers({
  searchSchools,
  school
});

export default rootReducer;
