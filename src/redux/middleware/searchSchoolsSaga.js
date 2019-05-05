import { call, put, takeLatest } from 'redux-saga/effects';
import SearchService from '../../services/SearchService';
import {searchSchoolsFailure, searchSchoolsSuccess} from '../actions/searchActions';
import {SEARCH_SCHOOLS} from '../actions/types';
import errorHandler from './errorHandler';

export function* searchSchoolsSaga (action){
  try{
    const { data } = yield call(SearchService.searchSchools, action.search);
    yield put(searchSchoolsSuccess(data.schools));
  }catch(error){
    yield put(searchSchoolsFailure(errorHandler(error)));
  }
}

export function* watchSearchSchools (){
  yield takeLatest(SEARCH_SCHOOLS, searchSchoolsSaga);
}
