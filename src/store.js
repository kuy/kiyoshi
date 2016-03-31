import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import saga from './sagas';
import DevTools from './dev-tools';

export default createStore(
  reducer,
  compose(
    applyMiddleware(
      createSagaMiddleware(saga)
    ),
    DevTools.instrument()
  )
);
