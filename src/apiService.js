import axios from 'axios';

export function getLoadingApiState() {
    return {
        isLoading: true,
        isSuccess: false,
        isError: false,
        errorMessage: ''
    };
}

export function getInitialApiState() {
    return {
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: ''
    };
}

export function getSuccessApiState(apiState) {
    apiState.isSuccess = true;
    apiState.isLoading = false;
    return {...apiState};
}

export function getErrorApiState(apiState, errorMessage) {
    apiState.isSuccess = false;
    apiState.isLoading = false;
    apiState.isError = true;
    apiState.errorMessage = errorMessage;
    return {...apiState};
}

export function getErrorMessage(error) {
    let errorMessage = '';
    if (error.response) {
        // Request made and server responded
        errorMessage = error.response.data.error;
    } else {
        errorMessage = `Something wrong happened! ${error.message}`;
    }
    return errorMessage;
}

export const instance = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    auth: {
        login: ({nickname, password}) => instance.post('/auth', {nickname, password}),
        logout: () => instance.delete('/auth'),
        check: () => instance.get('/auth')
    },
    user: {
        create: ({nickname, password}) => instance.post('/user', {nickname, password}),
        getCurrent: () => instance.get('/user'),
        getById: (id) => instance.get(`/user/${id}`)
    },
    chat: {
        create: ({title}) => instance.post('/chat', {title}),
        getMyChats: (userId) => instance.get(`/chat/?participantId=${userId}`),
        search: (title) => instance.get(`/chat/?title=${title}`),
        getInfo: (id) => instance.get(`/chat/${id}`),
        delete: (id) => instance.delete(`/chat/${id}`),
        join: (chatId) => instance.put(`/chat/${chatId}`)
    },
    message: {
        create: ({content, chatId}) => instance.post('/message', {content, chatId}),
        getMessages: (chatId) => instance.get(`/message/?chatId=${chatId}`),
        delete: (id) => instance.delete(`/message/${id}`)
    }
}
