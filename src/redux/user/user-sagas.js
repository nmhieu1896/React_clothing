import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "./user.types";

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from "./user.action";
import {
  createUserProfileDocument,
  auth,
  googleProvider,
  getCurrentUser,
} from "../../firebase/firebase.utils";

// Sign in for both Email and Google

export function* getSnapshotFromUser(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signIn({ payload }) {
  let user;
  try {
    if (payload) {
      const { email, password } = payload;
      ({ user } = yield auth.signInWithEmailAndPassword(email, password));
    } else {
      ({ user } = yield auth.signInWithPopup(googleProvider));
    }
    yield getSnapshotFromUser(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const user = yield getCurrentUser();
    if (!user) {
      return;
    }
    yield getSnapshotFromUser(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, displayName }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, displayName } }) {
  try {
    const userAuth = yield createUserProfileDocument(user, { displayName });
    yield getSnapshotFromUser(userAuth);
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signIn);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signIn);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onUserAuthenication() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onUserAuthenication),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}

// export function* signInWithGoogle() {
//   try {
//     const { user } = yield auth.signInWithPopup(googleProvider);
//     getSnapshotFromUser(user);
//   } catch (error) {
//     yield put(signInFailure(error));
//   }
// }

// export function* signInWithEmail({ payload: { email, password } }) {
//   try {
//     const { user } = yield auth.signInWithEmailAndPassword(email, password);
//     yield getSnapshotFromUser(user);
//   } catch (error) {
//     yield put(signInFailure(error));
//   }
// }
