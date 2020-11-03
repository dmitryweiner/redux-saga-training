import React from 'react';
import Chat from './Chat';

export default function ChatList({ list, clickHandle }) {
    return <ul>
        {list.map(chat => <Chat
            id={chat.id}
            title={chat.title}
            clickHandle={clickHandle}
            key={chat.id}
        />)}
    </ul>;
}
