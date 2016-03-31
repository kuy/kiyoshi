import { combineReducers } from 'redux';
import {
  ZUN, DOKO, KIYOSHI
} from './actions';

const initial = {
  app: {
    list: [],
    music: true
  }
};

const handlers = {
  app: {
    [ZUN]: (state, action) => {
      return { ...state, list: [ ...state.list, 'ズン' ] };
    },
    [DOKO]: (state, action) => {
      return { ...state, list: [ ...state.list, 'ドコ' ] };
    },
    [KIYOSHI]: (state, action) => {
      return { list: [ ...state.list, 'キ・ヨ・シ！' ], music: false };
    }
  }
};

function app(state = initial.app, action) {
  const handler = handlers.app[action.type];
  if (!handler) { return state; }
  return handler(state, action);
}

export default combineReducers(
  { app }
);
