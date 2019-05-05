import { call, put, takeLatest } from 'redux-saga/effects';
import SchoolsService from '../../services/SchoolsService';
import {
  initiatePaymentFailure,
  initiatePaymentSuccess,
  makePaymentFailure,
  makePaymentSuccess
} from '../actions/actions';
import errorHandler from './errorHandler';
import {INITIATE_PAYMENT, MAKE_PAYMENT} from '../actions/types';

export function* initiatePaymentSaga ({ token, history}){
  try {
    history.push('/payment');
    const { data: { request_info } } = yield call(SchoolsService.requestInfo, token);
    yield put(initiatePaymentSuccess(request_info));
  }catch(error){
    yield put(initiatePaymentFailure(errorHandler(error)));
  }
}

export function* makePaymentSaga ({ data }){
  try{
    const { data : response } = yield call(SchoolsService.requestPayment, data);
    yield put(makePaymentSuccess(response));
  }catch(error){
    yield put(makePaymentFailure(errorHandler(error)));
  }
}

export function* watchInitiatePaymentSaga(){
  yield takeLatest(INITIATE_PAYMENT, initiatePaymentSaga);
}

export function* watchMakePaymentSaga() {
  yield  takeLatest(MAKE_PAYMENT, makePaymentSaga);
}
