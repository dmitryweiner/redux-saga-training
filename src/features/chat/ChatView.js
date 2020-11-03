import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    actions,
    getMessages,
    selectCurrentChat,
    selectMessages,
    sendMessage
} from './chatSlice';
import MessageList from '../../components/MessageList';

export default function ChatView({ match }) {
    const { id } = match.params;
    const [ message, setMessage ] = useState('');
    const dispatch = useDispatch();
    const currentChat = useSelector(selectCurrentChat);
    const messages = [...useSelector(selectMessages)].reverse();

    useEffect(() => {
        dispatch(actions.startLoadingChatData(id));
        const timer = setInterval(() => {
            dispatch(getMessages(id));
        }, 1000);

        return () => clearInterval(timer);
        // eslint-disable-next-line
    }, []);

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
