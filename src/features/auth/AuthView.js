import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authInit, selectApiState } from './authSlice';
import ApiState from '../../components/ApiState';

export default function AuthView() {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const apiState = useSelector(selectApiState);

    function handleSubmit(e) {
        console.log('Trying to login', {nickname, password});
        dispatch(authInit({nickname, password}));
        e.preventDefault();
    }

    return <>
        <h3>Авторизация</h3>
        <ApiState {...apiState} />
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Никнейм:
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Пароль:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
            </div>
            <button type="submit">Войти</button>
        </form>
    </>;
}
