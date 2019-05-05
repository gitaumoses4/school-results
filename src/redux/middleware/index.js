import { all } from 'redux-saga/effects';
import {watchSearchSchools} from './searchSchoolsSaga';

function * rootSaga() {
  yield all([
    watchSearchSchools()
  ]);
}

export default rootSaga;
