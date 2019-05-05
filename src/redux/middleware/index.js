import { all } from 'redux-saga/effects';
import {watchSearchSchools} from './searchSchoolsSaga';
import {watchFetchSchool} from './fetchSchoolSaga';

function * rootSaga() {
  yield all([
    watchSearchSchools(),
    watchFetchSchool()
  ]);
}

export default rootSaga;
