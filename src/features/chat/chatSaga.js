import { select, put, takeEvery, take, all, call } from '@redux-saga/core/effects';
import {
    actions,
    getChatInfo,
    getMessages,
    selectCurrentChatId,
    selectMessages,
    selectParticipants
} from './chatSlice';
import { actions as authActions, selectIsLogged } from '../auth/authSlice';
import apiService from '../../apiService';

export function *chatSaga() {
    yield takeEvery(actions.startLoadingChatData.type, loadChatData);
    yield takeEvery(actions.setMessages.type, loadParticipants);
}

function *loadChatData() {
    const isLogged = yield select(selectIsLogged);
    if (!isLogged) {
        yield take(authActions.setIsLogged.type);
    }
    yield put(actions.setMessages([]));
    yield put(actions.setParticipants([]));
    const chatId = yield select(selectCurrentChatId);
    yield put(getMessages(chatId));
    yield put(getChatInfo(chatId));
}

function *loadParticipants() {
    const messages = yield select(selectMessages);
    const oldParticipants = yield select(selectParticipants);
    const oldParticipantIds = oldParticipants.map(user => user.id);
    const newParticipantIds = messages
        .map(message => message.userId)
        .filter(userId => !oldParticipantIds.includes(userId));
    if (newParticipantIds.length) {
        let participants = yield all(
            newParticipantIds.map(id => call(apiService.user.getById, id))
        );
        participants = participants.map(response => response.data);
        yield put(actions.setParticipants([...participants, ...oldParticipants]));
    }
}
