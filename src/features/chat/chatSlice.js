import { createSlice } from "@reduxjs/toolkit";
import apiService, {
    getInitialApiState, getLoadingApiState, getSuccessApiState
} from "../../apiService";
import { selectIsLogged } from '../auth/authSlice';
import { selectCurrentUser } from '../user/userSlice';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        apiState: getInitialApiState(),
        currentChat: null,
        currentChatId: null,
        chats: [],
        messages: [],
        participants: [],
        searchChats: []
    },
    reducers: {
        startLoadingChatData: (state, action) => {
            state.apiState = getLoadingApiState();
            state.currentChatId = action.payload;
        },
        stopLoadingChatData: (state) => {
            state.apiState = getSuccessApiState(state.apiState);
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        },
        setParticipants: (state, action) => {
            state.participants = action.payload;
        },
        setSearchChats: (state, action) => {
            state.searchChats = action.payload;
        }
    }
});

export default chatSlice.reducer;

export const actions = chatSlice.actions;

export const createChat = ({title}) => dispatch => {
    apiService.chat.create({title})
        .then(() => dispatch(getMyChats()));
};

export const getMyChats = () => (dispatch, getState) => {
    const currentUser = selectCurrentUser(getState());
    if (!currentUser) {
        return;
    }
    apiService.chat.getMyChats(currentUser.id)
        .then(response => response.data)
        .then(chats => dispatch(actions.setChats(chats)));
};

export const getChatInfo = chatId => (dispatch, getState) => {
    console.log(selectIsLogged(getState()));
    if (!selectIsLogged(getState())) return;

    apiService.chat.getInfo(chatId)
        .then(response => response.data)
        .then(chat => {
            dispatch(actions.setCurrentChat(chat));
            return chat;
        })
        .then(chat => {
            const participantsIds = chat.participants;
            return Promise.all(
                participantsIds.map(id => apiService.user.getById(id).then(response => response.data))
            );
        })
        .then(participants => dispatch(actions.setParticipants(participants)));
}

export const getMessages = chatId => (dispatch, getState) => {
    if (!selectIsLogged(getState())) return;

    apiService.message.getMessages(chatId)
        .then(response => response.data)
        .then(messages => injectUserData(messages, selectParticipants(getState())))
        .then(messages => dispatch(actions.setMessages(messages)));
}

export const sendMessage = ({content, chatId}) => dispatch => {
    apiService.message.create({content, chatId})
        .then(() => dispatch(getMessages(chatId)));
};

export const searchChats = title => dispatch => {
    apiService.chat.search(title)
        .then(response => response.data)
        .then(chats => dispatch(actions.setSearchChats(chats)));
}

export const joinChat = chatId => dispatch => {
    apiService.chat.join(chatId)
        .then(() => dispatch(getMyChats()));
};

function injectUserData(messages, participants) {
    if (!participants || participants.lenght === 0) return messages;

    return messages.map(message => {
        const user = participants.find(user => user.id === message.userId);
        return {
            ...message,
            nickname: user ? user.nickname : ''
        };
    });
}

export const selectMessages = state => state.chat.messages;

export const selectMyChats = state => state.chat.chats;

export const selectCurrentChat = state => state.chat.currentChat;

export const selectCurrentChatId = state => state.chat.currentChatId;

export const selectParticipants = state => state.chat.participants;

export const selectSearchChats = state => state.chat.searchChats;
