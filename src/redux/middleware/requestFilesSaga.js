import { call, takeLatest, put } from 'redux-saga/effects';
import SchoolsService from '../../services/SchoolsService';
import {requestFilesFailure, requestFilesSuccess} from '../actions/actions';
import errorHandler from './errorHandler';
import {REQUEST_FILES} from '../actions/types';

export function* requestFilesSaga ({ data, history }) {
  try{
    const { data: response } = yield call(SchoolsService.requestFiles, data);
    yield put(requestFilesSuccess(response));
    history.push(`/request-files/${response.token}`);
  }catch(error){
    yield put(requestFilesFailure(errorHandler(error)));
  }
}

export function* watchRequestFiles(){
  yield takeLatest(REQUEST_FILES, requestFilesSaga);
}
