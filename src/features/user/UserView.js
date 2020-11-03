import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, userInit } from './userSlice';
import {
    createChat,
    getMyChats, joinChat,
    searchChats,
    selectMyChats,
    selectSearchChats
} from '../chat/chatSlice';
import ChatList from '../../components/ChatList';

export default function UserView({ history }) {
    const currentUser = useSelector(selectCurrentUser);
    const myChats = useSelector(selectMyChats);
    const searchChatsList = useSelector(selectSearchChats);
    const dispatch = useDispatch();
    const [chatTitle, setChatTitle] = useState('');
    const [searchChatTitle, setSearchChatTitle] = useState('');

    useEffect(() => {
        dispatch(userInit());
        // eslint-disable-next-line
   }, []);

    useEffect(() => {
        dispatch(getMyChats());
        // eslint-disable-next-line
    }, [currentUser ? currentUser.id : null]);

    function handleCreateChat() {
        if (chatTitle === '') return;
        dispatch(createChat({title: chatTitle}));
        setChatTitle('');
    }

    function handleRedirect(chatId) {
        history.push(`/chat/${chatId}`);
    }

    function handleSearchChats() {
        if (searchChatTitle === '') return;
        dispatch(searchChats(searchChatTitle));
    }

    function handleJoinChat(chatId) {
        // eslint-disable-next-line
        if (confirm('Вы действительно хотите вступить в этот чат?')) {
            dispatch(joinChat(chatId));
        }
    }

    return <>
        <h3>Профиль пользователя</h3>
        {currentUser && <>
            Nickname: {currentUser.nickname}<br/>
            Registered at: {new Date(currentUser.createdAt).toLocaleString()}
        </>}
        <h4>Список чатов</h4>
        <ChatList list={myChats} clickHandle={handleRedirect}/>
        <h4>Создать чат</h4>
        <div>
            <label>
                Название чата:
                <input
                    type="text"
                    value={chatTitle}
                    onChange={(e) => setChatTitle(e.target.value)}
                />
            </label>
        </div>
        <button onClick={handleCreateChat}>Создать чат
        </button>
        <h4>Поиск чатов</h4>
        <div>
            <input
                type="text"
                value={searchChatTitle}
                onChange={ e => setSearchChatTitle(e.target.value) }
            />
            <button onClick={handleSearchChats}>Искать</button>
        </div>
        <ChatList list={searchChatsList} clickHandle={handleJoinChat}/>
    </>;
}
