import React from 'react';

export default function Chat({ id, title, clickHandle }) {
    function innerClickHandle(e) {
        e.preventDefault();
        clickHandle(id);
    }

    return <li>
        <a href="/" onClick={innerClickHandle}>{title}</a>
    </li>;
}
