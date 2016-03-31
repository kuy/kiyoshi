import { fork, take, put, call, select } from 'redux-saga/effects';
import {
  ZUN, DOKO, zun, doko, kiyoshi
} from './actions';

function wait() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 750);
  });
}

function sing() {
  return 0.5 < Math.random() ? zun() : doko();
}

function* river() {
  while (yield select(state => state.app.music)) {
    yield put(sing());
    yield call(wait);
  }
}

function* expect(type) {
  const action = yield take('*');
  if (type !== action.type) {
    throw 'unexpected';
  }
}

function* check() {
  try {
    yield call(expect, ZUN);
    yield call(expect, ZUN);
    yield call(expect, ZUN);
    yield call(expect, ZUN);
    yield call(expect, DOKO);
    yield put(kiyoshi());
  } catch (e) {
    return;
  }
}

function* checkLoop() {
  while (true) {
    yield fork(check);
    yield take('*');
  }
}

export default function* rootSaga() {
  yield fork(river);
  yield fork(checkLoop);
}
