import {combineReducers} from 'redux';
import searchSchools from './searchSchools';
import school from './school';
import payment from './payment';


const rootReducer = combineReducers({
  searchSchools,
  school,
  payment
});

export default rootReducer;
