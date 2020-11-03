import { select, put, takeEvery, take } from '@redux-saga/core/effects';
import { actions, getChatInfo, getMessages, selectCurrentChatId } from './chatSlice';
import { actions as authActions, selectIsLogged } from '../auth/authSlice';

export function *chatSaga() {
    yield takeEvery(actions.startLoadingChatData.type, loadChatData);
}

function *loadChatData() {
    const isLogged = yield select(selectIsLogged);
    if (!isLogged) {
        yield take(authActions.setIsLogged.type);
    }
    yield put(actions.setMessages([]));
    const chatId = yield select(selectCurrentChatId);
    yield put(getMessages(chatId));
    yield put(getChatInfo(chatId));
}
