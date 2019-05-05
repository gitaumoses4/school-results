import { all } from 'redux-saga/effects';
import {watchSearchSchools} from './searchSchoolsSaga';
import {watchFetchSchool} from './fetchSchoolSaga';
import {watchRequestFiles} from './requestFilesSaga';
import {watchInitiatePaymentSaga, watchMakePaymentSaga} from './paymentSaga';

function * rootSaga() {
  yield all([
    watchSearchSchools(),
    watchFetchSchool(),
    watchRequestFiles(),
    watchInitiatePaymentSaga(),
    watchMakePaymentSaga()
  ]);
}

export default rootSaga;
