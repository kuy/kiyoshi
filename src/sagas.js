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

function* generate() {
  while (true) {
    if (yield select(state => state.app.done)) {
      break;
    }

    yield put(0.5 < Math.random() ? zun() : doko());
    yield call(wait);
  }
}

function* expect(type) {
  const action = yield take('*');
  if (type !== action.type) {
    throw 'unexpected';
  }
}

function* doCheck() {
  console.log('start');

  try {
    yield call(expect, ZUN);
    console.log('ZUN (1)');

    yield call(expect, ZUN);
    console.log('ZUN (2)');

    yield call(expect, ZUN);
    console.log('ZUN (3)');

    yield call(expect, ZUN);
    console.log('ZUN (4)');

    yield call(expect, DOKO);
    console.log('DOKO');
  } catch (e) {
    return;
  }

  yield put(kiyoshi());
}

function* check() {
  while (true) {
    yield fork(doCheck);
    yield take('*');
  }
}

export default function* rootSaga() {
  yield fork(check);
  yield fork(generate);
}
