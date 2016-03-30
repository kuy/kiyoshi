import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './reducers';
import saga from './sagas';

export default createStore(
  reducer,
  applyMiddleware(
    createSagaMiddleware(saga),
    logger()
  )
);
