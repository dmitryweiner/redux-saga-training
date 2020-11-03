import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import {all} from "@redux-saga/core/effects";
import registrationReducer from '../features/registration/registrationSlice';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import chatReducer from '../features/chat/chatSlice';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const middleware = [
    ...getDefaultMiddleware({thunk: true}),
    routerMiddleware(history),
    sagaMiddleware
];

export default configureStore({
    reducer: {
        router: connectRouter(history),
        registration: registrationReducer,
        auth: authReducer,
        user: userReducer,
        chat: chatReducer
    },
    middleware
});

function * rootSaga() {
  yield all([

  ]);
}
sagaMiddleware.run(rootSaga);
