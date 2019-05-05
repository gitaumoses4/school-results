import { call, put, takeLatest } from 'redux-saga/effects';
import SchoolsService from '../../services/SchoolsService';
import {searchSchoolsFailure, searchSchoolsSuccess} from '../actions/actions';
import {SEARCH_SCHOOLS} from '../actions/types';
import errorHandler from './errorHandler';

export function* searchSchoolsSaga (action){
  try{
    const { data } = yield call(SchoolsService.searchSchools, action.search);
    yield put(searchSchoolsSuccess(data.schools));
  }catch(error){
    yield put(searchSchoolsFailure(errorHandler(error)));
  }
}

export function* watchSearchSchools (){
  yield takeLatest(SEARCH_SCHOOLS, searchSchoolsSaga);
}
