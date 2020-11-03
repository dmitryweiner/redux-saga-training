import React from 'react';

export default function Message({ nickname, content }) {
    return <li>
        {nickname && <>
            <b>{nickname}</b>:&nbsp;
        </>}
        {content}
    </li>;
}
