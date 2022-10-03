import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import createReducer from './rootReducer';
import rootSaga from './sagas';

export default function configureAppStore(initialState = {}) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // sagaMiddleware: Makes redux-sagas work
  const middlewares = [sagaMiddleware];

  const store = configureStore({
    reducer: createReducer(),
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), ...middlewares],
    preloadedState: initialState,
    devTools: process.env.NODE_ENV!=='production'
  });

  sagaMiddleware.run(rootSaga);
  return store;
}
