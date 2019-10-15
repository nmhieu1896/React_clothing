import { takeLatest, all, call, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.action';

function* clearCartAfterSignOut() {
    yield put(clearCart())
}

export function* signOutSuccess() {
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartAfterSignOut);
}

export function* cartSagas() {
    yield all([call(signOutSuccess)])
}