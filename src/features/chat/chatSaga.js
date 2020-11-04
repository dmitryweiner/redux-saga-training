import {
    actions,
    getChatInfo,
    getMessages,
    selectCurrentChatId,
    selectMessages,
    selectParticipants
} from './chatSlice';
import { select, takeEvery, put, take, all, call } from '@redux-saga/core/effects';
import { actions as authActions, selectIsLogged } from '../auth/authSlice';
import apiService from '../../apiService';

export function *chatSaga() {
    yield takeEvery(actions.prepareChatData.type, loadChatData);
    yield takeEvery(actions.setMessages.type, loadParticipants);
}

function *loadChatData() {
    const chatId = yield select(selectCurrentChatId);
    const isLogged = yield select(selectIsLogged);
    if (!isLogged) {
        yield take(authActions.setIsLogged.type);
    }
    yield put(actions.setMessages([]));
    yield put(actions.setParticipants([]));
    yield put(getMessages(chatId));
    yield put(getChatInfo(chatId));
}

function *loadParticipants() {
    const messages = yield select(selectMessages);
    const userIds = [...new Set(messages.map(message => message.userId))];
    const oldUsers = yield select(selectParticipants);
    const oldUserIds = oldUsers.map(user => user.id);
    const toLoad = userIds.filter(id => !oldUserIds.includes(id));
    if (toLoad.length) {
        let loaded = yield all(
            toLoad.map(id => call(apiService.user.getById, id))
        );
        loaded = loaded.map(response => response.data);
        yield put(actions.setParticipants([
            ...oldUsers,
            ...loaded
        ]));
    }
}
