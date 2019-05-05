import { put, call, takeLatest } from 'redux-saga/effects';
import {fetchSchoolFailure, fetchSchoolSuccess} from '../actions/actions';
import errorHandler from './errorHandler';
import SchoolsService from '../../services/SchoolsService';
import {FETCH_SCHOOL} from '../actions/types';

export function* fetchSchoolSaga({ code }) {
  try{
    const { data } = yield call(SchoolsService.getSchool, code);
    yield put(fetchSchoolSuccess(data.school));
  }catch (error) {
    yield put(fetchSchoolFailure(errorHandler(error)));
  }
}

export function* watchFetchSchool(){
  yield takeLatest(FETCH_SCHOOL, fetchSchoolSaga);
}
