import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import listReducer, {listSaga} from '../features/list/listSlice';
import createSagaMiddleware from 'redux-saga';
import {all} from "@redux-saga/core/effects";
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: true }), sagaMiddleware];

export default configureStore({
  reducer: {
    list: listReducer
  },
  middleware
});

function * rootSaga() {
  yield all([
    listSaga()
  ]);
}
sagaMiddleware.run(rootSaga);