import { fork, take, put, call, select } from 'redux-saga/effects';
import {
  ZUN, DOKO, zun, doko, kiyoshi
} from './actions';

function wait() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
}

function* generate() {
  while (true) {
    const { done } = yield select(state => state.app);
    if (done) {
      break;
    }

    yield put(0.5 < Math.random() ? zun() : doko());
    yield call(wait);
  }
}

function* doCheck() {
  let action = yield take('*');
  if (action.type !== ZUN) { return; }
  console.log('check ZUN (1)');

  action = yield take('*');
  if (action.type !== ZUN) { return; }
  console.log('check ZUN (2)');

  action = yield take('*');
  if (action.type !== ZUN) { return; }
  console.log('check ZUN (3)');

  action = yield take('*');
  if (action.type !== ZUN) { return; }
  console.log('check ZUN (4)');

  action = yield take('*');
  if (action.type !== DOKO) { return; }
  console.log('check DOKO');

  yield put(kiyoshi());
  console.log('check KIYOSHI!');
}

function* check() {
  while (true) {
    const ret = yield call(doCheck);
  }
}

export default function* rootSaga() {
  yield fork(generate);
  yield fork(check);
}
