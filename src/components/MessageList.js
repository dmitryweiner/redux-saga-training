import React from 'react';
import Message from './Message';

export default function MessageList({messages}) {
    return <ul>
        {messages.map(message => <Message
            nickname={message.nickname}
            content={message.content}
            key={message.id}/>)}
    </ul>
}
