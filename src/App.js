import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { authCheck, authLogout, selectCurrentPath, selectIsLogged } from './features/auth/authSlice';
import AuthView from './features/auth/AuthView';
import RegistrationView from './features/registration/RegistrationView';
import UserView from './features/user/UserView';
import './App.css';
import ChatView from './features/chat/ChatView';

function App() {
    const dispatch = useDispatch();
    const path = useSelector(selectCurrentPath);
    const isLogged = useSelector(selectIsLogged);

    useEffect(() => {
        dispatch(authCheck(path))
        // eslint-disable-next-line
    }, []);

    function handleLogout(e) {
        dispatch(authLogout());
        e.preventDefault();
    }

    return (
        <div className="App">
            <header className="App-header">
                <Link to="/registration">Регистрация</Link>
                <Link to="/user">Профиль</Link>
                {isLogged ? (
                    <a href="/auth" onClick={handleLogout}>Разлогиниться</a>
                ) : (
                    <Link to="/auth">Логин</Link>
                )}
                <Switch>
                    <Route path="/auth" component={AuthView}/>
                    <Route path="/registration" component={RegistrationView}/>
                    <Route path="/user" component={UserView}/>
                    <Route path="/chat/:id" component={ChatView}/>
                    <Redirect from="/" to="/auth"/>
                </Switch>
            </header>
        </div>
    );
}

export default App;
