import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    actions,
    getChatInfo,
    getMessages,
    selectCurrentChat,
    selectMessages,
    sendMessage
} from './chatSlice';
import { selectIsLogged } from '../auth/authSlice';
import MessageList from '../../components/MessageList';

export default function ChatView({ match }) {
    const { id } = match.params;
    const [ message, setMessage ] = useState('');
    const dispatch = useDispatch();
    const isLogged = useSelector(selectIsLogged);
    const currentChat = useSelector(selectCurrentChat);
    const messages = [...useSelector(selectMessages)].reverse();

    useEffect(() => {
        dispatch(actions.setMessages([]));
        dispatch(getMessages(id));
        dispatch(getChatInfo(id));

        const timer = setInterval(() => {
            dispatch(getMessages(id));
        }, 1000);

        return () => clearInterval(timer);
        // eslint-disable-next-line
    }, [isLogged]);

    function handleMessageSend(e) {
        dispatch(sendMessage({
            content: message,
            chatId: id
        }));
        setMessage('');
        e.preventDefault();
    }

    return <>
        <h1>Чат по теме: {currentChat ? currentChat.title : ''}</h1>
        <form onSubmit={handleMessageSend}>
            <div>
                <label>
                    Введите сообщение:
                    <div>
                    <textarea
                        value={message}
                        onChange={ e => setMessage(e.target.value)}
                    ></textarea>
                    </div>
                </label>
            </div>
            <button type="submit">Отправить</button>
        </form>
        <MessageList messages={messages}/>
    </>;
}
